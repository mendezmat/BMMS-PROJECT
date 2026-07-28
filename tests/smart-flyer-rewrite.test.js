import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const html=fs.readFileSync('apps/graphics/public/index.html','utf8');
const css=fs.readFileSync('apps/graphics/public/smart-flyer-v2.css','utf8');
const app=fs.readFileSync('apps/graphics/public/app.js','utf8');
const overlay=fs.readFileSync('apps/graphics/public/smart-flyer-overlay.js','utf8');

test('Smart Flyer uses isolated bounded workspace',()=>{
  assert.match(html,/sfv2-shell/);
  assert.match(css,/grid-template-rows:minmax\(0,1fr\) 152px/);
  assert.match(css,/object-fit:contain/);
});

test('Smart Flyer supports manual multi-region OCR',()=>{
  assert.match(app,/async function sfAnalyzeRegions/);
  assert.match(app,/smartFlyer\.regions\[smartFlyer\.activeType\]/);
  assert.match(html,/Reanalizar áreas marcadas/);
});

test('CG result is intrinsic and browser output excludes source flyer',()=>{
  assert.match(css,/max-height:108px/);
  assert.doesNotMatch(overlay,/imageDataUrl/);
  assert.match(overlay,/titleGraphicDataUrl/);
});

test('template and format selectors update the CG',()=>{
  assert.match(app,/smartFlyerTemplateSelect/);
  assert.match(app,/smartFlyerFormatSelect/);
  assert.match(app,/template-\$\{smartFlyer\.template\}/);
  assert.match(app,/format-\$\{smartFlyer\.format\}/);
});
