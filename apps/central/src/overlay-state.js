// Estado de la alerta a pantalla completa: lo que manda la app (TB Tool) se limpia aquí antes de
// llegar a la ventana de la alerta. Debe conservar "level" y "word": sin nivel, la ventana dibuja
// la franja grande (compatibilidad con TB Tool antiguo), y por eso la alerta pequeña se veía grande.
const LEVELS = new Set(["none", "small", "band"]);

export function sanitizeOverlayState(state) {
  const input = state && typeof state === "object" ? state : {};
  const channels = (Array.isArray(input.channels) ? input.channels : []).slice(0, 6).map(channel => ({
    name: String(channel?.name || "").slice(0, 40),
    color: /^#[0-9a-f]{6}$/i.test(channel?.color) ? channel.color : "#ff3b30"
  }));
  const level = LEVELS.has(input.level) ? input.level : "band";
  return {
    active: Boolean(input.active) && level !== "none",
    level,
    word: String(input.word || "").slice(0, 40),
    channels,
    thickness: Number(input.thickness) || 48,
    opacity: Number(input.opacity) || .9,
    pulse: Boolean(input.pulse),
    flash: Boolean(input.flash),
    edge: input.edge === "all" ? "all" : "top",
    showText: Boolean(input.showText),
    text: String(input.text || "").slice(0, 200)
  };
}

// Una ventana de alerta por pantalla, nunca dos: qué crear, mover y cerrar al cambiar las pantallas.
export function planOverlays(existingIds, displays) {
  const wanted = new Map(displays.map(display => [display.id, display]));
  const existing = new Set(existingIds);
  return {
    remove: [...existing].filter(id => !wanted.has(id)),
    update: [...wanted.values()].filter(display => existing.has(display.id)),
    create: [...wanted.values()].filter(display => !existing.has(display.id))
  };
}
