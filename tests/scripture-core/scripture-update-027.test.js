import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "../..");
const read = file => fs.readFileSync(path.join(root, file), "utf8");

test("Preview tools are arranged in a horizontal toolbar", () => {
  const html = read("apps/graphics/public/index.html");
  const css = read("apps/graphics/public/styles.css");
  assert.match(html, /class="preview-toolbar"/);
  assert.match(css, /\.preview-toolbar\s*\{[\s\S]*display:\s*flex/);
  assert.match(html, /toggleSafeArea/);
  assert.match(html, /toggleGrid/);
  assert.match(html, /toggleSnap/);
});

test("simple visual editor supports drag, resize, snapping and history", () => {
  const html = read("apps/graphics/public/index.html");
  const app = read("apps/graphics/public/app.js");
  assert.match(html, /scriptureCompositionSelection/);
  assert.match(app, /beginVisualInteraction/);
  assert.match(app, /moveVisualInteraction/);
  assert.match(app, /snapValue/);
  assert.match(app, /scriptureHistory/);
  assert.match(app, /scripturePresets/);
});

test("geometry adds horizontal offset without transforming typography", () => {
  const defaults = read("packages/shared/src/default-app-state.js");
  const overlay = read("apps/graphics/public/scripture-overlay.js");
  const css = read("apps/graphics/public/scripture-overlay.css");
  assert.match(defaults, /offsetX:\s*0/);
  assert.match(overlay, /--offset-x/);
  assert.match(css, /margin-left:\s*var\(--offset-x\)/);
  assert.match(css, /#bibleBanner #verse[\s\S]*font-size:\s*var\(--body-size\)/);
});
