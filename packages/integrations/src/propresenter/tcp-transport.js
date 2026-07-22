import net from "node:net";
import { EventEmitter } from "node:events";

export class ProPresenterTcpTransport extends EventEmitter {
  #socket = null;
  #buffer = "";
  #connected = false;
  #host;
  #port;
  #connectTimeoutMs;
  #requestTimeoutMs;
  #pending = new Map();

  constructor({
    host,
    port,
    connectTimeoutMs = 3000,
    requestTimeoutMs = 3000
  }) {
    super();
    this.#host = host;
    this.#port = Number(port);
    this.#connectTimeoutMs = connectTimeoutMs;
    this.#requestTimeoutMs = requestTimeoutMs;
  }

  get connected() {
    return this.#connected;
  }

  async connect() {
    if (this.#connected) return;

    await new Promise((resolve, reject) => {
      const socket = net.createConnection({
        host: this.#host,
        port: this.#port
      });

      this.#socket = socket;
      socket.setEncoding("utf8");
      socket.setNoDelay(true);

      const timeout = setTimeout(() => {
        socket.destroy(new Error("ProPresenter TCP connection timed out."));
      }, this.#connectTimeoutMs);

      const cleanupInitial = () => {
        clearTimeout(timeout);
        socket.off("connect", onConnect);
        socket.off("error", onInitialError);
      };

      const onConnect = () => {
        cleanupInitial();
        this.#connected = true;
        this.#wireSocket(socket);
        this.emit("connected");
        resolve();
      };

      const onInitialError = error => {
        cleanupInitial();
        reject(error);
      };

      socket.once("connect", onConnect);
      socket.once("error", onInitialError);
    });
  }

  async disconnect() {
    const socket = this.#socket;
    this.#socket = null;
    this.#connected = false;
    this.#rejectPending(new Error("ProPresenter TCP transport disconnected."));

    if (!socket || socket.destroyed) return;

    await new Promise(resolve => {
      socket.once("close", resolve);
      socket.end();
      setTimeout(() => {
        if (!socket.destroyed) socket.destroy();
      }, 500).unref();
    });
  }

  async request({ url, method, body, chunked = false }) {
    if (!this.#connected || !this.#socket) {
      throw new Error("ProPresenter TCP transport is not connected.");
    }

    const normalizedUrl = normalizeUrl(url);
    const packet = { url: normalizedUrl };

    if (method) packet.method = String(method).toUpperCase();
    if (body !== undefined) packet.body = body;
    if (chunked) packet.chunked = true;

    if (chunked) {
      this.#socket.write(`${JSON.stringify(packet)}\r\n`);
      return { url: normalizedUrl, subscribed: true };
    }

    const pending = this.#createPending(normalizedUrl);
    this.#socket.write(`${JSON.stringify(packet)}\r\n`);
    return pending;
  }

  subscribe(url) {
    return this.request({ url, chunked: true });
  }

  #wireSocket(socket) {
    socket.on("data", chunk => this.#consume(chunk));

    socket.on("error", error => {
      this.emit("error", error);
    });

    socket.on("close", hadError => {
      const wasConnected = this.#connected;
      this.#connected = false;
      this.#socket = null;
      this.#rejectPending(new Error("ProPresenter TCP connection closed."));
      if (wasConnected) this.emit("disconnected", { hadError });
    });
  }

  #consume(chunk) {
    this.#buffer += chunk;

    while (true) {
      const newlineIndex = this.#buffer.search(/\r?\n/);
      if (newlineIndex < 0) break;

      const line = this.#buffer.slice(0, newlineIndex).trim();
      const newlineLength = this.#buffer[newlineIndex] === "\r" ? 2 : 1;
      this.#buffer = this.#buffer.slice(newlineIndex + newlineLength);

      if (!line) continue;

      try {
        const message = JSON.parse(line);
        this.#resolvePending(message);
        this.emit("message", message);
      } catch (error) {
        this.emit("protocol-error", {
          error,
          line
        });
      }
    }
  }

  #createPending(url) {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        const queue = this.#pending.get(url) || [];
        const index = queue.findIndex(item => item.resolve === resolve);
        if (index >= 0) queue.splice(index, 1);
        if (queue.length === 0) this.#pending.delete(url);
        reject(new Error(`ProPresenter request timed out: ${url}`));
      }, this.#requestTimeoutMs);

      const queue = this.#pending.get(url) || [];
      queue.push({
        resolve: value => {
          clearTimeout(timeout);
          resolve(value);
        },
        reject: error => {
          clearTimeout(timeout);
          reject(error);
        }
      });
      this.#pending.set(url, queue);
    });
  }

  #resolvePending(message) {
    const url = normalizeUrl(message?.url || "");
    const queue = this.#pending.get(url);
    if (!queue?.length) return;

    const pending = queue.shift();
    if (queue.length === 0) this.#pending.delete(url);

    if (message.error) {
      pending.reject(new Error(String(message.error)));
      return;
    }

    pending.resolve(message);
  }

  #rejectPending(error) {
    for (const queue of this.#pending.values()) {
      for (const pending of queue) pending.reject(error);
    }
    this.#pending.clear();
  }
}

function normalizeUrl(url) {
  const normalized = String(url ?? "").trim().replace(/^\/+/, "");
  if (!normalized) throw new Error("ProPresenter request URL is required.");
  return normalized;
}
