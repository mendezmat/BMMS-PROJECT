import test from 'node:test';
import assert from 'node:assert/strict';
import { SmartFlyerAnalyzer, OcrProviderRegistry } from '../src/index.js';

test('classifies image orientation and creates proposals', async () => {
  const analyzer = new SmartFlyerAnalyzer();
  const result = await analyzer.analyze({ width: 1080, height: 1350, palette: ['#111111', '#ffffff'] });
  assert.equal(result.orientation, 'portrait');
  assert.equal(result.proposals.length, 3);
  assert.deepEqual(result.palette, ['#111111', '#ffffff']);
});

test('supports interchangeable OCR providers', async () => {
  const provider = { id: 'mock', async analyze() { return { provider: 'mock', available: true, confidence: .9, blocks: [{ text: 'Evento' }] }; } };
  const registry = new OcrProviderRegistry([provider]).use('mock');
  const result = await new SmartFlyerAnalyzer({ ocr: registry }).analyze({ width: 1920, height: 1080 });
  assert.equal(result.content.provider, 'mock');
  assert.equal(result.capabilities.ocr, true);
});
