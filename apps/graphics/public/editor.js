const $ = selector => document.querySelector(selector);
let documentState;
let selectedId = null;
let historyPast = [];
let historyFuture = [];
let scale = .5;
let saveTimer;

const stage = $("#stage");
const scaler = $("#stageScaler");

async function api(path, options = {}) {
  const response = await fetch(path, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error || "No se pudo completar la operación.");
  return body;
}

function clone(value) {
  return structuredClone(value);
}

function commit(next) {
  historyPast.push(clone(documentState));
  if (historyPast.length > 50) historyPast.shift();
  documentState = clone(next);
  historyFuture = [];
  render();
  scheduleSave();
}

function undo() {
  if (!historyPast.length) return;
  historyFuture.push(clone(documentState));
  documentState = historyPast.pop();
  if (!documentState.elements.some(element => element.id === selectedId)) selectedId = null;
  render();
  scheduleSave();
}

function redo() {
  if (!historyFuture.length) return;
  historyPast.push(clone(documentState));
  documentState = historyFuture.pop();
  render();
  scheduleSave();
}

function scheduleSave() {
  $("#saveIndicator").textContent = "Sin guardar";
  clearTimeout(saveTimer);
  saveTimer = setTimeout(save, 500);
}

async function save() {
  documentState.updatedAt = new Date().toISOString();
  documentState = await api("/api/editor/document", {
    method: "POST",
    body: JSON.stringify(documentState)
  });
  $("#saveIndicator").textContent = "Guardado";
}

function createElement(type) {
  const id = crypto.randomUUID();
  const base = {
    id,
    type,
    name: type === "text" ? "Texto" : "Forma",
    x: 480,
    y: 360,
    width: type === "text" ? 760 : 420,
    height: type === "text" ? 180 : 260,
    rotation: 0,
    opacity: 1,
    visible: true,
    locked: false
  };
  return type === "text"
    ? { ...base, text: "Nuevo texto", fontFamily: "Inter", fontSize: 72, fontWeight: 700, lineHeight: 1.1, color: "#ffffff", align: "left" }
    : { ...base, fill: "#2c73ff", radius: 24 };
}

function selectedElement() {
  return documentState.elements.find(element => element.id === selectedId) || null;
}

function updateSelected(patch, pushHistory = true) {
  const next = {
    ...documentState,
    elements: documentState.elements.map(element =>
      element.id === selectedId ? { ...element, ...patch } : element
    )
  };
  if (pushHistory) commit(next);
  else {
    documentState = next;
    render();
  }
}

function render() {
  $("#documentName").value = documentState.name;
  $("#documentBackground").value = documentState.background;
  stage.style.background = documentState.background;
  stage.innerHTML = "";

  documentState.elements.forEach((element, index) => {
    if (!element.visible) return;
    const node = document.createElement("div");
    node.className = `editor-element ${element.type}-element${element.id === selectedId ? " selected" : ""}${element.locked ? " locked" : ""}`;
    node.dataset.id = element.id;
    Object.assign(node.style, {
      left: `${element.x}px`,
      top: `${element.y}px`,
      width: `${element.width}px`,
      height: `${element.height}px`,
      transform: `rotate(${element.rotation}deg)`,
      opacity: element.opacity,
      zIndex: index + 1
    });

    if (element.type === "text") {
      node.textContent = element.text;
      Object.assign(node.style, {
        fontFamily: element.fontFamily,
        fontSize: `${element.fontSize}px`,
        fontWeight: element.fontWeight,
        lineHeight: element.lineHeight,
        color: element.color,
        textAlign: element.align,
        justifyContent: element.align === "center" ? "center" : element.align === "right" ? "flex-end" : "flex-start"
      });
    } else if (element.type === "shape") {
      node.style.background = element.fill;
      node.style.borderRadius = `${element.radius}px`;
    }

    const handle = document.createElement("div");
    handle.className = "resize-handle";
    node.appendChild(handle);

    node.addEventListener("pointerdown", event => beginDrag(event, element.id));
    handle.addEventListener("pointerdown", event => beginResize(event, element.id));
    stage.appendChild(node);
  });

  renderLayers();
  renderProperties();
  $("#undo").disabled = historyPast.length === 0;
  $("#redo").disabled = historyFuture.length === 0;
  $("#elementCount").textContent = documentState.elements.length;
}

function renderLayers() {
  const container = $("#layers");
  container.innerHTML = "";
  documentState.elements.forEach(element => {
    const row = document.createElement("div");
    row.className = `layer${element.id === selectedId ? " selected" : ""}`;
    row.innerHTML = `
      <span class="layer-icon">${element.type === "text" ? "T" : "▰"}</span>
      <span>${escapeHtml(element.name)}</span>
      <button class="layer-lock">${element.locked ? "●" : "○"}</button>
    `;
    row.addEventListener("click", () => {
      selectedId = element.id;
      render();
    });
    row.querySelector(".layer-lock").addEventListener("click", event => {
      event.stopPropagation();
      selectedId = element.id;
      updateSelected({ locked: !element.locked });
    });
    container.appendChild(row);
  });
}

