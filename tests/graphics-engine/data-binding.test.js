import test from "node:test";
import assert from "node:assert/strict";
import {
  getByPath,
  resolveTemplate,
  resolveElement,
  resolveDocument,
  listBindingTokens
} from "../../packages/graphics-engine/src/index.js";

const context = {
  scripture: {
    reference: "Juan 3:16",
    text: "Porque de tal manera amó Dios al mundo"
  }
};

test("gets nested values by path", () => {
  assert.equal(getByPath(context, "scripture.reference"), "Juan 3:16");
  assert.equal(getByPath(context, "missing.path", "fallback"), "fallback");
});

test("resolves single and double brace tokens", () => {
  assert.equal(
    resolveTemplate("{scripture.reference} — {{ scripture.text }}", context),
    "Juan 3:16 — Porque de tal manera amó Dios al mundo"
  );
});

test("resolves binding text elements without mutating source", () => {
  const element = {
    id: "verse",
    type: "text",
    text: "Manual",
    contentMode: "binding",
    bindingTemplate: "{scripture.text}"
  };
  const resolved = resolveElement(element, context);
  assert.equal(resolved.text, context.scripture.text);
  assert.equal(element.text, "Manual");
});

test("resolves documents and lists tokens", () => {
  const document = {
    elements: [{
      id: "reference",
      type: "text",
      text: "",
      contentMode: "binding",
      bindingTemplate: "{scripture.reference}"
    }]
  };
  assert.equal(resolveDocument(document, context).elements[0].text, "Juan 3:16");
  assert.deepEqual(listBindingTokens("A {scripture.reference} B"), ["scripture.reference"]);
});
