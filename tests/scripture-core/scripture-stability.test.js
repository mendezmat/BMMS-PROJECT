import test from "node:test";
import assert from "node:assert/strict";
import { defaultAppState } from "../../packages/shared/src/default-app-state.js";

test("Scripture restores the original template and format defaults", () => {
  assert.equal(defaultAppState.scripture.design, "classic");
  assert.equal(defaultAppState.scripture.format, "lower");
});

test("Appearance and animation configuration have usable defaults", () => {
  assert.ok(defaultAppState.scripture.appearance.fontSize > 0);
  assert.ok(defaultAppState.scripture.appearance.fontFamily);
  assert.ok(defaultAppState.scripture.animation.durationMs >= 100);
  assert.ok(defaultAppState.scripture.animation.in);
  assert.ok(defaultAppState.scripture.animation.out);
});
