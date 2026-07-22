import test from "node:test";
import assert from "node:assert/strict";
import { EventBus, Logger } from "../../packages/foundation/src/index.js";
import {
  ProPresenterLiveScriptureService
} from "../../packages/integrations/src/propresenter/index.js";

class FakeAdapter {
  connected = true;
  responses = new Map([
    ["version", { data: { version: "18.0" } }],
    ["v1/status/slide", {
      data: {
        current: {
          text: "Juan 3:16\nPorque de tal manera amó Dios"
        }
      }
    }],
    ["v1/presentation/active", {
      data: { id: "presentation-1" }
    }],
    ["v1/presentation/slide_index", {
      data: 2
    }]
  ]);

  getStatus() {
    return { connected: this.connected };
  }

  async connect() {
    this.connected = true;
    return this.getStatus();
  }

  async request({ url }) {
    return structuredClone(this.responses.get(url));
  }
}

test("reads the official status and presentation endpoints", async () => {
  const events = new EventBus();
  const received = [];

  events.subscribe("propresenter.scripture.changed", event => {
    received.push(event.payload.verse);
  });

  const service = new ProPresenterLiveScriptureService({
    adapter: new FakeAdapter(),
    events,
    logger: new Logger("test"),
    intervalMs: 500
  });

  const verse = await service.syncNow();

  assert.equal(verse.reference, "Juan 3:16");
  assert.equal(verse.slideIndex, 2);
  assert.equal(received.length, 1);
});

test("does not emit a duplicate verse", async () => {
  const events = new EventBus();
  let changes = 0;
  events.subscribe("propresenter.scripture.changed", () => changes += 1);

  const service = new ProPresenterLiveScriptureService({
    adapter: new FakeAdapter(),
    events,
    logger: new Logger("test")
  });

  await service.syncNow();
  await service.syncNow();

  assert.equal(changes, 1);
});
