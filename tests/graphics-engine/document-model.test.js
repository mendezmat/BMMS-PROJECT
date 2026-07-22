import test from "node:test";
import assert from "node:assert/strict";
import {
  createElement,
  createGraphicsDocument,
  updateElement,
  removeElement,
  reorderElement
} from "../../packages/graphics-engine/src/index.js";

test("creates normalized text elements", () => {
  const element = createElement("text", { text: "Hola", opacity: 2 });
  assert.equal(element.text, "Hola");
  assert.equal(element.opacity, 1);
  assert.ok(element.id);
});

test("updates and removes elements immutably", () => {
  const element = createElement("shape", { id: "shape-1" });
  const document = createGraphicsDocument({ elements: [element] });
  const updated = updateElement(document, "shape-1", { x: 500 });
  assert.equal(updated.elements[0].x, 500);
  assert.equal(document.elements[0].x, 100);
  assert.equal(removeElement(updated, "shape-1").elements.length, 0);
});

test("reorders layers", () => {
  const document = createGraphicsDocument({
    elements: [
      createElement("shape", { id: "one" }),
      createElement("shape", { id: "two" })
    ]
  });
  const reordered = reorderElement(document, "one", "up");
  assert.deepEqual(reordered.elements.map(element => element.id), ["two", "one"]);
});
