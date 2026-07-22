import { randomUUID } from "node:crypto";

export class EventBus {
  #subscribers = new Map();

  subscribe(type, handler) {
    if (!this.#subscribers.has(type)) {
      this.#subscribers.set(type, new Set());
    }
    this.#subscribers.get(type).add(handler);

    return () => this.#subscribers.get(type)?.delete(handler);
  }

  publish(type, payload = {}, meta = {}) {
    const event = {
      id: randomUUID(),
      type,
      version: 1,
      timestamp: new Date().toISOString(),
      source: meta.source ?? "unknown",
      correlationId: meta.correlationId ?? randomUUID(),
      payload
    };

    const handlers = this.#subscribers.get(type) ?? [];
    for (const handler of handlers) {
      try {
        handler(event);
      } catch (error) {
        console.error(`[EventBus] Subscriber failed for ${type}`, error);
      }
    }

    return event;
  }
}
