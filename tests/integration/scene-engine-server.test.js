import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "../..");
const server = fs.readFileSync(path.join(root, "apps/graphics/server.js"), "utf8");

test("server migrates and synchronizes Scripture scenes", () => {
  assert.match(server, /createScriptureScene/);
  assert.match(server, /synchronizeScriptureScene/);
  assert.match(server, /function synchronizeScenes/);
});

test("server exposes Scene APIs and diagnostics", () => {
  assert.match(server, /\/api\/scenes/);
  assert.match(server, /\/api\/scenes\/active/);
  assert.match(server, /sceneEngine:/);
  assert.match(server, /schema: "bmms\.scene"/);
});
