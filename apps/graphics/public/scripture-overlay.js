
import { balanceLines } from "/scripture-layout.js";

const $ = id => document.getElementById(id);
const bible = $("bibleBanner");
const verseEl = $("verse");
const referenceEl = $("reference");
const versionEl = $("version");
const statusEl = $("status");
const previewMode = new URLSearchParams(location.search).get("preview") === "1";
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

let scripture = {};
let broadcast = {};
let currentBook = "";
let currentChapter = "";
let first = true;
let busy = false;
let pending = null;
let lastSignature = "";
let resizeTimer = null;

if (previewMode) {
  document.body.classList.add("preview-output");
}

async function api(path) {
  const response = await fetch(path, { cache: "no-store" });
  if (!response.ok) throw new Error(`BMMS ${response.status}`);
  return response.json();
}

function parseReference(reference) {
  const clean = String(reference || "").trim().replace(/[–—]/g, "-");
  const match = clean.match(
    /^((?:[1-3]\s*)?[A-Za-zÁÉÍÓÚÜÑáéíóúüñ. ]+?)\s+(\d{1,3})(?::(\d{1,3})(?:-(\d{1,3}))?)?$/
  );

  return match
    ? {
        book: match[1].replace(/\s+/g, " ").trim().toLowerCase(),
        chapter: match[2]
      }
    : { book: clean.toLowerCase(), chapter: "" };
}

function rgb(hex) {
  const clean = String(hex || "#000000").replace("#", "");
  const normalized = clean.length === 3
    ? clean.split("").map(character => character + character).join("")
    : clean;

  const value = Number.parseInt(normalized, 16);
  return `${(value >> 16) & 255},${(value >> 8) & 255},${value & 255}`;
}

function updatePreviewScale() {
  if (!previewMode) return;

  const width = window.innerWidth;
  const height = window.innerHeight;
  const scale = Math.min(width / 1920, height / 1080);

  document.documentElement.style.setProperty("--preview-scale", String(scale));
  document.documentElement.style.setProperty(
    "--preview-offset-x",
    `${Math.max(0, (width - 1920 * scale) / 2)}px`
  );
  document.documentElement.style.setProperty(
    "--preview-offset-y",
    `${Math.max(0, (height - 1080 * scale) / 2)}px`
  );
}

function applyConfig(nextScripture) {
  scripture = nextScripture;

  const root = document.documentElement.style;
  const composition = scripture.composition || {};
  const appearance = scripture.appearance || {};
  const gradient = scripture.gradient || {};

  root.setProperty("--bottom", `${composition.bottom ?? 28}px`);
  root.setProperty("--width", `${composition.width ?? 1660}px`);
  root.setProperty("--padding-x", `${composition.horizontalPadding ?? 72}px`);
  root.setProperty("--title-font", `"${appearance.titleFont || "Montserrat"}",Arial,sans-serif`);
  root.setProperty("--body-font", `"${appearance.bodyFont || "Montserrat"}",Arial,sans-serif`);
  root.setProperty("--title-size", `${appearance.titleSize ?? 44}px`);
  root.setProperty("--body-size", `${appearance.bodySize ?? 36}px`);
  root.setProperty("--title-weight", appearance.titleWeight ?? 800);
  root.setProperty("--body-weight", appearance.bodyWeight ?? 500);
  root.setProperty("--line-height", appearance.lineHeight ?? 1.16);
  root.setProperty("--title-color", appearance.titleColor || "#ffffff");
  root.setProperty("--text-color", appearance.textColor || "#ffffff");
  root.setProperty("--line-color", appearance.lineColor || "rgba(255,255,255,.9)");
  root.setProperty("--gradient-strength", gradient.opacity ?? .96);
  root.setProperty("--gradient-color", rgb(gradient.color || "#000000"));
  root.setProperty("--gradient-height", `${gradient.height ?? 430}px`);
  root.setProperty("--gradient-softness", `${gradient.softness ?? 58}%`);
  root.setProperty(
    "--edge-fade",
    `${gradient.edgeFadeEnabled === false ? 0 : gradient.edgeFade ?? 150}px`
  );

  for (const className of [
    "format-lower",
    "format-center-lower",
    "format-left-column",
    "format-right-column",
    "format-fullscreen",
    "format-minimal",
    "style-classic",
    "style-editorial",
    "style-worship",
    "style-broadcast",
    "style-glass",
    "style-kinetic",
    "style-tv"
  ]) {
    bible.classList.remove(className);
  }

  bible.classList.add(
    `format-${scripture.format || "lower"}`,
    `style-${scripture.design || "classic"}`
  );

  bible.classList.toggle("edge-fade", gradient.edgeFadeEnabled !== false);
  bible.style.textAlign = composition.alignment || "center";
}

