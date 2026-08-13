import test from "node:test";
import assert from "node:assert/strict";
import { trustedDetection } from "../apps/graphics/public/smart-flyer-detection.js";

test("rejects the corrupt title shown by full-image OCR", () => {
  const detected = trustedDetection(
    [{ text: "Ti FESR", confidence: 91 }, { text: "== 10 de Julio I (D). 19:30 hrs. I Q IPA BETANIA", confidence: 86 }],
    { document: { title: { value: "Ti FESR", confidence: 91 }, date: { value: "== 10 de Julio I (D). 19:30 hrs. I Q IPA BETANIA", confidence: 86 } } }
  );
  assert.equal(detected.title, undefined);
  assert.equal(detected.date, "10 de Julio");
  assert.equal(detected.time, "19:30 hrs");
  assert.equal(detected.location, "IPA BETANIA");
});

test("accepts independent high-quality event fields", () => {
  const detected = trustedDetection(
    [{ text: "UN MATRIMONIO CON UNA MISIÓN", confidence: 94 }, { text: "10 de Julio", confidence: 91 }, { text: "19:30 hrs.", confidence: 92 }, { text: "IPA BETANIA", confidence: 93 }],
    { document: { title: { value: "UN MATRIMONIO CON UNA MISIÓN", confidence: 94 } } }
  );
  assert.deepEqual(detected, { title: "UN MATRIMONIO CON UNA MISIÓN", date: "10 de Julio", time: "19:30 hrs", location: "IPA BETANIA" });
});

test("prefers a clean independent location over a contaminated event row", () => {
  const detected = trustedDetection([
    { text: "> >.> Sa frst) - Seen! SL IPA BETANIA TRE", confidence: 82 },
    { text: "IPA BETANIA", confidence: 91 }
  ], { document: {} });
  assert.equal(detected.location, "IPA BETANIA");
});

test("renderer enforces field limits even for external scenes", async () => {
  const source = await import("node:fs").then(fs => fs.readFileSync("apps/graphics/public/smart-flyer-renderer.js", "utf8"));
  assert.match(source, /date: limited\(document\.date, 40\)/);
  assert.match(source, /location: limited\(document\.location, 90\)/);
  assert.match(source, /additional: limited\(document\.additionalInfo, 220\)/);
});
