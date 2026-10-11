// Recibe el estado de la alerta desde Central y la dibuja.
const body = document.body;
const names = document.getElementById("names");
const text = document.getElementById("text");

window.overlay.onState(state => {
  const channels = Array.isArray(state.channels) ? state.channels.slice(0, 6) : [];
  const on = Boolean(state.active && channels.length);
  if (on) {
    const root = document.documentElement.style;
    root.setProperty("--color", /^#[0-9a-f]{6}$/i.test(channels[0].color) ? channels[0].color : "#ff3b30");
    root.setProperty("--band", `${Math.round(Math.min(window.innerHeight * .45, Math.max(110, (Number(state.thickness) || 48) * 3.6)))}px`);
    root.setProperty("--opacity", String(Math.min(1, Math.max(.35, Number(state.opacity) || .92))));
    names.replaceChildren(...channels.map(channel => Object.assign(document.createElement("span"), { textContent: String(channel.name || "Talkback").slice(0, 40) })));
    text.textContent = state.showText ? String(state.text || "").slice(0, 200) : "";
  }
  body.classList.toggle("is-on", on);
  body.classList.toggle("is-pulse", Boolean(state.pulse));
  body.classList.toggle("is-flash", Boolean(state.flash));
  body.classList.toggle("is-all", state.edge === "all");
});
