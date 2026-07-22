const TOKEN_PATTERN = /\{\{\s*([a-zA-Z0-9_.-]+)\s*\}\}|\{\s*([a-zA-Z0-9_.-]+)\s*\}/g;

export function getByPath(context, path, fallback = "") {
  if (!path) return fallback;
  const value = String(path)
    .split(".")
    .reduce((current, key) => current != null ? current[key] : undefined, context);
  return value == null ? fallback : value;
}

export function resolveTemplate(template, context = {}, options = {}) {
  const missing = options.missing ?? "";
  return String(template ?? "").replace(TOKEN_PATTERN, (_, doublePath, singlePath) => {
    const path = doublePath || singlePath;
    const value = getByPath(context, path, missing);
    return typeof value === "object" ? JSON.stringify(value) : String(value);
  });
}

export function resolveElement(element, context = {}) {
  if (!element || element.type !== "text") return { ...element };

  const mode = element.contentMode || "manual";
  const template =
    mode === "binding"
      ? element.bindingTemplate || element.text || ""
      : element.text || "";

  return {
    ...element,
    resolvedText: resolveTemplate(template, context),
    text: resolveTemplate(template, context)
  };
}

export function resolveDocument(document, context = {}) {
  return {
    ...document,
    elements: (document.elements || []).map(element => resolveElement(element, context))
  };
}

export function listBindingTokens(template) {
  const tokens = new Set();
  String(template ?? "").replace(TOKEN_PATTERN, (_, doublePath, singlePath) => {
    tokens.add(doublePath || singlePath);
    return "";
  });
  return [...tokens];
}
