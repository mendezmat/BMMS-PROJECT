import test from "node:test";
import assert from "node:assert/strict";
import { defaultAppState } from "../../packages/shared/src/default-app-state.js";

test("Scripture includes a default simple-mode design", () => {
  assert.equal(defaultAppState.scripture.design, "classic");
});

test("Scripture broadcast state starts safely off air", () => {
  assert.equal(defaultAppState.scripture.broadcast.visible, false);
  assert.equal(defaultAppState.scripture.broadcast.program, null);
  assert.equal(defaultAppState.scripture.broadcast.preview, null);
});
