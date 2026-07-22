const CATEGORIES = new Set([
  "scripture",
  "lower-third",
  "flyer",
  "countdown",
  "qr",
  "custom"
]);

export function createTemplate(document, metadata = {}) {
  if (!document || !Array.isArray(document.elements)) {
    throw new Error("A valid graphics document is required.");
  }

  const now = new Date().toISOString();
  return {
    id: metadata.id || crypto.randomUUID(),
    name: String(metadata.name || document.name || "Nueva plantilla").trim(),
    category: normalizeCategory(metadata.category),
    favorite: metadata.favorite === true,
    createdAt: metadata.createdAt || now,
    updatedAt: now,
    document: structuredClone({
      ...document,
      id: metadata.documentId || crypto.randomUUID(),
      updatedAt: now
    })
  };
}

export function duplicateTemplate(template, name) {
  if (!template?.document) throw new Error("Template document is required.");
  return createTemplate(template.document, {
    name: name || `${template.name} copia`,
    category: template.category,
    favorite: false
  });
}

export function instantiateTemplate(template) {
  if (!template?.document) throw new Error("Template document is required.");
  const now = new Date().toISOString();
  const groupMap = new Map();
  const componentMap = new Map();

  return {
    ...structuredClone(template.document),
    id: crypto.randomUUID(),
    name: template.name,
    updatedAt: now,
    elements: template.document.elements.map(element => {
      if (element.groupId && !groupMap.has(element.groupId)) {
        groupMap.set(element.groupId, crypto.randomUUID());
      }
      if (element.componentId && !componentMap.has(element.componentId)) {
        componentMap.set(element.componentId, crypto.randomUUID());
      }

      return {
        ...structuredClone(element),
        id: crypto.randomUUID(),
        groupId: element.groupId ? groupMap.get(element.groupId) : undefined,
        componentId: element.componentId
          ? componentMap.get(element.componentId)
          : undefined
      };
    })
  };
}

export function updateTemplateMetadata(template, patch = {}) {
  return {
    ...template,
    name:
      patch.name === undefined
        ? template.name
        : String(patch.name).trim() || template.name,
    category:
      patch.category === undefined
        ? template.category
        : normalizeCategory(patch.category),
    favorite:
      patch.favorite === undefined
        ? template.favorite
        : patch.favorite === true,
    updatedAt: new Date().toISOString()
  };
}

export function normalizeCategory(category) {
  const value = String(category || "custom").toLowerCase();
  return CATEGORIES.has(value) ? value : "custom";
}
