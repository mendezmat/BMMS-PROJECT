export function createVerse(input = {}) {
  const text = normalizeMultiline(input.text);
  const reference = normalizeInline(input.reference);
  const version = normalizeInline(input.version);
  const source = normalizeInline(input.source) || "manual";

  if (!text) {
    throw new Error("Scripture verse text is required.");
  }

  return Object.freeze({
    id: normalizeInline(input.id) || createStableVerseId({ reference, text, version }),
    reference,
    text,
    version,
    source,
    book: normalizeInline(input.book),
    chapter: normalizeOptionalInteger(input.chapter),
    verseStart: normalizeOptionalInteger(input.verseStart),
    verseEnd: normalizeOptionalInteger(input.verseEnd),
    presentationId: normalizeInline(input.presentationId),
    slideIndex: normalizeOptionalInteger(input.slideIndex),
    receivedAt: normalizeInline(input.receivedAt) || new Date().toISOString()
  });
}

export function createStableVerseId({ reference = "", text = "", version = "" }) {
  const value = `${reference}|${text}|${version}`.toLowerCase();
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return `verse-${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

function normalizeInline(value) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeMultiline(value) {
  return String(value ?? "")
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map(line => line.replace(/[ \t]+/g, " ").trim())
    .filter(Boolean)
    .join("\n")
    .trim();
}

function normalizeOptionalInteger(value) {
  if (value === "" || value === null || value === undefined) return null;
  const number = Number(value);
  return Number.isInteger(number) ? number : null;
}
