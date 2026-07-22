import test from "node:test";
import assert from "node:assert/strict";
import { DocumentHistory } from "../../packages/graphics-engine/src/index.js";

test("undoes and redoes document commits", () => {
  const history = new DocumentHistory({ value: 1 });
  history.commit({ value: 2 });
  assert.equal(history.undo().value, 1);
  assert.equal(history.redo().value, 2);
});
