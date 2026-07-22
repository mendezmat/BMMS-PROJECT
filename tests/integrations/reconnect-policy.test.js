import test from "node:test";
import assert from "node:assert/strict";
import {
  ReconnectPolicy
} from "../../packages/integrations/src/propresenter/index.js";

test("applies capped exponential backoff", () => {
  const policy = new ReconnectPolicy({
    initialDelayMs: 1000,
    maxDelayMs: 3000,
    multiplier: 2
  });

  assert.deepEqual(
    [policy.nextDelay(), policy.nextDelay(), policy.nextDelay(), policy.nextDelay()],
    [1000, 2000, 3000, 3000]
  );

  policy.reset();
  assert.equal(policy.nextDelay(), 1000);
});
