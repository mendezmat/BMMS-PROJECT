const TYPES = new Set(["text", "shape", "image"]);

export function createGraphicsDocument(overrides = {}) {
  return {
    id: overrides.id || crypto.randomUUID(),
    name: overrides.name || "Untitled Graphic",
    width: Number(overrides.width || 1920),
    height: Number(overrides.height || 1080),
    background: overrides.background || "#0d1015",
    elements: Array.isArray(overrides.elements)
      ? overrides.elements.map(normalizeElement)
      : [],
    updatedAt: new Date().toISOString()
  };
}

export function createElement(type, overrides = {}) {
  if (!TYPES.has(type)) throw new Error(`Unsupported element type: ${type}`);

  const base = {
    id: overrides.id || crypto.randomUUID(),
    type,
    name: overrides.name || `${type[0].toUpperCase()}${type.slice(1)}`,
    x: Number(overrides.x ?? 100),
    y: Number(overrides.y ?? 100),
    width: Number(overrides.width ?? (type === "text" ? 720 : 360)),
    height: Number(overrides.height ?? (type === "text" ? 160 : 220)),
    rotation: Number(overrides.rotation ?? 0),
    opacity: Number(overrides.opacity ?? 1),
    visible: overrides.visible ?? true,
    locked: overrides.locked ?? false
  };

  if (type === "text") {
    return normalizeElement({
      ...base,
      text: overrides.text || "Nuevo texto",
      fontFamily: overrides.fontFamily || "Inter",
      fontSize: Number(overrides.fontSize ?? 72),
      fontWeight: Number(overrides.fontWeight ?? 700),
      lineHeight: Number(overrides.lineHeight ?? 1.1),
      color: overrides.color || "#ffffff",
      align: overrides.align || "left"
    });
  }

  if (type === "shape") {
    return normalizeElement({
      ...base,
      fill: overrides.fill || "#2c73ff",
      radius: Number(overrides.radius ?? 24)
    });
  }

  return normalizeElement({
    ...base,
    src: overrides.src || "",
    fit: overrides.fit || "cover"
  });
}

export function normalizeElement(element) {
  if (!element?.id) throw new Error("Element id is required.");
  if (!TYPES.has(element.type)) throw new Error(`Unsupported element type: ${element.type}`);

  return {
    ...element,
    x: finite(element.x, 0),
    y: finite(element.y, 0),
    width: Math.max(1, finite(element.width, 100)),
    height: Math.max(1, finite(element.height, 100)),
    rotation: finite(element.rotation, 0),
    opacity: clamp(finite(element.opacity, 1), 0, 1),
    visible: element.visible !== false,
    locked: element.locked === true
  };
}

export function updateElement(document, id, patch) {
  return {
    ...document,
    elements: document.elements.map(element =>
      element.id === id ? normalizeElement({ ...element, ...patch }) : element
    ),
    updatedAt: new Date().toISOString()
  };
}

export function removeElement(document, id) {
  return {
    ...document,
    elements: document.elements.filter(element => element.id !== id),
    updatedAt: new Date().toISOString()
  };
}

export function reorderElement(document, id, direction) {
  const elements = [...document.elements];
  const index = elements.findIndex(element => element.id === id);
  if (index < 0) return document;

  const target = direction === "up" ? index + 1 : index - 1;
  if (target < 0 || target >= elements.length) return document;

  [elements[index], elements[target]] = [elements[target], elements[index]];
  return { ...document, elements, updatedAt: new Date().toISOString() };
}

function finite(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
