import test from "node:test";
import assert from "node:assert/strict";
import {
  parseReference,
  parseScriptureText
} from "../../packages/scripture-core/src/index.js";

test("parses a Spanish Scripture reference", () => {
  assert.deepEqual(parseReference("1 Corintios 13:4-7"), {
    book: "1 Corintios",
    chapter: 13,
    verseStart: 4,
    verseEnd: 7
  });
});

test("extracts a reference from the first line", () => {
  const result = parseScriptureText(
    "Juan 3:16\nPorque de tal manera amó Dios al mundo"
  );

  assert.equal(result.reference, "Juan 3:16");
  assert.equal(result.text, "Porque de tal manera amó Dios al mundo");
  assert.equal(result.chapter, 3);
});
