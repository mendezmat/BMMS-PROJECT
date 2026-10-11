import { TB_COLORS, cleanTranscript, matchKeyword, createDetector, createSegmenter, defaultChannel, defaultSettings, dominantChannel, isVoice, normalizeSettings, recommendThreshold, voiceThreshold, whisperLanguage, whisperModel, MIN_DB } from "./tb-detector.js";
import { createVoiceChannel, preloadVad } from "./tb-vad.js";

const byId = id => document.getElementById(id);
const SETTINGS_KEY = "bmms.tb.settings.v1";
const TRANSCRIPT_KEY = "bmms.tb.transcript.v1";
const MAX_LINES = 300;

let settings = defaultSettings();
let devices = [];
const deviceChannelCounts = new Map();
const observedChannels = new Map(); // deviceId -> canales que realmente llegaron
let audio = null; // { context, destination, sink, inputs: Map<deviceId, {stream, splitter, capture, channelCount}>, lastTick }
const runtimes = new Map(); // channelId -> { deviceId, physical, detector, voice, gate, levelDb, probability, speaking, active }
const tests = new Map(); // channelId -> hasta cuándo se fuerza la alerta
const calibrations = new Map(); // channelId -> { until, samples }
let transcript = [];
let recognition = null;
let recognitionWanted = false;
let activity = {};
let lastActiveChannelId = null;

/* ---------- Registro del servicio (data/tb-tool/logs/tb-AAAA-MM-DD.jsonl) ---------- */
const logBuffer = [];
function tbLog(event, data = {}) {
  logBuffer.push({ t: new Date().toISOString(), event, ...data });
  if (logBuffer.length > 2000) logBuffer.splice(0, logBuffer.length - 2000);
}
async function flushLog() {
  if (!logBuffer.length) return;
  const entries = logBuffer.splice(0, logBuffer.length);
  try {
    const response = await fetch("/api/tb/log", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ entries }) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
  } catch { logBuffer.unshift(...entries.slice(-500)); } // sin servidor (versión vieja): se reintenta luego
}
setInterval(flushLog, 10000);
window.addEventListener("pagehide", () => { if (logBuffer.length) navigator.sendBeacon?.("/api/tb/log", new Blob([JSON.stringify({ entries: logBuffer.splice(0) })], { type: "application/json" })); });

const safeStorage = {
  get(key) { try { return JSON.parse(localStorage.getItem(key) || "null"); } catch { return null; } },
  set(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* sin almacenamiento local */ } }
};

function notice(message) {
  const element = byId("tbNotice");
  element.hidden = !message;
  element.textContent = message || "";
}

/* ---------- Configuración ---------- */

async function loadSettings() {
  try {
    const response = await fetch("/api/tb/settings", { cache: "no-store" });
    if (response.ok) return normalizeSettings((await response.json()).settings);
  } catch { /* servidor sin ruta: se usa el navegador */ }
  return normalizeSettings(safeStorage.get(SETTINGS_KEY) || {});
}

let saveTimer;
function saveSettings() {
  settings = normalizeSettings(settings);
  safeStorage.set(SETTINGS_KEY, settings);
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    fetch("/api/tb/settings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(settings) }).catch(() => {});
  }, 400);
}

const channelById = id => settings.channels.find(channel => channel.id === id);

/* ---------- Dispositivos ---------- */

async function refreshDevices() {
  try {
    devices = (await navigator.mediaDevices.enumerateDevices()).filter(device => device.kind === "audioinput");
  } catch { devices = []; }
  renderChannels();
}

// Cambio de dispositivos (ruteo en la consola, SoundGrid, desconexión): se reconecta solo.
let lastDeviceKey = "";
async function onDeviceChange() {
  await refreshDevices();
  const key = devices.map(device => `${device.deviceId}:${device.label}`).sort().join("|");
  if (key === lastDeviceKey) return;
  const first = !lastDeviceKey;
  lastDeviceKey = key;
  if (first || !audio) return;
  tbLog("devicechange", { devices: devices.map(device => device.label || device.deviceId.slice(0, 8)) });
  notice("Cambiaron las entradas de audio: reconectando…");
  scheduleRestart(1500, "devicechange");
}

// Vigilancia: si una entrada deja de mandar audio (p. ej. tras re-rutear), se reabre; cada 10 s, resumen al registro.
let lastSummaryAt = 0;
setInterval(() => {
  if (!audio) return;
  const now = performance.now();
  for (const input of audio.inputs.values()) {
    if (now - input.lastLevelsAt > 4000) {
      tbLog("stall", { device: input.label, silentMs: Math.round(now - input.lastLevelsAt) });
      notice("La entrada de audio dejó de responder: reconectando…");
      scheduleRestart(200, "stall");
      return;
    }
  }
  if (now - lastSummaryAt >= 10000) {
    lastSummaryAt = now;
    const summary = [];
    for (const channel of settings.channels) {
      const runtime = runtimes.get(channel.id);
      if (!runtime?.stats?.ticks) continue;
      const stats = runtime.stats;
      summary.push({ channel: channel.name, avgDb: Math.round(stats.sumDb / stats.ticks), maxDb: Math.round(stats.maxDb), voicePct: Math.round((stats.voice / stats.ticks) * 100), alertPct: Math.round((stats.active / stats.ticks) * 100) });
      runtime.stats = null;
    }
    if (summary.length) tbLog("summary", { channels: summary, vad: vadStatus });
  }
}, 2000);

function deviceLabel(device, index) {
  if (device.deviceId === "default") return device.label ? `Predeterminada · ${device.label.replace(/^Default - |^Predeterminado - /, "")}` : "Entrada predeterminada";
  return device.label || `Entrada ${index + 1}`;
}

/* ---------- Audio ---------- */

// Si el detector de voz no carga, el canal funciona por nivel como antes.
let vadStatus = "idle"; // idle | loading | ready | failed

async function ensureVad() {
  if (vadStatus === "ready" || vadStatus === "loading") return;
  vadStatus = "loading";
  try {
    await preloadVad();
    vadStatus = "ready";
  } catch (error) {
    console.warn("TB Tool: detector de voz no disponible", error);
    vadStatus = "failed";
    notice("No se pudo cargar el detector de voz. Los canales funcionan por nivel de audio.");
  }
  renderChannels();
}

const usesVoice = channel => channel.detection === "voice" && vadStatus !== "failed";

