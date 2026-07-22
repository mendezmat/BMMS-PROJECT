import test from "node:test";
import assert from "node:assert/strict";
import { createElement, normalizeElement } from "../../packages/graphics-engine/src/index.js";

test("normalization preserves grouping metadata", () => {
  const element = normalizeElement(createElement("shape", {
    id: "shape-1",
    groupId: "group-1"
  }));
  assert.equal(element.groupId, "group-1");
});
