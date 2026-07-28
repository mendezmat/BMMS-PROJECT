import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const app = readFileSync(new URL('../apps/graphics/public/app.js', import.meta.url), 'utf8');
const css = readFileSync(new URL('../apps/graphics/public/styles.css', import.meta.url), 'utf8');

test('Smart Flyer reanalyzes manually selected regions', () => {
  assert.match(app, /analyzeSmartFlyerSelectedRegions/);
  assert.match(app, /Vision Assist: \$\{regional\.updated\}\/\$\{regional\.count\} áreas analizadas/);
});

test('Smart Flyer preview is forced into a contained 16:9 canvas', () => {
  assert.match(css, /\.smart-flyer-output-stage\{[^}]*aspect-ratio:16\/9!important/);
  assert.match(css, /overflow:hidden!important/);
});
