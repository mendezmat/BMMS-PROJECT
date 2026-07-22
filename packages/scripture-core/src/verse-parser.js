const REFERENCE_PATTERN =
  /^(?<book>(?:[1-3]\s*)?[\p{L}.]+(?:\s+[\p{L}.]+)*)\s+(?<chapter>\d+):(?<start>\d+)(?:[-–—](?<end>\d+))?$/u;

export function parseScriptureText(input, options = {}) {
  const raw = String(input ?? "").replace(/\r\n?/g, "\n").trim();
  if (!raw) {
    return {
      reference: "",
      text: "",
      version: normalize(options.version),
      book: "",
      chapter: null,
      verseStart: null,
      verseEnd: null
    };
  }

  const lines = raw
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean);

  let reference = normalize(options.reference);
  let textLines = [...lines];

  if (!reference && lines.length > 1 && looksLikeReference(lines[0])) {
    reference = lines[0];
    textLines = lines.slice(1);
  }

  const parsedReference = parseReference(reference);

  return {
    reference,
    text: textLines.join(" "),
    version: normalize(options.version),
    ...parsedReference
  };
}

export function parseReference(reference) {
  const normalized = normalize(reference);
  const match = normalized.match(REFERENCE_PATTERN);

  if (!match?.groups) {
    return {
      book: "",
      chapter: null,
      verseStart: null,
      verseEnd: null
    };
  }

  return {
    book: normalize(match.groups.book),
    chapter: Number(match.groups.chapter),
    verseStart: Number(match.groups.start),
    verseEnd: Number(match.groups.end || match.groups.start)
  };
}

export function looksLikeReference(value) {
  return REFERENCE_PATTERN.test(normalize(value));
}

function normalize(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}
