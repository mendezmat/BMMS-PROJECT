const $ = selector => document.querySelector(selector);

let documentState;
let dataContext = {};
let selectedIds = new Set();
let historyPast = [];
let historyFuture = [];
let clipboardElements = [];
let scale = 0.5;
let saveTimer;
let pasteOffset = 0;
let templates = [];

const stage = $("#stage");
const scaler = $("#stageScaler");

window.addEventListener("error", event => {
  console.error("BMMS Editor runtime error:", event.error || event.message);
  const indicator = $("#saveIndicator");
  if (indicator) {
    indicator.textContent = "Error del editor";
    indicator.title = String(event.error?.message || event.message || "");
  }
});

async function api(path, options = {}) {
  const response = await fetch(path, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error || "No se pudo completar la operación.");
  return body;
}

const clone = value => structuredClone(value);

function resolveTemplate(template, context = dataContext) {
  return String(template ?? "").replace(
    /\{\{\s*([a-zA-Z0-9_.-]+)\s*\}\}|\{\s*([a-zA-Z0-9_.-]+)\s*\}/g,
    (_, doublePath, singlePath) => {
      const value = (doublePath || singlePath)
        .split(".")
        .reduce((current, key) => current != null ? current[key] : undefined, context);
      return value == null ? "" : String(value);
    }
  );
}

function commit(next) {
  historyPast.push(clone(documentState));
  if (historyPast.length > 80) historyPast.shift();
  documentState = clone(next);
  historyFuture = [];
  validateSelection();
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
  const ids = new Set(documentState.elements.map(element => element.id));
  selectedIds = new Set([...selectedIds].filter(id => ids.has(id)));
}

function selectedElements() {
  return documentState.elements.filter(element => selectedIds.has(element.id));
}

function primarySelected() {
  const id = [...selectedIds][selectedIds.size - 1];
  return documentState.elements.find(element => element.id === id) || null;
}

function selectOnly(id) {
  selectedIds = id ? new Set([id]) : new Set();
  render();
}

function toggleSelection(id) {
  if (selectedIds.has(id)) selectedIds.delete(id);
  else selectedIds.add(id);
  render();
}

function selectGroup(groupId) {
  selectedIds = new Set(
    documentState.elements
      .filter(element => element.groupId === groupId || element.componentId === groupId)
      .map(element => element.id)
  );
  render();
}

