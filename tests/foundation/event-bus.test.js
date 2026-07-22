import test from "node:test";
import assert from "node:assert/strict";
import { EventBus } from "../../packages/foundation/src/event-bus.js";

test("publishes a versioned event envelope", () => {
  const bus = new EventBus();
  let received;
  bus.subscribe("test.event", event => { received = event; });

  const published = bus.publish("test.event", { value: 42 }, { source: "test" });

  assert.equal(received.id, published.id);
  assert.equal(received.type, "test.event");
  assert.equal(received.version, 1);
  assert.equal(received.source, "test");
  assert.deepEqual(received.payload, { value: 42 });
});
