import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { planOverlays, sanitizeOverlayState } from "../src/overlay-state.js";

const channel = { name: "Canal 2", color: "#ff3b30" };

test("overlay state keeps the alert level and keyword (small alert must not become the big band)", () => {
  const small = sanitizeOverlayState({ active: true, level: "small", channels: [channel] });
  assert.equal(small.level, "small");
  assert.equal(small.active, true);
  const band = sanitizeOverlayState({ active: true, level: "band", word: "atención", channels: [channel] });
  assert.equal(band.level, "band");
  assert.equal(band.word, "atención");
  const none = sanitizeOverlayState({ active: true, level: "none", channels: [channel] });
  assert.equal(none.active, false);
});

test("overlay state from an old TB Tool without level keeps the band, and junk is cleaned", () => {
  const state = sanitizeOverlayState({ active: true, channels: [{ name: "x".repeat(99), color: "red" }], level: "huge", text: "y".repeat(500) });
  assert.equal(state.level, "band");
  assert.equal(state.channels[0].name.length, 40);
  assert.equal(state.channels[0].color, "#ff3b30");
  assert.equal(state.text.length, 200);
  assert.equal(sanitizeOverlayState(null).active, false);
});

test("exactly one overlay per display when displays are added, removed or re-arranged", () => {
  const a = { id: 1, bounds: { x: 0, y: 0, width: 1920, height: 1080 } };
  const b = { id: 2, bounds: { x: 1920, y: 0, width: 2560, height: 1440 } };
  assert.deepEqual(planOverlays([], [a, b]).create.map(display => display.id), [1, 2]);
  const same = planOverlays([1, 2], [a, b]);
  assert.equal(same.create.length, 0);
  assert.deepEqual(same.update.map(display => display.id), [1, 2]);
  const unplugged = planOverlays([1, 2], [a]);
  assert.deepEqual(unplugged.remove, [2]);
  assert.equal(unplugged.create.length, 0);
  const replaced = planOverlays([1], [b]);
  assert.deepEqual(replaced.remove, [1]);
  assert.deepEqual(replaced.create.map(display => display.id), [2]);
});

test("Central forwards the alert through sanitizeOverlayState and recreates crashed overlays", () => {
  const main = fs.readFileSync(new URL("../src/main.js", import.meta.url), "utf8");
  assert.match(main, /pushOverlay\(sanitizeOverlayState\(state\)\)/);
  assert.match(main, /planOverlays\(/);
  assert.match(main, /render-process-gone[\s\S]{0,300}syncOverlays/);
  assert.match(main, /powerSaveBlocker\.start\("prevent-display-sleep"\)/);
  assert.match(main, /if \(monitoring\(\)\) return;/);
  const preload = fs.readFileSync(new URL("../src/app-preload.cjs", import.meta.url), "utf8");
  assert.match(preload, /overlayLevels: true/);
});
