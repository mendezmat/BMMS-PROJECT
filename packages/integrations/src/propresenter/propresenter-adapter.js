import { defaultProPresenterConfig } from "./default-config.js";
import { ProPresenterTcpTransport } from "./tcp-transport.js";
import { ReconnectPolicy } from "./reconnect-policy.js";

const STATES = new Set([
  "disabled",
  "disconnected",
  "connecting",
  "connected",
  "reconnecting",
  "error"
]);

export class ProPresenterAdapter {
  #events;
  #logger;
  #config;
  #state = "disabled";
  #lastError = null;
  #lastConnectedAt = null;
  #lastMessageAt = null;
  #transport = null;
  #transportFactory;
  #reconnectPolicy;
  #reconnectTimer = null;
  #manualDisconnect = false;

  constructor({
    events,
    logger,
    config = {},
    transportFactory = options => new ProPresenterTcpTransport(options)
  }) {
    if (!events) throw new Error("ProPresenterAdapter requires an EventBus.");
    if (!logger) throw new Error("ProPresenterAdapter requires a Logger.");

    this.#events = events;
    this.#logger = logger;
    this.#transportFactory = transportFactory;
    this.#config = this.#normalizeConfig(config);
    this.#reconnectPolicy = new ReconnectPolicy(this.#config.reconnect);
    this.#state = this.#config.enabled ? "disconnected" : "disabled";
  }

