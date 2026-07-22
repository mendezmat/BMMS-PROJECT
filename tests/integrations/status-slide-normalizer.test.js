import test from "node:test";
import assert from "node:assert/strict";
import {
  normalizeStatusSlideResponse
} from "../../packages/integrations/src/propresenter/index.js";

test("normalizes a common current slide payload", () => {
  const verse = normalizeStatusSlideResponse({
    statusSlide: {
      data: {
        current: {
          text: "Juan 3:16\nPorque de tal manera amó Dios al mundo"
        }
      }
    },
    activePresentation: {
      data: {
        id: "presentation-1",
        name: "Juan 3"
      }
    },
    slideIndex: {
      data: 4
    }
  });

  assert.equal(verse.reference, "Juan 3:16");
  assert.equal(verse.text, "Porque de tal manera amó Dios al mundo");
  assert.equal(verse.presentationId, "presentation-1");
  assert.equal(verse.slideIndex, 4);
});

test("supports snake case response variants", () => {
  const verse = normalizeStatusSlideResponse({
    statusSlide: {
      data: {
        current_slide: {
          slide_text: "La gracia sea con vosotros",
          bible_reference: "Gálatas 6:18",
          translation: "RVR1960"
        }
      }
    },
    slideIndex: {
      data: { slide_index: 7 }
    }
  });

  assert.equal(verse.reference, "Gálatas 6:18");
  assert.equal(verse.version, "RVR1960");
  assert.equal(verse.slideIndex, 7);
});