function getFontDescriptor(size) {
  const appearance = scripture.appearance || {};
  const family = appearance.bodyFont || "Montserrat";
  const weight = appearance.bodyWeight || 500;
  return `${weight} ${size}px "${family}", Arial, sans-serif`;
}

function measureLine(context, text, size) {
  context.font = getFontDescriptor(size);
  return context.measureText(text).width;
}

function partitionWords(words, lineCount, maxWidth, size, context) {
  const count = words.length;
  if (!count || lineCount < 1 || lineCount > count) return null;

  const prefix = [0];
  const spaceWidth = measureLine(context, " ", size);

  for (const word of words) {
    prefix.push(prefix[prefix.length - 1] + measureLine(context, word, size));
  }

  const widthBetween = (start, end) =>
    prefix[end] - prefix[start] + Math.max(0, end - start - 1) * spaceWidth;

  const dp = Array.from({ length: lineCount + 1 }, () =>
    Array(count + 1).fill(Number.POSITIVE_INFINITY)
  );
  const previous = Array.from({ length: lineCount + 1 }, () =>
    Array(count + 1).fill(-1)
  );

  dp[0][0] = 0;
  const target = Math.min(maxWidth, widthBetween(0, count) / lineCount);

  for (let line = 1; line <= lineCount; line += 1) {
    for (let end = line; end <= count; end += 1) {
      for (let start = line - 1; start < end; start += 1) {
        if (!Number.isFinite(dp[line - 1][start])) continue;

        const width = widthBetween(start, end);
        if (width > maxWidth) continue;

        const isLast = line === lineCount;
        const raggedness = isLast
          ? Math.pow(Math.max(0, target - width), 2) * 0.18
          : Math.pow(target - width, 2);

        const score = dp[line - 1][start] + raggedness;

        if (score < dp[line][end]) {
          dp[line][end] = score;
          previous[line][end] = start;
        }
      }
    }
  }

  if (!Number.isFinite(dp[lineCount][count])) return null;

  const lines = [];
  let end = count;

  for (let line = lineCount; line > 0; line -= 1) {
    const start = previous[line][end];
    if (start < 0) return null;
    lines.unshift(words.slice(start, end).join(" "));
    end = start;
  }

  return lines;
}

function findBestLayout(text) {
  const composition = scripture.composition || {};
  const appearance = scripture.appearance || {};
  const words = String(text || "").trim().split(/\s+/).filter(Boolean);
  const maxLines = Math.max(1, Number(composition.maxLines) || 4);
  const baseSize = Math.max(18, Number(appearance.bodySize) || 36);
  const minimumSize = Math.max(17, Math.round(baseSize * 0.52));

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  const containerWidth = Math.max(120, verseEl.clientWidth);
  const safeWidth = Math.max(100, containerWidth - 48);

  for (let size = baseSize; size >= minimumSize; size -= 1) {
    for (let lineCount = 1; lineCount <= Math.min(maxLines, words.length); lineCount += 1) {
      const lines = partitionWords(words, lineCount, safeWidth, size, context);
      if (!lines) continue;

      const lineHeight = size * (Number(appearance.lineHeight) || 1.16);
      const availableHeight = Math.max(
        lineHeight,
        bible.classList.contains("style-tv")
          ? 104
          : bible.classList.contains("style-broadcast")
            ? 150
            : 320
      );

      if (lineCount * lineHeight <= availableHeight) {
        return { lines, size };
      }
    }
  }

  // Last-resort mode: preserve every word and allow the smallest readable size.
  const fallback = balanceLines(String(text || ""), maxLines)
    .split("\n")
    .filter(Boolean)
    .slice(0, maxLines);

  return { lines: fallback, size: minimumSize };
}

function renderLines(lines, size, animate = true) {
  const animation = scripture.animation || {};

  verseEl.innerHTML = "";
  verseEl.style.fontSize = `${size}px`;

  let wordIndex = 0;

  for (const lineText of lines) {
    const line = document.createElement("span");
    line.className = "verse-line";

    for (const part of lineText.split(/(\s+)/)) {
      if (!part) continue;

      const span = document.createElement("span");

      if (/^\s+$/.test(part)) {
        span.className = "word-space";
        span.textContent = part;
      } else if (animate && animation.wordCascade !== false) {
        span.className = "word";
        span.textContent = part;
        span.style.animationDelay =
          `${wordIndex * (animation.wordCascadeStepMs ?? 18)}ms`;
        wordIndex += 1;
      } else {
        span.textContent = part;
      }

      line.appendChild(span);
    }

    verseEl.appendChild(line);
  }
}