  getConfig() {
    return structuredClone(this.#config);
  }

  getStatus() {
    return Object.freeze({
      state: this.#state,
      connected: this.#state === "connected",
      host: this.#config.host,
      port: this.#config.port,
      protocol: this.#config.protocol,
      lastError: this.#lastError,
      lastConnectedAt: this.#lastConnectedAt,
      lastMessageAt: this.#lastMessageAt,
      reconnectAttempt: this.#reconnectPolicy.attempt
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

    this.#reconnectPolicy = new ReconnectPolicy(this.#config.reconnect);
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

    const transport = this.#createTransport();
    const startedAt = Date.now();

    try {
      await transport.connect();
      const response = await transport.request({
        url: "v1/timer/system_time"
      });

      return {
        ok: true,
        status: "connected",
        host: this.#config.host,
        port: this.#config.port,
        protocol: "tcp",
        latencyMs: Date.now() - startedAt,
        systemTime: response.data ?? null
      };
    } finally {
      await transport.disconnect().catch(() => {});
    }
  }

  async connect() {
    if (!this.#config.enabled) {
      this.#setState("disabled");
      return this.getStatus();
    }

    if (this.#state === "connected" || this.#state === "connecting") {
      return this.getStatus();
    }

    this.#manualDisconnect = false;
    this.#clearReconnectTimer();
    this.#setState("connecting");

    const transport = this.#createTransport();
    this.#transport = transport;
    this.#wireTransport(transport);

    this.#logger.info("Connecting to ProPresenter", {
      host: this.#config.host,
      port: this.#config.port,
      protocol: "tcp"
    });

    try {
      await transport.connect();
      await transport.request({ url: "v1/timer/system_time" });

      this.#reconnectPolicy.reset();
      this.#lastConnectedAt = new Date().toISOString();
      this.#setState("connected");

      for (const url of this.#config.monitoring.subscriptions) {
        await transport.subscribe(url);
      }

      return this.getStatus();
    } catch (error) {
      this.#lastError = serializeError(error);
      this.#setState("error", this.#lastError);
      await transport.disconnect().catch(() => {});
      this.#scheduleReconnect();
      return this.getStatus();
    }
  }

  async disconnect() {
    this.#manualDisconnect = true;
    this.#clearReconnectTimer();

    const transport = this.#transport;
    this.#transport = null;
    if (transport) await transport.disconnect().catch(() => {});

    this.#setState(this.#config.enabled ? "disconnected" : "disabled");
    return this.getStatus();
  }

  async request(request) {
    if (!this.#transport || this.#state !== "connected") {
      throw new Error("ProPresenter is not connected.");
    }
    return this.#transport.request(request);
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

  #createTransport() {
    if (this.#config.protocol !== "tcp" && this.#config.protocol !== "auto") {
      throw new Error(`Unsupported ProPresenter protocol: ${this.#config.protocol}`);
    }

    return this.#transportFactory({
      host: this.#config.host,
      port: this.#config.port,
      connectTimeoutMs: this.#config.connectTimeoutMs,
      requestTimeoutMs: this.#config.requestTimeoutMs
    });
  }

  #wireTransport(transport) {
    transport.on("message", message => {
      this.#lastMessageAt = new Date().toISOString();
      this.#events.publish(
        "propresenter.raw.message",
        message,
        { source: "integration.propresenter" }
      );

      this.#routeMessage(message);
    });

    transport.on("protocol-error", payload => {
      this.#events.publish(
        "propresenter.transport.error",
        {
          kind: "protocol",
          message: payload.error?.message || "Malformed ProPresenter response.",
          line: payload.line
        },
        { source: "integration.propresenter" }
      );
    });

    transport.on("error", error => {
      this.#logger.error("ProPresenter transport error", {
        error: error.message
      });
    });

    transport.on("disconnected", () => {
      if (transport !== this.#transport) return;
      this.#transport = null;

      if (!this.#manualDisconnect) {
        this.#setState("disconnected");
        this.#scheduleReconnect();
      }
    });
  }

  #routeMessage(message) {
    const url = String(message?.url || "");
    const payload = {
      url,
      data: message?.data,
      receivedAt: this.#lastMessageAt
    };

    if (/slide/i.test(url)) this.publishSlideChanged(payload);
    if (/text|presentation\/active|presentation\/slide/i.test(url)) {
      this.publishTextChanged(payload);
    }
    if (/media/i.test(url)) this.publishMediaChanged(payload);
  }

  #scheduleReconnect() {
    if (
      this.#manualDisconnect ||
      !this.#config.enabled ||
      !this.#config.reconnect.enabled ||
      this.#reconnectTimer
    ) return;

    const delayMs = this.#reconnectPolicy.nextDelay();
    this.#setState("reconnecting");

    this.#events.publish(
      "integration.propresenter.reconnect.scheduled",
      {
        delayMs,
        attempt: this.#reconnectPolicy.attempt
      },
      { source: "integration.propresenter" }
    );

    this.#reconnectTimer = setTimeout(() => {
      this.#reconnectTimer = null;
      this.connect().catch(error => {
        this.#logger.error("ProPresenter reconnect failed", {
          error: error.message
        });
      });
    }, delayMs);
  }

  #clearReconnectTimer() {
    if (this.#reconnectTimer) clearTimeout(this.#reconnectTimer);
    this.#reconnectTimer = null;
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

    if (
      !Number.isInteger(Number(merged.port)) ||
      Number(merged.port) < 1 ||
      Number(merged.port) > 65535
    ) {
      throw new Error("ProPresenter port must be between 1 and 65535.");
    }

    const subscriptions = Array.isArray(merged.monitoring.subscriptions)
      ? merged.monitoring.subscriptions
          .map(value => String(value).trim().replace(/^\/+/, ""))
          .filter(Boolean)
      : [];

    return {
      ...merged,
      host: merged.host.trim(),
      port: Number(merged.port),
      protocol: String(merged.protocol || "tcp").toLowerCase(),
      connectTimeoutMs: normalizeTimeout(merged.connectTimeoutMs, 3000),
      requestTimeoutMs: normalizeTimeout(merged.requestTimeoutMs, 3000),
      monitoring: {
        ...merged.monitoring,
        subscriptions: [...new Set(subscriptions)]
      }
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
        ...this.getStatus(),
        error
      },
      { source: "integration.propresenter" }
    );
  }
}

function normalizeTimeout(value, fallback) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.max(100, Math.min(30000, Math.round(number)));
}

function serializeError(error) {
  return {
    name: error?.name || "Error",
    message: error?.message || String(error),
    code: error?.code || null,
    at: new Date().toISOString()
  };
}
