import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const app = fs.readFileSync("apps/graphics/public/smart-flyer-app.js", "utf8");
const css = fs.readFileSync("apps/graphics/public/smart-flyer-v2.css", "utf8");

test("full analysis is cancellable and never disables manual operation", () => {
  assert.match(app, /button\.dataset\.busy === "true"/);
  assert.match(app, /button\.textContent = "Cancelar análisis"/);
  assert.match(app, /button\.disabled = false/);
  assert.match(app, /analysisToken\+\+/);
});

test("full OCR uses a smaller image and a strict deadline", () => {
  assert.match(app, /const maximumWidth = 1280/);
  assert.match(app, /prepareOcrSource\(state\.image\)/);
  assert.match(app, /language: OCR_LANGUAGE, maxMs: 16000/);
});

test("empty result no longer reserves a large black area", () => {
  assert.match(app, /classList\.toggle\("is-empty", !ready\)/);
  assert.match(css, /sfv2-result\.is-empty\)\{grid-template-rows:minmax\(0,1fr\) 92px\}/);
});
