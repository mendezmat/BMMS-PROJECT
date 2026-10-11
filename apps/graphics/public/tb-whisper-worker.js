// BMMS TB Tool — transcripción sin internet con Whisper (transformers.js) en un Web Worker.
// El modelo se lee solo desde /vendor/models del propio servidor BMMS: nunca se conecta a internet.
import { pipeline, env } from "/vendor/transformers/transformers.min.js";

env.allowRemoteModels = false;
env.allowLocalModels = true;
env.localModelPath = "/vendor/models/";
env.useBrowserCache = false; // los archivos ya están en el equipo; no duplicarlos en el navegador
env.backends.onnx.wasm.wasmPaths = "/vendor/transformers/";
env.backends.onnx.wasm.numThreads = 1; // WASM multihilo se cuelga dentro de un Web Worker

let loaded = null; // { key, transcriber }

async function load(model, device) {
  const key = `${model}|${device}`;
  if (loaded?.key === key) return loaded.transcriber;
  loaded = null;
  const files = new Map();
  const transcriber = await pipeline("automatic-speech-recognition", `onnx-community/${model}`, {
    device,
    // small en WebGPU: codificador fp16. En CPU (WASM), codificador q8. El decodificador q4 sirve para ambos.
    // (base en WebGPU da texto vacío o basura con fp16 y q8, por eso la página lo manda siempre a CPU.)
    dtype: { encoder_model: device === "webgpu" && model === "whisper-small" ? "fp16" : "q8", decoder_model_merged: "q4" },
    progress_callback: progress => {
      if (progress.status !== "progress" || !progress.total) return;
      files.set(progress.file, { loaded: progress.loaded, total: progress.total });
      const totals = [...files.values()].reduce((sum, file) => ({ loaded: sum.loaded + file.loaded, total: sum.total + file.total }), { loaded: 0, total: 0 });
      self.postMessage({ type: "progress", percent: Math.round((totals.loaded / totals.total) * 100) });
    }
  });
  loaded = { key, transcriber };
  return transcriber;
}

async function handle(message) {
  if (message.type === "load") {
    try {
      const started = performance.now();
      const transcriber = await load(message.model, message.device);
      // Calentamiento: la primera inferencia compila los kernels; así la primera frase real no tarda.
      await transcriber(new Float32Array(16000), { language: message.language, task: "transcribe" });
      self.postMessage({ type: "ready", model: message.model, device: message.device, ms: Math.round(performance.now() - started) });
    } catch (error) {
      self.postMessage({ type: "error", message: error?.message || String(error) });
    }
    return;
  }
  if (message.type === "transcribe") {
    const started = performance.now();
    try {
      const transcriber = await load(message.model, message.device);
      const output = await transcriber(message.audio, { language: message.language, task: "transcribe" });
      self.postMessage({ type: "result", id: message.id, channelId: message.channelId, partial: Boolean(message.partial), text: output?.text || "", ms: Math.round(performance.now() - started) });
    } catch (error) {
      self.postMessage({ type: "result", id: message.id, channelId: message.channelId, partial: Boolean(message.partial), text: "", error: error?.message || String(error) });
    }
  }
}

// Una tarea a la vez. Las frases finales pasan delante de las parciales, y de las parciales
// solo se guarda la más reciente por canal (las viejas ya no sirven).
const jobs = [];
let working = false;
async function pump() {
  if (working) return;
  working = true;
  while (jobs.length) {
    const job = jobs.shift();
    await handle(job);
  }
  working = false;
}
self.onmessage = event => {
  const message = event.data;
  if (message.type === "transcribe" && message.partial) {
    const index = jobs.findIndex(job => job.partial && job.channelId === message.channelId);
    if (index >= 0) { self.postMessage({ type: "result", id: jobs[index].id, channelId: message.channelId, partial: true, text: "", skipped: true }); jobs.splice(index, 1); }
    jobs.push(message);
  } else if (message.type === "transcribe") {
    for (let index = jobs.length - 1; index >= 0; index--) {
      if (jobs[index].partial && jobs[index].channelId === message.channelId) {
        self.postMessage({ type: "result", id: jobs[index].id, channelId: message.channelId, partial: true, text: "", skipped: true });
        jobs.splice(index, 1);
      }
    }
    const firstPartial = jobs.findIndex(job => job.partial);
    jobs.splice(firstPartial < 0 ? jobs.length : firstPartial, 0, message);
  } else {
    jobs.unshift(message);
  }
  pump();
};
