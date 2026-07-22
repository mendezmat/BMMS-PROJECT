const $ = selector => document.querySelector(selector);

let documentState;
let dataContext = {};
let selectedId = null;
let selectedComponentId = null;
let historyPast = [];
let historyFuture = [];
let scale = 0.5;
let saveTimer;

window.addEventListener("error", event => {
  console.error("BMMS Editor runtime error:", event.error || event.message);
  const indicator = document.querySelector("#saveIndicator");
  if (indicator) {
    indicator.textContent = "Error del editor";
    indicator.title = String(event.error?.message || event.message || "Error desconocido");
  }
});

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

function resolveTemplate(template, context = dataContext) {
  return String(template ?? "").replace(
    /\{\{\s*([a-zA-Z0-9_.-]+)\s*\}\}|\{\s*([a-zA-Z0-9_.-]+)\s*\}/g,
    (_, doublePath, singlePath) => {
      const path = doublePath || singlePath;
      const value = path
        .split(".")
        .reduce((current, key) => current != null ? current[key] : undefined, context);
      return value == null ? "" : String(value);
    }
  );
}

function commit(next) {
  historyPast.push(clone(documentState));
  if (historyPast.length > 50) historyPast.shift();
  documentState = clone(next);
  historyFuture = [];
  render();
  scheduleSave();
}

function scheduleSave() {
  $("#saveIndicator").textContent = "Sin guardar";
  clearTimeout(saveTimer);
  saveTimer = setTimeout(save, 450);
}

async function save() {
  documentState.updatedAt = new Date().toISOString();
  documentState = await api("/api/editor/document", {
    method: "POST",
    body: JSON.stringify(documentState)
  });
  $("#saveIndicator").textContent = "Guardado";
}

function undo() {
  if (!historyPast.length) return;
  historyFuture.push(clone(documentState));
  documentState = historyPast.pop();
  validateSelection();
  render();
  scheduleSave();
}

function redo() {
  if (!historyFuture.length) return;
  historyPast.push(clone(documentState));
  documentState = historyFuture.pop();
  validateSelection();
  render();
  scheduleSave();
}

function validateSelection() {
  if (!documentState.elements.some(element => element.id === selectedId)) selectedId = null;
  if (!documentState.elements.some(element => element.componentId === selectedComponentId)) {
    selectedComponentId = null;
  }
}

function selectedElement() {
  return documentState.elements.find(element => element.id === selectedId) || null;
}

function selectedComponentElements() {
  if (!selectedComponentId) return [];
  return documentState.elements.filter(element => element.componentId === selectedComponentId);
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

  if (type === "text") {
    return {
      ...base,
      text: "Nuevo texto",
      contentMode: "manual",
      bindingTemplate: "{scripture.text}",
      fontFamily: "Inter",
      fontSize: 72,
      fontWeight: 700,
      lineHeight: 1.1,
      color: "#ffffff",
      align: "left"
    };
  }

  return { ...base, fill: "#2c73ff", radius: 24 };
}

function updateSelected(patch, useHistory = true) {
  if (!selectedId) return;
  const next = {
    ...documentState,
    elements: documentState.elements.map(element =>
      element.id === selectedId ? { ...element, ...patch } : element
    )
  };

  if (useHistory) commit(next);
  else {
    documentState = next;
    render();
  }
}

function updateComponentPosition(componentId, dx, dy) {
  documentState = {
    ...documentState,
    elements: documentState.elements.map(element =>
      element.componentId === componentId
        ? { ...element, x: element.x + dx, y: element.y + dy }
        : element
    )
  };
  render();
}