async function openInput(context, deviceId) {
  const constraints = {
    audio: {
      deviceId: deviceId && deviceId !== "default" ? { exact: deviceId } : undefined,
      channelCount: { ideal: 64 }, // interfaces multicanal (SoundGrid WDM, etc.): pedir todos los canales
      echoCancellation: false,
      noiseSuppression: false,
      autoGainControl: false
    }
  };
  const stream = await navigator.mediaDevices.getUserMedia(constraints);
  const track = stream.getAudioTracks()[0];
  // Canales reales: lo que informa el dispositivo o lo que ya se vio llegar (algunos informan de menos).
  const channelCount = Math.max(1, Number(track?.getSettings?.().channelCount) || 2, observedChannels.get(deviceId) || 0);
  deviceChannelCounts.set(deviceId, channelCount);
  const source = context.createMediaStreamSource(stream);
  const splitter = context.createChannelSplitter(channelCount);
  source.connect(splitter);
  // La captura corre en el hilo de audio: niveles y bloques para el detector de voz.
  const capture = new AudioWorkletNode(context, "bmms-tb-capture", {
    numberOfInputs: 1,
    numberOfOutputs: 1,
    channelCount,
    channelCountMode: "max", // recibe todos los canales que entrega el dispositivo, sin mezclar
    channelInterpretation: "discrete",
    processorOptions: { channels: [] }
  });
  source.connect(capture);
  capture.connect(audio.sink);
  const input = { deviceId, stream, splitter, capture, channelCount, label: track?.label || "", lastLevelsAt: performance.now() };
  capture.port.onmessage = event => handleCapture(input, event.data);
  track?.addEventListener("ended", () => {
    if (!audio) return;
    notice("Se desconectó una entrada de audio. BMMS intentará reconectar.");
    scheduleRestart(2000, "track-ended");
  });
  return input;
}

async function startAudio() {
  if (audio) return;
  if (!navigator.mediaDevices?.getUserMedia) { notice("Este navegador no permite acceder al micrófono. Abre BMMS en Chrome o Edge desde http://localhost."); return; }
  const context = new AudioContext();
  await context.audioWorklet.addModule("/tb-worklet.js");
  const destination = context.createMediaStreamDestination();
  // Salida muda: mantiene vivo el nodo de captura sin sonar por los parlantes.
  const sink = context.createGain();
  sink.gain.value = 0;
  sink.connect(context.destination);
  audio = { context, destination, sink, inputs: new Map(), lastTick: 0 };
  notice("");
  if (settings.channels.some(channel => channel.enabled && channel.detection === "voice")) ensureVad();
  for (const channel of settings.channels.filter(item => item.enabled)) {
    try {
      if (!audio.inputs.has(channel.deviceId)) audio.inputs.set(channel.deviceId, await openInput(context, channel.deviceId));
      const input = audio.inputs.get(channel.deviceId);
      // Nunca se reasigna en silencio a otro canal: si el canal físico no existe, se avisa.
      if (channel.channelIndex >= input.channelCount) {
        const message = `El canal físico ${channel.channelIndex + 1} no existe: «${input.label || "la entrada"}» entrega solo ${input.channelCount} canal${input.channelCount === 1 ? "" : "es"}. Con SoundGrid, sube los canales WDM en el Panel de control del driver o rutea el talkback a los primeros canales.`;
        setChannelStatus(channel.id, message);
        notice(`${channel.name}: ${message}`);
        tbLog("routing-error", { channel: channel.name, channelIndex: channel.channelIndex, deviceChannels: input.channelCount, device: input.label });
        continue;
      }
      const index = channel.channelIndex;
      const twin = [...runtimes.entries()].find(([, runtime]) => runtime.deviceId === channel.deviceId && runtime.physical === index);
      if (twin) notice(`${channel.name} y ${channelById(twin[0])?.name || "otro canal"} escuchan la misma entrada (canal físico ${index + 1}). Revisa el ruteo.`);
      const gate = context.createGain();
      gate.gain.value = 0;
      input.splitter.connect(gate, index);
      if (channel.transcribe) gate.connect(destination);
      setChannelStatus(channel.id, `Escuchando el canal físico ${index + 1} de ${input.channelCount} · ${input.label || "entrada predeterminada"}`);
      runtimes.set(channel.id, { deviceId: channel.deviceId, physical: index, detector: createDetector(), voice: createVoiceChannel(), gate, levelDb: MIN_DB, probability: 0, speaking: false, active: false });
    } catch (error) {
      console.warn("TB Tool: entrada no disponible", error);
      const reason = error?.name === "NotAllowedError" ? "Permite el acceso al micrófono en el navegador." : "No se pudo abrir la entrada de audio.";
      notice(`${channel.name}: ${reason}`);
    }
  }
  if (!audio) return; // detenido mientras se abrían las entradas
  for (const input of audio.inputs.values()) {
    const physical = [...runtimes.values()].filter(runtime => runtime.deviceId === input.deviceId).map(runtime => runtime.physical);
    input.capture.port.postMessage({ type: "channels", channels: [...new Set(physical)] });
  }
  await refreshDevices();
  setRunningUi(true);
  tbLog("start", { inputs: [...audio.inputs.values()].map(input => ({ device: input.label, channels: input.channelCount })), channels: settings.channels.filter(item => item.enabled).map(item => ({ name: item.name, index: item.channelIndex + 1, detection: item.detection })) });
  if (settings.transcription.enabled) startRecognition();
}

function stopAudio(reason = "manual") {
  stopRecognition();
  if (!audio) return;
  tbLog("stop", { reason });
  for (const input of audio.inputs.values()) {
    input.capture.port.onmessage = null;
    input.stream.getTracks().forEach(track => track.stop());
  }
  audio.context.close().catch(() => {});
  audio = null;
  runtimes.clear();
  calibrations.clear();
  activity = {};
  setRunningUi(false);
  renderAlert();
  renderMeters();
}

let restartTimer;
function scheduleRestart(delay = 250, reason = "") {
  if (!audio) return;
  if (reason) tbLog("restart", { reason });
  clearTimeout(restartTimer);
  restartTimer = setTimeout(async () => { stopAudio("restart"); await startAudio(); }, delay);
}

function handleCapture(input, message) {
  if (!audio) return;
  if (message.type === "levels") {
    input.lastLevelsAt = performance.now();
    // Si el dispositivo entrega más canales de los que informó al abrir, se vuelve a mapear.
    if (message.rms.length > input.channelCount && message.rms.length > (observedChannels.get(input.deviceId) || 0)) {
      observedChannels.set(input.deviceId, message.rms.length); // una sola vez por dispositivo: nunca en bucle
      input.channelCount = message.rms.length;
      deviceChannelCounts.set(input.deviceId, message.rms.length);
      tbLog("device-channels", { device: input.label, channels: message.rms.length });
      const needsRemap = settings.channels.some(channel => channel.enabled && channel.deviceId === input.deviceId && channel.channelIndex < message.rms.length && !runtimes.has(channel.id));
      if (needsRemap) scheduleRestart(500, "more-channels");
    }
    for (const runtime of runtimes.values()) {
      if (runtime.deviceId !== input.deviceId) continue;
      const rms = message.rms[runtime.physical] || 0;
      runtime.levelDb = rms > 0 ? Math.max(MIN_DB, 20 * Math.log10(rms)) : MIN_DB;
    }
    tick();
    return;
  }
  if (message.type === "frame") {
    for (const [channelId, runtime] of runtimes) {
      if (runtime.deviceId !== input.deviceId || runtime.physical !== message.channel) continue;
      const channel = channelById(channelId);
      if (!channel) continue;
      if (channel.detection === "voice" && vadStatus === "ready") {
        runtime.voice.push(message.frame).then(probability => { runtime.probability = probability; }).catch(error => console.warn("TB Tool: detector de voz", error));
      }
      if (recognitionWanted && localTranscription() && channel.transcribe) feedSegment(channel, runtime, message.frame);
    }
  }
}

