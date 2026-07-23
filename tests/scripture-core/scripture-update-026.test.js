import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "../..");

test("gradient geometry provides complete bottom control", () => {
  const defaults = fs.readFileSync(
    path.join(root, "packages/shared/src/default-app-state.js"), "utf8"
  );
  const html = fs.readFileSync(
    path.join(root, "apps/graphics/public/index.html"), "utf8"
  );
  const overlay = fs.readFileSync(
    path.join(root, "apps/graphics/public/scripture-overlay.js"), "utf8"
  );
  const css = fs.readFileSync(
    path.join(root, "apps/graphics/public/scripture-overlay.css"), "utf8"
  );

  assert.match(defaults, /extendToBottom:\s*true/);
  assert.match(html, /gradientExtendToBottom/);
  assert.match(html, /gradientTopOffset/);
  assert.match(html, /gradientBottomExtension/);
  assert.match(overlay, /--gradient-extend-to-bottom/);
  assert.match(css, /#bibleBanner\.extend-to-bottom \.gradient/);
  assert.match(css, /1080px - var\(--gradient-top-offset\)/);
});

test("preview supports zoom, large view and fullscreen", () => {
  const html = fs.readFileSync(
    path.join(root, "apps/graphics/public/index.html"), "utf8"
  );
  const app = fs.readFileSync(
    path.join(root, "apps/graphics/public/app.js"), "utf8"
  );

  assert.match(html, /scripturePreviewZoom/);
  assert.match(html, /toggleLargeScripturePreview/);
  assert.match(html, /fullscreenScripturePreview/);
  assert.match(app, /requestFullscreen/);
});

test("ProPresenter connection has global persistent storage", () => {
  const server = fs.readFileSync(
    path.join(root, "apps/graphics/server.js"), "utf8"
  );

  assert.match(server, /bmms-connections\.json/);
  assert.match(server, /saveGlobalConnections/);
  assert.match(server, /settings\/propresenter\/persistence/);
});
