import test from 'node:test';
import assert from 'node:assert/strict';
import { cleanVisionLines, classifyVisionLines, lineQuality } from '../packages/vision-engine/index.js';

test('Vision Engine rejects OCR symbol noise', () => {
  const lines=cleanVisionLines([{text:'>= == [a] 10 de duo [D.1930hrs.',confidence:18},{text:'UN MATRIMONIO',confidence:92}]);
  assert.deepEqual(lines.map(x=>x.text),['UN MATRIMONIO']);
});

test('Vision Engine classifies event entities', () => {
  const result=classifyVisionLines([
    {text:'UN MATRIMONIO',confidence:96,bbox:{height:78}},
    {text:'CON UNA MISIÓN',confidence:91,bbox:{height:35}},
    {text:'10 DE AGOSTO',confidence:94,bbox:{height:22}},
    {text:'19:30 HRS',confidence:95,bbox:{height:22}},
    {text:'IPA BETANIA 1318',confidence:90,bbox:{height:20}}
  ]);
  assert.equal(result.document.title.value,'UN MATRIMONIO');
  assert.equal(result.document.date.value,'10 DE AGOSTO');
  assert.equal(result.document.time.value,'19:30 HRS');
  assert.equal(result.document.location.value,'IPA BETANIA 1318');
});

test('Vision quality rewards readable high-confidence text',()=>{
  assert.ok(lineQuality('CONFERENCIA DE JÓVENES',95)>lineQuality('===> [] {}',20));
});
