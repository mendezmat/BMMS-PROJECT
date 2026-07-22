import { balanceText } from "/scripture-balance.js";

const graphic = document.querySelector("#graphic");
const reference = document.querySelector("#reference");
const verseNode = document.querySelector("#verse");
const version = document.querySelector("#version");
const context = document.querySelector("#measureCanvas").getContext("2d");

let lastId = null;

async function api(path) {
  const response = await fetch(path, { cache: "no-store" });
  return response.json();
}

function render(state) {
  const verse = state.program;
  const visible = Boolean(state.visible && verse);

  if (verse && verse.id !== lastId) {
    lastId = verse.id;
    reference.textContent = verse.reference || "";
    version.textContent = verse.version || "";

    const panelWidth = Math.max(800, window.innerWidth * .82);
    const maxWidth = panelWidth - 90;
    const maxHeight = Math.max(130, window.innerHeight * .28);

    const balanced = balanceText({
      text: verse.text,
      measure(value, fontSize) {
        context.font = `760 ${fontSize}px Inter, Arial, sans-serif`;
        return context.measureText(value).width;
      },
      maxWidth,
      maxHeight,
      minFontSize: 30,
      maxFontSize: 68,
      maxLines: 5
    });

    verseNode.style.fontSize = `${balanced.fontSize}px`;
    verseNode.style.lineHeight = String(balanced.lineHeight);
    verseNode.replaceChildren(...balanced.lines.map(line => {
      const span = document.createElement("span");
      span.className = "verse-line";
      span.textContent = line;
      return span;
    }));
  }

  graphic.classList.toggle("visible", visible);
}

async function refresh() {
  render(await api("/api/scripture/program"));
}

const events = new EventSource("/api/app-events");
for (const name of ["scripture-program", "scripture-updated"]) {
  events.addEventListener(name, event => render(JSON.parse(event.data)));
}

window.addEventListener("resize", refresh);
refresh();
