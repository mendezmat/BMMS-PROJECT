import {
  createVerse,
  parseScriptureText
} from "../../../scripture-core/src/index.js";

export function normalizeStatusSlideResponse({
  statusSlide,
  activePresentation,
  slideIndex,
  receivedAt = new Date().toISOString()
} = {}) {
  const statusData = unwrapData(statusSlide);
  const presentationData = unwrapData(activePresentation);
  const indexData = unwrapData(slideIndex);

  const current = firstDefined(
    statusData?.current,
    statusData?.current_slide,
    statusData?.currentSlide,
    statusData?.slide,
    statusData
  );

  const rawText = extractText(current);
  if (!rawText) return null;

  const reference = extractReference(current, presentationData);
  const version = extractVersion(current, presentationData);
  const parsed = parseScriptureText(rawText, { reference, version });

  return createVerse({
    ...parsed,
    source: "propresenter",
    presentationId: extractPresentationId(presentationData),
    slideIndex: extractSlideIndex(indexData, current),
    receivedAt
  });
}

export function createStatusSlideSnapshot({
  statusSlide,
  activePresentation,
  slideIndex,
  version,
  receivedAt = new Date().toISOString()
} = {}) {
  return {
    receivedAt,
    version: unwrapData(version),
    statusSlide: unwrapData(statusSlide),
    activePresentation: unwrapData(activePresentation),
    slideIndex: unwrapData(slideIndex)
  };
}

function unwrapData(value) {
  if (value && typeof value === "object" && "data" in value) {
    return value.data;
  }
  return value ?? null;
}

function extractText(value) {
  if (typeof value === "string") return cleanText(value);
  if (!value || typeof value !== "object") return "";

  const direct = firstDefined(
    value.text,
    value.slide_text,
    value.slideText,
    value.presentation_text,
    value.presentationText,
    value.content,
    value.plain_text,
    value.plainText
  );

  if (typeof direct === "string") return cleanText(direct);

  if (Array.isArray(direct)) {
    return cleanText(direct.map(extractText).filter(Boolean).join("\n"));
  }

  const recursivelyUseful = firstDefined(
    value.current,
    value.current_slide,
    value.currentSlide,
    value.slide,
    value.cue,
    value.presentation
  );

  if (recursivelyUseful && recursivelyUseful !== value) {
    return extractText(recursivelyUseful);
  }

  return "";
}

function extractReference(current, presentation) {
  const fromCurrent = current && typeof current === "object"
    ? firstDefined(
        current.reference,
        current.bible_reference,
        current.bibleReference,
        current.scripture_reference,
        current.scriptureReference,
        current.title
      )
    : "";

  const fromPresentation = presentation && typeof presentation === "object"
    ? firstDefined(
        presentation.reference,
        presentation.bible_reference,
        presentation.bibleReference,
        presentation.name,
        presentation.title
      )
    : "";

  const candidate = cleanInline(firstDefined(fromCurrent, fromPresentation, ""));
  return looksLikeBibleReference(candidate) ? candidate : "";
}

function extractVersion(current, presentation) {
  const candidate = firstDefined(
    current?.version,
    current?.translation,
    current?.bible_version,
    current?.bibleVersion,
    presentation?.version,
    presentation?.translation,
    presentation?.bible_version,
    presentation?.bibleVersion,
    ""
  );
  return cleanInline(candidate);
}

function extractPresentationId(presentation) {
  if (!presentation || typeof presentation !== "object") return "";
  return cleanInline(firstDefined(
    presentation.id,
    presentation.uuid,
    presentation.presentation_id,
    presentation.presentationId,
    ""
  ));
}

function extractSlideIndex(indexData, current) {
  const candidate = firstDefined(
    typeof indexData === "number" ? indexData : undefined,
    indexData?.index,
    indexData?.slide_index,
    indexData?.slideIndex,
    current?.index,
    current?.slide_index,
    current?.slideIndex
  );

  const number = Number(candidate);
  return Number.isInteger(number) ? number : null;
}

function looksLikeBibleReference(value) {
  return /(?:[1-3]\s*)?[\p{L}.]+(?:\s+[\p{L}.]+)*\s+\d+:\d+/u.test(value);
}

function cleanText(value) {
  return String(value ?? "")
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map(line => line.replace(/[ \t]+/g, " ").trim())
    .filter(Boolean)
    .join("\n")
    .trim();
}

function cleanInline(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function firstDefined(...values) {
  return values.find(value => value !== undefined && value !== null);
}
