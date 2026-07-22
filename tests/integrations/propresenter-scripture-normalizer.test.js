import test from "node:test";
import assert from "node:assert/strict";
import {
  normalizeProPresenterScripture
} from "../../packages/integrations/src/propresenter/index.js";

test("normalizes a ProPresenter Scripture payload", () => {
  const verse = normalizeProPresenterScripture({
    currentText: "Porque de tal manera amó Dios",
    bibleReference: "Juan 3:16",
    translation: "RVR1960",
    presentationId: "presentation-1",
    slideIndex: 2
  });

  assert.equal(verse.source, "propresenter");
  assert.equal(verse.reference, "Juan 3:16");
  assert.equal(verse.chapter, 3);
  assert.equal(verse.slideIndex, 2);
});
