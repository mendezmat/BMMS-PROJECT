export class ReconnectPolicy {
  #initialDelayMs;
  #maxDelayMs;
  #multiplier;
  #attempt = 0;

  constructor({
    initialDelayMs = 1000,
    maxDelayMs = 30000,
    multiplier = 1.8
  } = {}) {
    this.#initialDelayMs = clamp(initialDelayMs, 100, 60000);
    this.#maxDelayMs = clamp(maxDelayMs, this.#initialDelayMs, 300000);
    this.#multiplier = Math.max(1, Number(multiplier) || 1.8);
  }

  nextDelay() {
    const delay = Math.min(
      this.#maxDelayMs,
      Math.round(this.#initialDelayMs * (this.#multiplier ** this.#attempt))
    );
    this.#attempt += 1;
    return delay;
  }

  reset() {
    this.#attempt = 0;
  }

  get attempt() {
    return this.#attempt;
  }
}

function clamp(value, minimum, maximum) {
  const number = Number(value);
  if (!Number.isFinite(number)) return minimum;
  return Math.min(maximum, Math.max(minimum, Math.round(number)));
}
