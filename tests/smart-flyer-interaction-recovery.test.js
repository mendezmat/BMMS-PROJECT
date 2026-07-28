import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const html=fs.readFileSync('apps/graphics/public/index.html','utf8');
const js=fs.readFileSync('apps/graphics/public/app.js','utf8');
const css=fs.readFileSync('apps/graphics/public/styles.css','utf8');

test('Smart Flyer exposes multi-block Vision Assist controls',()=>{
  for(const id of ['smartFlyerBlockType','smartFlyerToolSelect','smartFlyerToolMove','smartFlyerToolAdjust','smartFlyerRegionLayer']) assert.match(html,new RegExp(`id="${id}"`));
  for(const type of ['title','subtitle','date','time','location','additionalInfo','qr','logo','image']) assert.match(html,new RegExp(`value="${type}"`));
});

test('Smart Flyer keeps preview in a contained 16:9 output canvas',()=>{
  assert.match(css,/\.smart-flyer-output-stage\{[^}]*aspect-ratio:16\/9!important/s);
  assert.match(css,/\.smart-flyer-live-preview\{[^}]*aspect-ratio:16\/9!important/s);
});

test('Smart Flyer region selection and tools are wired',()=>{
  assert.match(js,/function setSmartFlyerRegion\(/);
  assert.match(js,/function renderSmartFlyerRegions\(/);
  assert.match(js,/function setSmartFlyerTool\(/);
  assert.match(js,/smartFlyerToolMove/);
});