function render() {
  $("#documentName").value = documentState.name;
  $("#documentBackground").value = documentState.background || "#0d1015";
  $("#documentTransparent").checked = documentState.outputTransparent === true;
  stage.style.backgroundColor =
    documentState.outputTransparent === true
      ? "transparent"
      : (documentState.background || "#0d1015");
  stage.innerHTML = `
    <div id="safeArea" class="safe-area ${$("#toggleSafe")?.checked ? "" : "hidden"}">
      <div class="action-safe"></div>
      <div class="title-safe"></div>
    </div>
    <div id="guideX" class="smart-guide vertical hidden"></div>
    <div id="guideY" class="smart-guide horizontal hidden"></div>
  `;

  documentState.elements.forEach((element, index) => {
    if (element.visible === false) return;

    const node = document.createElement("div");
    const isSelected = element.id === selectedId;
    const isComponentSelected =
      selectedComponentId && element.componentId === selectedComponentId;

    node.className = [
      "editor-element",
      `${element.type}-element`,
      isSelected ? "selected" : "",
      isComponentSelected ? "component-selected" : "",
      element.locked ? "locked" : ""
    ].filter(Boolean).join(" ");

    node.dataset.id = element.id;
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
      node.textContent =
        element.contentMode === "binding"
          ? resolveTemplate(element.bindingTemplate || element.text)
          : element.text;
      Object.assign(node.style, {
        fontFamily: element.fontFamily || "Inter",
        fontSize: `${element.fontSize || 48}px`,
        fontWeight: element.fontWeight || 400,
        lineHeight: element.lineHeight || 1.1,
        color: element.color || "#ffffff",
        textAlign: element.align || "left",
        justifyContent:
          element.align === "center"
            ? "center"
            : element.align === "right"
              ? "flex-end"
              : "flex-start"
      });
    } else {
      node.style.background = element.fill || "#ffffff";
      node.style.borderRadius = `${element.radius || 0}px`;
    }

    if (isSelected && !element.locked) {
      addResizeHandles(node);
    }

    if (
      isComponentSelected &&
      element.componentId &&
      element === selectedComponentElements()[0]
    ) {
      const badge = document.createElement("div");
      badge.className = "component-badge";
      badge.textContent = element.componentType === "scripture" ? "VERSÍCULO" : "LOWER THIRD";
      node.appendChild(badge);
    }

    node.addEventListener("pointerdown", event => beginDrag(event, element.id));
    stage.appendChild(node);
  });

  renderLayers();
  renderProperties();
  $("#undo").disabled = historyPast.length === 0;
  $("#redo").disabled = historyFuture.length === 0;
  $("#elementCount").textContent = documentState.elements.length;
}

