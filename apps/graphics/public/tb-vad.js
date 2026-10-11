// BMMS TB Tool — detector de voz Silero VAD v5 (red neuronal, sin internet).
// Distingue voz humana del ruido aunque el ruido sea fuerte.

const ORT_SCRIPT = "/vendor/ort/ort.wasm.min.js";
const MODEL_URL = "/vendor/vad/silero_vad_v5.onnx";
const CONTEXT_SAMPLES = 64;

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (window.ort) { resolve(window.ort); return; }
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => window.ort ? resolve(window.ort) : reject(new Error("onnxruntime no disponible"));
    script.onerror = () => reject(new Error(`No se pudo cargar ${src}`));
    document.head.append(script);
  });
}

let enginePromise = null;
function engine() {
  if (!enginePromise) enginePromise = (async () => {
    const ort = await loadScript(ORT_SCRIPT);
    ort.env.wasm.wasmPaths = "/vendor/ort/";
    ort.env.wasm.numThreads = 1;
    ort.env.logLevel = "error";
    const session = await ort.InferenceSession.create(MODEL_URL, { executionProviders: ["wasm"] });
    const sr = new ort.Tensor("int64", BigInt64Array.from([16000n]), []);
    return { ort, session, sr };
  })().catch(error => { enginePromise = null; throw error; });
  return enginePromise;
}

export function preloadVad() {
  return engine();
}

// Cola única para todos los canales: el modelo procesa un bloque a la vez, en orden, sin perder bloques
// (perder bloques rompe la memoria del modelo y empeora mucho la detección con ruido).
const queue = [];
let running = false;
const MAX_PENDING_PER_CHANNEL = 3; // si el equipo no da abasto, se descartan los más viejos de ese canal

async function drain() {
  if (running) return;
  running = true;
  try {
    while (queue.length) {
      const job = queue.shift();
      try { job.resolve(await job.run()); } catch (error) { job.reject(error); }
    }
  } finally {
    running = false;
  }
}

export const vadStats = { processed: 0, dropped: 0, maxQueue: 0 };

// Un estado por canal: la red recuerda el contexto de los bloques anteriores.
export function createVoiceChannel() {
  let state = null;
  let context = new Float32Array(CONTEXT_SAMPLES);
  let probability = 0;
  const channelId = Symbol("canal");
  return {
    get probability() { return probability; },
    push(frame) {
      return new Promise((resolve, reject) => {
        const pending = queue.filter(job => job.channelId === channelId);
        if (pending.length >= MAX_PENDING_PER_CHANNEL) {
          const oldest = pending[0];
          queue.splice(queue.indexOf(oldest), 1);
          oldest.resolve(probability);
          vadStats.dropped++;
        }
        queue.push({
          channelId, resolve, reject,
          run: async () => {
            const { ort, session, sr } = await engine();
            if (!state) state = new ort.Tensor("float32", new Float32Array(2 * 128), [2, 1, 128]);
            const input = new Float32Array(CONTEXT_SAMPLES + frame.length);
            input.set(context, 0);
            input.set(frame, CONTEXT_SAMPLES);
            context = frame.slice(-CONTEXT_SAMPLES);
            const result = await session.run({ input: new ort.Tensor("float32", input, [1, input.length]), state, sr });
            state = result.stateN;
            probability = Number(result.output.data[0]) || 0;
            vadStats.processed++;
            return probability;
          }
        });
        vadStats.maxQueue = Math.max(vadStats.maxQueue, queue.length);
        drain();
      });
    },
    reset() { state = null; context = new Float32Array(CONTEXT_SAMPLES); probability = 0; }
  };
}