function fitAndRenderText(text, animate = true) {
  // The final width depends on the selected CG style, so fitting occurs
  // after the DOM has applied the corresponding classes.
  const layout = findBestLayout(text);
  renderLines(layout.lines, layout.size, animate);

  // One final verification protects against browser/font metric differences.
  const safeWidth = Math.max(100, verseEl.clientWidth - 40);
  let size = layout.size;
  const minimum = Math.max(17, Math.round((scripture.appearance?.bodySize || 36) * 0.48));
  const lines = [...verseEl.querySelectorAll(".verse-line")];

  while (
    size > minimum &&
    lines.some(line => line.scrollWidth > safeWidth)
  ) {
    size -= 1;
    verseEl.style.fontSize = `${size}px`;
  }

  const gradient = scripture.gradient || {};
  if ((gradient.mode || "adaptive") === "adaptive") {
    const contentHeight = bible.querySelector(".content")?.scrollHeight || 250;
    const height = Math.max(
      260,
      Math.min(
        900,
        contentHeight + (Number(scripture.composition?.bottom) || 0) + 150
      )
    );

    document.documentElement.style.setProperty("--gradient-height", `${height}px`);
  }
}

function previewVerse() {
  const source = scripture.source === "propresenter"
    ? scripture.propresenter
    : scripture.manual;

  return source?.text ? source : scripture.manual;
}

async function renderVerse(verse, replay = false) {
  if (!verse?.text) {
    bible.classList.remove("visible");
    return;
  }

  if (busy) {
    pending = { verse, replay };
    return;
  }

  busy = true;

  const reference = String(verse.reference || "")
    .replace(/\s*-\s*/g, "–")
    .toUpperCase();

  const parsed = parseReference(reference);
  const animation = scripture.animation || {};

  let transitionKind = first
    ? "first"
    : parsed.book === currentBook && parsed.chapter === currentChapter
      ? "same"
      : parsed.book === currentBook
        ? "chapter"
        : "book";

  if (replay) transitionKind = "book";

  if (transitionKind === "same") {
    bible.classList.add("soft-out");
    await sleep(animation.sameChapterOutMs ?? 100);
  } else if (!first || replay) {
    bible.classList.add(
      transitionKind === "chapter" ? "chapter-out" : "book-out"
    );
    bible.classList.remove("visible");

    await sleep(
      transitionKind === "chapter"
        ? animation.chapterChangeMs ?? 320
        : animation.bookChangeMs ?? 420
    );
  }

  referenceEl.textContent = reference;
  versionEl.textContent = verse.version || "";

  // Wait one frame so the browser applies template and format geometry
  // before the fitting engine measures the available width.
  await new Promise(resolve => requestAnimationFrame(resolve));
  fitAndRenderText(verse.text, true);

  bible.classList.toggle("no-reference", !reference);
  bible.classList.toggle("no-version", !verse.version);
  bible.classList.remove("soft-out", "chapter-out", "book-out");

  void bible.offsetWidth;
  bible.classList.add("visible");

  currentBook = parsed.book;
  currentChapter = parsed.chapter;
  first = false;
  busy = false;

  if (pending) {
    const next = pending;
    pending = null;
    renderVerse(next.verse, next.replay);
  }
}

async function refresh({ replay = false } = {}) {
  try {
    const [state, nextBroadcast] = await Promise.all([
      api("/api/app-state"),
      api("/api/scripture/program")
    ]);

    scripture = state.scripture || {};
    broadcast = nextBroadcast || {};
    applyConfig(scripture);

    const verse = previewMode
      ? previewVerse()
      : broadcast.program || broadcast.preview;

    const visible = previewMode || Boolean(broadcast.visible && verse);

    const signature = JSON.stringify({
      verse,
      design: scripture.design,
      format: scripture.format,
      composition: scripture.composition,
      appearance: scripture.appearance,
      gradient: scripture.gradient,
      animation: scripture.animation
    });

    if (signature !== lastSignature || replay) {
      lastSignature = signature;
      await renderVerse(verse, replay);
    }

    bible.classList.toggle("visible", visible && Boolean(verse?.text));
    statusEl.textContent = previewMode ? "PREVIEW INTERNO" : "BROWSER OUTPUT";
  } catch (error) {
    statusEl.textContent = error.message;
    console.error("BMMS Scripture output error", error);
  }
}

const events = new EventSource("/api/app-events");

for (const eventName of [
  "scripture-program",
  "scripture-updated",
  "scripture-config"
]) {
  events.addEventListener(eventName, () => refresh());
}

events.addEventListener("scripture-replay", () => refresh({ replay: true }));
events.onerror = () => setTimeout(refresh, 350);

window.addEventListener("message", event => {
  if (event.data?.type === "bmms-scripture-replay") {
    refresh({ replay: true });
  }
});

window.addEventListener("resize", () => {
  updatePreviewScale();
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    const verse = previewMode ? previewVerse() : broadcast.program || broadcast.preview;
    if (verse?.text) fitAndRenderText(verse.text, false);
  }, 80);
});

updatePreviewScale();
refresh();

if (previewMode && window.parent !== window) {
  window.parent.postMessage({ type: "bmms-scripture-preview-ready" }, "*");
}

setInterval(refresh, 2000);
