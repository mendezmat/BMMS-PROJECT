import test from "node:test";
import assert from "node:assert/strict";
import {
  balanceText,
  findBestWrap
} from "../../apps/graphics/public/scripture-balance.js";

const measure = (text, fontSize = 10) => text.length * fontSize * 0.55;

test("balances text into visually similar lines", () => {
  const result = balanceText({
    text: "Porque de tal manera amó Dios al mundo que ha dado a su Hijo unigénito",
    measure,
    maxWidth: 240,
    maxHeight: 180,
    minFontSize: 20,
    maxFontSize: 40,
    maxLines: 4
  });

  assert.equal(result.overflow, false);
  assert.ok(result.lines.length >= 2);
  assert.ok(result.fontSize >= 20);
});

test("penalizes a one-word final line when a better partition exists", () => {
  const result = findBestWrap({
    words: "uno dos tres cuatro cinco seis siete".split(" "),
    measure: text => text.length * 10,
    maxWidth: 120,
    maxLines: 4
  });

  assert.ok(result.lines.at(-1).split(" ").length > 1);
});

test("reports overflow when minimum font still exceeds the box", () => {
  const result = balanceText({
    text: "texto extremadamente largo para una caja extremadamente pequeña",
    measure,
    maxWidth: 60,
    maxHeight: 20,
    minFontSize: 20,
    maxFontSize: 24,
    maxLines: 2
  });

  assert.equal(result.overflow, true);
});
