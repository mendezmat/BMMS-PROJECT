import test from "node:test";
import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import { EventBus, Logger } from "../../packages/foundation/src/index.js";
import {
  ProPresenterAdapter
} from "../../packages/integrations/src/propresenter/index.js";

class FakeTransport extends EventEmitter {
  connected = false;
  requests = [];

  async connect() {
    this.connected = true;
    this.emit("connected");
  }

  async disconnect() {
    this.connected = false;
  }

  async request(request) {
    this.requests.push(request);
    return {
      url: request.url,
      data: 1721367787
    };
  }

  async subscribe(url) {
    this.requests.push({ url, chunked: true });
    return { url, subscribed: true };
  }
}

test("tests the connection through the documented system-time endpoint", async () => {
  const transport = new FakeTransport();
  const adapter = new ProPresenterAdapter({
    events: new EventBus(),
    logger: new Logger("test"),
    config: {
      enabled: true,
      host: "127.0.0.1",
      port: 1025
    },
    transportFactory: () => transport
  });

  const result = await adapter.testConnection();

  assert.equal(result.ok, true);
  assert.equal(transport.requests[0].url, "v1/timer/system_time");
});

test("connects and subscribes configured streaming endpoints", async () => {
  const transport = new FakeTransport();
  const adapter = new ProPresenterAdapter({
    events: new EventBus(),
    logger: new Logger("test"),
    config: {
      enabled: true,
      monitoring: {
        subscriptions: ["v1/timer/system_time"]
      }
    },
    transportFactory: () => transport
  });

  const status = await adapter.connect();

  assert.equal(status.connected, true);
  assert.deepEqual(transport.requests, [
    { url: "v1/timer/system_time" },
    { url: "v1/timer/system_time", chunked: true }
  ]);
});
