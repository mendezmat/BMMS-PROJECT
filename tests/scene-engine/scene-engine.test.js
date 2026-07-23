import test from "node:test";
import assert from "node:assert/strict";
import {
  createScene,
  createScriptureScene,
  synchronizeScriptureScene,
  duplicateScene,
  findComponent
} from "../../packages/scene-engine/src/index.js";
import { defaultAppState } from "../../packages/shared/src/default-app-state.js";

test("scene engine creates a versioned BMMS document", () => {
  const scene = createScene({ name: "Test" });
  assert.equal(scene.schema, "bmms.scene");
  assert.equal(scene.schemaVersion, 1);
  assert.equal(scene.width, 1920);
  assert.equal(scene.height, 1080);
});

test("scripture migrates into a reusable component tree", () => {
  const scene = createScriptureScene(defaultAppState.scripture);
  assert.equal(scene.kind, "scripture");
  assert.ok(findComponent(scene, "scripture-reference"));
  assert.ok(findComponent(scene, "scripture-divider"));
  assert.ok(findComponent(scene, "scripture-verse"));
  assert.ok(findComponent(scene, "scripture-version"));
});

test("synchronization preserves identity and updates content", () => {
  const original = createScriptureScene(defaultAppState.scripture);
  const updated = synchronizeScriptureScene(original, {
    ...defaultAppState.scripture,
    manual: {
      reference: "Salmos 23:1",
      version: "RVR1960",
      text: "Jehová es mi pastor."
    }
  });
  assert.equal(updated.id, original.id);
  assert.equal(updated.metadata.createdAt, original.metadata.createdAt);
  assert.equal(findComponent(updated, "scripture-verse").data.value, "Jehová es mi pastor.");
});

test("scene duplication creates an independent document", () => {
  const original = createScriptureScene(defaultAppState.scripture);
  const duplicate = duplicateScene(original, "Copia");
  assert.notEqual(duplicate.id, original.id);
  assert.equal(duplicate.name, "Copia");
});
