import test from "node:test";
import assert from "node:assert/strict";
import { buildGraphicsDataContext } from "../../packages/shared/src/build-graphics-data-context.js";
import { defaultAppState } from "../../packages/shared/src/default-app-state.js";

test("builds manual scripture context", () => {
  const context = buildGraphicsDataContext(defaultAppState);
  assert.equal(context.scripture.reference, "Juan 3:16");
});

test("uses ProPresenter scripture when selected", () => {
  const state = structuredClone(defaultAppState);
  state.scripture.source = "propresenter";
  state.scripture.propresenter.reference = "Salmos 23:1";
  const context = buildGraphicsDataContext(state);
  assert.equal(context.scripture.reference, "Salmos 23:1");
});
