import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const app = fs.readFileSync('apps/graphics/public/app.js', 'utf8');
const html = fs.readFileSync('apps/graphics/public/index.html', 'utf8');
const overlay = fs.readFileSync('apps/graphics/public/smart-flyer-overlay.js', 'utf8');

test('Vision Assist exposes a manual title-region selector', () => {
  assert.match(html, /id="smartFlyerSelectTitle"/);
  assert.match(html, /id="smartFlyerTitleRegion"/);
  assert.match(app, /normalizeSmartFlyerRegion/);
});

test('Smart Flyer scene carries source-faithful title data', () => {
  assert.match(app, /titleGraphicDataUrl/);
  assert.match(app, /useOriginalTitle/);
  assert.match(app, /createSmartFlyerTitleGraphic/);
});

test('Browser Output renders title graphic with text fallback', () => {
  assert.match(overlay, /titleGraphicDataUrl/);
  assert.match(overlay, /title\.hidden=faithful/);
});
