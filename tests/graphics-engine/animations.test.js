import test from "node:test";
import assert from "node:assert/strict";
import {
  createAnimationConfig,
  normalizeAnimationSet,
  animationToCss
} from "../../packages/graphics-engine/src/index.js";

test("normalizes an animation configuration", () => {
  const animation = createAnimationConfig({
    enabled: true,
    type: "slide",
    duration: 800,
    delay: 100,
    easing: "ease-in-out",
    direction: "right",
    distance: 240
  });

  assert.equal(animation.enabled, true);
  assert.equal(animation.type, "slide");
  assert.equal(animation.duration, 800);
  assert.equal(animation.direction, "right");
});

test("provides enter and exit animation defaults", () => {
  const animation = normalizeAnimationSet();
  assert.equal(animation.enter.enabled, false);
  assert.equal(animation.exit.enabled, false);
});

test("creates slide keyframes", () => {
  const css = animationToCss({
    enabled: true,
    type: "slide",
    direction: "left",
    distance: 100,
    duration: 600
  });

  assert.equal(css.keyframes.length, 2);
  assert.match(css.keyframes[0].transform, /translate\(-100px/);
  assert.equal(css.options.duration, 600);
});

test("disabled animations produce no keyframes", () => {
  const css = animationToCss({ enabled: false, type: "fade" });
  assert.deepEqual(css.keyframes, []);
});