function renderProperties() {
  const element = selectedElement();
  $("#emptyProperties").classList.toggle("hidden", Boolean(element));
  $("#elementProperties").classList.toggle("hidden", !element);
  $("#deleteElement").disabled = !element;
  if (!element) return;

  const values = {
    propName: element.name,
    propX: Math.round(element.x),
    propY: Math.round(element.y),
    propWidth: Math.round(element.width),
    propHeight: Math.round(element.height),
    propRotation: element.rotation,
    propOpacity: Math.round(element.opacity * 100)
  };
  for (const [id, value] of Object.entries(values)) $(`#${id}`).value = value;

  $("#textProperties").classList.toggle("hidden", element.type !== "text");
  $("#shapeProperties").classList.toggle("hidden", element.type !== "shape");

  if (element.type === "text") {
    $("#propText").value = element.text;
    $("#propFontFamily").value = element.fontFamily;
    $("#propFontSize").value = element.fontSize;
    $("#propFontWeight").value = element.fontWeight;
    $("#propAlign").value = element.align;
    $("#propColor").value = element.color;
    $("#propLineHeight").value = element.lineHeight;
  }
  if (element.type === "shape") {
    $("#propFill").value = element.fill;
    $("#propRadius").value = element.radius;
  }
}

function beginDrag(event, id) {
  if (event.target.classList.contains("resize-handle")) return;
  const element = documentState.elements.find(item => item.id === id);
  if (!element || element.locked) return;
  event.preventDefault();
  selectedId = id;
  const origin = clone(documentState);
  const start = { x: event.clientX, y: event.clientY, elementX: element.x, elementY: element.y };

  function move(moveEvent) {
    const dx = (moveEvent.clientX - start.x) / scale;
    const dy = (moveEvent.clientY - start.y) / scale;
    const current = documentState.elements.find(item => item.id === id);
    updateSelected({ x: Math.round(start.elementX + dx), y: Math.round(start.elementY + dy) }, false);
  }
  function end() {
    window.removeEventListener("pointermove", move);
    window.removeEventListener("pointerup", end);
    historyPast.push(origin);
    historyFuture = [];
    scheduleSave();
  }
  window.addEventListener("pointermove", move);
  window.addEventListener("pointerup", end);
  render();
}

function beginResize(event, id) {
  event.preventDefault();
  event.stopPropagation();
  const element = documentState.elements.find(item => item.id === id);
  if (!element || element.locked) return;
  selectedId = id;
  const origin = clone(documentState);
  const start = { x: event.clientX, y: event.clientY, width: element.width, height: element.height };

  function move(moveEvent) {
    const width = Math.max(30, start.width + (moveEvent.clientX - start.x) / scale);
    const height = Math.max(30, start.height + (moveEvent.clientY - start.y) / scale);
    updateSelected({ width: Math.round(width), height: Math.round(height) }, false);
  }
  function end() {
    window.removeEventListener("pointermove", move);
    window.removeEventListener("pointerup", end);
    historyPast.push(origin);
    historyFuture = [];
    scheduleSave();
  }
  window.addEventListener("pointermove", move);
  window.addEventListener("pointerup", end);
}

function fitStage() {
  const viewport = $("#stageViewport");
  scale = Math.min((viewport.clientWidth - 100) / 1920, (viewport.clientHeight - 100) / 1080, 1);
  scaler.style.transform = `scale(${scale})`;
  scaler.style.width = `${1920 * scale}px`;
  scaler.style.height = `${1080 * scale}px`;
  $("#zoomLabel").textContent = `${Math.round(scale * 100)}%`;
}

function addElement(type) {
  const element = createElement(type);
  selectedId = element.id;
  commit({ ...documentState, elements: [...documentState.elements, element] });
}

function reorder(direction) {
  const elements = [...documentState.elements];
  const index = elements.findIndex(element => element.id === selectedId);
  const target = direction === "up" ? index + 1 : index - 1;
  if (index < 0 || target < 0 || target >= elements.length) return;
  [elements[index], elements[target]] = [elements[target], elements[index]];
  commit({ ...documentState, elements });
}

const simpleBindings = {
  propName: ["name", String],
  propX: ["x", Number],
  propY: ["y", Number],
  propWidth: ["width", Number],
  propHeight: ["height", Number],
  propRotation: ["rotation", Number],
  propOpacity: ["opacity", value => Number(value) / 100],
  propText: ["text", String],
  propFontFamily: ["fontFamily", String],
  propFontSize: ["fontSize", Number],
  propFontWeight: ["fontWeight", Number],
  propAlign: ["align", String],
  propColor: ["color", String],
  propLineHeight: ["lineHeight", Number],
  propFill: ["fill", String],
  propRadius: ["radius", Number]
};
for (const [id, [key, cast]] of Object.entries(simpleBindings)) {
  $(`#${id}`).addEventListener("change", event => updateSelected({ [key]: cast(event.target.value) }));
}

$("#addText").addEventListener("click", () => addElement("text"));
$("#addShape").addEventListener("click", () => addElement("shape"));
$("#deleteElement").addEventListener("click", () => {
  if (!selectedId) return;
  commit({ ...documentState, elements: documentState.elements.filter(element => element.id !== selectedId) });
  selectedId = null;
  render();
});
$("#bringForward").addEventListener("click", () => reorder("up"));
$("#sendBackward").addEventListener("click", () => reorder("down"));
$("#undo").addEventListener("click", undo);
$("#redo").addEventListener("click", redo);
$("#fitStage").addEventListener("click", fitStage);
$("#saveDocument").addEventListener("click", save);
$("#documentName").addEventListener("change", event => commit({ ...documentState, name: event.target.value }));
$("#documentBackground").addEventListener("change", event => commit({ ...documentState, background: event.target.value }));
window.addEventListener("resize", fitStage);
window.addEventListener("keydown", event => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "z") {
    event.preventDefault();
    event.shiftKey ? redo() : undo();
  }
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
    event.preventDefault();
    save();
  }
  if ((event.key === "Delete" || event.key === "Backspace") && selectedId && !["INPUT","TEXTAREA"].includes(document.activeElement.tagName)) {
    $("#deleteElement").click();
  }
});

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, char => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;" }[char]));
}

documentState = await api("/api/editor/document");
render();
requestAnimationFrame(fitStage);
