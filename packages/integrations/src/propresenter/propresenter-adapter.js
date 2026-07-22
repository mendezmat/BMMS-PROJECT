import { defaultProPresenterConfig } from "./default-config.js";

const STATES = new Set([
  "disabled",
  "disconnected",
  "connecting",
  "connected",
  "error"
]);

export class ProPresenterAdapter {
  #events;
  #logger;
  #config;
  #state = "disabled";
  #lastError = null;

  constructor({ events, logger, config = {} }) {
    if (!events) throw new Error("ProPresenterAdapter requires an EventBus.");
    if (!logger) throw new Error("ProPresenterAdapter requires a Logger.");

    this.#events = events;
    this.#logger = logger;
    this.#config = this.#normalizeConfig(config);
    this.#state = this.#config.enabled ? "disconnected" : "disabled";
  }

  getConfig() {
    return structuredClone(this.#config);
  }

  getStatus() {
    return Object.freeze({
      state: this.#state,
      connected: this.#state === "connected",
      lastError: this.#lastError
    });
  }

  updateConfig(nextConfig) {
    this.#config = this.#normalizeConfig({
      ...this.#config,
      ...nextConfig,
      reconnect: {
        ...this.#config.reconnect,
        ...nextConfig?.reconnect
      },
      monitoring: {
        ...this.#config.monitoring,
        ...nextConfig?.monitoring
      }
    });

    this.#setState(this.#config.enabled ? "disconnected" : "disabled");
    this.#events.publish(
      "integration.propresenter.configuration.updated",
      this.getConfig(),
      { source: "integration.propresenter" }
    );

    return this.getConfig();
  }

  async testConnection() {
    if (!this.#config.enabled) {
      throw new Error("ProPresenter integration is disabled.");
    }

    this.#setState("connecting");

    // Transport implementation is intentionally deferred until the exact
    // ProPresenter API/version contract is selected and validated.
    this.#setState("disconnected");

    return {
      ok: false,
      status: "transport-not-implemented",
      host: this.#config.host,
      port: this.#config.port
    };
  }

  async connect() {
    if (!this.#config.enabled) {
      this.#setState("disabled");
      return this.getStatus();
    }

    this.#setState("connecting");
    this.#logger.info("ProPresenter connection requested", {
      host: this.#config.host,
      port: this.#config.port,
      protocol: this.#config.protocol
    });

    this.#setState("disconnected");
    return this.getStatus();
  }

  async disconnect() {
    this.#setState(this.#config.enabled ? "disconnected" : "disabled");
    return this.getStatus();
  }

  publishSlideChanged(payload) {
    this.#events.publish(
      "propresenter.slide.changed",
      payload,
      { source: "integration.propresenter" }
    );
  }

  publishTextChanged(payload) {
    this.#events.publish(
      "propresenter.text.changed",
      payload,
      { source: "integration.propresenter" }
    );
  }

  publishMediaChanged(payload) {
    this.#events.publish(
      "propresenter.media.changed",
      payload,
      { source: "integration.propresenter" }
    );
  }

  #normalizeConfig(config) {
    const merged = {
      ...defaultProPresenterConfig,
      ...config,
      reconnect: {
        ...defaultProPresenterConfig.reconnect,
        ...config.reconnect
      },
      monitoring: {
        ...defaultProPresenterConfig.monitoring,
        ...config.monitoring
      }
    };

    if (typeof merged.host !== "string" || !merged.host.trim()) {
      throw new Error("ProPresenter host is required.");
    }

    if (!Number.isInteger(Number(merged.port)) || Number(merged.port) < 1 || Number(merged.port) > 65535) {
      throw new Error("ProPresenter port must be between 1 and 65535.");
    }

    return {
      ...merged,
      host: merged.host.trim(),
      port: Number(merged.port)
    };
  }

  #setState(nextState, error = null) {
    if (!STATES.has(nextState)) {
      throw new Error(`Invalid ProPresenter state: ${nextState}`);
    }

    const previousState = this.#state;
    this.#state = nextState;
    this.#lastError = error;

    this.#events.publish(
      "integration.propresenter.status.changed",
      {
        previousState,
        state: nextState,
        connected: nextState === "connected",
        error
      },
      { source: "integration.propresenter" }
    );
  }
}
