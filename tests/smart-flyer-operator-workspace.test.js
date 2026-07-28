import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const htmlPath = new URL('../apps/graphics/public/index.html', import.meta.url);
const jsPath = new URL('../apps/graphics/public/app.js', import.meta.url);
const cssPath = new URL('../apps/graphics/public/styles.css', import.meta.url);

test('Smart Flyer exposes source and inspector workspace controls', async () => {
  const html = await readFile(htmlPath, 'utf8');
  assert.match(html, /id="smartFlyerToggleSource"/);
  assert.match(html, /id="smartFlyerToggleInspector"/);
});

test('Smart Flyer removes the redundant quick template switcher', async () => {
  const html = await readFile(htmlPath, 'utf8');
  assert.doesNotMatch(html, /smartFlyerTemplateSwitcher/);
  assert.match(html, /id="smartFlyerProposals"/);
});

test('Smart Flyer persists collapsed workspace panels and keeps keyboard operation', async () => {
  const js = await readFile(jsPath, 'utf8');
  assert.match(js, /bmms-smart-flyer-\$\{panel\}-collapsed/);
  assert.doesNotMatch(js, /const shortcut=/);
  assert.match(js, /event\.key==="Enter"/);
});

test('Smart Flyer expands preview grid when side panels collapse', async () => {
  const css = await readFile(cssPath, 'utf8');
  assert.match(css, /#view-smart-flyer\.source-collapsed \.smart-flyer-input/);
  assert.match(css, /#view-smart-flyer\.source-collapsed\.inspector-collapsed \.smart-flyer-workspace/);
});

test('Smart Flyer preview gives the removed switcher space back to the canvas', async () => {
  const css = await readFile(cssPath, 'utf8');
  assert.match(css, /\.smart-flyer-preview\s*\{[^}]*grid-template-rows:auto minmax\(0,1fr\) auto auto;/s);
});
