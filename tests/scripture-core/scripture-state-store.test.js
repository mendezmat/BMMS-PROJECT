import test from "node:test";
import assert from "node:assert/strict";
import {
  ScriptureStateStore,
  mergeScripturePatch
} from "../../packages/scripture-core/src/index.js";
import { defaultAppState } from "../../packages/shared/src/default-app-state.js";

test("ScriptureStateStore serializes concurrent changes", async () => {
  const persisted = [];
  const store = new ScriptureStateStore({
    defaults: defaultAppState.scripture,
    initialState: defaultAppState.scripture,
    persist: async scripture => {
      await new Promise(resolve => setTimeout(resolve, 3));
      persisted.push(scripture);
    }
  });

  await Promise.all([
    store.updateConfig({ design: "tv" }),
    store.updateConfig({
      composition: { horizontalPadding: 140 }
    }),
    store.updateConfig({
      appearance: { bodySize: 52 }
    })
  ]);

  const snapshot = store.getSnapshot();
  assert.equal(snapshot.scripture.design, "tv");
  assert.equal(
    snapshot.scripture.composition.horizontalPadding,
    140
  );
  assert.equal(snapshot.scripture.appearance.bodySize, 52);
  assert.equal(snapshot.revision, 3);
  assert.equal(persisted.length, 3);
});

test("Preview and Program share the same persisted state", async () => {
  const store = new ScriptureStateStore({
    defaults: defaultAppState.scripture,
    initialState: defaultAppState.scripture,
    persist: async () => {}
  });

  const verse = {
    reference: "Juan 3:16",
    version: "RVR1960",
    text: "Porque de tal manera amó Dios al mundo."
  };

  await store.loadManualPreview(verse);
  const taken = await store.take();

  assert.deepEqual(taken.broadcast.program, verse);
  assert.equal(taken.broadcast.visible, true);
  assert.deepEqual(
    taken.scripture.broadcast,
    taken.broadcast
  );
});

test("mergeScripturePatch preserves unrelated nested fields", () => {
  const current = defaultAppState.scripture;
  const next = mergeScripturePatch(current, {
    composition: { width: 1200 }
  });

  assert.equal(next.composition.width, 1200);
  assert.equal(
    next.composition.horizontalPadding,
    current.composition.horizontalPadding
  );
  assert.equal(
    next.appearance.bodyFont,
    current.appearance.bodyFont
  );
});
