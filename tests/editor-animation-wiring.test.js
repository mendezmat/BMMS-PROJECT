
import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const editorPath = new URL("../apps/graphics/public/editor.js", import.meta.url);

test("animation preview controls are connected", async () => {
  const source = await readFile(editorPath, "utf8");
  assert.match(source, /previewSelectedAnimation.+addEventListener/s);
  assert.match(source, /previewEnter.+addEventListener/s);
  assert.match(source, /previewExit.+addEventListener/s);
});

test("editor animation playback uses requestAnimationFrame", async () => {
  const source = await readFile(editorPath, "utf8");
  assert.match(source, /function runElementAnimation/);
  assert.match(source, /requestAnimationFrame\(frame\)/);
  assert.match(source, /applyAnimationFrame/);
});
