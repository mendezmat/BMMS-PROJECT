import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const read = path => fs.readFileSync(new URL(path, import.meta.url), "utf8");

test("Visual CG keeps only the eight Figma compositions", () => {
  const renderer = read("../apps/graphics/public/visual-cg-renderer.js");
  const app = read("../apps/graphics/public/visual-cg-app.js");
  const expected = [
    "thin-glass-speaker", "thin-glass-verse", "thin-glass-announcement", "thin-glass-welcome",
    "thin-solid-speaker", "thin-solid-verse", "thin-solid-announcement", "thin-solid-welcome"
  ];
  for (const family of expected) {
    assert.match(renderer, new RegExp(`\\"${family}\\"`));
    assert.match(app, new RegExp(`\\"${family}\\"`));
  }
  assert.doesNotMatch(renderer, /signatureModular|signatureEdge|softGlass|glassFade|legacyGlass/);
});

test("Figma node identity and lower-third geometry remain intact", () => {
  const renderer = read("../apps/graphics/public/visual-cg-renderer.js");
  const css = read("../apps/graphics/public/visual-cg-broadcast.css");
  for (const nodeId of ["15:136", "15:148", "15:163", "15:178", "15:192", "15:205", "15:221", "15:237"]) assert.match(renderer, new RegExp(nodeId));
  assert.match(css, /left: 40px;[\s\S]*top: 940px;[\s\S]*width: 1840px;[\s\S]*height: 80px;/);
  assert.match(css, /top: 1000px;[\s\S]*width: 1920px;[\s\S]*height: 80px;/);
});

test("motion plays the original 1.5 second entrance only once", () => {
  const renderer = read("../apps/graphics/public/visual-cg-renderer.js");
  const app = read("../apps/graphics/public/visual-cg-app.js");
  const css = read("../apps/graphics/public/visual-cg-broadcast.css");
  assert.match(renderer, /duration: 1500/);
  assert.match(renderer, /loop: false/);
  assert.match(app, /loop: false/);
  assert.match(css, /one playback/);
  assert.ok((css.match(/1\.5s linear 1 both/g) || []).length >= 12);
  assert.doesNotMatch(css, /1\.5s linear infinite/);
  assert.match(css, /prefers-reduced-motion: reduce/);
});

test("QR is optional and its content can be generated or loaded", () => {
  const renderer = read("../apps/graphics/public/visual-cg-renderer.js");
  const app = read("../apps/graphics/public/visual-cg-app.js");
  assert.match(renderer, /showQr: false/);
  assert.match(renderer, /if \(scene\.style\.showQr\)/);
  assert.match(app, /id="visualShowQr"/);
  assert.match(app, /Crear QR/);
  assert.match(app, /Cargar QR/);
  assert.match(app, /currentStyle\(\)\.showQr = true/);
});

test("Glass announcement switches to the Figma QR V2 only when QR is active", () => {
  const renderer = read("../apps/graphics/public/visual-cg-renderer.js");
  const css = read("../apps/graphics/public/visual-cg-broadcast.css");
  assert.match(renderer, /usesQrAnnouncementV2 = scene\.design\.type === "announcement" && scene\.style\.showQr/);
  assert.match(renderer, /"46:4"/);
  assert.match(renderer, /"46:11"/);
  assert.match(css, /\.figma-cg-glass-panel\.figma-cg-announcement-qr-v2[\s\S]*left: 94px;[\s\S]*width: 1519px;/);
  assert.match(css, /\.figma-cg-qr-announcement-v2[\s\S]*left: 1665px;[\s\S]*top: 830px;[\s\S]*width: 160px;[\s\S]*height: 190px;/);
  assert.match(css, /\.figma-cg-qr-announcement-v2 \.figma-cg-qr-frame[\s\S]*width: 100px;[\s\S]*height: 100px;/);
  assert.match(css, /motion-qr-announcement-v2[\s\S]*2s linear 1 both/);
  assert.doesNotMatch(css, /motion-qr-announcement-v2[^\n]*infinite/);
});

test("every CG exposes visual, typography and visibility controls", () => {
  const renderer = read("../apps/graphics/public/visual-cg-renderer.js");
  const app = read("../apps/graphics/public/visual-cg-app.js");
  for (const key of ["backgroundColor", "backgroundOpacity", "borderColor", "accentColor", "primaryColor", "secondaryColor", "titleFont", "metadataFont", "titleSize", "metadataSize", "titleWeight", "metadataWeight", "alignment", "showLive", "showAccent", "showBorder", "showSecondary", "showKicker", "showQrCopy"]) {
    assert.match(renderer, new RegExp(key));
    assert.match(app, new RegExp(key));
  }
  assert.match(app, /Restablecer este diseño/);
});

test("banner presets persist and restore a complete composition", () => {
  const app = read("../apps/graphics/public/visual-cg-app.js");
  assert.match(app, /bmms\.visualCg\.presets\.v1/);
  assert.match(app, /function savePreset\(\)/);
  assert.match(app, /function applyPreset\(id\)/);
  assert.match(app, /function deletePreset\(id\)/);
  assert.match(app, /designId: design\.id/);
  assert.match(app, /document: \{ \.\.\.state\.documents\[design\.type\] \}/);
  assert.match(app, /style: \{ \.\.\.currentStyle\(\) \}/);
  assert.match(app, /window\.localStorage\.setItem/);
});

test("Preview, PROGRAM and output share version 0413 renderer", () => {
  const index = read("../apps/graphics/public/index.html");
  const overlay = read("../apps/graphics/public/visual-cg-overlay.html");
  const app = read("../apps/graphics/public/visual-cg-app.js");
  const server = read("../apps/graphics/server.js");
  assert.match(index, /visual-cg-renderer\.js\?v=0413/);
  assert.match(overlay, /visual-cg-renderer\.js\?v=0413/);
  assert.match(app, /\/api\/visual-cg\/take/);
  assert.match(server, /\/overlay\/scripture/);
  assert.match(server, /\/overlay\/visual-cg/);
});
