import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../apps/graphics/public/index.html', import.meta.url), 'utf8');
const js = await readFile(new URL('../apps/graphics/public/app.js', import.meta.url), 'utf8');
const css = await readFile(new URL('../apps/graphics/public/styles.css', import.meta.url), 'utf8');

test('Smart Flyer uses the Studio workspace structure', () => {
  assert.match(html, /sf38-shell/);
  assert.match(html, /RESULTADO DEL CG/);
  assert.match(html, /smartFlyerBlockList/);
});

test('title selection uses the rendered image bounds', () => {
  assert.match(js, /image\.getBoundingClientRect\(\)/);
  assert.doesNotMatch(js, /sourceRatio>boxRatio/);
});

test('CG preview has adaptive QR and metadata zones', () => {
  assert.match(html, /smartFlyerQrSlot/);
  assert.match(html, /smartFlyerLiveTime/);
  assert.match(html, /smartFlyerLiveLocation/);
  assert.match(css, /sf38-info-stack/);
});
