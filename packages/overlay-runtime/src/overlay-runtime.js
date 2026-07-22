export class OverlayRuntime {
  #clients = new Set();
  #state;

  constructor(initialState) {
    this.#state = structuredClone(initialState);
  }

  getState() {
    return structuredClone(this.#state);
  }

  setState(nextState) {
    this.#state = structuredClone(nextState);
    this.broadcast();
  }

  attachClient(response) {
    this.#clients.add(response);
    response.write(`data: ${JSON.stringify(this.#state)}\n\n`);
    response.on("close", () => this.#clients.delete(response));
  }

  broadcast() {
    const message = `data: ${JSON.stringify(this.#state)}\n\n`;
    for (const client of this.#clients) {
      client.write(message);
    }
  }
}
