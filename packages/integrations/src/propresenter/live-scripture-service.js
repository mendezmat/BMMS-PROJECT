import { EventEmitter } from "node:events";
import {
  createStatusSlideSnapshot,
  normalizeStatusSlideResponse
} from "./status-slide-normalizer.js";

export class ProPresenterLiveScriptureService extends EventEmitter {
  #adapter;
  #events;
  #logger;
  #intervalMs;
  #timer = null;
  #running = false;
  #syncing = false;
  #lastVerseId = null;
  #lastSnapshot = null;
  #lastSuccessAt = null;
  #lastError = null;
  #version = null;
  #activePresentation = null;
  #slideIndex = null;
  #lastMetadataAt = 0;

  constructor({
    adapter,
    events,
    logger,
    intervalMs = 180
  }) {
    super();
    if (!adapter) throw new Error("LiveScriptureService requires a ProPresenter adapter.");
    if (!events) throw new Error("LiveScriptureService requires an EventBus.");
    if (!logger) throw new Error("LiveScriptureService requires a Logger.");

    this.#adapter = adapter;
    this.#events = events;
    this.#logger = logger;
    this.#intervalMs = clampInterval(intervalMs);
  }

  getStatus() {
    return Object.freeze({
      running: this.#running,
      syncing: this.#syncing,
      intervalMs: this.#intervalMs,
      lastVerseId: this.#lastVerseId,
      lastSuccessAt: this.#lastSuccessAt,
      lastError: this.#lastError,
      version: this.#version,
      snapshotAvailable: Boolean(this.#lastSnapshot)
    });
  }

  getSnapshot() {
    return structuredClone(this.#lastSnapshot);
  }

  setInterval(intervalMs) {
    this.#intervalMs = clampInterval(intervalMs);
    if (this.#running) {
      this.stop();
      this.start();
    }
  }

  start() {
    if (this.#running) return this.getStatus();
    this.#running = true;
    this.#schedule(0);
    this.#publishStatus();
    return this.getStatus();
  }

  stop() {
    this.#running = false;
    if (this.#timer) clearTimeout(this.#timer);
    this.#timer = null;
    this.#publishStatus();
    return this.getStatus();
  }

  async syncNow() {
    if (this.#syncing) return null;
    this.#syncing = true;
    this.#publishStatus();

    try {
      if (!this.#adapter.getStatus().connected) {
        await this.#adapter.connect();
      }

      if (!this.#adapter.getStatus().connected) {
        throw new Error("ProPresenter is not connected.");
      }

      if (!this.#version) {
        const versionResponse = await this.#adapter.request({ url: "version" });
        this.#version = versionResponse?.data ?? null;
      }

      // Keep the critical poll lightweight. ProPresenter can stall when three
      // JSON requests are issued every cycle, so metadata is refreshed at 1 Hz.
      const statusSlide = await this.#adapter.request({ url: "v1/status/slide" });
      const now = Date.now();

      if (
        !this.#activePresentation ||
        !this.#slideIndex ||
        now - this.#lastMetadataAt >= 1000
      ) {
        const [activePresentation, slideIndex] = await Promise.all([
          this.#adapter.request({ url: "v1/presentation/active" }),
          this.#adapter.request({ url: "v1/presentation/slide_index" })
        ]);
        this.#activePresentation = activePresentation;
        this.#slideIndex = slideIndex;
        this.#lastMetadataAt = now;
      }

      const receivedAt = new Date().toISOString();
      this.#lastSnapshot = createStatusSlideSnapshot({
        statusSlide,
        activePresentation: this.#activePresentation,
        slideIndex: this.#slideIndex,
        version: this.#version,
        receivedAt
      });

      const verse = normalizeStatusSlideResponse({
        statusSlide,
        activePresentation: this.#activePresentation,
        slideIndex: this.#slideIndex,
        receivedAt
      });

      this.#lastSuccessAt = receivedAt;
      this.#lastError = null;

      this.#events.publish(
        "propresenter.scripture.snapshot",
        this.#lastSnapshot,
        { source: "integration.propresenter.live-scripture" }
      );

      if (verse && verse.id !== this.#lastVerseId) {
        this.#lastVerseId = verse.id;
        this.#events.publish(
          "propresenter.scripture.changed",
          { verse, snapshot: this.#lastSnapshot },
          { source: "integration.propresenter.live-scripture" }
        );
        this.emit("verse", verse);
      }

      return verse;
    } catch (error) {
      this.#lastError = {
        name: error?.name || "Error",
        message: error?.message || String(error),
        code: error?.code || null,
        at: new Date().toISOString()
      };

      this.#events.publish(
        "propresenter.scripture.error",
        this.#lastError,
        { source: "integration.propresenter.live-scripture" }
      );

      this.#logger.error("Live Scripture synchronization failed", {
        error: this.#lastError.message
      });

      return null;
    } finally {
      this.#syncing = false;
      this.#publishStatus();
    }
  }

  #schedule(delayMs = this.#intervalMs) {
    if (!this.#running) return;

    this.#timer = setTimeout(async () => {
      this.#timer = null;
      await this.syncNow();
      this.#schedule(this.#intervalMs);
    }, delayMs);
  }

  #publishStatus() {
    this.#events.publish(
      "propresenter.scripture.status.changed",
      this.getStatus(),
      { source: "integration.propresenter.live-scripture" }
    );
  }
}

function clampInterval(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return 180;
  return Math.max(120, Math.min(5000, Math.round(number)));
}
