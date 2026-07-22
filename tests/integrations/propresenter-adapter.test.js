import test from "node:test";
import assert from "node:assert/strict";
import { EventBus, Logger } from "../../packages/foundation/src/index.js";
import { ProPresenterAdapter } from "../../packages/integrations/src/propresenter/index.js";

test("starts disabled by default", () => {
  const adapter = new ProPresenterAdapter({
    events: new EventBus(),
    logger: new Logger("test")
  });

  assert.equal(adapter.getStatus().state, "disabled");
});

test("validates port range", () => {
  assert.throws(() => new ProPresenterAdapter({
    events: new EventBus(),
    logger: new Logger("test"),
    config: { enabled: true, host: "127.0.0.1", port: 70000 }
  }));
});

test("publishes normalized ProPresenter media events", () => {
  const events = new EventBus();
  let received;

  events.subscribe("propresenter.media.changed", event => {
    received = event;
  });

  const adapter = new ProPresenterAdapter({
    events,
    logger: new Logger("test")
  });

  adapter.publishMediaChanged({ mediaId: "flyer-1" });

  assert.equal(received.type, "propresenter.media.changed");
  assert.equal(received.payload.mediaId, "flyer-1");
});