function tick() {
  const now = performance.now();
  if (now - audio.lastTick < 20) return; // varias entradas comparten el mismo reloj
  const elapsed = audio.lastTick ? Math.min(200, now - audio.lastTick) : 32;
  audio.lastTick = now;
  for (const channel of settings.channels) {
    const runtime = runtimes.get(channel.id);
    if (!runtime) continue;
    const loud = runtime.levelDb >= channel.thresholdDb;
    let above = loud;
    if (usesVoice(channel)) {
      // Con detección de voz, el ruido fuerte no basta: tiene que reconocerse voz humana.
      runtime.speaking = vadStatus === "ready" && isVoice(runtime.probability, runtime.speaking, channel.voiceSensitivity);
      above = loud && runtime.speaking;
    }
    const stats = runtime.stats || (runtime.stats = { ticks: 0, voice: 0, active: 0, maxDb: MIN_DB, sumDb: 0 });
    stats.ticks++; stats.sumDb += runtime.levelDb; stats.maxDb = Math.max(stats.maxDb, runtime.levelDb);
    if (runtime.speaking) stats.voice++;
    const wasActive = runtime.active;
    runtime.active = runtime.detector.step(above, now, channel);
    if (runtime.active) stats.active++;
    if (runtime.active !== wasActive) tbLog(runtime.active ? "alert-on" : "alert-off", { channel: channel.name });
    if (runtime.active && !wasActive) lastActiveChannelId = channel.id;
    const open = runtime.detector.gateOpen(now, channel.holdMs);
    runtime.gate.gain.setTargetAtTime(open ? 1 : 0, audio.context.currentTime, 0.015);
    if (runtime.active && channel.transcribe) activity[channel.id] = (activity[channel.id] || 0) + elapsed;
    const calibration = calibrations.get(channel.id);
    if (calibration) {
      calibration.samples.push(runtime.levelDb);
      if (now >= calibration.until) finishCalibration(channel, calibration.samples);
    }
  }
  renderMeters();
  renderAlert();
}

/* ---------- Calibración y prueba ---------- */

async function calibrate(channel) {
  if (!audio) await startAudio();
  if (!runtimes.has(channel.id)) { setChannelStatus(channel.id, "Activa el canal e inicia el monitoreo para calibrar."); return; }
  calibrations.set(channel.id, { until: performance.now() + 3000, samples: [] });
  setChannelStatus(channel.id, "Midiendo ruido 3 s… no hables por este canal.");
}

function finishCalibration(channel, samples) {
  calibrations.delete(channel.id);
  const { floorDb, thresholdDb } = recommendThreshold(samples);
  channel.thresholdDb = thresholdDb;
  saveSettings();
  renderChannels();
  setChannelStatus(channel.id, `Ruido ${floorDb} dB → umbral ${thresholdDb} dB`);
}

// Prueba: muestra la alerta grande como si se hubiera dicho la primera palabra clave.
function testAlert(channel) {
  tests.set(channel.id, performance.now() + 3000);
  lastActiveChannelId = channel.id;
  keywordHit = { channelId: channel.id, word: settings.keywords[0] || "Prueba", until: performance.now() + 3000 };
  renderAlert();
  setTimeout(renderAlert, 3100);
}

/* ---------- Transcripción (reconocimiento de voz del navegador) ---------- */

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

function transcriptHint(message) { byId("tbTranscriptHint").textContent = message; }

function startRecognition() {
  recognitionWanted = true;
  if (settings.transcription.engine === "local") { if (audio) startWhisper(); return; }
  if (!SpeechRecognition) { transcriptHint("Este navegador no tiene reconocimiento de voz. Usa Chrome o Edge."); return; }
  if (recognition || !audio) return;
  const instance = new SpeechRecognition();
  instance.lang = settings.transcription.language;
  instance.continuous = true;
  instance.interimResults = true;
  instance.onresult = handleResult;
  instance.onerror = event => {
    if (event.error === "no-speech" || event.error === "aborted") return;
    const messages = {
      "not-allowed": "El navegador no permitió el reconocimiento de voz.",
      "network": "La transcripción necesita conexión a internet.",
      "audio-capture": "No hay audio para transcribir.",
      "language-not-supported": "Ese idioma no está disponible para transcribir."
    };
    transcriptHint(messages[event.error] || `Transcripción pausada (${event.error}).`);
  };
  instance.onend = () => {
    recognition = null;
    if (recognitionWanted && audio) setTimeout(startRecognition, 300);
  };
  const track = audio.destination.stream.getAudioTracks()[0];
  try {
    // Chrome reciente acepta una pista de audio: así se transcriben solo los canales de talkback.
    instance.start(track);
    transcriptHint("Transcribiendo los canales marcados. Requiere internet.");
  } catch {
    instance.start();
    transcriptHint("Este navegador transcribe solo la entrada predeterminada del sistema. Requiere internet.");
  }
  recognition = instance;
}

function stopRecognition() {
  recognitionWanted = false;
  const instance = recognition;
  recognition = null;
  if (instance) { instance.onend = null; try { instance.abort(); } catch { /* ya detenido */ } }
  for (const segmenter of segmenters.values()) segmenter.reset();
  segmenters.clear();
  pendingByChannel.clear();
  renderLive("");
}

/* ---------- Transcripción sin internet (Whisper en un Web Worker) ----------
   Cada canal corta su audio en frases según la detección de voz y las envía a Whisper.
   Así cada frase queda asignada al canal exacto que habló. */

let whisper = null; // { worker, status: "loading" | "ready" | "error", model, device, language, label }
let whisperRequest = 0;
const segmenters = new Map(); // channelId -> segmentador de frases
const pendingByChannel = new Map(); // channelId -> frases enviadas sin resultado

const localTranscription = () => settings.transcription.enabled && settings.transcription.engine === "local";

// GPU útil para transcribir: Apple Silicon o tarjeta dedicada. Las gráficas integradas de Intel
// (p. ej. el NUC de la iglesia) van mejor con el modelo liviano en el procesador.
async function whisperDevice() {
  try {
    const adapter = navigator.gpu && await navigator.gpu.requestAdapter({ powerPreference: "high-performance" });
    if (!adapter) return "wasm";
    const info = adapter.info || (await adapter.requestAdapterInfo?.()) || {};
    const vendor = String(info.vendor || "").toLowerCase();
    tbLog("gpu", { vendor, architecture: info.architecture || "", description: info.description || "" });
    if (vendor.includes("intel")) return "wasm";
    return "webgpu";
  } catch { return "wasm"; }
}

