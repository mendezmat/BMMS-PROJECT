import test from "node:test";
import assert from "node:assert/strict";
import {
  createBroadcastComponent,
  createScriptureComponent,
  createLowerThirdComponent,
  listBroadcastComponents
} from "../../packages/graphics-engine/src/index.js";

test("lists built-in broadcast components", () => {
  const ids = listBroadcastComponents().map(component => component.id);
  assert.deepEqual(ids, ["scripture", "lowerThird"]);
});

test("creates a Scripture component with shared component identity", () => {
  const elements = createScriptureComponent({ componentId: "scripture-1" });
  assert.equal(elements.length, 5);
  assert.ok(elements.every(element => element.componentId === "scripture-1"));
  assert.ok(
    elements.some(
      element =>
        element.componentRole === "text" &&
        element.bindingTemplate === "{scripture.text}"
    )
  );
});

test("creates a Lower Third component with live bindings", () => {
  const elements = createLowerThirdComponent({ componentId: "lt-1" });
  assert.equal(elements.length, 4);
  assert.ok(
    elements.some(
      element =>
        element.componentRole === "title" &&
        element.bindingTemplate === "{lowerThird.title}"
    )
  );
});

test("generic component factory rejects unknown components", () => {
  assert.throws(() => createBroadcastComponent("unknown"), /Unsupported/);
});
