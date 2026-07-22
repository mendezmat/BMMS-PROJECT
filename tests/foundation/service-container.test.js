import test from "node:test";
import assert from "node:assert/strict";
import { ServiceContainer } from "../../packages/foundation/src/service-container.js";

test("registers and resolves a service", () => {
  const container = new ServiceContainer();
  const service = { ready: true };
  container.register("example", service);
  assert.equal(container.get("example"), service);
});

test("rejects duplicate registrations", () => {
  const container = new ServiceContainer();
  container.register("example", {});
  assert.throws(() => container.register("example", {}));
});