function addResizeHandles(node) {
  for (const position of ["nw", "n", "ne", "e", "se", "s", "sw", "w"]) {
    const handle = document.createElement("div");
    handle.className = `resize-handle h-${position}`;
    handle.dataset.position = position;
    handle.addEventListener("pointerdown", event =>
      beginResize(event, node.dataset.id, position)
    );
    node.appendChild(handle);
  }
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

    row.addEventListener("click", event => {
      selectedId = element.id;
      selectedComponentId = event.altKey ? element.componentId || null : null;
      render();
    });

    row.querySelector(".layer-lock").addEventListener("click", event => {
      event.stopPropagation();
      selectedId = element.id;
      selectedComponentId = null;
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
    propRotation: element.rotation || 0,
    propOpacity: Math.round((element.opacity ?? 1) * 100)
  };
  for (const [id, value] of Object.entries(values)) $(`#${id}`).value = value;

  $("#textProperties").classList.toggle("hidden", element.type !== "text");
  $("#shapeProperties").classList.toggle("hidden", element.type !== "shape");
  $("#bindingProperties").classList.toggle("hidden", element.type !== "text");

  if (element.type === "text") {
    $("#propText").value = element.text || "";
    $("#propFontFamily").value = element.fontFamily || "Inter";
    $("#propFontSize").value = element.fontSize || 48;
    $("#propFontWeight").value = element.fontWeight || 400;
    $("#propAlign").value = element.align || "left";
    $("#propColor").value = element.color || "#ffffff";
    $("#propLineHeight").value = element.lineHeight || 1.1;
    $("#propContentMode").value = element.contentMode || "manual";
    $("#propBindingTemplate").value =
      element.bindingTemplate || "{scripture.text}";
    $("#bindingEditor").classList.toggle(
      "hidden",
      (element.contentMode || "manual") !== "binding"
    );
    $("#bindingPreview").textContent = resolveTemplate(
      element.bindingTemplate || element.text
    );
  }

  if (element.type === "shape") {
    $("#propFill").value = element.fill || "#ffffff";
    $("#propRadius").value = element.radius || 0;
  }
}

function beginDrag(event, id) {
  if (event.target.classList.contains("resize-handle")) return;

  const element = documentState.elements.find(item => item.id === id);
  if (!element || element.locked) return;

  event.preventDefault();
  selectedId = id;
  selectedComponentId = event.altKey ? element.componentId || null : null;

  const origin = clone(documentState);
  const start = {
    pointerX: event.clientX,
    pointerY: event.clientY,
    elementX: element.x,
    elementY: element.y
  };

  function move(moveEvent) {
    const dx = Math.round((moveEvent.clientX - start.pointerX) / scale);
    const dy = Math.round((moveEvent.clientY - start.pointerY) / scale);

    if (selectedComponentId) {
      documentState = clone(origin);
      updateComponentPosition(selectedComponentId, dx, dy);
    } else {
      updateSelected(
        { x: start.elementX + dx, y: start.elementY + dy },
        false
      );
    }
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

function beginResize(event, id, position) {
  event.preventDefault();
  event.stopPropagation();

  const element = documentState.elements.find(item => item.id === id);
  if (!element || element.locked) return;

  selectedId = id;
  selectedComponentId = null;
  const origin = clone(documentState);
  const start = {
    pointerX: event.clientX,
    pointerY: event.clientY,
    x: element.x,
    y: element.y,
    width: element.width,
    height: element.height
  };

  function move(moveEvent) {
    const dx = (moveEvent.clientX - start.pointerX) / scale;
    const dy = (moveEvent.clientY - start.pointerY) / scale;
    const patch = {};

    if (position.includes("e")) patch.width = Math.max(30, start.width + dx);
    if (position.includes("s")) patch.height = Math.max(30, start.height + dy);
    if (position.includes("w")) {
      patch.width = Math.max(30, start.width - dx);
      patch.x = start.x + (start.width - patch.width);
    }
    if (position.includes("n")) {
      patch.height = Math.max(30, start.height - dy);
      patch.y = start.y + (start.height - patch.height);
    }

    updateSelected(
      Object.fromEntries(
        Object.entries(patch).map(([key, value]) => [key, Math.round(value)])
      ),
      false
    );
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
  const horizontalPadding = 64;
  const verticalPadding = 64;
  const availableWidth = Math.max(320, viewport.clientWidth - horizontalPadding);
  const availableHeight = Math.max(180, viewport.clientHeight - verticalPadding);
  scale = Math.min(availableWidth / 1920, availableHeight / 1080, 1);
  setScale(scale);
  viewport.scrollTop = 0;
  viewport.scrollLeft = Math.max(0, (viewport.scrollWidth - viewport.clientWidth) / 2);
}

function setScale(nextScale) {
  scale = Math.max(0.25, Math.min(2, nextScale));
  scaler.style.transform = "none";
  scaler.style.width = `${1920 * scale}px`;
  scaler.style.height = `${1080 * scale}px`;
  stage.style.transformOrigin = "top left";
  stage.style.transform = `scale(${scale})`;
  $("#zoomLabel").textContent = `${Math.round(scale * 100)}%`;
}

function addElement(type) {
  const element = createElement(type);
  selectedId = element.id;
  selectedComponentId = null;
  commit({ ...documentState, elements: [...documentState.elements, element] });
}

async function addBroadcastComponent(type) {
  const origin = clone(documentState);
  const response = await api(`/api/editor/components/${type}`, {
    method: "POST",
    body: JSON.stringify({
      x: type === "scripture" ? 150 : 140,
      y: type === "scripture" ? 650 : 785
    })
  });
  const added = response.elements || [];
  documentState = response.document;
  selectedId = added.find(element => element.type === "text")?.id || added[0]?.id || null;
  selectedComponentId = added[0]?.componentId || null;
  historyPast.push(origin);
  historyFuture = [];
  render();
  $("#componentsPanel").classList.add("hidden");
}

function reorder(direction) {
  const elements = [...documentState.elements];
  const index = elements.findIndex(element => element.id === selectedId);
  const target = direction === "up" ? index + 1 : index - 1;
  if (index < 0 || target < 0 || target >= elements.length) return;
  [elements[index], elements[target]] = [elements[target], elements[index]];
  commit({ ...documentState, elements });
}

function deleteSelection() {
  if (selectedComponentId) {
    commit({
      ...documentState,
      elements: documentState.elements.filter(
        element => element.componentId !== selectedComponentId
      )
    });
  } else if (selectedId) {
    commit({
      ...documentState,
      elements: documentState.elements.filter(
        element => element.id !== selectedId
      )
    });
  }
  selectedId = null;
  selectedComponentId = null;
  render();
}

const propertyBindings = {
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
  propRadius: ["radius", Number],
  propContentMode: ["contentMode", String],
  propBindingTemplate: ["bindingTemplate", String]
};

for (const [id, [key, cast]] of Object.entries(propertyBindings)) {
  $(`#${id}`).addEventListener("change", event =>
    updateSelected({ [key]: cast(event.target.value) })
  );
}

$("#addText").addEventListener("click", () => addElement("text"));
$("#addShape").addEventListener("click", () => addElement("shape"));
$("#deleteElement").addEventListener("click", deleteSelection);
$("#bringForward").addEventListener("click", () => reorder("up"));
$("#sendBackward").addEventListener("click", () => reorder("down"));
$("#undo").addEventListener("click", undo);
$("#redo").addEventListener("click", redo);
$("#zoomSelect")?.addEventListener("change", event => {
  if (event.target.value === "fit") {
    fitStage();
  } else {
    setScale(Number(event.target.value));
  }
});
$("#saveDocument").addEventListener("click", save);

$("#documentName").addEventListener("change", event =>
  commit({ ...documentState, name: event.target.value })
);
$("#documentBackground").addEventListener("change", event =>
  commit({ ...documentState, background: event.target.value })
);
$("#toggleSafe")?.addEventListener("change", () => render());
$("#toggleGrid")?.addEventListener("change", event =>
  $("#stageViewport")?.classList.toggle("no-grid", !event.target.checked)
);

$("#documentTransparent").addEventListener("change", event =>
  commit({ ...documentState, outputTransparent: event.target.checked })
);

$("#openComponents")?.addEventListener("click", () =>
  $("#componentsPanel")?.classList.toggle("hidden")
);
$("#closeComponents")?.addEventListener("click", () =>
  $("#componentsPanel")?.classList.add("hidden")
);
document.querySelectorAll("[data-component]").forEach(button => {
  button.addEventListener("click", () =>
    addBroadcastComponent(button.dataset.component)
  );
});

document.querySelectorAll("[data-binding]").forEach(button => {
  button.addEventListener("click", () => {
    const element = selectedElement();
    if (!element || element.type !== "text") return;
    const token = button.dataset.binding;
    const current = $("#propBindingTemplate").value || "";
    const next =
      current && !current.endsWith(" ")
        ? `${current} ${token}`
        : `${current}${token}`;
    $("#propBindingTemplate").value = next;
    updateSelected({ contentMode: "binding", bindingTemplate: next });
  });
});

window.addEventListener("resize", fitStage);
$("#stageViewport").addEventListener(
  "wheel",
  event => {
    if (!event.ctrlKey) return;
    event.preventDefault();
    setScale(scale + (event.deltaY < 0 ? 0.1 : -0.1));
  },
  { passive: false }
);

window.addEventListener("keydown", event => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "z") {
    event.preventDefault();
    event.shiftKey ? redo() : undo();
  }
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
    event.preventDefault();
    save();
  }
  if (
    (event.key === "Delete" || event.key === "Backspace") &&
    selectedId &&
    !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)
  ) {
    deleteSelection();
  }
  if (event.key === "Escape") {
    selectedId = null;
    selectedComponentId = null;
    $("#componentsPanel").classList.add("hidden");
    render();
  }
});

function escapeHtml(text) {
  return String(text).replace(
    /[&<>"']/g,
    char =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      })[char]
  );
}

const outputState = await api("/api/graphics/output");
dataContext = outputState.context || {};
documentState = await api("/api/editor/document");

const eventStream = new EventSource("/api/app-events");
for (const eventName of ["scripture-updated", "lower-third-updated"]) {
  eventStream.addEventListener(eventName, async () => {
    dataContext = (await api("/api/graphics/output")).context || {};
    render();
  });
}

render();
requestAnimationFrame(() => {
  fitStage();
  if ($("#zoomSelect")) $("#zoomSelect").value = "fit";
});