async function startWhisper() {
  const gpu = await whisperDevice();
  const model = whisperModel(settings.transcription.model, gpu === "webgpu");
  // base solo da texto correcto en CPU (WASM); small usa la GPU cuando existe.
  const device = model === "whisper-small" ? gpu : "wasm";
  const language = whisperLanguage(settings.transcription.language);
  if (whisper && whisper.status !== "error" && whisper.model === model && whisper.device === device) {
    whisper.language = language;
    if (whisper.status === "ready") transcriptHint(`Transcripción sin internet lista (${whisper.label}).`);
    return;
  }
  stopWhisper();
  const label = `${model === "whisper-small" ? "Preciso" : "Rápido"} · ${device === "webgpu" ? "GPU" : "CPU"}`;
  const worker = new Worker("/tb-whisper-worker.js", { type: "module" });
  whisper = { worker, status: "loading", model, device, language, label };
  transcriptHint(`Cargando la transcripción sin internet (${label})…`);
  worker.onmessage = event => handleWhisper(worker, event.data);
  worker.onerror = event => {
    if (whisper?.worker !== worker) return;
    whisper.status = "error";
    transcriptHint(`No se pudo iniciar la transcripción sin internet: ${event.message || "error desconocido"}`);
  };
  worker.postMessage({ type: "load", model, device, language });
}

function stopWhisper() {
  whisper?.worker.terminate();
  whisper = null;
  pendingByChannel.clear();
}

function handleWhisper(worker, message) {
  if (whisper?.worker !== worker) return;
  if (message.type === "progress") transcriptHint(`Cargando el modelo de transcripción… ${message.percent}%`);
  if (message.type === "ready") {
    whisper.status = "ready";
    transcriptHint(`Transcripción sin internet lista (${whisper.label}).`);
  }
  if (message.type === "error") {
    whisper.status = "error";
    transcriptHint(`Error en la transcripción sin internet: ${message.message}`);
  }
  if (message.type === "result") {
    if (message.error) console.warn("TB Tool: Whisper", message.error);
    const text = cleanTranscript(message.text);
    if (message.partial) {
      partialInFlight.delete(message.channelId);
      // El texto parcial se muestra mientras la persona sigue hablando y ya sirve para las palabras clave.
      if (text) { if (segmenters.get(message.channelId)?.recording) renderLive(`${text}…`, message.channelId); checkKeywords(message.channelId, text); }
      return;
    }
    pendingByChannel.set(message.channelId, Math.max(0, (pendingByChannel.get(message.channelId) || 1) - 1));
    const metric = segmentMetrics.get(message.id);
    if (metric) {
      segmentMetrics.delete(message.id);
      tbMetrics.push({ audioMs: metric.audioMs, inferMs: message.ms, endToTextMs: Math.round(performance.now() - metric.lastVoiceAt), text });
      if (tbMetrics.length > 50) tbMetrics.shift();
    }
    if (text) { addLine(message.channelId, text); checkKeywords(message.channelId, text); }
    tbLog("transcript", { channel: channelById(message.channelId)?.name, text, ms: message.ms, error: message.error || undefined });
    renderPending();
  }
}

/* Métricas de velocidad (consola: window.__tbMetrics). */
const tbMetrics = [];
window.__tbMetrics = tbMetrics;
const segmentMetrics = new Map(); // id -> { audioMs, lastVoiceAt }
const lastVoiceAt = new Map();    // channelId -> momento del último bloque con voz
const partialInFlight = new Set();
const lastPartialAt = new Map();
const TRANSCRIBE_SILENCE_MS = 450;  // la frase se cierra antes que la alerta (que usa la retención del canal)
const PARTIAL_EVERY_MS = 800;

/* ---------- Palabras clave: activan la alerta grande ---------- */

let keywordHit = null; // { channelId, word, until }
function checkKeywords(channelId, text) {
  const word = matchKeyword(text, settings.keywords);
  if (!word) return;
  if (!keywordHit || keywordHit.word !== word || keywordHit.until < performance.now()) tbLog("keyword", { channel: channelById(channelId)?.name, word, text });
  keywordHit = { channelId, word, until: performance.now() + 6000 };
  renderAlert();
  setTimeout(renderAlert, 6100);
}

function feedSegment(channel, runtime, frame) {
  if (!segmenters.has(channel.id)) segmenters.set(channel.id, createSegmenter());
  const voiced = usesVoice(channel) ? runtime.speaking : runtime.levelDb >= channel.thresholdDb;
  if (voiced) lastVoiceAt.set(channel.id, performance.now());
  const segmenter = segmenters.get(channel.id);
  const segment = segmenter.push(frame, voiced, Math.min(channel.holdMs, TRANSCRIBE_SILENCE_MS));
  if (segment) { sendSegment(channel.id, segment); return; }
  // Transcripción parcial mientras se habla (solo con GPU: en CPU retrasaría las frases finales).
  const now = performance.now();
  if (voiced && whisper?.status === "ready" && whisper.device === "webgpu" && segmenter.recording && segmenter.voicedMs >= 600
      && !partialInFlight.size && !pendingByChannel.get(channel.id) && now - (lastPartialAt.get(channel.id) || 0) >= PARTIAL_EVERY_MS) { // una parcial a la vez en total
    const audio = segmenter.snapshot();
    if (!audio) return;
    partialInFlight.add(channel.id);
    lastPartialAt.set(channel.id, now);
    pendingByChannel.set(channel.id, pendingByChannel.get(channel.id) || 0);
    whisper.worker.postMessage({ type: "transcribe", partial: true, id: ++whisperRequest, channelId: channel.id, audio, model: whisper.model, device: whisper.device, language: whisper.language }, [audio.buffer]);
  }
}

let skipNotified = false;
function sendSegment(channelId, segment) {
  if (!whisper || whisper.status === "error") return;
  // Si la transcripción no da abasto, se saltan frases: la detección y las alertas nunca esperan por ella.
  const waiting = [...pendingByChannel.values()].reduce((sum, count) => sum + count, 0);
  if (waiting >= 2) {
    tbLog("transcript-skip", { channel: channelById(channelId)?.name, waiting });
    if (!skipNotified) { skipNotified = true; transcriptHint("El equipo va justo: se saltan algunas frases de la transcripción. Las alertas siguen funcionando."); }
    return;
  }
  pendingByChannel.set(channelId, (pendingByChannel.get(channelId) || 0) + 1);
  const id = ++whisperRequest;
  segmentMetrics.set(id, { audioMs: Math.round(segment.length / 16), lastVoiceAt: lastVoiceAt.get(channelId) || performance.now() });
  whisper.worker.postMessage({ type: "transcribe", id, channelId, audio: segment, model: whisper.model, device: whisper.device, language: whisper.language }, [segment.buffer]);
  renderPending();
}

