export class ServiceContainer {
  #services = new Map();

  register(name, service) {
    if (!name || !service) {
      throw new Error("Service name and instance are required.");
    }
    if (this.#services.has(name)) {
      throw new Error(`Service already registered: ${name}`);
    }
    this.#services.set(name, service);
    return service;
  }

  get(name) {
    if (!this.#services.has(name)) {
      throw new Error(`Service not registered: ${name}`);
    }
    return this.#services.get(name);
  }

  has(name) {
    return this.#services.has(name);
  }
}
