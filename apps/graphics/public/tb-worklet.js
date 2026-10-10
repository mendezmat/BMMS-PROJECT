// BMMS TB Tool — captura en el hilo de audio.
// Por cada canal físico: nivel RMS cada ~32 ms y bloques de 512 muestras a 16 kHz
// para el detector de voz. Corre aunque la pestaña esté en segundo plano.

const TARGET_RATE = 16000;
const FRAME = 512;

class TbCapture extends AudioWorkletProcessor {
  constructor(options) {
    super();
    this.channels = new Set(options.processorOptions?.channels || []);
    this.ratio = sampleRate / TARGET_RATE;
    this.state = new Map();
    this.levelSamples = Math.round(sampleRate * 0.032);
    this.levelCount = 0;
    this.sums = [];
    this.port.onmessage = event => {
      if (event.data?.type === "channels") this.channels = new Set(event.data.channels);
    };
  }

  channelState(index) {
    if (!this.state.has(index)) this.state.set(index, { position: 0, previous: 0, frame: new Float32Array(FRAME), filled: 0 });
    return this.state.get(index);
  }

  process(inputs) {
    const input = inputs[0];
    if (!input?.length) return true;
    const blockLength = input[0].length;
    for (let channel = 0; channel < input.length; channel++) {
      const samples = input[channel];
      let sum = 0;
      for (let index = 0; index < samples.length; index++) sum += samples[index] * samples[index];
      this.sums[channel] = (this.sums[channel] || 0) + sum;
      if (this.channels.has(channel)) this.resample(channel, samples);
    }
    this.levelCount += blockLength;
    if (this.levelCount >= this.levelSamples) {
      const rms = Array.from({ length: input.length }, (_, channel) => Math.sqrt((this.sums[channel] || 0) / this.levelCount));
      this.port.postMessage({ type: "levels", rms });
      this.sums = [];
      this.levelCount = 0;
    }
    return true;
  }

  // Remuestreo lineal a 16 kHz: suficiente para un detector de voz.
  resample(channel, samples) {
    const state = this.channelState(channel);
    let position = state.position;
    while (position < samples.length) {
      const base = Math.floor(position);
      const fraction = position - base;
      const left = base === 0 ? state.previous : samples[base - 1];
      const right = samples[base];
      state.frame[state.filled++] = left + (right - left) * fraction;
      if (state.filled === FRAME) {
        const frame = state.frame;
        this.port.postMessage({ type: "frame", channel, frame }, [frame.buffer]);
        state.frame = new Float32Array(FRAME);
        state.filled = 0;
      }
      position += this.ratio;
    }
    state.position = position - samples.length;
    state.previous = samples[samples.length - 1];
  }
}

registerProcessor("bmms-tb-capture", TbCapture);