function renderPending() {
  const channelId = [...pendingByChannel].find(([, count]) => count > 0)?.[0];
  renderLive(channelId ? "Transcribiendo…" : "", channelId);
}

function currentSpeaker() {
  return dominantChannel(activity) || lastActiveChannelId || settings.channels.find(channel => channel.transcribe)?.id || null;
}

function handleResult(event) {
  let interim = "";
  for (let index = event.resultIndex; index < event.results.length; index++) {
    const result = event.results[index];
    const text = String(result[0]?.transcript || "").trim();
    if (!text) continue;
    if (result.isFinal) {
      addLine(currentSpeaker(), text);
      activity = {};
    } else interim += `${text} `;
  }
  renderLive(interim.trim());
}

function addLine(channelId, text) {
  const channel = channelById(channelId);
  transcript.push({ at: new Date().toISOString(), channelId, name: channel?.name || "Talkback", color: channel?.color || "#888888", text: text.slice(0, 2000) });
  if (transcript.length > MAX_LINES) transcript = transcript.slice(-MAX_LINES);
  safeStorage.set(TRANSCRIPT_KEY, transcript);
  renderTranscript();
}

/* ---------- Render ---------- */

function setRunningUi(running) {
  const button = byId("tbStart");
  button.textContent = running ? "Detener monitoreo" : "Iniciar monitoreo";
  button.classList.toggle("is-running", running);
  const state = byId("tbState");
  state.textContent = running ? "Monitoreando" : "Detenido";
  state.classList.toggle("is-running", running);
  window.bmmsCentral?.status?.({ running });
  renderFloat();
}

function setChannelStatus(channelId, message) {
  const status = document.querySelector(`.tb-channel[data-id="${CSS.escape(channelId)}"] [data-role="status"]`);
  if (status) status.textContent = message;
}

const dbToPercent = db => Math.max(0, Math.min(100, ((db + 90) / 90) * 100));

function renderMeters() {
  for (const card of document.querySelectorAll(".tb-channel")) {
    const runtime = runtimes.get(card.dataset.id);
    card.querySelector(".tb-meter-fill").style.width = `${runtime ? dbToPercent(runtime.levelDb) : 0}%`;
    const channel = channelById(card.dataset.id);
    const voice = Boolean(channel && usesVoice(channel));
    card.querySelector(".tb-meter-voice").style.width = `${voice && runtime ? Math.round(runtime.probability * 100) : 0}%`;
    const chip = card.querySelector('[data-role="voice"]');
    chip.hidden = !voice;
    chip.classList.toggle("is-on", Boolean(voice && runtime?.speaking));
    card.classList.toggle("is-active", Boolean(runtime?.active));
  }
}

function activeChannels() {
  const now = performance.now();
  return settings.channels.filter(channel => (channel.enabled && runtimes.get(channel.id)?.active) || (tests.get(channel.id) || 0) > now);
}

let lastAlertKey = "";
// Dentro de BMMS Central la alerta se dibuja a pantalla completa (franja superior sobre todas las apps).
let lastOverlayKey = "";
function sendOverlay(active, force = false) {
  if (!window.bmmsCentral?.alert) return;
  const recent = transcript[transcript.length - 1];
  const live = byId("tbLive").hidden ? "" : byId("tbLive").textContent;
  const text = live && live !== "Transcribiendo…" ? live : (recent && Date.now() - Date.parse(recent.at) < 8000 ? recent.text : "");
  const main = active.find(channel => channel.id === lastActiveChannelId) || active[0];
  const ordered = main ? [main, ...active.filter(channel => channel !== main)] : [];
  // Dos niveles: pequeña con cualquier voz; franja grande con palabra clave (o siempre, si se elige).
  const hit = keywordHit && keywordHit.until > performance.now() ? keywordHit : null;
  const hitChannel = hit && settings.channels.find(channel => channel.id === hit.channelId);
  let level = "none";
  if (settings.alert.band === "voice" && active.length) level = "band";
  else if (hit) level = "band";
  else if (active.length && settings.alert.small) level = "small";
  const shown = hit && hitChannel ? [hitChannel, ...ordered.filter(channel => channel.id !== hitChannel.id)] : ordered;
  const state = {
    active: level !== "none",
    level,
    word: hit ? hit.word : "",
    channels: shown.map(channel => ({ name: channel.name, color: channel.color })),
    thickness: settings.alert.thickness, opacity: settings.alert.opacity, pulse: settings.alert.pulse,
    flash: settings.alert.flash, edge: settings.alert.edge, showText: settings.alert.showText, text
  };
  const key = JSON.stringify(state);
  if (!force && key === lastOverlayKey) return;
  lastOverlayKey = key;
  window.bmmsCentral.alert(state);
}

function renderAlert() {
  const active = activeChannels();
  const alert = byId("tbAlert");
  const key = active.map(channel => channel.id).join("|");
  alert.classList.toggle("is-on", active.length > 0);
  sendOverlay(active);
  if (key === lastAlertKey) return;
  lastAlertKey = key;
  renderFloat();
  const main = active.find(channel => channel.id === lastActiveChannelId) || active[0];
  if (main) alert.style.setProperty("--alert-color", main.color);
  const labels = byId("tbAlertLabels");
  labels.replaceChildren(...active.map(channel => {
    const span = document.createElement("span");
    span.style.setProperty("--label-color", channel.color);
    span.textContent = channel.name;
    return span;
  }));
}

/* ---------- Ventana flotante ---------- */

let floatWindow = null;

async function openFloat() {
  if (floatWindow) { floatWindow.focus(); return; }
  const inCentral = Boolean(window.bmmsCentral?.isCentral);
  if (!inCentral && !("documentPictureInPicture" in window)) {
    notice("La ventana flotante necesita Chrome o Edge actualizados. En otros navegadores usa el Modo alerta.");
    return;
  }
  try {
    // Dentro de BMMS Central es una ventana real del sistema, siempre encima de todo.
    const pip = inCentral ? window.open("", "tbfloat", "width=460,height=300") : await window.documentPictureInPicture.requestWindow({ width: 460, height: 300 });
    if (!pip) throw new Error("ventana bloqueada");
    const link = pip.document.createElement("link");
    link.rel = "stylesheet";
    link.href = new URL("/tb.css", window.location.origin).href;
    pip.document.head.append(link);
    pip.document.title = "BMMS TB";
    pip.document.body.className = "tb-float";
    const alert = pip.document.createElement("div");
    alert.className = "tb-float-alert";
    const names = pip.document.createElement("div");
    names.className = "tb-float-names";
    alert.append(names);
    const live = pip.document.createElement("div");
    live.className = "tb-float-live";
    const lines = pip.document.createElement("ol");
    lines.className = "tb-float-lines";
    pip.document.body.append(alert, live, lines);
    floatWindow = pip;
    byId("tbFloat").classList.add("is-running");
    pip.addEventListener("pagehide", () => { floatWindow = null; byId("tbFloat").classList.remove("is-running"); });
    applyAlertStyle();
    renderFloat();
    if (!audio) startAudio();
  } catch (error) {
    console.warn("TB Tool: ventana flotante", error);
    notice("No se pudo abrir la ventana flotante.");
  }
}

