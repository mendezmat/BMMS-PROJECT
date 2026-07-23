
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "../..");

test("preview iframe is not hidden behind a ready-message race", () => {
  const css = fs.readFileSync(
    path.join(root, "apps/graphics/public/styles.css"),
    "utf8"
  );
  assert.doesNotMatch(css, /#scriptureOutputPreview\s*\{\s*opacity:\s*0/);
});

test("lateral padding overrides every Scripture format", () => {
  const css = fs.readFileSync(
    path.join(root, "apps/graphics/public/scripture-overlay.css"),
    "utf8"
  );
  assert.match(css, /#bibleBanner \.content[\s\S]*padding-left:\s*var\(--padding-x\)/);
  assert.match(css, /style-tv \.content[\s\S]*calc\(var\(--padding-x\) \+ 50px\)/);
});

test("text fitting performs real rendered candidate measurements", () => {
  const js = fs.readFileSync(
    path.join(root, "apps/graphics/public/scripture-overlay.js"),
    "utf8"
  );
  assert.match(js, /measureRenderedCandidate/);
  assert.match(js, /scaleX/);
  assert.match(js, /getAvailableTextHeight/);
});
