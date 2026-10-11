import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { createDetector, dominantChannel, isVoice, normalizeSettings, recommendThreshold, rmsDb, voiceThreshold } from "../apps/graphics/public/tb-detector.js";
import { cleanTranscript, createSegmenter, matchKeyword, whisperLanguage, whisperModel } from "../apps/graphics/public/tb-detector.js";

const config = { thresholdDb: -40, attackMs: 60, holdMs: 900 };

test("rmsDb measures a full-scale sine near -3 dBFS and silence at the floor", () => {
  const sine = Float32Array.from({ length: 1024 }, (_, index) => Math.sin(index / 5));
  assert.ok(Math.abs(rmsDb(sine) + 3) < 0.5);
  assert.equal(rmsDb(new Float32Array(1024)), -100);
});

test("detector needs the attack time and keeps the alert during the hold time", () => {
  const detector = createDetector();
  assert.equal(detector.update(-20, 0, config), false);
  assert.equal(detector.update(-20, 30, config), false);
  assert.equal(detector.update(-20, 60, config), true);
  assert.equal(detector.update(-70, 500, config), true);
  assert.equal(detector.update(-70, 961, config), false);
});

test("a short knock shorter than the attack does not trigger", () => {
  const detector = createDetector();
  detector.update(-10, 0, config);
  assert.equal(detector.update(-80, 30, config), false);
  assert.equal(detector.update(-80, 1000, config), false);
});

test("transcription gate opens on the first syllable", () => {
  const detector = createDetector();
  detector.update(-20, 0, config);
  assert.equal(detector.active, false);
  assert.equal(detector.gateOpen(10, config.holdMs), true);
});

test("calibration recommends a threshold above the room noise", () => {
  const { floorDb, thresholdDb } = recommendThreshold([-62, -60, -58, -61, -59, -57, -60, -60, -61, -55]);
  assert.equal(floorDb, -55);
  assert.equal(thresholdDb, -45);
});

