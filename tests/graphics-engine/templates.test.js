import test from "node:test";
import assert from "node:assert/strict";
import {
  createTemplate,
  duplicateTemplate,
  instantiateTemplate,
  updateTemplateMetadata
} from "../../packages/graphics-engine/src/index.js";

const document = {
  id: "doc-1",
  name: "Original",
  width: 1920,
  height: 1080,
  elements: [
    { id: "a", type: "shape", x: 0, y: 0, width: 100, height: 100, groupId: "g1" },
    { id: "b", type: "text", x: 10, y: 10, width: 100, height: 40, groupId: "g1" }
  ]
};

test("creates and categorizes templates", () => {
  const template = createTemplate(document, { name: "Verse", category: "scripture" });
  assert.equal(template.name, "Verse");
  assert.equal(template.category, "scripture");
  assert.notEqual(template.document, document);
});

test("duplicates templates with a new identity", () => {
  const source = createTemplate(document, { id: "template-1", name: "Original" });
  const copy = duplicateTemplate(source);
  assert.notEqual(copy.id, source.id);
  assert.equal(copy.name, "Original copia");
});

test("instantiates templates with new element and group ids", () => {
  const template = createTemplate(document, { name: "Grouped" });
  const instance = instantiateTemplate(template);
  assert.notEqual(instance.elements[0].id, template.document.elements[0].id);
  assert.equal(instance.elements[0].groupId, instance.elements[1].groupId);
  assert.notEqual(instance.elements[0].groupId, "g1");
});

test("updates metadata without replacing the stored document", () => {
  const template = createTemplate(document, { name: "Before" });
  const updated = updateTemplateMetadata(template, { name: "After", favorite: true });
  assert.equal(updated.name, "After");
  assert.equal(updated.favorite, true);
  assert.equal(updated.document, template.document);
});
