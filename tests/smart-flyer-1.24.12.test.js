import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const controller = fs.readFileSync("apps/graphics/public/smart-flyer-app.js", "utf8");
const renderer = fs.readFileSync("apps/graphics/public/smart-flyer-renderer.js", "utf8");
const rendererCss = fs.readFileSync("apps/graphics/public/smart-flyer-renderer.css", "utf8");
const workspaceCss = fs.readFileSync("apps/graphics/public/smart-flyer-v2.css", "utf8");
const overlay = fs.readFileSync("apps/graphics/public/smart-flyer-overlay.js", "utf8");
const html = fs.readFileSync("apps/graphics/public/index.html", "utf8");
const server = fs.readFileSync("apps/graphics/server.js", "utf8");

test("Smart Flyer has an isolated controller", () => {
  assert.match(html, /smart-flyer-app\.js/);
  assert.match(server, /\/smart-flyer-app\.js/);
  assert.match(controller, /schemaVersion: 2/);
  assert.match(controller, /canvas: \{ width: 1920, height: 1080 \}/);
  assert.doesNotMatch(controller, /imageDataUrl: state\.imageDataUrl/);
});

test("preview and program share a composition view while output uses the full frame", () => {
  assert.match(controller, /renderer\(\)\.render\(host, scene\(\), \{ view: "composition" \}\)/);
  assert.match(controller, /renderer\(\)\.render\(host, value, \{ view: "composition" \}\)/);
  assert.match(overlay, /BmmsSmartFlyerRenderer\.render\(scene,s\)/);
  assert.match(renderer, /compositionBounds/);
  assert.match(renderer, /host\.dataset\.bmmsCgView/);
});

test("the shared renderer owns templates and optional content", () => {
  assert.match(renderer, /scene\.useOriginalTitle === true/);
  assert.match(renderer, /scene\.showQr === false/);
  assert.match(renderer, /info\.hidden = !info\.childElementCount/);
  assert.match(rendererCss, /template-modern/);
  assert.match(rendererCss, /template-broadcast/);
  assert.match(rendererCss, /template-glass/);
  assert.match(rendererCss, /template-compact/);
});

test("workspace prevents hidden and wrapped controls from overlapping", () => {
  assert.match(workspaceCss, /sfv2-marking-status\[hidden\]\{display:none\}/);
  assert.match(workspaceCss, /sfv2-stage>img\[hidden\]\{display:none\}/);
  assert.match(workspaceCss, /sfv2-sidebar>button\{font-size:10px;white-space:nowrap\}/);
});
