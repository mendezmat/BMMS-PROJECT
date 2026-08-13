import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const renderer = fs.readFileSync("apps/graphics/public/smart-flyer-renderer.js", "utf8");
const css = fs.readFileSync("apps/graphics/public/smart-flyer-renderer.css", "utf8");

test("banner reserves enough vertical space for complete information", () => {
  assert.match(renderer, /banner: \{ x: 96, y: 716, width: 1728, height: 292 \}/);
  assert.match(css, /bottom:72px;height:292px/);
});

test("long event information wraps instead of using one-line ellipsis", () => {
  assert.match(renderer, /dataset\.infoSize/);
  assert.match(css, /data-info-size=long/);
  assert.match(css, /-webkit-line-clamp:3/);
  assert.match(css, /bmms-cg-additional/);
});

test("long titles use adaptive two-line typography", () => {
  assert.match(renderer, /dataset\.titleSize/);
  assert.match(css, /data-title-size=medium/);
  assert.match(css, /data-title-size=long/);
  assert.match(css, /-webkit-line-clamp:2/);
});