function renderFloat() {
  if (!floatWindow) return;
  const doc = floatWindow.document;
  const alert = doc.querySelector(".tb-float-alert");
  if (!alert) return;
  const active = activeChannels();
  const main = active.find(channel => channel.id === lastActiveChannelId) || active[0];
  alert.classList.toggle("is-on", active.length > 0);
  alert.classList.toggle("is-pulse", settings.alert.pulse);
  if (main) alert.style.setProperty("--alert-color", main.color);
  alert.querySelector(".tb-float-names").textContent = active.length ? active.map(channel => channel.name).join(" · ") : (audio ? "Sin talkback" : "Detenido");
  const live = doc.querySelector(".tb-float-live");
  live.textContent = byId("tbLive").hidden ? "" : byId("tbLive").textContent;
  live.style.setProperty("--line-color", byId("tbLive").style.getPropertyValue("--line-color") || "transparent");
  doc.querySelector(".tb-float-lines").replaceChildren(...transcript.slice(-3).map(line => {
    const item = doc.createElement("li");
    item.style.setProperty("--line-color", line.color);
    const who = doc.createElement("b");
    who.textContent = line.name;
    item.append(who, doc.createTextNode(line.text));
    return item;
  }));
}

function applyAlertStyle() {
  const root = document.documentElement.style;
  root.setProperty("--alert-thickness", `${settings.alert.thickness}px`);
  root.setProperty("--alert-opacity", String(settings.alert.opacity));
  root.setProperty("--transcript-size", `${settings.transcription.fontSize}px`);
  if (floatWindow) floatWindow.document.documentElement.style.setProperty("--transcript-size", `${settings.transcription.fontSize}px`);
  byId("tbAlert").classList.toggle("is-pulse", settings.alert.pulse);
  byId("tbAlert").classList.toggle("is-flash", settings.alert.flash);
  byId("tbAlert").classList.toggle("is-top", settings.alert.edge !== "all");
  byId("tbEdge").value = settings.alert.edge;
  byId("tbThickness").value = settings.alert.thickness;
  byId("tbThicknessValue").textContent = `${settings.alert.thickness}px`;
  byId("tbOpacity").value = settings.alert.opacity;
  byId("tbOpacityValue").textContent = `${Math.round(settings.alert.opacity * 100)}%`;
  byId("tbPulse").checked = settings.alert.pulse;
  byId("tbFlash").checked = settings.alert.flash;
  byId("tbShowText").checked = settings.alert.showText;
  byId("tbSmall").checked = settings.alert.small;
  byId("tbBand").value = settings.alert.band;
  if (document.activeElement !== byId("tbKeywords")) byId("tbKeywords").value = settings.keywords.join("\n");
  byId("tbShowTextRow").hidden = !window.bmmsCentral?.overlay;
  if (window.bmmsCentral?.overlay) sendOverlay(activeChannels(), true);
  byId("tbTranscribe").checked = settings.transcription.enabled;
  byId("tbLanguage").value = settings.transcription.language;
  byId("tbEngine").value = settings.transcription.engine;
  byId("tbModel").value = settings.transcription.model;
  byId("tbModel").hidden = settings.transcription.engine !== "local";
}

function renderChannels() {
  const list = byId("tbChannelList");
  const template = byId("tbChannelTemplate");
  const statuses = new Map([...list.querySelectorAll(".tb-channel")].map(card => [card.dataset.id, card.querySelector('[data-role="status"]').textContent]));
  list.replaceChildren(...settings.channels.map(channel => {
    const card = template.content.firstElementChild.cloneNode(true);
    card.dataset.id = channel.id;
    card.style.setProperty("--channel-color", channel.color);
    card.classList.toggle("is-disabled", !channel.enabled);
    const deviceSelect = card.querySelector('[data-field="deviceId"]');
    const options = devices.length ? devices : [{ deviceId: "default", label: "" }];
    deviceSelect.replaceChildren(...options.map((device, index) => new Option(deviceLabel(device, index), device.deviceId)));
    if (![...deviceSelect.options].some(option => option.value === channel.deviceId)) deviceSelect.append(new Option("Entrada no conectada", channel.deviceId));
    const count = deviceChannelCounts.get(channel.deviceId) || Math.max(2, channel.channelIndex + 1);
    const channelSelect = card.querySelector('[data-field="channelIndex"]');
    // Se puede elegir hasta el canal 32 aunque el dispositivo aún no se haya abierto; los que no entrega se marcan.
    const known = deviceChannelCounts.has(channel.deviceId);
    const total = Math.max(count, 32, channel.channelIndex + 1);
    channelSelect.replaceChildren(...Array.from({ length: total }, (_, index) => new Option(`Canal ${index + 1}${known && index >= count ? " (no disponible)" : ""}`, String(index))));
    for (const field of card.querySelectorAll("[data-field]")) {
      const value = channel[field.dataset.field];
      if (field.type === "checkbox") field.checked = Boolean(value);
      else field.value = String(value);
    }
    card.querySelector('[data-out="thresholdDb"]').textContent = `${channel.thresholdDb} dB`;
    card.querySelector('[data-out="voiceSensitivity"]').textContent = `${Math.round(channel.voiceSensitivity * 100)}%`;
    card.querySelector('[data-role="sensitivity"]').hidden = channel.detection !== "voice";
    card.querySelector(".tb-meter-threshold").style.left = `${dbToPercent(channel.thresholdDb)}%`;
    card.querySelector('[data-role="status"]').textContent = statuses.get(channel.id) || "";
    card.querySelector('[data-action="remove"]').disabled = settings.channels.length <= 1;
    return card;
  }));
  byId("tbAddChannel").disabled = settings.channels.length >= 8;
  renderMeters();
}

