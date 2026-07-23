import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "../..");

test("composition scaling changes geometry without transform scaling text", () => {
  const css = fs.readFileSync(
    path.join(root, "apps/graphics/public/scripture-overlay.css"),
    "utf8"
  );
  const overlay = fs.readFileSync(
    path.join(root, "apps/graphics/public/scripture-overlay.js"),
    "utf8"
  );

  assert.match(overlay, /--geometry-scale-x/);
  assert.match(overlay, /--geometry-scale-y/);
  assert.match(css, /width:calc\(var\(--width\) \* var\(--geometry-scale-x\)\)/);
  assert.match(css, /min-height:calc\(250px \* var\(--geometry-scale-y\)\)/);
  assert.match(css, /Text is never transformed/);
  assert.doesNotMatch(
    css,
    /scale\(var\(--composition-scale-x\),var\(--composition-scale-y\)\)/
  );
});

test("composition controls use clear Spanish labels", () => {
  const html = fs.readFileSync(
    path.join(root, "apps/graphics/public/index.html"),
    "utf8"
  );

  assert.match(html, /Ancho de la composición/);
  assert.match(html, /Altura de la composición/);
  assert.doesNotMatch(html, />\s*TAKE\s*</);
  assert.doesNotMatch(html, />\s*CLEAR\s*</);
});
