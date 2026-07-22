import test from "node:test";
import assert from "node:assert/strict";
import {
  createStableVerseId,
  createVerse
} from "../../packages/scripture-core/src/index.js";

test("normalizes a verse and creates a stable id", () => {
  const first = createVerse({
    reference: "  Juan   3:16 ",
    text: "Porque de tal manera  amó Dios",
    version: " RVR1960 "
  });

  const second = createVerse({
    reference: "Juan 3:16",
    text: "Porque de tal manera amó Dios",
    version: "RVR1960"
  });

  assert.equal(first.id, second.id);
  assert.equal(first.reference, "Juan 3:16");
});

test("requires verse text", () => {
  assert.throws(() => createVerse({ reference: "Juan 3:16" }));
});

test("stable id changes when content changes", () => {
  assert.notEqual(
    createStableVerseId({ reference: "Juan 3:16", text: "A" }),
    createStableVerseId({ reference: "Juan 3:16", text: "B" })
  );
});
