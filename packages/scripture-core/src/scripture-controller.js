import { createVerse } from "./verse-model.js";

export class ScriptureController {
  #events;
  #logger;
  #currentVerse = null;
  #programVisible = false;
  #autoTake = false;
  #autoTakeDelayMs = 400;
  #pendingTake = null;

  constructor({ events, logger, autoTake = false, autoTakeDelayMs = 400 }) {
    if (!events) throw new Error("ScriptureController requires an EventBus.");
    if (!logger) throw new Error("ScriptureController requires a Logger.");

    this.#events = events;
    this.#logger = logger;
    this.#autoTake = Boolean(autoTake);
    this.#autoTakeDelayMs = normalizeDelay(autoTakeDelayMs);
  }

  getState() {
    return Object.freeze({
      currentVerse: this.#currentVerse,
      programVisible: this.#programVisible,
      autoTake: this.#autoTake,
      autoTakeDelayMs: this.#autoTakeDelayMs
    });
  }

  setAutoTake(enabled) {
    this.#autoTake = Boolean(enabled);
    this.#events.publish(
      "scripture.auto-take.changed",
      { enabled: this.#autoTake, delayMs: this.#autoTakeDelayMs },
      { source: "module.scripture" }
    );
  }

  setAutoTakeDelay(delayMs) {
    this.#autoTakeDelayMs = normalizeDelay(delayMs);
  }

  receiveVerse(input) {
    const verse = createVerse(input);
    const changed = this.#currentVerse?.id !== verse.id;
    this.#currentVerse = verse;

    this.#events.publish(
      "scripture.verse.changed",
      { verse, changed },
      { source: "module.scripture" }
    );

    if (changed && this.#autoTake) {
      this.#scheduleTake();
    }

    return verse;
  }

  takeIn() {
    if (!this.#currentVerse) {
      throw new Error("Cannot take Scripture in without a current verse.");
    }

    this.#programVisible = true;
    this.#events.publish(
      "scripture.program.changed",
      { visible: true, verse: this.#currentVerse },
      { source: "module.scripture" }
    );
  }

  takeOut() {
    this.#programVisible = false;
    this.#events.publish(
      "scripture.program.changed",
      { visible: false, verse: this.#currentVerse },
      { source: "module.scripture" }
    );
  }

  dispose() {
    if (this.#pendingTake) clearTimeout(this.#pendingTake);
    this.#pendingTake = null;
  }

  #scheduleTake() {
    if (this.#pendingTake) clearTimeout(this.#pendingTake);

    this.#pendingTake = setTimeout(() => {
      this.#pendingTake = null;
      try {
        this.takeIn();
      } catch (error) {
        this.#logger.error("Scripture auto take failed", { error: error.message });
      }
    }, this.#autoTakeDelayMs);
  }
}

function normalizeDelay(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return 400;
  return Math.max(0, Math.min(5000, Math.round(number)));
}
