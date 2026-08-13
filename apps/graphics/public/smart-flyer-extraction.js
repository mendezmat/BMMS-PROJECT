const clean = value => String(value || "").replace(/[|]/g, "I").replace(/\s+/g, " ").trim();
const boxOf = line => {
  const box = line?.bbox;
  if (!box) return null;
  const x = Number(box.x ?? box.x0 ?? 0);
  const y = Number(box.y ?? box.y0 ?? 0);
  const width = Number(box.width ?? (box.x1 - box.x0) ?? 0);
  const height = Number(box.height ?? (box.y1 - box.y0) ?? 0);
  return width > 0 && height > 0 ? { x, y, width, height } : null;
};
const eventText = value => /\b(?:\d{1,2}\s+de\s+\p{L}+|\d{1,2}[:.]\d{2}|iglesia|templo|ipa|avenida|calle|auditorio)\b/iu.test(value);
const horizontalOverlap = (a, b) => Math.max(0, Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x)) / Math.max(1, Math.min(a.width, b.width));

export function proposeTitleRegion(lines = [], sourceWidth = 1, sourceHeight = 1) {
  const candidates = lines.map(line => ({ line, text: clean(line.text), box: boxOf(line) }))
    .filter(item => item.box && item.text.length >= 3 && !eventText(item.text) && item.box.y < sourceHeight * .82);
  if (!candidates.length) return null;
  const heights = candidates.map(item => item.box.height).sort((a, b) => a - b);
  const median = heights[Math.floor(heights.length / 2)] || 1;
  candidates.forEach(item => {
    const centerBias = 1 - Math.min(.7, Math.abs((item.box.x + item.box.width / 2) / sourceWidth - .5));
    item.score = (item.box.height / median) * Math.log2(item.text.length + 2) * centerBias * Math.max(.55, Number(item.line.confidence || 65) / 100);
  });
  const anchor = candidates.sort((a, b) => b.score - a.score)[0];
  if (!anchor || (anchor.box.height < median * 1.18 && anchor.box.height < sourceHeight * .065)) return null;
  const group = candidates.filter(item => {
    const verticalGap = Math.max(0, item.box.y - (anchor.box.y + anchor.box.height), anchor.box.y - (item.box.y + item.box.height));
    return verticalGap <= Math.max(anchor.box.height, item.box.height) * 1.35 && horizontalOverlap(anchor.box, item.box) >= .18;
  });
  let left = Math.min(...group.map(item => item.box.x));
  const top = Math.min(...group.map(item => item.box.y));
  let right = Math.max(...group.map(item => item.box.x + item.box.width));
  const bottom = Math.max(...group.map(item => item.box.y + item.box.height));
  if (anchor.box.height >= sourceHeight * .07) {
    left = Math.min(left, sourceWidth * .03);
    right = Math.max(right, sourceWidth * .97);
  }
  const marginX = sourceWidth * .025;
  const marginY = sourceHeight * .025;
  return {
    x: Math.max(0, left - marginX) / sourceWidth,
    y: Math.max(0, top - marginY) / sourceHeight,
    width: Math.min(sourceWidth, right + marginX) / sourceWidth - Math.max(0, left - marginX) / sourceWidth,
    height: Math.min(sourceHeight, bottom + marginY) / sourceHeight - Math.max(0, top - marginY) / sourceHeight
  };
}

export function extractTitleFromRegion(lines = []) {
  const values = lines.map(line => ({ text: clean(line.text), box: boxOf(line), confidence: Number(line.confidence || 0) }))
    .filter(item => item.text.length >= 3 && !eventText(item.text) && item.confidence >= 35)
    .sort((a, b) => (a.box?.y || 0) - (b.box?.y || 0) || (a.box?.x || 0) - (b.box?.x || 0));
  const title = values.map(item => item.text).join(" ").replace(/\s+([,.;:])/g, "$1").trim();
  if (title.length < 10 || !/\p{L}+\s+\p{L}+/u.test(title)) return "";
  if (/^(?:con|para|de|del|la|el|en|y)\b/iu.test(title)) return "";
  const letters = [...title].filter(character => /\p{L}/u.test(character));
  const uppercase = letters.filter(character => character === character.toLocaleUpperCase("es") && character !== character.toLocaleLowerCase("es")).length;
  return (uppercase / Math.max(1, letters.length) >= .65 ? title.toLocaleUpperCase("es") : title).slice(0, 80);
}

export function extractTitleContinuation(lines = []) {
  const value = lines.map(line => ({ text: clean(line.text), box: boxOf(line), confidence: Number(line.confidence || 0) }))
    .filter(item => item.text.length >= 3 && !eventText(item.text) && item.confidence >= 32)
    .sort((a, b) => (a.box?.y || 0) - (b.box?.y || 0) || (a.box?.x || 0) - (b.box?.x || 0))
    .map(item => item.text).join(" ").replace(/\s+([,.;:])/g, "$1").trim();
  return value.length >= 6 && /\p{L}+\s+\p{L}+/u.test(value) ? value.slice(0, 60) : "";
}

export function titleVerticalCoverage(lines = [], sourceHeight = 1) {
  const boxes = lines.map(boxOf).filter(Boolean);
  if (!boxes.length || sourceHeight <= 0) return 0;
  return Math.min(1, Math.max(...boxes.map(box => box.y + box.height)) / sourceHeight);
}

const compact = value => clean(value).normalize("NFD").replace(/\p{M}/gu, "").replace(/[^a-z0-9]/giu, "").toLocaleLowerCase("es");
const distance = (left, right) => {
  const row = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let i = 1; i <= left.length; i++) {
    let diagonal = row[0]; row[0] = i;
    for (let j = 1; j <= right.length; j++) {
      const previous = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, diagonal + (left[i - 1] === right[j - 1] ? 0 : 1));
      diagonal = previous;
    }
  }
  return row[right.length];
};

export function repairTitleWithFilename(title, filename = "") {
  const hint = clean(filename.replace(/\.[^.]+$/, "").replace(/[\s_-]+\d+$/, "").replace(/[\s_-]+/g, " "));
  if (hint.length < 10 || hint.split(" ").length < 3 || /^(?:img|image|foto|flyer|whatsapp)\b/i.test(hint)) return title;
  const detected = compact(title);
  const expected = compact(hint);
  if (!detected || distance(detected, expected) > Math.max(2, Math.ceil(expected.length * .12))) return title;
  const repaired = hint.replace(/\bmision\b/giu, "misión");
  return title === title.toLocaleUpperCase("es") ? repaired.toLocaleUpperCase("es") : repaired;
}
