import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "../..");

test("composition supports independent X and Y scale", () => {
  const defaults = fs.readFileSync(
    path.join(root, "packages/shared/src/default-app-state.js"),
    "utf8"
  );
  const app = fs.readFileSync(
    path.join(root, "apps/graphics/public/app.js"),
    "utf8"
  );
  const overlay = fs.readFileSync(
    path.join(root, "apps/graphics/public/scripture-overlay.js"),
    "utf8"
  );
  const css = fs.readFileSync(
    path.join(root, "apps/graphics/public/scripture-overlay.css"),
    "utf8"
  );

  assert.match(defaults, /scaleX:\s*1/);
  assert.match(defaults, /scaleY:\s*1/);
  assert.match(app, /scaleX: \$\("#compositionScaleX"\)/);
  assert.match(app, /scaleY: \$\("#compositionScaleY"\)/);
  assert.match(overlay, /--geometry-scale-x/);
  assert.match(overlay, /--geometry-scale-y/);
  assert.match(css, /--geometry-scale-x/);
});

test("broadcast action labels are in Spanish", () => {
  const html = fs.readFileSync(
    path.join(root, "apps/graphics/public/index.html"),
    "utf8"
  );
  const app = fs.readFileSync(
    path.join(root, "apps/graphics/public/app.js"),
    "utf8"
  );

  assert.match(html, />\s*ENVIAR\s*</);
  assert.match(html, />\s*LIMPIAR\s*</);
  assert.match(html, /AUTO: APAGADO/);
  assert.doesNotMatch(html, />\s*TAKE\s*</);
  assert.doesNotMatch(html, />\s*CLEAR\s*</);
  assert.match(app, /"ENCENDIDO"/);
  assert.match(app, /"APAGADO"/);
});
