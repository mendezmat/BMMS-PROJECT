import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const cssPath = new URL('../apps/graphics/public/styles.css', import.meta.url);

test('Smart Flyer desktop view uses a bounded three-row layout', async () => {
  const css = await readFile(cssPath, 'utf8');
  assert.match(css, /#view-smart-flyer\.active\s*\{[\s\S]*grid-template-rows:\s*auto minmax\(0, 1fr\) auto/);
  assert.match(css, /\.smart-flyer-workspace\s*\{[\s\S]*height:\s*100%/);
});

test('Smart Flyer panels own independent vertical scrolling', async () => {
  const css = await readFile(cssPath, 'utf8');
  assert.match(css, /\.smart-flyer-input,[\s\S]*\.smart-flyer-preview,[\s\S]*\.smart-flyer-inspector\s*\{[\s\S]*overflow-y:\s*auto/);
});
