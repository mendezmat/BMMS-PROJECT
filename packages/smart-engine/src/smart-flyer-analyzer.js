import { OcrProviderRegistry } from './ocr-provider-registry.js';
import { createCompositionProposals } from './proposal-engine.js';

export class SmartFlyerAnalyzer {
  constructor({ ocr = new OcrProviderRegistry() } = {}) { this.ocr = ocr; }

  async analyze(input) {
    const width = Number(input?.width || 0);
    const height = Number(input?.height || 0);
    if (!width || !height) throw new TypeError('Smart Flyer requires valid image dimensions.');
    const aspectRatio = width / height;
    const orientation = aspectRatio > 1.15 ? 'landscape' : aspectRatio < 0.87 ? 'portrait' : 'square';
    const palette = Array.isArray(input.palette) ? input.palette.slice(0, 5) : [];
    const ocr = await this.ocr.analyze(input);
    const analysis = {
      version: 1,
      dimensions: { width, height, aspectRatio },
      orientation,
      palette,
      content: { blocks: ocr.blocks || [], provider: ocr.provider, confidence: ocr.confidence || 0 },
      capabilities: { palette: true, layout: true, ocr: Boolean(ocr.available), qr: false, faces: false }
    };
    return { ...analysis, proposals: createCompositionProposals(analysis) };
  }
}
