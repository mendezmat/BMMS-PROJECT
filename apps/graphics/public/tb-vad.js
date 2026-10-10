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

// Un estado por canal: la red recuerda el contexto de los bloques anteriores.
export function createVoiceChannel() {
  let state = null;
  let context = new Float32Array(CONTEXT_SAMPLES);
  let busy = false;
  let probability = 0;
  return {
    get probability() { return probability; },
    async push(frame) {
      if (busy) return probability; // si el equipo va lento se descarta un bloque, nunca se acumula retraso
      busy = true;
      try {
        const { ort, session, sr } = await engine();
        if (!state) state = new ort.Tensor("float32", new Float32Array(2 * 128), [2, 1, 128]);
        const input = new Float32Array(CONTEXT_SAMPLES + frame.length);
        input.set(context, 0);
        input.set(frame, CONTEXT_SAMPLES);
        context = frame.slice(-CONTEXT_SAMPLES);
        const result = await session.run({ input: new ort.Tensor("float32", input, [1, input.length]), state, sr });
        state = result.stateN;
        probability = Number(result.output.data[0]) || 0;
      } finally {
        busy = false;
      }
      return probability;
    },
    reset() { state = null; context = new Float32Array(CONTEXT_SAMPLES); probability = 0; }
  };
}
