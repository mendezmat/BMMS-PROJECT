import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "../..");

test("Scripture menu is named Plantillas", () => {
  const html = fs.readFileSync(
    path.join(root, "apps/graphics/public/index.html"),
    "utf8"
  );
  assert.match(html, /<summary>Plantillas<\/summary>/);
  assert.doesNotMatch(html, /Plantillas originales/);
  assert.doesNotMatch(html, /By MMS/);
});

test("editor uses revisioned Scripture state", () => {
  const source = fs.readFileSync(
    path.join(root, "apps/graphics/public/app.js"),
    "utf8"
  );
  assert.match(source, /acceptScriptureSnapshot/);
  assert.match(source, /scripture-state/);
  assert.match(source, /scriptureSaveInFlight/);
});

test("Browser Output reads one atomic snapshot", () => {
  const source = fs.readFileSync(
    path.join(
      root,
      "apps/graphics/public/scripture-overlay.js"
    ),
    "utf8"
  );
  assert.match(
    source,
    /api\("\/api\/scripture\/snapshot"\)/
  );
});
