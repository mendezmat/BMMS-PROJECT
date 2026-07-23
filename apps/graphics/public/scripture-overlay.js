import { balanceText } from "/scripture-balance.js";

const graphic = document.querySelector("#graphic");
const panel = document.querySelector(".panel");
const reference = document.querySelector("#reference");
const verseNode = document.querySelector("#verse");
const version = document.querySelector("#version");
const context = document.querySelector("#measureCanvas").getContext("2d");

let lastSignature = "";
let lastState = null;

async function api(path) {
  const response = await fetch(path, { cache: "no-store" });
  if (!response.ok) throw new Error(`BMMS ${response.status}`);
  return response.json();
}

function applyDesign(design, appearance, composition) {
  const selected = design || "classic";
  graphic.dataset.design = selected;
  panel.style.background = selected === "minimal"
    ? "transparent"
    : appearance?.backgroundColor || "";
  panel.style.color = appearance?.textColor || "";
  panel.style.textAlign = composition?.alignment || "left";
}

function render(payload) {
  const broadcast = payload.broadcast || payload;
  const scripture = payload.scripture || {};
  const verse = broadcast.program || scripture.currentVerse || broadcast.preview;
  const visible = Boolean(broadcast.visible && verse);
  lastState = payload;

  if (verse) {
    const appearance = scripture.appearance || {};
    const composition = scripture.composition || {};
    const signature = [
      verse.id, verse.reference, verse.text, verse.version,
      appearance.fontFamily, appearance.fontWeight, appearance.fontSize,
      composition.maxLines, composition.alignment, scripture.design
    ].join("|");

    if (signature !== lastSignature) {
      lastSignature = signature;
      applyDesign(scripture.design, appearance, composition);
      reference.textContent = verse.reference || "";
      version.textContent = verse.version || "";

      const family = appearance.fontFamily || "Inter, Arial, sans-serif";
      const weight = appearance.fontWeight || 760;
      const panelWidth = Math.max(720, window.innerWidth * .82);
      const maxWidth = panelWidth - 90;
      const maxHeight = Math.max(130, window.innerHeight * .28);

      const balanced = balanceText({
        text: verse.text || "",
        measure(value, fontSize) {
          context.font = `${weight} ${fontSize}px ${family}`;
          return context.measureText(value).width;
        },
        maxWidth,
        maxHeight,
        minFontSize: 28,
        maxFontSize: Math.min(Number(appearance.fontSize) || 68, 96),
        lineHeight: Number(appearance.lineHeight) || 1.08,
        maxLines: Number(composition.maxLines) || 5
      });

      verseNode.style.fontFamily = family;
      verseNode.style.fontWeight = String(weight);
      verseNode.style.fontSize = `${balanced.fontSize}px`;
      verseNode.style.lineHeight = String(balanced.lineHeight);
      verseNode.style.color = appearance.textColor || "";
      verseNode.replaceChildren(...balanced.lines.map(line => {
        const span = document.createElement("span");
        span.className = "verse-line";
        span.textContent = line;
        return span;
      }));
    }
  }

  graphic.classList.toggle("visible", visible);
}

async function refresh() {
  try {
    const [broadcast, appState] = await Promise.all([
      api("/api/scripture/program"),
      api("/api/app-state")
    ]);
    render({ broadcast, scripture: appState.scripture || {} });
  } catch (error) {
    console.error("Scripture output refresh failed", error);
  }
}

const events = new EventSource("/api/app-events");
["scripture-program", "scripture-updated"].forEach(name => {
  events.addEventListener(name, refresh);
});
events.onerror = () => setTimeout(refresh, 600);

window.addEventListener("resize", () => {
  lastSignature = "";
  if (lastState) render(lastState);
});

refresh();
setInterval(refresh, 1500);
