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
  root.style.background = doc.outputTransparent === true ? "transparent" : (doc.background || "transparent");
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


function normalizeAnimationConfig(config = {}, phase = "enter") {
  return {
    enabled: config.enabled === true,
    type: config.type || "none",
    duration: Number(config.duration) || (phase === "enter" ? 600 : 500),
    delay: Number(config.delay) || 0,
    easing: config.easing || (phase === "enter" ? "ease-out" : "ease-in"),
    direction: config.direction || (phase === "enter" ? "left" : "right"),
    distance: Number(config.distance) || 120
  };
}

function playDocumentAnimations(phase = "enter") {
  document.querySelectorAll("[data-element-id]").forEach(node => {
    const element = currentDocument?.elements?.find(item => item.id === node.dataset.elementId);
    if (!element) return;
    const config = normalizeAnimationConfig(element.animation?.[phase], phase);
    if (!config.enabled || config.type === "none") return;

    const base = `rotate(${element.rotation || 0}deg)`;
    const visible = { opacity: element.opacity ?? 1, transform: base, clipPath: "inset(0 0 0 0)" };
    const hidden = overlayHiddenFrame(config, base);
    node.animate(phase === "enter" ? [hidden, visible] : [visible, hidden], {
      duration: config.duration,
      delay: config.delay,
      easing: config.easing,
      fill: "both"
    });
  });
}

function overlayHiddenFrame(config, base) {
  const distance = config.distance || 120;
  if (config.type === "fade") return { opacity: 0, transform: base, clipPath: "inset(0 0 0 0)" };
  if (config.type === "scale") return { opacity: 0, transform: `${base} scale(.82)`, clipPath: "inset(0 0 0 0)" };
  if (config.type === "wipe") {
    const clips = {
      left: "inset(0 0 0 100%)",
      right: "inset(0 100% 0 0)",
      up: "inset(100% 0 0 0)",
      down: "inset(0 0 100% 0)"
    };
    return { opacity: 1, transform: base, clipPath: clips[config.direction] || clips.left };
  }
  const offsets = {
    left: [-distance, 0],
    right: [distance, 0],
    up: [0, -distance],
    down: [0, distance]
  };
  const [x, y] = offsets[config.direction] || offsets.left;
  return { opacity: 0, transform: `${base} translate(${x}px, ${y}px)`, clipPath: "inset(0 0 0 0)" };
}

window.BMMSGraphics = {
  playIn: () => playDocumentAnimations("enter"),
  playOut: () => playDocumentAnimations("exit")
};
