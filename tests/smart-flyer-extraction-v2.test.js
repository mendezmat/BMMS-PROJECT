import test from "node:test";
import assert from "node:assert/strict";
import { proposeTitleRegion, extractTitleFromRegion, extractTitleContinuation, titleVerticalCoverage, repairTitleWithFilename } from "../apps/graphics/public/smart-flyer-extraction.js";

const line = (text, x0, y0, x1, y1, confidence = 90) => ({ text, confidence, bbox: { x0, y0, x1, y1 } });

test("geometric extraction isolates the large central title from event data", () => {
  const lines = [
    line("Matrimonios IPA BETANIA", 650, 120, 900, 160, 82),
    line("UN MATRIMONIO", 360, 340, 1160, 455, 94),
    line("con una MISIÓN", 520, 470, 1050, 560, 91),
    line("10 de Julio", 610, 735, 780, 770, 92),
    line("19:30 hrs.", 820, 735, 970, 770, 93),
    line("IPA BETANIA", 1010, 735, 1200, 770, 94)
  ];
  const region = proposeTitleRegion(lines, 1536, 864);
  assert.ok(region);
  assert.ok(region.y > .3 && region.y < .4);
  assert.ok(region.height > .25 && region.height < .35);
  assert.ok(region.x < .25);
  assert.ok(region.width > .55);
  assert.ok(region.x <= .03);
  assert.ok(region.x + region.width >= .97);
});

test("repairs missing spaces and letters from a matching descriptive filename", () => {
  assert.equal(repairTitleWithFilename("UN MATRIMONIO CONUNA ISION", "un matrimonio con una mision 3.jpeg"), "UN MATRIMONIO CON UNA MISIÓN");
  assert.equal(repairTitleWithFilename("CONCIERTO CENTRAL", "IMG_20260805.jpg"), "CONCIERTO CENTRAL");
});

test("isolated title OCR reconstructs multiple lines", () => {
  const title = extractTitleFromRegion([
    line("UN MATRIMONIO", 20, 10, 720, 120, 94),
    line("con una MISIÓN", 180, 130, 650, 220, 91)
  ]);
  assert.equal(title, "UN MATRIMONIO CON UNA MISIÓN");
});

test("isolated title extraction rejects event data and short noise", () => {
  assert.equal(extractTitleFromRegion([line("Ti FESR", 0, 0, 200, 80, 90)]), "");
  assert.equal(extractTitleFromRegion([line("con una MISIO", 0, 0, 400, 80, 90)]), "");
  assert.equal(extractTitleFromRegion([line("10 de Julio", 0, 0, 200, 40, 95), line("19:30 hrs.", 0, 50, 200, 90, 95)]), "");
});

test("detects an incomplete upper-only OCR pass and accepts the lower continuation", () => {
  const upper = [line("UN MATRIMONIO", 20, 12, 720, 108, 94)];
  assert.ok(titleVerticalCoverage(upper, 260) < .62);
  assert.equal(extractTitleContinuation([line("con una MISIÓN", 80, 10, 610, 100, 89)]), "con una MISIÓN");
  assert.equal(extractTitleContinuation([line("10 de Julio", 0, 0, 200, 40, 95)]), "");
});
