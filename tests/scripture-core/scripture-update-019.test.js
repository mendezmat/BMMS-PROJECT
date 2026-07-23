import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "../..");

test("preview iframe preserves a 1920 by 1080 viewport", () => {
  const css = fs.readFileSync(path.join(root, "apps/graphics/public/styles.css"), "utf8");
  assert.match(css, /width:\s*1920px/);
  assert.match(css, /height:\s*1080px/);
  assert.match(css, /--scripture-preview-scale/);
});

test("overlay no longer polls and rerenders every two seconds", () => {
  const js = fs.readFileSync(path.join(root, "apps/graphics/public/scripture-overlay.js"), "utf8");
  assert.doesNotMatch(js, /setInterval\(refresh,\s*2000\)/);
  assert.match(js, /visibilitychange/);
});

test("signature excludes volatile ProPresenter timestamps", () => {
  const js = fs.readFileSync(path.join(root, "apps/graphics/public/scripture-overlay.js"), "utf8");
  const signatureStart = js.indexOf("const signature = JSON.stringify");
  const signatureEnd = js.indexOf(");", signatureStart);
  const signature = js.slice(signatureStart, signatureEnd);
  assert.doesNotMatch(signature, /receivedAt/);
  assert.doesNotMatch(signature, /presentation/);
});

test("verse width follows configured lateral padding without a legacy cap", () => {
  const css = fs.readFileSync(path.join(root, "apps/graphics/public/scripture-overlay.css"), "utf8");
  assert.match(css, /#verse,[\s\S]*max-width:\s*none/);
  assert.match(css, /padding-left:\s*var\(--padding-x\)/);
});

test("verse size is authoritative and is never silently reduced", () => {
  const js = fs.readFileSync(path.join(root, "apps/graphics/public/scripture-overlay.js"), "utf8");
  assert.doesNotMatch(js, /scaleX\(/);
  assert.match(js, /operator-selected size is authoritative/);
  assert.match(js, /style\.setProperty\(\s*"font-size"/);
  assert.doesNotMatch(js, /size -= 1/);
  assert.match(js, /composition\.balance/);
});

