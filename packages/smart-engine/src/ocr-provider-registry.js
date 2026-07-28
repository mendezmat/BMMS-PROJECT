export class NullOcrProvider {
  constructor() { this.id = 'none'; }
  async analyze() { return { provider: this.id, blocks: [], confidence: 0, available: false }; }
}

export class OcrProviderRegistry {
  #providers = new Map();
  #activeId = 'none';

  constructor(providers = [new NullOcrProvider()]) {
    for (const provider of providers) this.register(provider);
  }

  register(provider) {
    if (!provider?.id || typeof provider.analyze !== 'function') {
      throw new TypeError('OCR provider must expose id and analyze().');
    }
    this.#providers.set(provider.id, provider);
    if (this.#providers.size === 1) this.#activeId = provider.id;
    return this;
  }

  use(id) {
    if (!this.#providers.has(id)) throw new Error(`Unknown OCR provider: ${id}`);
    this.#activeId = id;
    return this;
  }

  list() { return [...this.#providers.keys()]; }
  get active() { return this.#providers.get(this.#activeId); }
  analyze(input, options) { return this.active.analyze(input, options); }
}
