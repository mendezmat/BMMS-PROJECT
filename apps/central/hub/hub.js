// BMMS Central — hub: muestra el catálogo y dispara instalaciones/actualizaciones.
const byId = id => document.getElementById(id);
const progress = new Map(); // appId -> { label, percent }
const messages = new Map(); // appId -> { text, kind }
let state = null;

const mb = bytes => `${Math.round(bytes / 1e6)} MB`;
const initials = name => name.replace(/^BMMS\s+/i, "").split(/\s+/).map(word => word[0]).join("").slice(0, 2).toUpperCase();
const dateFormat = new Intl.DateTimeFormat("es", { dateStyle: "medium", timeStyle: "short" });

async function load(refresh = false) {
  const result = await (refresh ? window.central.refresh() : window.central.catalog());
  if (result?.error && !result.apps) { byId("channelError").hidden = false; byId("channelError").textContent = result.error; return; }
  state = result;
  render();
}

async function act(app, action) {
  messages.delete(app.id);
  render();
  const result = await action();
  if (result?.error) messages.set(app.id, { text: result.error, kind: "error" });
  else if (result?.warning) messages.set(app.id, { text: result.warning, kind: "warn" });
  progress.delete(app.id);
  await load();
}

function button(label, onClick, { primary = false, disabled = false } = {}) {
  const element = document.createElement("button");
  element.textContent = label;
  element.className = primary ? "primary" : "";
  element.disabled = disabled;
  element.addEventListener("click", onClick);
  return element;
}

function renderCard(app) {
  const card = byId("cardTemplate").content.firstElementChild.cloneNode(true);
  card.style.setProperty("--app-color", app.color || "#888");
  card.classList.toggle("is-soon", app.status !== "available");
  card.querySelector(".icon").textContent = initials(app.name);
  card.querySelector("h2").textContent = app.name;
  card.querySelector(".category").textContent = app.category || "";
  card.querySelector(".summary").textContent = app.summary || "";
  const pill = card.querySelector(".pill");
  const detail = card.querySelector(".detail");
  const actions = card.querySelector(".actions");
  const task = app.busy || progress.get(app.id);

  if (app.status !== "available") {
    pill.textContent = "Próximamente";
    detail.textContent = "Estará disponible en una próxima actualización de Central.";
  } else if (!app.installed) {
    pill.textContent = "Disponible";
    pill.classList.add("is-available");
    detail.textContent = `Versión ${app.version}${app.totalAssetsBytes ? ` · incluye modelos de transcripción (${mb(app.totalAssetsBytes)}, una sola vez)` : ""}`;
    actions.append(
      button("Instalar", () => act(app, () => window.central.install(app.id)), { primary: true, disabled: Boolean(task) }),
      button("Instalar desde carpeta…", () => act(app, () => window.central.importFolder(app.id)), { disabled: Boolean(task) })
    );
  } else {
    pill.textContent = app.updateAvailable ? "Actualización" : "Instalado";
    pill.classList.add(app.updateAvailable ? "is-update" : "is-installed");
    const parts = [`Versión ${app.installed.version}`, `instalada ${dateFormat.format(new Date(app.installed.installedAt))}`];
    if (app.updateAvailable) parts.push(`nueva versión ${app.version} disponible`);
    detail.textContent = parts.join(" · ");
    actions.append(button(app.running ? "Mostrar" : "Abrir", () => act(app, () => window.central.open(app.id)), { primary: !app.updateAvailable, disabled: Boolean(task) }));
    if (app.updateAvailable) actions.append(button("Actualizar", () => act(app, () => window.central.install(app.id)), { primary: true, disabled: Boolean(task) }));
    if (app.missingAssetsBytes) {
      detail.textContent += ` · faltan modelos de transcripción (${mb(app.missingAssetsBytes)})`;
      detail.classList.add("is-warn");
      actions.append(
        button("Descargar modelos", () => act(app, () => window.central.downloadAssets(app.id)), { disabled: Boolean(task) }),
        button("Importar de carpeta…", () => act(app, () => window.central.importFolder(app.id)), { disabled: Boolean(task) })
      );
    }
    if (app.previous && !task) actions.append(button(`Volver a ${app.previous.version}`, () => { if (confirm(`¿Volver a la versión anterior (${app.previous.version})?`)) act(app, () => window.central.rollback(app.id)); }));
  }

  const message = messages.get(app.id);
  if (message) { detail.textContent = message.text; detail.className = `detail is-${message.kind}`; }
  if (task) {
    const box = card.querySelector(".progress");
    box.hidden = false;
    box.querySelector(".progress-bar").style.width = `${task.percent || 0}%`;
    box.querySelector(".progress-label").textContent = `${task.label} ${task.percent || 0}%`;
  }
  return card;
}

function render() {
  if (!state) return;
  const available = state.apps.filter(app => app.status === "available");
  const soon = state.apps.filter(app => app.status !== "available");
  byId("apps").replaceChildren(...available.map(renderCard), ...soon.map(renderCard));

  const channel = byId("channel");
  channel.classList.toggle("is-online", state.source === "online");
  channel.textContent = state.source === "online"
    ? `Canal al día · ${state.publishedAt ? dateFormat.format(new Date(state.publishedAt)) : ""}`
    : state.source === "none" ? "Sin catálogo" : "Sin conexión · usando el último catálogo";
  byId("channelError").hidden = !state.error || state.source === "online";
  byId("channelError").textContent = state.error ? `${state.error} Las apps instaladas siguen funcionando.` : "";

  const update = state.central.update || {};
  byId("centralVersion").textContent = `BMMS Central ${state.central.version}`;
  const banner = byId("selfUpdate");
  banner.hidden = !["downloading", "ready"].includes(update.status);
  if (update.status === "downloading") banner.textContent = `Descargando una nueva versión de Central… ${update.percent || 0}%`;
  if (update.status === "ready") {
    banner.replaceChildren(document.createTextNode(`Central ${update.version} está lista.`), button("Reiniciar y actualizar", () => window.central.restartToUpdate(), { primary: true }));
  }
}

window.central.onProgress(info => { progress.set(info.appId, info); render(); });
window.central.onChanged(() => load());
byId("refresh").addEventListener("click", async () => { byId("refresh").disabled = true; await load(true); byId("refresh").disabled = false; });
byId("dataFolder").addEventListener("click", () => window.central.openDataFolder());
load();
