import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const renderer = fs.readFileSync("apps/graphics/public/smart-flyer-renderer.js", "utf8");
const rendererCss = fs.readFileSync("apps/graphics/public/smart-flyer-renderer.css", "utf8");
const workspaceCss = fs.readFileSync("apps/graphics/public/smart-flyer-v2.css", "utf8");
const overlay = fs.readFileSync("apps/graphics/public/smart-flyer-overlay.js", "utf8");
const app = fs.readFileSync("apps/graphics/public/app.js", "utf8");
const server = fs.readFileSync("apps/graphics/server.js", "utf8");

test("038.4.11 uses one 1920x1080 renderer everywhere", () => {
  assert.match(renderer, /const WIDTH = 1920/);
  assert.match(renderer, /const HEIGHT = 1080/);
  assert.match(rendererCss, /width:1920px;height:1080px/);
  assert.match(app, /BmmsSmartFlyerRenderer\.render\(host,scene\)/);
  assert.match(app, /BmmsSmartFlyerRenderer\.render\(box,scene\)/);
  assert.match(overlay, /BmmsSmartFlyerRenderer\.render\(scene,s\)/);
});

test("038.4.11 keeps regions simple and optional content coherent", () => {
  assert.match(app, /picker\.onchange=.*sfArmRegion/);
  assert.match(renderer, /scene\.useOriginalTitle === true/);
  assert.match(renderer, /scene\.showQr === false/);
  assert.match(renderer, /info\.hidden = !info\.childElementCount/);
});

test("038.4.11 ships stable templates, layouts and HTTP routes", () => {
  for (const name of ["modern", "broadcast", "glass", "compact"]) assert.match(rendererCss, new RegExp(`template-${name}`));
  for (const name of ["compact", "left", "right"]) assert.match(rendererCss, new RegExp(`format-${name}`));
  assert.match(workspaceCss, /grid-template-columns:minmax\(220px,260px\).*minmax\(260px,310px\)/);
  assert.match(server, /\/smart-flyer-renderer\.js/);
  assert.match(server, /\/smart-flyer-renderer\.css/);
});
