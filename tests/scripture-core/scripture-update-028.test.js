import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "../..");
const read = file => fs.readFileSync(path.join(root, file), "utf8");

test("panel styles suppress the classic gradient", () => {
  const css = read("apps/graphics/public/scripture-overlay.css");
  assert.ok(css.includes("#bibleBanner.style-editorial .gradient"));
  assert.ok(css.includes("#bibleBanner.style-broadcast .gradient"));
  assert.ok(css.includes("#bibleBanner.style-glass .gradient"));
  assert.ok(css.includes("#bibleBanner.style-kinetic .gradient"));
  assert.ok(css.includes("#bibleBanner.style-tv .gradient"));
  assert.match(css, /display:\s*none !important/);
});

test("classic and worship retain intentional gradient rendering", () => {
  const css = read("apps/graphics/public/scripture-overlay.css");
  assert.ok(css.includes("#bibleBanner.style-classic .gradient"));
  assert.ok(css.includes("#bibleBanner.style-worship .gradient"));
  assert.match(css, /display:\s*block !important/);
});

test("panel styles receive composition shadows across formats", () => {
  const css = read("apps/graphics/public/scripture-overlay.css");
  assert.ok(css.includes("#bibleBanner.style-editorial .content"));
  assert.ok(css.includes("#bibleBanner.format-left-column.style-editorial .content"));
  assert.ok(css.includes("#bibleBanner.format-fullscreen.style-glass .content"));
  assert.ok(css.includes("#bibleBanner.format-minimal.style-tv .content"));
  assert.match(css, /box-shadow:/);
});

test("renderer identifies gradient and panel-shadow modes", () => {
  const js = read("apps/graphics/public/scripture-overlay.js");
  assert.match(js, /dataset\.visualBackground/);
  assert.match(js, /panel-shadow/);
});