const timeFormat = new Intl.DateTimeFormat("es", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
function renderTranscript() {
  const list = byId("tbLines");
  const lines = shownLines();
  if (!lines.length) {
    const empty = document.createElement("li");
    empty.className = "tb-empty";
    empty.textContent = "Todavía no hay mensajes. Inicia el monitoreo y habla por un canal de talkback.";
    list.replaceChildren(empty);
    return;
  }
  list.replaceChildren(...lines.map(line => {
    const item = document.createElement("li");
    item.style.setProperty("--line-color", line.color);
    const time = document.createElement("time");
    time.dateTime = line.at;
    time.textContent = timeFormat.format(new Date(line.at));
    const who = document.createElement("span");
    who.className = "tb-who";
    who.textContent = line.name;
    const text = document.createElement("p");
    text.textContent = line.text;
    item.append(time, who, text);
    return item;
  }));
  list.scrollTop = list.scrollHeight;
  renderFloat();
}

function renderLive(text, channelId = null) {
  const live = byId("tbLive");
  live.hidden = !text;
  live.textContent = text;
  const speaker = channelById(channelId || currentSpeaker());
  live.style.setProperty("--line-color", speaker?.color || "#888888");
  renderFloat();
}

/* ---------- Eventos ---------- */

function bindChannelEvents() {
  const list = byId("tbChannelList");
  const graphFields = new Set(["deviceId", "channelIndex", "enabled", "transcribe"]);
  list.addEventListener("input", event => {
    const field = event.target.dataset.field;
    const card = event.target.closest(".tb-channel");
    const channel = card && channelById(card.dataset.id);
    if (!field || !channel) return;
    channel[field] = event.target.type === "checkbox" ? event.target.checked : event.target.type === "range" || event.target.type === "number" || field === "channelIndex" ? Number(event.target.value) : event.target.value;
    if (field === "thresholdDb") {
      card.querySelector('[data-out="thresholdDb"]').textContent = `${channel.thresholdDb} dB`;
      card.querySelector(".tb-meter-threshold").style.left = `${dbToPercent(channel.thresholdDb)}%`;
    }
    if (field === "voiceSensitivity") card.querySelector('[data-out="voiceSensitivity"]').textContent = `${Math.round(channel.voiceSensitivity * 100)}%`;
    if (field === "color") { card.style.setProperty("--channel-color", channel.color); lastAlertKey = ""; }
    if (field === "name") lastAlertKey = "";
    saveSettings();
  });
  list.addEventListener("change", event => {
    const field = event.target.dataset.field;
    if (field === "detection") {
      if (event.target.value === "voice" && audio) ensureVad();
      renderChannels();
      return;
    }
    if (!graphFields.has(field)) return;
    renderChannels();
    scheduleRestart();
  });
  list.addEventListener("click", event => {
    const action = event.target.dataset.action;
    const card = event.target.closest(".tb-channel");
    const channel = card && channelById(card.dataset.id);
    if (!action || !channel) return;
    if (action === "remove" && settings.channels.length > 1 && confirm(`¿Eliminar ${channel.name}?`)) {
      settings.channels = settings.channels.filter(item => item.id !== channel.id);
      saveSettings(); renderChannels(); scheduleRestart();
    }
    if (action === "calibrate") calibrate(channel);
    if (action === "test") testAlert(channel);
  });
}

function exportTranscript() {
  const text = shownLines().map(line => `[${timeFormat.format(new Date(line.at))}] ${line.name}: ${line.text}`).join("\n");
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
  link.download = viewing ? `talkback-${viewing.id}.txt` : `talkback-${new Date().toISOString().slice(0, 10)}.txt`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}

/* ---------- Guardar y sesiones guardadas ---------- */

let viewing = null; // sesión guardada abierta en solo lectura
const shownLines = () => viewing ? viewing.lines : transcript;

async function requestJson(url, options = {}) {
  const response = await fetch(url, { cache: "no-store", ...options, headers: { "Content-Type": "application/json", ...(options.headers || {}) } });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error || `HTTP ${response.status}`);
  return body;
}

function setSaveState(message, kind = "") {
  const state = byId("tbSaveState");
  state.className = `tb-save-state${kind ? ` is-${kind}` : ""}`;
  state.textContent = message;
}

async function saveSession() {
  if (!transcript.length) { setSaveState("No hay transcripción para guardar.", "error"); return; }
  const fallback = `Servicio ${new Intl.DateTimeFormat("es", { dateStyle: "medium" }).format(new Date())}`;
  const name = prompt("Nombre de esta sesión", fallback);
  if (name === null) return;
  clearTimeout(saveTimer);
  settings = normalizeSettings(settings);
  setSaveState("Guardando…");
  try {
    const [{ session }] = await Promise.all([
      requestJson("/api/tb/sessions", { method: "POST", body: JSON.stringify({ name: name.trim() || fallback, lines: transcript }) }),
      requestJson("/api/tb/settings", { method: "POST", body: JSON.stringify(settings) })
    ]);
    setSaveState(`Guardado: ${session.name}`, "ok");
    if (confirm(`«${session.name}» quedó guardada (${session.lines} mensajes).\n\n¿Limpiar la pantalla para empezar de nuevo?`)) {
      transcript = [];
      safeStorage.set(TRANSCRIPT_KEY, transcript);
      renderTranscript();
    }
  } catch (error) {
    setSaveState(`No se pudo guardar: ${error.message}`, "error");
  }
}

const sessionDate = new Intl.DateTimeFormat("es", { dateStyle: "medium", timeStyle: "short" });

async function openSessions() {
  const dialog = byId("tbSessionsDialog");
  const list = byId("tbSessionList");
  const message = text => { const item = document.createElement("li"); item.className = "tb-empty"; item.textContent = text; return item; };
  list.replaceChildren(message("Cargando…"));
  if (!dialog.open) dialog.showModal();
  try {
    const { sessions } = await requestJson("/api/tb/sessions");
    if (!sessions.length) { list.replaceChildren(message("Todavía no hay sesiones guardadas. Usa «Guardar» al terminar un servicio.")); return; }
    list.replaceChildren(...sessions.map(session => {
      const item = document.createElement("li");
      const info = document.createElement("div");
      info.className = "tb-session-info";
      const title = document.createElement("strong");
      title.textContent = session.name;
      const detail = document.createElement("small");
      detail.textContent = `${session.savedAt ? sessionDate.format(new Date(session.savedAt)) : ""} · ${session.lines} mensajes`;
      info.append(title, detail);
      const open = document.createElement("button");
      open.textContent = "Abrir";
      open.addEventListener("click", () => viewSession(session.id));
      const remove = document.createElement("button");
      remove.textContent = "Borrar";
      remove.addEventListener("click", () => deleteSession(session));
      item.append(info, open, remove);
      return item;
    }));
  } catch (error) {
    list.replaceChildren(message(`No se pudieron cargar las sesiones: ${error.message}`));
  }
}

async function viewSession(id) {
  try {
    const { session } = await requestJson(`/api/tb/sessions/${encodeURIComponent(id)}`);
    viewing = { ...session, lines: Array.isArray(session.lines) ? session.lines : [] };
    byId("tbSessionsDialog").close();
    renderViewing();
    renderTranscript();
  } catch (error) {
    setSaveState(`No se pudo abrir: ${error.message}`, "error");
  }
}

async function deleteSession(session) {
  if (!confirm(`¿Borrar la sesión «${session.name}»? No se puede deshacer.`)) return;
  try {
    await requestJson(`/api/tb/sessions/${encodeURIComponent(session.id)}`, { method: "DELETE" });
    if (viewing?.id === session.id) backToLive();
    await openSessions();
  } catch (error) {
    setSaveState(`No se pudo borrar: ${error.message}`, "error");
  }
}