test("each channel keeps its own color and invalid values are clamped", () => {
  const settings = normalizeSettings({ channels: [{ name: "Director", color: "#00ff00", thresholdDb: -500 }, { color: "rojo" }], alert: { opacity: 9 } });
  assert.equal(settings.channels[0].color, "#00ff00");
  assert.equal(settings.channels[0].thresholdDb, -90);
  assert.match(settings.channels[1].color, /^#[0-9a-f]{6}$/i);
  assert.notEqual(settings.channels[1].color, settings.channels[0].color);
  assert.equal(settings.alert.opacity, 1);
  assert.equal(normalizeSettings({ channels: Array.from({ length: 12 }, () => ({})) }).channels.length, 8);
});

test("a transcribed phrase goes to the channel that spoke the longest", () => {
  assert.equal(dominantChannel({ a: 120, b: 900 }), "b");
  assert.equal(dominantChannel({}), null);
});

test("server exposes the TB Tool page and settings API", () => {
  const server = fs.readFileSync("apps/graphics/server.js", "utf8");
  const api = fs.readFileSync("apps/graphics/tb-api.js", "utf8");
  assert.match(server, /url\.pathname === "\/tb"/);
  assert.match(server, /tbApi\.handle\(request, response, url\)/);
  assert.match(api, /url\.pathname === "\/api\/tb\/settings"/);
});

test("voice mode is the default and loud noise alone never counts as voice", () => {
  const channel = normalizeSettings({ channels: [{}] }).channels[0];
  assert.equal(channel.detection, "voice");
  assert.equal(voiceThreshold(0.5), 0.6);
  assert.equal(isVoice(0.2, false, 0.5), false);
  assert.equal(isVoice(0.7, false, 0.5), true);
  assert.equal(isVoice(0.5, true, 0.5), true, "hysteresis keeps voice between words");
  assert.equal(isVoice(0.5, false, 0.5), false);
});

test("TB Tool ships the offline voice model and floating window", () => {
  const server = fs.readFileSync("apps/graphics/server.js", "utf8");
  const app = fs.readFileSync("apps/graphics/public/tb.js", "utf8");
  assert.ok(fs.existsSync("apps/graphics/public/vendor/vad/silero_vad_v5.onnx"));
  assert.ok(fs.existsSync("apps/graphics/public/vendor/ort/ort-wasm-simd-threaded.wasm"));
  assert.match(server, /url\.pathname === "\/tb-worklet\.js"/);
  assert.match(app, /documentPictureInPicture\.requestWindow/);
});

test("TB Tool saves named sessions and the alert can stay on the top edge", () => {
  const server = fs.readFileSync("apps/graphics/tb-api.js", "utf8");
  const page = fs.readFileSync("apps/graphics/public/tb.html", "utf8");
  const css = fs.readFileSync("apps/graphics/public/tb.css", "utf8");
  assert.match(server, /url\.pathname === "\/api\/tb\/sessions"/);
  assert.match(server, /TB_SESSION_ID = \/\^\[a-z0-9\]/);
  assert.match(page, /id="tbSave"/);
  assert.match(page, /id="tbSessions"/);
  assert.match(page, /<option value="top">Solo arriba<\/option>/);
  assert.match(css, /\.tb-alert\.is-top\.is-on\.is-flash::before \{[^}]*inset: 0 0 auto 0/);
  assert.equal(normalizeSettings({}).alert.edge, "top");
  assert.equal(normalizeSettings({ alert: { edge: "all" } }).alert.edge, "all");
  assert.equal(normalizeSettings({ alert: { edge: "../x" } }).alert.edge, "top");
});

const frame = () => new Float32Array(512); // 32 ms a 16 kHz
function feed(segmenter, pattern, holdMs = 900) {
  const segments = [];
  for (const voiced of pattern) {
    const segment = segmenter.push(frame(), voiced, holdMs);
    if (segment) segments.push(segment);
  }
  return segments;
}

test("segmenter cuts one phrase per utterance with pre-roll and closes after the hold silence", () => {
  const segmenter = createSegmenter();
  const pattern = [...Array(20).fill(false), ...Array(40).fill(true), ...Array(30).fill(false)];
  const segments = feed(segmenter, pattern);
  assert.equal(segments.length, 1);
  const ms = segments[0].length / 16;
  // ~1280 ms de voz + ~300 ms previos + ~300 ms de cola
  assert.ok(ms > 1700 && ms < 2000, `duración ${ms} ms`);
});

test("segmenter drops blips shorter than 0.4 s and splits at 15 s", () => {
  assert.equal(feed(createSegmenter(), [...Array(5).fill(true), ...Array(40).fill(false)]).length, 0);
  const long = feed(createSegmenter(), Array(600).fill(true));
  assert.ok(long.length >= 1);
  assert.ok(long[0].length / 16 <= 15100);
});

test("whisper hallucinations and empty results are filtered", () => {
  assert.equal(cleanTranscript("Subtítulos realizados por la comunidad de Amara.org"), "");
  assert.equal(cleanTranscript("¡Gracias por ver!"), "");
  assert.equal(cleanTranscript("[Música]"), "");
  assert.equal(cleanTranscript("sí sí sí sí"), "");
  assert.equal(cleanTranscript("  ...  "), "");
  assert.equal(cleanTranscript(" Cámara 2, cierra el plano."), "Cámara 2, cierra el plano.");
  assert.equal(cleanTranscript("Pon los subtítulos de la canción"), "Pon los subtítulos de la canción");
});

test("offline transcription is the default and picks the model by hardware", () => {
  const settings = normalizeSettings({});
  assert.equal(settings.transcription.engine, "local");
  assert.equal(settings.transcription.model, "auto");
  assert.equal(normalizeSettings({ transcription: { engine: "browser", model: "base" } }).transcription.engine, "browser");
  assert.equal(normalizeSettings({ transcription: { model: "huge" } }).transcription.model, "auto");
  assert.equal(whisperModel("auto", true), "whisper-small");
  assert.equal(whisperModel("auto", false), "whisper-base");
  assert.equal(whisperModel("base", true), "whisper-base");
  assert.equal(whisperLanguage("es-US"), "spanish");
  assert.equal(whisperLanguage("en-US"), "english");
});

test("offline transcription never goes online and the model files are local", () => {
  const worker = fs.readFileSync("apps/graphics/public/tb-whisper-worker.js", "utf8");
  assert.match(worker, /env\.allowRemoteModels = false/);
  assert.match(worker, /env\.localModelPath = "\/vendor\/models\/"/);
  for (const model of ["whisper-small", "whisper-base"]) {
    for (const file of ["config.json", "tokenizer.json", "onnx/decoder_model_merged_q4.onnx", "onnx/encoder_model_quantized.onnx"]) {
      assert.ok(fs.existsSync(`apps/graphics/public/vendor/models/onnx-community/${model}/${file}`), `${model}/${file}`);
    }
  }
  assert.ok(fs.existsSync("apps/graphics/public/vendor/models/onnx-community/whisper-small/onnx/encoder_model_fp16.onnx"));
});

test("keywords match without accents, case or number words and only as whole words", () => {
  assert.equal(matchKeyword("¡ATENCIÓN, cámara dos!", ["atencion"]), "atencion");
  assert.equal(matchKeyword("Cámara 2 cierra el plano", ["cámara dos"]), "cámara dos");
  assert.equal(matchKeyword("desatención total", ["atención"]), null);
  assert.equal(matchKeyword("", ["atención"]), null);
  assert.equal(matchKeyword("hola", []), null);
});

test("two alert levels: small for any voice, band only with keywords by default", () => {
  const settings = normalizeSettings({});
  assert.equal(settings.alert.small, true);
  assert.equal(settings.alert.band, "keywords");
  assert.ok(settings.keywords.length >= 1);
  assert.equal(normalizeSettings({ alert: { band: "voice" } }).alert.band, "voice");
  assert.deepEqual(normalizeSettings({ keywords: [" urgente ", "", "urgente", "x".repeat(60)] }).keywords, ["urgente", "x".repeat(40)]);
});

test("segmenter exposes the growing phrase for partial transcription", () => {
  const segmenter = createSegmenter();
  for (let index = 0; index < 20; index++) segmenter.push(new Float32Array(512), true, 900);
  assert.equal(segmenter.recording, true);
  assert.ok(segmenter.voicedMs >= 600);
  assert.ok(segmenter.snapshot().length >= 20 * 512);
});
