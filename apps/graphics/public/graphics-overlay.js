const root = document.querySelector("#root");
let state = { document: null, context: {} };

async function load() {
  const response = await fetch("/api/graphics/output", { cache: "no-store" });
  state = await response.json();
  render();
}

function render() {
  if (!state.document) return;
  const doc = state.document;
  root.style.background = doc.background || "transparent";
  root.innerHTML = "";

  doc.elements.forEach((element, index) => {
    if (element.visible === false) return;
    const node = document.createElement("div");
    node.className = `element ${element.type}`;
    Object.assign(node.style, {
      left: `${element.x}px`,
      top: `${element.y}px`,
      width: `${element.width}px`,
      height: `${element.height}px`,
      transform: `rotate(${element.rotation || 0}deg)`,
      opacity: element.opacity ?? 1,
      zIndex: index + 1
    });

    if (element.type === "text") {
      node.textContent = element.text || "";
      Object.assign(node.style, {
        fontFamily: element.fontFamily || "Inter",
        fontSize: `${element.fontSize || 48}px`,
        fontWeight: element.fontWeight || 400,
        lineHeight: element.lineHeight || 1.1,
        color: element.color || "#fff",
        textAlign: element.align || "left",
        justifyContent:
          element.align === "center"
            ? "center"
            : element.align === "right"
              ? "flex-end"
              : "flex-start"
      });
    } else if (element.type === "shape") {
      node.style.background = element.fill || "#fff";
      node.style.borderRadius = `${element.radius || 0}px`;
    }

    root.appendChild(node);
  });
}

function fit() {
  const scale = Math.min(innerWidth / 1920, innerHeight / 1080);
  root.style.transform = `scale(${scale})`;
}

const events = new EventSource("/api/app-events");
events.addEventListener("graphics-document-updated", load);
events.addEventListener("scripture-updated", load);
events.addEventListener("lower-third-updated", load);

addEventListener("resize", fit);
await load();
fit();
