import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('Smart Flyer uses one shared renderer for preview, program and output', () => {
  const app = fs.readFileSync('apps/graphics/public/app.js','utf8');
  const overlay = fs.readFileSync('apps/graphics/public/smart-flyer-overlay.js','utf8');
  const html = fs.readFileSync('apps/graphics/public/index.html','utf8');
  assert.match(app, /BmmsSmartFlyerRenderer\.render\(host,scene\)/);
  assert.match(app, /BmmsSmartFlyerRenderer\.render\(box,scene\)/);
  assert.match(overlay, /BmmsSmartFlyerRenderer\.render\(scene,s\)/);
  assert.match(html, /smart-flyer-renderer\.js/);
});
