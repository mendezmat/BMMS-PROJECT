
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "../..");

test("TV Broadcast CG is available in the advanced template library", () => {
  const html = fs.readFileSync(
    path.join(root, "apps/graphics/public/index.html"),
    "utf8"
  );
  assert.match(html, /data-scripture-design="tv"/);
  assert.match(html, /TV Broadcast CG/);
});

test("Scripture output contains the robust fitting engine", () => {
  const source = fs.readFileSync(
    path.join(root, "apps/graphics/public/scripture-overlay.js"),
    "utf8"
  );
  assert.match(source, /partitionWords/);
  assert.match(source, /safeWidth/);
  assert.match(source, /fitAndRenderText/);
});

test("Preview uses one scaled 1920 by 1080 stage", () => {
  const css = fs.readFileSync(
    path.join(root, "apps/graphics/public/scripture-overlay.css"),
    "utf8"
  );
  assert.match(css, /--preview-scale/);
  assert.match(css, /style-tv/);
});