function renderViewing() {
  byId("tbViewing").hidden = !viewing;
  byId("tbViewingName").textContent = viewing?.name || "";
  byId("tbLive").classList.toggle("is-muted", Boolean(viewing));
}

function backToLive() {
  viewing = null;
  renderViewing();
  renderTranscript();
}

function setAlertMode(on) {
  document.body.classList.toggle("is-alert-mode", on);
  if (on && document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(() => {});
  if (!on && document.fullscreenElement) document.exitFullscreen().catch(() => {});
}

async function init() {
  if (window.bmmsCentral?.isCentral) document.querySelector('.tb-top a[href="/"]')?.remove(); // dentro de Central no hay "Volver a BMMS"
  settings = await loadSettings();
  transcript = (safeStorage.get(TRANSCRIPT_KEY) || []).filter(line => line && typeof line.text === "string").slice(-MAX_LINES);
  applyAlertStyle();
  await refreshDevices();
  renderTranscript();
  bindChannelEvents();

  byId("tbStart").addEventListener("click", () => audio ? stopAudio() : startAudio());
  byId("tbAddChannel").addEventListener("click", () => {
    if (settings.channels.length >= 8) return;
    const channel = defaultChannel(settings.channels.length);
    const used = new Set(settings.channels.map(item => item.color));
    channel.color = TB_COLORS.find(color => !used.has(color)) || channel.color;
    channel.channelIndex = Math.min(settings.channels.length, (deviceChannelCounts.get("default") || 2) - 1);
    settings.channels.push(channel);
    saveSettings(); renderChannels(); scheduleRestart();
  });
  byId("tbThickness").addEventListener("input", event => { settings.alert.thickness = Number(event.target.value); saveSettings(); applyAlertStyle(); });
  byId("tbOpacity").addEventListener("input", event => { settings.alert.opacity = Number(event.target.value); saveSettings(); applyAlertStyle(); });
  byId("tbPulse").addEventListener("change", event => { settings.alert.pulse = event.target.checked; saveSettings(); applyAlertStyle(); });
  byId("tbFlash").addEventListener("change", event => { settings.alert.flash = event.target.checked; saveSettings(); applyAlertStyle(); });
  byId("tbTranscribe").addEventListener("change", event => {
    settings.transcription.enabled = event.target.checked; saveSettings();
    if (event.target.checked && audio) startRecognition(); else stopRecognition();
  });
  const restartTranscription = () => {
    if (!audio || !settings.transcription.enabled) return;
    stopRecognition();
    startRecognition();
  };
  byId("tbLanguage").addEventListener("change", event => {
    settings.transcription.language = event.target.value; saveSettings();
    restartTranscription();
  });
  byId("tbEngine").addEventListener("change", event => {
    settings.transcription.engine = event.target.value; saveSettings(); applyAlertStyle();
    if (settings.transcription.engine !== "local") stopWhisper();
    transcriptHint(settings.transcription.engine === "local" ? "Transcripción sin internet: se activa al iniciar el monitoreo." : "Transcripción del navegador: requiere internet.");
    restartTranscription();
  });
  byId("tbModel").addEventListener("change", event => {
    settings.transcription.model = event.target.value; saveSettings();
    restartTranscription();
  });
  byId("tbFontUp").addEventListener("click", () => { settings.transcription.fontSize = Math.min(72, settings.transcription.fontSize + 4); saveSettings(); applyAlertStyle(); });
  byId("tbFontDown").addEventListener("click", () => { settings.transcription.fontSize = Math.max(14, settings.transcription.fontSize - 4); saveSettings(); applyAlertStyle(); });
  byId("tbExport").addEventListener("click", exportTranscript);
  byId("tbClear").addEventListener("click", () => { if (transcript.length && confirm("¿Borrar la transcripción?")) { transcript = []; safeStorage.set(TRANSCRIPT_KEY, transcript); renderTranscript(); } });
  byId("tbFloat").addEventListener("click", openFloat);
  byId("tbSave").addEventListener("click", saveSession);
  // Dentro de BMMS: pantalla completa y volver a segundo plano sin dejar de escuchar.
  if (window.bmmsCentral?.toggleFullscreen) {
    byId("tbFullscreen").hidden = false;
    byId("tbBackground").hidden = false;
    byId("tbFullscreen").addEventListener("click", () => window.bmmsCentral.toggleFullscreen());
    byId("tbBackground").addEventListener("click", () => window.bmmsCentral.toBackground());
  }
  byId("tbShowText").addEventListener("change", event => { settings.alert.showText = event.target.checked; saveSettings(); applyAlertStyle(); });
  byId("tbSmall").addEventListener("change", event => { settings.alert.small = event.target.checked; saveSettings(); applyAlertStyle(); });
  byId("tbBand").addEventListener("change", event => { settings.alert.band = event.target.value; saveSettings(); applyAlertStyle(); });
  byId("tbKeywords").addEventListener("input", event => { settings.keywords = event.target.value.split("\n"); saveSettings(); });
  byId("tbKeywords").addEventListener("change", () => applyAlertStyle());
  // Órdenes desde el icono de la bandeja / barra de menú de BMMS Central.
  window.bmmsCentral?.onCommand?.(name => {
    if (name === "start" && !audio) startAudio();
    if (name === "stop" && audio) stopAudio();
    if (name === "test") { const channel = settings.channels.find(item => item.enabled) || settings.channels[0]; if (channel) testAlert(channel); }
  });
  byId("tbSessions").addEventListener("click", openSessions);
  byId("tbSessionsClose").addEventListener("click", () => byId("tbSessionsDialog").close());
  byId("tbViewingExport").addEventListener("click", exportTranscript);
  byId("tbViewingBack").addEventListener("click", backToLive);
  byId("tbEdge").addEventListener("change", event => { settings.alert.edge = event.target.value; saveSettings(); applyAlertStyle(); });
  document.addEventListener("keydown", event => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "s") { event.preventDefault(); saveSession(); }
  });
  byId("tbAlertMode").addEventListener("click", () => setAlertMode(true));
  byId("tbExitAlertMode").addEventListener("click", () => setAlertMode(false));
  document.addEventListener("keydown", event => { if (event.key === "Escape" && document.body.classList.contains("is-alert-mode")) setAlertMode(false); });
  document.addEventListener("fullscreenchange", () => { if (!document.fullscreenElement) document.body.classList.remove("is-alert-mode"); });
  navigator.mediaDevices?.addEventListener?.("devicechange", onDeviceChange);
  onDeviceChange();
  window.bmmsCentral?.status?.({ running: false });
  // Abierta en segundo plano desde BMMS Central: empieza a escuchar sola.
  if (window.bmmsCentral?.autoStart) startAudio();
}

init();
