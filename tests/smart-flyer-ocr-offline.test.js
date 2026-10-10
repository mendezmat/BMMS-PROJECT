import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const app = fs.readFileSync("apps/graphics/public/smart-flyer-app.js", "utf8");
const server = fs.readFileSync("apps/graphics/server.js", "utf8");

test("Smart Flyer OCR reads Spanish everywhere", () => {
  assert.match(app, /const OCR_LANGUAGE = "spa"/);
  assert.doesNotMatch(app, /language: "eng"/);
});

test("Smart Flyer OCR loads locally first and keeps the CDN as fallback", () => {
  assert.match(app, /script: "\/vendor\/tesseract\/tesseract\.min\.js"/);
  assert.match(app, /tesseract\.js@5\.1\.1/);
  assert.match(app, /createWorker\(language, 1, options\)/);
});

test("server serves only files inside public/vendor", () => {
  assert.match(server, /url\.pathname\.startsWith\("\/vendor\/"\)/);
  assert.match(server, /filename\.startsWith\(vendorDir \+ path\.sep\)/);
});

test("bundled Spanish OCR files are present", () => {
  for (const file of ["tesseract.min.js", "worker.min.js", "core/tesseract-core-lstm.wasm.js", "core/tesseract-core-simd-lstm.wasm.js", "lang/spa.traineddata.gz"]) {
    assert.ok(fs.existsSync(`apps/graphics/public/vendor/tesseract/${file}`), file);
  }
});
