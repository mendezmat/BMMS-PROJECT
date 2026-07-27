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
  #reconnecting = false;
  #lastVerseId = null;
  #lastProcessedVerse = null;
  #lastSnapshot = null;
  #lastSuccessAt = null;
  #lastResponseAt = null;
  #lastError = null;
  #version = null;
  #activePresentation = null;
  #slideIndex = null;
  #lastMetadataAt = 0;
  #consecutiveErrors = 0;
  #lastErrorLogAt = 0;
  #metrics = {
    polls: 0,
    candidates: 0,
    processed: 0,
    duplicates: 0,
    blanks: 0,
    errors: 0,
    reconnects: 0,
    totalSyncMs: 0,
    lastSyncMs: null,
    lastEventAt: null,
    lastTimeoutAt: null,
    lastTransition: "none"
  };

  constructor({ adapter, events, logger, intervalMs = 350 }) {
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
    const adapterStatus = this.#adapter.getStatus();
    return Object.freeze({
      running: this.#running,
      syncing: this.#syncing,
      reconnecting: this.#reconnecting,
      connectionState: adapterStatus.state,
      connected: adapterStatus.connected,
      intervalMs: this.#intervalMs,
      lastVerseId: this.#lastVerseId,
      lastSuccessAt: this.#lastSuccessAt,
      lastResponseAt: this.#lastResponseAt,
      consecutiveErrors: this.#consecutiveErrors,
      lastError: this.#lastError,
      version: this.#version,
      snapshotAvailable: Boolean(this.#lastSnapshot),
      metrics: {
        ...this.#metrics,
        averageSyncMs: this.#metrics.polls
          ? Math.round(this.#metrics.totalSyncMs / this.#metrics.polls)
          : null
      }
    });
  }

  getSnapshot() { return structuredClone(this.#lastSnapshot); }

  setInterval(intervalMs) {
    this.#intervalMs = clampInterval(intervalMs);
    if (this.#running) { this.stop(); this.start(); }
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

  async restart() {
    const wasRunning = this.#running;
    this.stop();
    await this.#reconnect(true);
    if (wasRunning) this.start();
    return this.getStatus();
  }

  async syncNow() {
    if (this.#syncing || this.#reconnecting) return null;
    const syncStartedAt = performance.now();
    this.#syncing = true;
    this.#publishStatus();

    try {
      if (!this.#adapter.getStatus().connected) await this.#adapter.connect();
      if (!this.#adapter.getStatus().connected) throw new Error("ProPresenter is not connected.");

      if (!this.#version) {
        const versionResponse = await this.#adapter.request({ url: "version" });
        this.#version = versionResponse?.data ?? null;
      }

      const statusSlide = await this.#adapter.request({ url: "v1/status/slide" });
      this.#metrics.polls += 1;
      const now = Date.now();
      this.#lastResponseAt = new Date(now).toISOString();

      if (!this.#activePresentation || !this.#slideIndex || now - this.#lastMetadataAt >= 1500) {
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
      this.#consecutiveErrors = 0;

      this.#events.publish("propresenter.scripture.snapshot", this.#lastSnapshot, {
        source: "integration.propresenter.live-scripture"
      });

      if (!verse) {
        // A blank ProPresenter slide is a valid state, not an error. Reset the
        // deduplication key so returning to the same verse is processed again.
        if (this.#lastVerseId !== null) {
          this.#metrics.blanks += 1;
          this.#metrics.lastTransition = "cleared";
          this.#lastVerseId = null;
          this.#lastProcessedVerse = null;
          this.#events.publish("propresenter.scripture.cleared", {
            receivedAt,
            snapshot: this.#lastSnapshot
          }, { source: "integration.propresenter.live-scripture" });
        }
        return null;
      }

      this.#metrics.candidates += 1;
      if (verse.id === this.#lastVerseId) {
        this.#metrics.duplicates += 1;
      } else {
        const previousVerse = this.#lastProcessedVerse;
        const transition = classifyTransition(previousVerse, verse);
        this.#lastVerseId = verse.id;
        this.#lastProcessedVerse = verse;
        this.#metrics.processed += 1;
        this.#metrics.lastEventAt = receivedAt;
        this.#metrics.lastTransition = transition;
        this.#events.publish("propresenter.scripture.changed", {
          verse,
          snapshot: this.#lastSnapshot,
          transition
        }, { source: "integration.propresenter.live-scripture" });
        this.emit("verse", verse);
      }
      return verse;
    } catch (error) {
      await this.#handleError(error);
      return null;
    } finally {
      const elapsed = Math.max(0, Math.round(performance.now() - syncStartedAt));
      this.#metrics.lastSyncMs = elapsed;
      this.#metrics.totalSyncMs += elapsed;
      this.#syncing = false;
      this.#publishStatus();
    }
  }

  async #handleError(error) {
    this.#metrics.errors += 1;
    this.#consecutiveErrors += 1;
    const message = error?.message || String(error);
    const isTimeout = /timed out|timeout/i.test(message);
    if (isTimeout) this.#metrics.lastTimeoutAt = new Date().toISOString();
    this.#lastError = {
      name: error?.name || "Error",
      message,
      code: error?.code || null,
      at: new Date().toISOString()
    };
    this.#events.publish("propresenter.scripture.error", this.#lastError, {
      source: "integration.propresenter.live-scripture"
    });

    // Avoid flooding the terminal while still preserving useful diagnostics.
    const now = Date.now();
    if (now - this.#lastErrorLogAt >= 10000 || this.#consecutiveErrors === 1) {
      this.#lastErrorLogAt = now;
      this.#logger.error("Live Scripture synchronization failed", {
        error: message,
        consecutiveErrors: this.#consecutiveErrors
      });
    }

    if (this.#consecutiveErrors >= 3) await this.#reconnect(false);
  }

  async #reconnect(manual) {
    if (this.#reconnecting) return;
    this.#reconnecting = true;
    this.#publishStatus();
    try {
      await this.#adapter.disconnect().catch(() => {});
      await wait(manual ? 50 : Math.min(3000, 350 * this.#consecutiveErrors));
      const status = await this.#adapter.connect();
      if (status.connected) {
        this.#metrics.reconnects += 1;
        this.#consecutiveErrors = 0;
        this.#lastError = null;
        this.#version = null;
        this.#activePresentation = null;
        this.#slideIndex = null;
        this.#lastMetadataAt = 0;
      }
    } finally {
      this.#reconnecting = false;
      this.#publishStatus();
    }
  }

  #schedule(delayMs = this.#nextDelay()) {
    if (!this.#running) return;
    this.#timer = setTimeout(async () => {
      this.#timer = null;
      await this.syncNow();
      this.#schedule();
    }, delayMs);
  }

  #nextDelay() {
    if (!this.#consecutiveErrors) return this.#intervalMs;
    return Math.min(5000, this.#intervalMs * (2 ** Math.min(4, this.#consecutiveErrors)));
  }

  #publishStatus() {
    this.#events.publish("propresenter.scripture.status.changed", this.getStatus(), {
      source: "integration.propresenter.live-scripture"
    });
  }
}

function clampInterval(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return 350;
  return Math.max(250, Math.min(5000, Math.round(number)));
}

function wait(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

function classifyTransition(previous, next) {
  if (!previous) return "initial";
  if (previous.id === next.id) return "duplicate";
  const previousBook = normalizeToken(previous.book || referenceBook(previous.reference));
  const nextBook = normalizeToken(next.book || referenceBook(next.reference));
  const previousChapter = previous.chapter ?? referenceChapter(previous.reference);
  const nextChapter = next.chapter ?? referenceChapter(next.reference);
  if (previousBook && nextBook && previousBook !== nextBook) return "book-change";
  if (previousChapter != null && nextChapter != null && previousChapter !== nextChapter) return "chapter-change";
  if (previous.reference === next.reference) return "content-change";
  if (previousBook === nextBook && previousChapter === nextChapter) return "same-chapter";
  return "full-change";
}

function referenceBook(reference = "") {
  return String(reference).replace(/\s+\d+\s*:\s*\d+.*$/u, "").trim();
}
function referenceChapter(reference = "") {
  const match = String(reference).match(/\s(\d+)\s*:/u);
  return match ? Number(match[1]) : null;
}
function normalizeToken(value) { return String(value || "").trim().toLocaleLowerCase(); }
