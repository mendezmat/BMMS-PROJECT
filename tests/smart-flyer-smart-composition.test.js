import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const htmlPath = new URL('../apps/graphics/public/index.html', import.meta.url);
const jsPath = new URL('../apps/graphics/public/app.js', import.meta.url);
const cssPath = new URL('../apps/graphics/public/styles.css', import.meta.url);
const overlayPath = new URL('../apps/graphics/public/smart-flyer-overlay.js', import.meta.url);

test('Smart Flyer exposes crop, safe-area and program controls', async () => {
  const html = await readFile(htmlPath, 'utf8');
  for (const id of ['smartFlyerCropX','smartFlyerCropY','smartFlyerSafeAreas','smartFlyerProgramMonitor']) assert.match(html, new RegExp(`id="${id}"`));
});

test('Smart Flyer scene carries crop metadata and recommendation logic', async () => {
  const js = await readFile(jsPath, 'utf8');
  assert.match(js, /recommendSmartFlyerTemplate/);
  assert.match(js, /crop:\{\.\.\.smartFlyer\.crop\}/);
  assert.match(js, /smartFlyer\.activeTemplate=smartFlyer\.recommendedTemplate/);
});

test('Preview supports safe action and safe title guides', async () => {
  const css = await readFile(cssPath, 'utf8');
  assert.match(css, /\.smart-flyer-safe-action\{inset:5%\}/);
  assert.match(css, /\.smart-flyer-safe-title\{inset:10%/);
});

test('Browser output applies the selected crop position', async () => {
  const overlay = await readFile(overlayPath, 'utf8');
  assert.match(overlay, /image\.style\.objectPosition/);
  assert.match(overlay, /s\.crop\?\.x/);
});
