export class DocumentHistory {
  #past = [];
  #future = [];
  #present;
  #limit;

  constructor(initialDocument, limit = 50) {
    this.#present = structuredClone(initialDocument);
    this.#limit = limit;
  }

  get present() {
    return structuredClone(this.#present);
  }

  commit(nextDocument) {
    this.#past.push(structuredClone(this.#present));
    if (this.#past.length > this.#limit) this.#past.shift();
    this.#present = structuredClone(nextDocument);
    this.#future = [];
    return this.present;
  }

  undo() {
    if (!this.#past.length) return this.present;
    this.#future.push(structuredClone(this.#present));
    this.#present = this.#past.pop();
    return this.present;
  }

  redo() {
    if (!this.#future.length) return this.present;
    this.#past.push(structuredClone(this.#present));
    this.#present = this.#future.pop();
    return this.present;
  }

  get canUndo() {
    return this.#past.length > 0;
  }

  get canRedo() {
    return this.#future.length > 0;
  }
}