function createElement(type) {
  const base = {
    id: crypto.randomUUID(),
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
    ? {
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
      }
    : { ...base, fill: "#2c73ff", radius: 24 };
}

function updateSelection(patch, useHistory = true) {
  if (!selectedIds.size) return;
  const next = {
    ...documentState,
    elements: documentState.elements.map(element =>
      selectedIds.has(element.id) ? { ...element, ...patch } : element
    )
  };
  if (useHistory) commit(next);
  else {
    documentState = next;
    render();
  }
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
      <div class="action-safe"></div><div class="title-safe"></div>
    </div>
  `;

  documentState.elements.forEach((element, index) => {
    if (element.visible === false) return;
    const node = document.createElement("div");
    const selected = selectedIds.has(element.id);
    node.className = [
      "editor-element",
      `${element.type}-element`,
      selected && selectedIds.size === 1 ? "selected" : "",
      selected && selectedIds.size > 1 ? "multi-selected" : "",
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
        color: element.color || "#fff",
        textAlign: element.align || "left",
        justifyContent:
          element.align === "center" ? "center" :
          element.align === "right" ? "flex-end" : "flex-start"
      });
    } else {
      node.style.background = element.fill || "#fff";
      node.style.borderRadius = `${element.radius || 0}px`;
    }

    if (selected && selectedIds.size === 1 && !element.locked) addResizeHandles(node);
    node.addEventListener("pointerdown", event => beginElementDrag(event, element.id));
    stage.appendChild(node);
  });

  stage.addEventListener("pointerdown", beginMarqueeSelection);
  renderLayers();
  renderProperties();

  $("#undo").disabled = historyPast.length === 0;
  $("#redo").disabled = historyFuture.length === 0;
  $("#elementCount").textContent = documentState.elements.length;
  $("#duplicateSelection").disabled = selectedIds.size === 0;
  $("#groupSelection").disabled = selectedIds.size < 2;
  $("#ungroupSelection").disabled = !selectedElements().some(element => element.groupId);
}

function addResizeHandles(node) {
  for (const position of ["nw", "n", "ne", "e", "se", "s", "sw", "w"]) {
    const handle = document.createElement("div");
    handle.className = `resize-handle h-${position}`;
    handle.addEventListener("pointerdown", event =>
      beginResize(event, node.dataset.id, position)
    );
    node.appendChild(handle);
  }
}

function renderLayers() {
  const container = $("#layers");
  container.innerHTML = "";

  [...documentState.elements].reverse().forEach(element => {
    const row = document.createElement("div");
    row.className = [
      "layer",
      selectedIds.has(element.id) ? "selected" : "",
      selectedIds.has(element.id) && selectedIds.size > 1 ? "multi-selected" : ""
    ].filter(Boolean).join(" ");
    row.draggable = true;
    row.dataset.id = element.id;

    row.innerHTML = `
      <button class="layer-visibility" title="Mostrar/Ocultar">${element.visible === false ? "○" : "●"}</button>
      <span class="group-badge">${element.groupId || element.componentId ? "G" : element.type === "text" ? "T" : "▰"}</span>
      <span class="layer-name" title="Doble clic para renombrar">${escapeHtml(element.name)}</span>
      <button class="layer-lock" title="Bloquear">${element.locked ? "●" : "○"}</button>
      <span class="layer-icon">⋮⋮</span>
    `;

    row.addEventListener("click", event => {
      if (event.target.closest("button")) return;
      if (event.shiftKey || event.ctrlKey || event.metaKey) toggleSelection(element.id);
      else if (event.altKey && (element.groupId || element.componentId)) {
        selectGroup(element.groupId || element.componentId);
      } else selectOnly(element.id);
    });

    row.querySelector(".layer-visibility").addEventListener("click", event => {
      event.stopPropagation();
      selectedIds = new Set([element.id]);
      updateSelection({ visible: element.visible === false });
    });

    row.querySelector(".layer-lock").addEventListener("click", event => {
      event.stopPropagation();
      selectedIds = new Set([element.id]);
      updateSelection({ locked: !element.locked });
    });

    row.querySelector(".layer-name").addEventListener("dblclick", event => {
      event.stopPropagation();
      const input = document.createElement("input");
      input.className = "layer-name-input";
      input.value = element.name;
      event.target.replaceWith(input);
      input.focus();
      input.select();
      const finish = () => {
        selectedIds = new Set([element.id]);
        updateSelection({ name: input.value.trim() || element.name });
      };
      input.addEventListener("blur", finish, { once: true });
      input.addEventListener("keydown", keyEvent => {
        if (keyEvent.key === "Enter") input.blur();
        if (keyEvent.key === "Escape") renderLayers();
      });
    });

    row.addEventListener("dragstart", event => {
      event.dataTransfer.setData("text/plain", element.id);
      event.dataTransfer.effectAllowed = "move";
    });
    row.addEventListener("dragover", event => event.preventDefault());
    row.addEventListener("drop", event => {
      event.preventDefault();
      reorderByDrop(event.dataTransfer.getData("text/plain"), element.id);
    });

    container.appendChild(row);
  });
}

function renderProperties() {
  const count = selectedIds.size;
  const primary = primarySelected();

  $("#emptyProperties").classList.toggle("hidden", count > 0);
  $("#elementProperties").classList.toggle("hidden", count !== 1);
  $("#multiProperties").classList.toggle("hidden", count < 2);
  $("#deleteElement").disabled = count === 0;

  if (count >= 2) {
    $("#selectionCount").textContent = `${count} elementos`;
    return;
  }
  if (!primary) return;

  const values = {
    propName: primary.name,
    propX: Math.round(primary.x),
    propY: Math.round(primary.y),
    propWidth: Math.round(primary.width),
    propHeight: Math.round(primary.height),
    propRotation: primary.rotation || 0,
    propOpacity: Math.round((primary.opacity ?? 1) * 100)
  };
  for (const [id, value] of Object.entries(values)) $(`#${id}`).value = value;

  $("#textProperties").classList.toggle("hidden", primary.type !== "text");
  $("#shapeProperties").classList.toggle("hidden", primary.type !== "shape");
  $("#bindingProperties").classList.toggle("hidden", primary.type !== "text");

  if (primary.type === "text") {
    $("#propText").value = primary.text || "";
    $("#propFontFamily").value = primary.fontFamily || "Inter";
    $("#propFontSize").value = primary.fontSize || 48;
    $("#propFontWeight").value = primary.fontWeight || 400;
    $("#propAlign").value = primary.align || "left";
    $("#propColor").value = primary.color || "#ffffff";
    $("#propLineHeight").value = primary.lineHeight || 1.1;
    $("#propContentMode").value = primary.contentMode || "manual";
    $("#propBindingTemplate").value = primary.bindingTemplate || "{scripture.text}";
    $("#bindingEditor").classList.toggle("hidden", (primary.contentMode || "manual") !== "binding");
    $("#bindingPreview").textContent = resolveTemplate(primary.bindingTemplate || primary.text);
  } else {
    $("#propFill").value = primary.fill || "#ffffff";
    $("#propRadius").value = primary.radius || 0;
  }
}

function beginElementDrag(event, id) {
  if (event.target.classList.contains("resize-handle")) return;
  const clicked = documentState.elements.find(element => element.id === id);
  if (!clicked || clicked.locked) return;

  event.preventDefault();
  event.stopPropagation();

  if (event.shiftKey || event.ctrlKey || event.metaKey) {
    if (!selectedIds.has(id)) selectedIds.add(id);
  } else if (event.altKey && (clicked.groupId || clicked.componentId)) {
    selectGroup(clicked.groupId || clicked.componentId);
  } else if (!selectedIds.has(id)) {
    selectedIds = new Set([id]);
  }

  const movable = selectedElements().filter(element => !element.locked);
  const origin = clone(documentState);
  const startPositions = new Map(movable.map(element => [element.id, { x: element.x, y: element.y }]));
  const startX = event.clientX;
  const startY = event.clientY;

  function move(moveEvent) {
    const dx = Math.round((moveEvent.clientX - startX) / scale);
    const dy = Math.round((moveEvent.clientY - startY) / scale);
    documentState = {
      ...origin,
      elements: origin.elements.map(element => {
        const start = startPositions.get(element.id);
        return start ? { ...element, x: start.x + dx, y: start.y + dy } : element;
      })
    };
    render();
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

  selectedIds = new Set([id]);
  const origin = clone(documentState);
  const start = {
    pointerX: event.clientX, pointerY: event.clientY,
    x: element.x, y: element.y, width: element.width, height: element.height
  };

  function move(moveEvent) {
    const dx = (moveEvent.clientX - start.pointerX) / scale;
    const dy = (moveEvent.clientY - start.pointerY) / scale;
    const patch = {};
    if (position.includes("e")) patch.width = Math.max(30, start.width + dx);
    if (position.includes("s")) patch.height = Math.max(30, start.height + dy);
    if (position.includes("w")) {
      patch.width = Math.max(30, start.width - dx);
      patch.x = start.x + start.width - patch.width;
    }
    if (position.includes("n")) {
      patch.height = Math.max(30, start.height - dy);
      patch.y = start.y + start.height - patch.height;
    }
    updateSelection(
      Object.fromEntries(Object.entries(patch).map(([key, value]) => [key, Math.round(value)])),
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

function beginMarqueeSelection(event) {
  if (event.target !== stage) return;
  event.preventDefault();
  const rect = stage.getBoundingClientRect();
  const startX = (event.clientX - rect.left) / scale;
  const startY = (event.clientY - rect.top) / scale;
  const marquee = document.createElement("div");
  marquee.className = "selection-marquee";
  stage.appendChild(marquee);

  function move(moveEvent) {
    const currentX = (moveEvent.clientX - rect.left) / scale;
    const currentY = (moveEvent.clientY - rect.top) / scale;
    const left = Math.min(startX, currentX);
    const top = Math.min(startY, currentY);
    const width = Math.abs(currentX - startX);
    const height = Math.abs(currentY - startY);
    Object.assign(marquee.style, {
      left: `${left}px`, top: `${top}px`, width: `${width}px`, height: `${height}px`
    });

    const next = new Set();
    for (const element of documentState.elements) {
      const intersects =
        element.x < left + width &&
        element.x + element.width > left &&
        element.y < top + height &&
        element.y + element.height > top;
      if (intersects) next.add(element.id);
    }
    selectedIds = next;
    renderLayers();
    renderProperties();
  }

  function end() {
    marquee.remove();
    window.removeEventListener("pointermove", move);
    window.removeEventListener("pointerup", end);
    render();
  }
  window.addEventListener("pointermove", move);
  window.addEventListener("pointerup", end);
}

function addElement(type) {
  const element = createElement(type);
  selectedIds = new Set([element.id]);
  commit({ ...documentState, elements: [...documentState.elements, element] });
}

async function addBroadcastComponent(type) {
  const origin = clone(documentState);
  const response = await api(`/api/editor/components/${type}`, {
    method: "POST",
    body: JSON.stringify({ x: type === "scripture" ? 150 : 140, y: type === "scripture" ? 650 : 785 })
  });
  documentState = response.document;
  selectedIds = new Set((response.elements || []).map(element => element.id));
  historyPast.push(origin);
  historyFuture = [];
  render();
  $("#componentsPanel").classList.add("hidden");
}

function copySelection() {
  clipboardElements = clone(selectedElements());
  pasteOffset = 0;
}

function pasteSelection() {
  if (!clipboardElements.length) return;
  pasteOffset += 30;
  const groupMap = new Map();
  const componentMap = new Map();
  const pasted = clipboardElements.map(element => {
    if (element.groupId && !groupMap.has(element.groupId)) groupMap.set(element.groupId, crypto.randomUUID());
    if (element.componentId && !componentMap.has(element.componentId)) componentMap.set(element.componentId, crypto.randomUUID());
    return {
      ...clone(element),
      id: crypto.randomUUID(),
      name: `${element.name} copia`,
      x: element.x + pasteOffset,
      y: element.y + pasteOffset,
      groupId: element.groupId ? groupMap.get(element.groupId) : undefined,
      componentId: element.componentId ? componentMap.get(element.componentId) : undefined
    };
  });
  selectedIds = new Set(pasted.map(element => element.id));
  commit({ ...documentState, elements: [...documentState.elements, ...pasted] });
}

function duplicateSelection() {
  copySelection();
  pasteSelection();
}

function deleteSelection() {
  if (!selectedIds.size) return;
  commit({
    ...documentState,
    elements: documentState.elements.filter(element => !selectedIds.has(element.id))
  });
  selectedIds.clear();
  render();
}

function groupSelection() {
  if (selectedIds.size < 2) return;
  const groupId = crypto.randomUUID();
  updateSelection({ groupId });
}

function ungroupSelection() {
  if (!selectedIds.size) return;
  updateSelection({ groupId: undefined });
}

function alignSelection(mode) {
  const elements = selectedElements();
  if (elements.length < 2) return;
  const bounds = selectionBounds(elements);
  const next = {
    ...documentState,
    elements: documentState.elements.map(element => {
      if (!selectedIds.has(element.id)) return element;
      if (mode === "left") return { ...element, x: bounds.left };
      if (mode === "right") return { ...element, x: bounds.right - element.width };
      if (mode === "top") return { ...element, y: bounds.top };
      if (mode === "bottom") return { ...element, y: bounds.bottom - element.height };
      if (mode === "centerX") return { ...element, x: bounds.left + (bounds.width - element.width) / 2 };
      if (mode === "centerY") return { ...element, y: bounds.top + (bounds.height - element.height) / 2 };
      return element;
    })
  };
  commit(next);
}

function distributeSelection(axis) {
  const elements = selectedElements();
  if (elements.length < 3) return;
  const sorted = [...elements].sort((a, b) => axis === "horizontal" ? a.x - b.x : a.y - b.y);
  const first = sorted[0];
  const last = sorted[sorted.length - 1];
  const totalSize = sorted.reduce((sum, element) => sum + (axis === "horizontal" ? element.width : element.height), 0);
  const span = axis === "horizontal"
    ? last.x + last.width - first.x
    : last.y + last.height - first.y;
  const gap = (span - totalSize) / (sorted.length - 1);
  let cursor = axis === "horizontal" ? first.x : first.y;
  const positions = new Map();
  for (const element of sorted) {
    positions.set(element.id, cursor);
    cursor += (axis === "horizontal" ? element.width : element.height) + gap;
  }
  commit({
    ...documentState,
    elements: documentState.elements.map(element =>
      positions.has(element.id)
        ? { ...element, [axis === "horizontal" ? "x" : "y"]: positions.get(element.id) }
        : element
    )
  });
}

function selectionBounds(elements) {
  const left = Math.min(...elements.map(element => element.x));
  const top = Math.min(...elements.map(element => element.y));
  const right = Math.max(...elements.map(element => element.x + element.width));
  const bottom = Math.max(...elements.map(element => element.y + element.height));
  return { left, top, right, bottom, width: right - left, height: bottom - top };
}

function reorderByDrop(draggedId, targetId) {
  if (!draggedId || draggedId === targetId) return;
  const elements = [...documentState.elements];
  const from = elements.findIndex(element => element.id === draggedId);
  const to = elements.findIndex(element => element.id === targetId);
  if (from < 0 || to < 0) return;
  const [moved] = elements.splice(from, 1);
  elements.splice(to, 0, moved);
  commit({ ...documentState, elements });
}

function reorder(direction) {
  if (selectedIds.size !== 1) return;
  const id = [...selectedIds][0];
  const elements = [...documentState.elements];
  const index = elements.findIndex(element => element.id === id);
  const target = direction === "up" ? index + 1 : index - 1;
  if (target < 0 || target >= elements.length) return;
  [elements[index], elements[target]] = [elements[target], elements[index]];
  commit({ ...documentState, elements });
}

function nudge(dx, dy) {
  if (!selectedIds.size) return;
  const origin = clone(documentState);
  documentState = {
    ...documentState,
    elements: documentState.elements.map(element =>
      selectedIds.has(element.id) && !element.locked
        ? { ...element, x: element.x + dx, y: element.y + dy }
        : element
    )
  };
  historyPast.push(origin);
  historyFuture = [];
  render();
  scheduleSave();
}

function fitStage() {
  const viewport = $("#stageViewport");
  const availableWidth = Math.max(320, viewport.clientWidth - 64);
  const availableHeight = Math.max(180, viewport.clientHeight - 64);
  setScale(Math.min(availableWidth / 1920, availableHeight / 1080, 1));
  viewport.scrollTop = 0;
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

const propertyBindings = {
  propName: ["name", String],
  propX: ["x", Number], propY: ["y", Number],
  propWidth: ["width", Number], propHeight: ["height", Number],
  propRotation: ["rotation", Number],
  propOpacity: ["opacity", value => Number(value) / 100],
  propText: ["text", String], propFontFamily: ["fontFamily", String],
  propFontSize: ["fontSize", Number], propFontWeight: ["fontWeight", Number],
  propAlign: ["align", String], propColor: ["color", String],
  propLineHeight: ["lineHeight", Number], propFill: ["fill", String],
  propRadius: ["radius", Number], propContentMode: ["contentMode", String],
  propBindingTemplate: ["bindingTemplate", String]
};

for (const [id, [key, cast]] of Object.entries(propertyBindings)) {
  $(`#${id}`).addEventListener("change", event => updateSelection({ [key]: cast(event.target.value) }));
}

$("#addText").addEventListener("click", () => addElement("text"));
$("#addShape").addEventListener("click", () => addElement("shape"));
$("#deleteElement").addEventListener("click", deleteSelection);
$("#duplicateSelection").addEventListener("click", duplicateSelection);
$("#groupSelection").addEventListener("click", groupSelection);
$("#ungroupSelection").addEventListener("click", ungroupSelection);
$("#bringForward").addEventListener("click", () => reorder("up"));
$("#sendBackward").addEventListener("click", () => reorder("down"));
$("#undo").addEventListener("click", undo);
$("#redo").addEventListener("click", redo);
$("#saveDocument").addEventListener("click", save);

$("#zoomSelect").addEventListener("change", event =>
  event.target.value === "fit" ? fitStage() : setScale(Number(event.target.value))
);
$("#documentName").addEventListener("change", event =>
  commit({ ...documentState, name: event.target.value })
);
$("#documentBackground").addEventListener("change", event =>
  commit({ ...documentState, background: event.target.value })
);
$("#documentTransparent").addEventListener("change", event =>
  commit({ ...documentState, outputTransparent: event.target.checked })
);
$("#toggleSafe").addEventListener("change", render);
$("#toggleGrid").addEventListener("change", event =>
  $("#stageViewport").classList.toggle("no-grid", !event.target.checked)
);
$("#openComponents").addEventListener("click", () => $("#componentsPanel").classList.toggle("hidden"));
$("#closeComponents").addEventListener("click", () => $("#componentsPanel").classList.add("hidden"));

document.querySelectorAll("[data-component]").forEach(button =>
  button.addEventListener("click", () => addBroadcastComponent(button.dataset.component))
);
document.querySelectorAll("[data-binding]").forEach(button =>
  button.addEventListener("click", () => {
    const element = primarySelected();
    if (!element || element.type !== "text") return;
    const token = button.dataset.binding;
    const current = $("#propBindingTemplate").value || "";
    const next = current && !current.endsWith(" ") ? `${current} ${token}` : `${current}${token}`;
    $("#propBindingTemplate").value = next;
    updateSelection({ contentMode: "binding", bindingTemplate: next });
  })
);
document.querySelectorAll("[data-align]").forEach(button =>
  button.addEventListener("click", () => alignSelection(button.dataset.align))
);
document.querySelectorAll("[data-distribute]").forEach(button =>
  button.addEventListener("click", () => distributeSelection(button.dataset.distribute))
);


async function loadTemplates() {
  const response = await api("/api/templates");
  templates = response.templates || [];
  renderTemplates();
  $("#saveIndicator").textContent = "Guardado";
  $("#saveIndicator").title = "";
}

function renderTemplates() {
  const list = $("#templateList");
  if (!list) return;
  const search = ($("#templateSearch")?.value || "").trim().toLowerCase();
  const category = $("#templateCategoryFilter")?.value || "all";
  const filtered = templates
    .filter(template => category === "all" || template.category === category)
    .filter(template => template.name.toLowerCase().includes(search))
    .sort((a, b) => Number(b.favorite) - Number(a.favorite) || a.name.localeCompare(b.name));

  list.innerHTML = "";
  if (!filtered.length) {
    list.innerHTML = '<div class="template-empty">No hay plantillas en esta categoría.</div>';
    return;
  }

  filtered.forEach(template => {
    const card = document.createElement("article");
    card.className = "template-card";
    card.innerHTML = `
      <div class="template-preview"></div>
      <div class="template-card-body">
        <div class="template-card-title">
          <strong>${escapeHtml(template.name)}</strong>
          <span class="template-category">${escapeHtml(template.category)}</span>
        </div>
        <div class="template-card-actions">
          <button data-action="load">Abrir</button>
          <button data-action="duplicate">Duplicar</button>
          <button data-action="favorite" class="${template.favorite ? "favorite-active" : ""}">★</button>
          <button data-action="delete" class="danger">×</button>
        </div>
      </div>
    `;
    renderTemplatePreview(card.querySelector(".template-preview"), template.document);

    card.querySelector('[data-action="load"]').onclick = () => loadTemplate(template.id);
    card.querySelector('[data-action="duplicate"]').onclick = () => duplicateTemplateItem(template);
    card.querySelector('[data-action="favorite"]').onclick = () =>
      patchTemplate(template.id, { favorite: !template.favorite });
    card.querySelector('[data-action="delete"]').onclick = () => deleteTemplateItem(template);
    list.appendChild(card);
  });
}

function renderTemplatePreview(container, graphicsDocument) {
  const scaleX = 360 / 1920;
  const scaleY = 112 / 1080;
  container.style.background = graphicsDocument.outputTransparent
    ? "#121720"
    : (graphicsDocument.background || "#0d1015");

  for (const element of graphicsDocument.elements || []) {
    if (element.visible === false) continue;
    const node = window.document.createElement("div");
    node.className = "template-preview-layer";
    Object.assign(node.style, {
      left: `${element.x * scaleX}px`,
      top: `${element.y * scaleY}px`,
      width: `${element.width * scaleX}px`,
      height: `${element.height * scaleY}px`,
      opacity: element.opacity ?? 1,
      transform: `rotate(${element.rotation || 0}deg)`
    });
    if (element.type === "shape") {
      node.style.background = element.fill || "#fff";
      node.style.borderRadius = `${(element.radius || 0) * scaleX}px`;
    } else if (element.type === "text") {
      node.textContent = element.contentMode === "binding"
        ? resolveTemplate(element.bindingTemplate || element.text)
        : element.text;
      node.style.color = element.color || "#fff";
      node.style.fontSize = `${Math.max(3, (element.fontSize || 48) * scaleY)}px`;
      node.style.fontWeight = element.fontWeight || 400;
      node.style.overflow = "hidden";
    }
    container.appendChild(node);
  }
}

async function saveCurrentAsTemplate() {
  const name = prompt("Nombre de la plantilla:", documentState.name || "Nueva plantilla");
  if (!name?.trim()) return;

  const labels = {
    "1": "scripture",
    "2": "lower-third",
    "3": "flyer",
    "4": "countdown",
    "5": "qr",
    "6": "custom"
  };
  const selectedCategory = prompt(
    "Categoría:\n1 Scripture\n2 Lower Third\n3 Flyer\n4 Countdown\n5 QR\n6 Personalizada",
    "6"
  );
  if (selectedCategory === null) return;

  const category = labels[selectedCategory.trim()] || "custom";
  await api("/api/templates", {
    method: "POST",
    body: JSON.stringify({ name: name.trim(), category })
  });

  $("#templateCategoryFilter").value = category;
  await loadTemplates();
}

async function loadTemplate(id) {
  documentState = await api(`/api/templates/${id}/load`, { method: "POST" });
  selectedIds.clear();
  historyPast = [];
  historyFuture = [];
  render();
  $("#templatesPanel").classList.add("hidden");
}

async function duplicateTemplateItem(template) {
  const name = prompt("Nombre de la copia:", `${template.name} copia`);
  if (!name?.trim()) return;
  await api(`/api/templates/${template.id}/duplicate`, {
    method: "POST",
    body: JSON.stringify({ name: name.trim() })
  });
  await loadTemplates();
}

async function patchTemplate(id, patch) {
  await api(`/api/templates/${id}`, {
    method: "PATCH",
    body: JSON.stringify(patch)
  });
  await loadTemplates();
}

async function deleteTemplateItem(template) {
  if (!confirm(`¿Eliminar la plantilla "${template.name}"?`)) return;
  await api(`/api/templates/${template.id}`, { method: "DELETE" });
  await loadTemplates();
}


$("#openTemplates")?.addEventListener("click", async () => {
  $("#templatesPanel").classList.toggle("hidden");
  $("#componentsPanel").classList.add("hidden");
  if (!$("#templatesPanel").classList.contains("hidden")) await loadTemplates();
});
$("#closeTemplates")?.addEventListener("click", () => $("#templatesPanel").classList.add("hidden"));
$("#saveAsTemplate")?.addEventListener("click", saveCurrentAsTemplate);
$("#templateSearch")?.addEventListener("input", renderTemplates);
$("#templateCategoryFilter")?.addEventListener("change", renderTemplates);

window.addEventListener("resize", fitStage);
$("#stageViewport").addEventListener("wheel", event => {
  if (!event.ctrlKey) return;
  event.preventDefault();
  setScale(scale + (event.deltaY < 0 ? 0.1 : -0.1));
}, { passive: false });

window.addEventListener("keydown", event => {
  const editing = ["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName);
  const mod = event.ctrlKey || event.metaKey;

  if (mod && event.key.toLowerCase() === "z") {
    event.preventDefault();
    event.shiftKey ? redo() : undo();
  } else if (mod && event.key.toLowerCase() === "s") {
    event.preventDefault(); save();
  } else if (mod && event.key.toLowerCase() === "c" && !editing) {
    event.preventDefault(); copySelection();
  } else if (mod && event.key.toLowerCase() === "v" && !editing) {
    event.preventDefault(); pasteSelection();
  } else if (mod && event.key.toLowerCase() === "d" && !editing) {
    event.preventDefault(); duplicateSelection();
  } else if (mod && event.key.toLowerCase() === "g" && !editing) {
    event.preventDefault(); groupSelection();
  } else if (mod && event.key.toLowerCase() === "a" && !editing) {
    event.preventDefault();
    selectedIds = new Set(documentState.elements.map(element => element.id));
    render();
  } else if (!editing && (event.key === "Delete" || event.key === "Backspace")) {
    deleteSelection();
  } else if (!editing && ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) {
    event.preventDefault();
    const amount = event.shiftKey ? 10 : 1;
    nudge(
      event.key === "ArrowLeft" ? -amount : event.key === "ArrowRight" ? amount : 0,
      event.key === "ArrowUp" ? -amount : event.key === "ArrowDown" ? amount : 0
    );
  } else if (event.key === "Escape") {
    selectedIds.clear();
    $("#componentsPanel").classList.add("hidden");
    $("#templatesPanel")?.classList.add("hidden");
    render();
  }
});

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[char]);
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
  $("#zoomSelect").value = "fit";
});
