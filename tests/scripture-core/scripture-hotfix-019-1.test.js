
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "../..");

test("preview initialization cannot abort the whole app", () => {
  const source = fs.readFileSync(
    path.join(root, "apps/graphics/public/app.js"),
    "utf8"
  );

  assert.match(source, /"ResizeObserver" in window/);
  assert.match(source, /if \(!scripturePreviewFrame \|\| !scripturePreviewViewport\) return/);
  assert.match(source, /window\.addEventListener\("resize"/);
});

test("saved Scripture state is deeply hydrated", () => {
  const source = fs.readFileSync(
    path.join(root, "apps/graphics/server.js"),
    "utf8"
  );

  assert.match(source, /function mergeScriptureDefaults/);
  assert.match(source, /function hydrateAppState/);
  assert.match(source, /gradient:/);
  assert.match(source, /animation:/);
});
