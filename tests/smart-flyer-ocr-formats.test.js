import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const htmlPath = new URL('../apps/graphics/public/index.html', import.meta.url);
const jsPath = new URL('../apps/graphics/public/app.js', import.meta.url);
const overlayPath = new URL('../apps/graphics/public/smart-flyer-overlay.js', import.meta.url);

test('Smart Flyer exposes the restored format gallery in the source sidebar', async () => {
  const html = await readFile(htmlPath, 'utf8');
  assert.match(html, /id="smartFlyerFormats"/);
  assert.match(html, /FORMATOS/);
});

test('Smart Flyer includes six restored composition formats', async () => {
  const js = await readFile(jsPath, 'utf8');
  for (const id of ['banner','left','right','compact','fullscreen','minimal']) {
    assert.match(js, new RegExp(`id:\\"${id}\\"`));
  }
});

test('Smart Flyer OCR falls back to Tesseract in Spanish and English', async () => {
  const js = await readFile(jsPath, 'utf8');
  assert.match(js, /tesseract\.js@5/);
  assert.match(js, /Tesseract\.recognize/);
  assert.match(js, /"spa\+eng"/);
});

test('Smart Flyer sends selected format to browser output', async () => {
  const js = await readFile(jsPath, 'utf8');
  const overlay = await readFile(overlayPath, 'utf8');
  assert.match(js, /format:smartFlyer\.activeFormat/);
  assert.match(overlay, /format-\$\{s\.format\|\|"banner"\}/);
});
