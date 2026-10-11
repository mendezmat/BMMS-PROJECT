// BMMS Central — hub: lista de apps (estilo Waves Central) y panel de la app seleccionada.
const byId = id => document.getElementById(id);
const progress = new Map(); // appId -> { label, percent }
const messages = new Map(); // appId -> { text, kind }
let state = null;
let selectedId = null;
let tab = "all";
let query = "";

const mb = bytes => `${Math.round(bytes / 1e6)} MB`;
const initials = name => name.replace(/^BMMS\s+/i, "").split(/\s+/).map(word => word[0]).join("").slice(0, 2).toUpperCase();
const dateFormat = new Intl.DateTimeFormat("es", { dateStyle: "medium", timeStyle: "short" });
const selectedApp = () => state?.apps.find(app => app.id === selectedId) || null;
const taskOf = app => progress.get(app.id) || app.busy || null;

async function load(refresh = false) {
  const button = byId("refresh");
  if (refresh) button.classList.add("is-spinning");
  const result = await (refresh ? window.central.refresh() : window.central.catalog());
  button.classList.remove("is-spinning");
  if (result?.error && !result.apps) { showNotice(result.error); return; }
  state = result;
  if (!selectedApp()) selectedId = state.apps.find(app => app.status === "available")?.id || state.apps[0]?.id || null;
  render();
}

function showNotice(text) {
  byId("notice").hidden = !text;
  byId("notice").textContent = text || "";
}

async function act(app, action) {
  messages.delete(app.id);
  render();
  const result = await action();
  if (result?.error) messages.set(app.id, { text: result.error, kind: "error" });
  else if (result?.warning) messages.set(app.id, { text: result.warning, kind: "warn" });
  else if (result?.canceled) messages.delete(app.id);
  progress.delete(app.id);
  await load();
}

/* ---------- Lista ---------- */

function visibleApps() {
  const text = query.trim().toLocaleLowerCase("es");
  return state.apps
    .filter(app => tab === "all" || app.installed)
    .filter(app => !text || `${app.name} ${app.category || ""} ${app.summary || ""}`.toLocaleLowerCase("es").includes(text))
    .sort((a, b) => (a.status === "available" ? 0 : 1) - (b.status === "available" ? 0 : 1));
}

function statusLine(app) {
  if (app.status !== "available") return { text: "Próximamente", cls: "soon" };
  const task = taskOf(app);
  if (task) return { text: `${task.label} ${task.percent || 0}%`, cls: "" };
  if (!app.installed) return { text: `V ${app.version}`, cls: "" };
  if (app.updateAvailable) return { text: `V ${app.installed.version} · nueva V ${app.version}`, cls: "upd" };
  return { text: `V ${app.installed.version}`, cls: "" };
}

function mark(yes) {
  const span = document.createElement("span");
  span.className = `mark ${yes ? "is-yes" : "is-no"}`;
  span.textContent = yes ? "✓" : "—";
  return span;
}

function renderRow(app) {
  const row = document.createElement("div");
  row.className = "row";
  row.classList.toggle("is-selected", app.id === selectedId);
  row.classList.toggle("is-soon", app.status !== "available");
  row.setAttribute("role", "button");
  row.tabIndex = 0;

  const radio = document.createElement("span");
  radio.className = "radio";

  const main = document.createElement("div");
  main.className = "row-main";
  const thumb = document.createElement("div");
  thumb.className = "thumb";
  thumb.style.setProperty("--app-color", app.color || "#666");
  // Logo: el de la app instalada, o el icono incluido en el diseño de Central; si no hay, las iniciales.
  thumb.textContent = app.short || initials(app.name);
  const logo = new Image();
  logo.alt = "";
  logo.onload = () => { thumb.classList.add("has-image"); thumb.replaceChildren(logo); };
  logo.src = app.icon || `icons/${encodeURIComponent(app.id)}.png`;
  const names = document.createElement("div");
  names.className = "names";
  const title = document.createElement("strong");
  title.textContent = app.name;
  const line = statusLine(app);
  const sub = document.createElement("small");
  sub.textContent = line.text;
  if (line.cls) sub.classList.add(line.cls);
  names.append(title, sub);
  main.append(thumb, names);

  const cat = document.createElement("span");
  cat.className = "cat";
  cat.textContent = app.category || "";

  const installed = app.status === "available" && Boolean(app.installed);
  row.append(radio, main, cat, mark(installed), mark(installed && !app.updateAvailable && !app.missingAssetsBytes));
  const select = () => { selectedId = app.id; render(); };
  row.addEventListener("click", select);
  row.addEventListener("keydown", event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); select(); } });
  return row;
}

/* ---------- Panel derecho ---------- */

function link(label, onClick) {
  const element = document.createElement("button");
  element.className = "link";
  element.textContent = label;
  element.addEventListener("click", onClick);
  return element;
}

function renderPanel() {
  const app = selectedApp();
  const primary = byId("primary");
  const links = byId("panelLinks");
  const summary = byId("summary");
  links.replaceChildren();
  primary.onclick = null;

  if (!app) {
    byId("panelHint").textContent = "Selecciona una aplicación de la lista.";
    summary.replaceChildren();
    primary.textContent = "Instalar";
    primary.disabled = true;
    byId("progress").hidden = true;
    byId("message").hidden = true;
    return;
  }

  const task = taskOf(app);
  const head = document.createElement("div");
  head.className = "summary-head";
  head.textContent = "Resumen";
  const body = document.createElement("div");
  body.className = "summary-body";
  const name = document.createElement("strong");
  name.textContent = app.name;
  const details = [];
  if (app.status !== "available") {
    details.push("Estará disponible en una próxima actualización de Central.");
  } else if (!app.installed) {
    details.push(`Versión ${app.version}`);
    if (app.totalAssetsBytes) details.push(`Incluye modelos de transcripción (${mb(app.totalAssetsBytes)}, se descargan una sola vez).`);
  } else {
    details.push(`Versión instalada ${app.installed.version} · ${dateFormat.format(new Date(app.installed.installedAt))}`);
    if (app.updateAvailable) details.push(`Nueva versión ${app.version}: solo se descargan los archivos que cambiaron.`);
    if (app.missingAssetsBytes) details.push(`Faltan modelos de transcripción (${mb(app.missingAssetsBytes)}).`);
  }
  body.append(name, ...details.map(text => Object.assign(document.createElement("span"), { textContent: text })));
  summary.replaceChildren(head, body);

  byId("panelHint").textContent = app.status === "available"
    ? (app.summary || "")
    : `${app.summary || ""}`;

  byId("progress").hidden = !task;
  if (task) {
    byId("progressBar").style.width = `${task.percent || 0}%`;
    byId("progressLabel").textContent = `${task.label} ${task.percent || 0}%`;
  }
  const message = messages.get(app.id);
  byId("message").hidden = !message;
  if (message) { byId("message").textContent = message.text; byId("message").className = `message is-${message.kind}`; }

  const run = (label, action) => { primary.textContent = label; primary.disabled = Boolean(task); primary.onclick = () => act(app, action); };
  if (app.status !== "available") {
    primary.textContent = "Próximamente";
    primary.disabled = true;
  } else if (!app.installed) {
    run("Instalar", () => window.central.install(app.id));
    if (!task) links.append(link("Instalar desde carpeta…", () => act(app, () => window.central.importFolder(app.id))));
  } else if (app.updateAvailable) {
    run("Actualizar", () => window.central.install(app.id));
    if (!task) links.append(link(app.running ? "Mostrar la app" : "Abrir sin actualizar", () => act(app, () => window.central.open(app.id))));
  } else {
    run(app.running ? "Mostrar" : "Abrir", () => window.central.open(app.id));
  }
  if (app.installed && app.missingAssetsBytes && !task) {
    links.append(
      link("Descargar modelos de transcripción", () => act(app, () => window.central.downloadAssets(app.id))),
      link("Importar modelos desde carpeta…", () => act(app, () => window.central.importFolder(app.id)))
    );
  }
  if (app.installed && !task) {
    const remove = link("Desinstalar", () => {
      if (confirm(`¿Desinstalar ${app.name}? Tus ajustes y sesiones guardadas se conservan.`)) act(app, () => window.central.uninstall(app.id));
    });
    remove.classList.add("is-danger");
    links.append(remove);
  }
  if (app.previous && !task) {
    links.append(link(`Volver a la versión ${app.previous.version}`, () => {
      if (confirm(`¿Volver a la versión anterior (${app.previous.version})?`)) act(app, () => window.central.rollback(app.id));
    }));
  }
}

/* ---------- Todo ---------- */

function render() {
  if (!state) return;
  const apps = visibleApps();
  const rows = byId("rows");
  if (apps.length) rows.replaceChildren(...apps.map(renderRow));
  else {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = tab === "mine" ? "Todavía no instalaste ninguna app. Ve a «Todas las apps»." : "Ninguna app coincide con la búsqueda.";
    rows.replaceChildren(empty);
  }
  for (const element of document.querySelectorAll(".tab")) element.classList.toggle("is-active", element.dataset.tab === tab);

  const ui = state.central.ui;
  const pending = state.apps.filter(app => app.updateAvailable).map(app => `${app.name} ${app.version}`);
  if (ui?.updateAvailable) pending.push(`Diseño de BMMS Central ${ui.version}`);
  const engine = state.central.update || {};
  const engineUpdate = ["available", "downloading", "ready"].includes(engine.status);
  if (engineUpdate) pending.push(`Motor de BMMS Central ${engine.version}`);
  const updates = pending.length;
  byId("updatesPill").hidden = !updates;
  byId("updatesPill").textContent = updates === 1 ? "1 actualización disponible" : `${updates} actualizaciones disponibles`;
  byId("updateBanner").hidden = !updates;
  byId("updateTitle").textContent = updates === 1 ? "Hay una actualización disponible" : `Hay ${updates} actualizaciones disponibles`;
  byId("updateList").textContent = pending.join(" · ");
  const updating = Boolean(ui?.busy) || state.apps.some(app => taskOf(app));
  byId("updateAll").disabled = updating;
  const uiTask = progress.get("central-ui") || ui?.busy;
  byId("updateAll").textContent = uiTask ? `Actualizando diseño… ${uiTask.percent || 0}%` : "Actualizar todo";

  const channel = byId("channel");
  channel.classList.toggle("is-online", state.source === "online");
  channel.textContent = state.source === "online"
    ? `Catálogo al día · ${state.publishedAt ? dateFormat.format(new Date(state.publishedAt)) : ""}`
    : state.source === "none" ? "Sin catálogo" : "Sin conexión · último catálogo guardado";
  showNotice(updateError || (state.error && state.source !== "online" ? `${state.error} Las apps instaladas siguen funcionando.` : ""));

  byId("centralVersion").textContent = `v${state.central.version}`;
  byId("footUiBack").hidden = byId("footUiSep").hidden = !ui?.installed;
  // Motor de Central (programa): Windows lo descarga solo; Mac sin firma de Apple abre la página de descarga.
  const banner = byId("selfUpdate");
  banner.hidden = !engineUpdate;
  if (engine.status === "downloading") banner.textContent = `Descargando el motor de BMMS Central ${engine.version}… ${engine.percent || 0}%`;
  if (engine.status === "ready") {
    banner.replaceChildren(document.createTextNode(`El motor de BMMS Central ${engine.version} está listo. Se instalará al reiniciar.`), link("Reiniciar y actualizar", () => window.central.restartToUpdate()));
  }
  if (engine.status === "available") {
    banner.replaceChildren(document.createTextNode(`Hay un motor nuevo de BMMS Central (${engine.version}). En Mac se instala descargándolo.`), link("Descargar", () => window.central.openRelease?.()));
  }
  renderPanel();
}

const importSelected = () => {
  const app = selectedApp()?.status === "available" ? selectedApp() : state?.apps.find(item => item.status === "available");
  if (app) act(app, () => window.central.importFolder(app.id));
};

window.central.onProgress(info => { progress.set(info.appId, info); render(); });
window.central.onChanged(() => load());
byId("refresh").addEventListener("click", () => load(true));
let updateError = "";
async function updateAll() {
  byId("updateAll").disabled = true;
  updateError = "";
  const result = await window.central.updateAll();
  progress.clear();
  // El motor va al final: en Windows reinicia para instalarse; en Mac abre la descarga.
  const engine = state?.central.update || {};
  if (!result?.error && engine.status === "ready") { await window.central.restartToUpdate(); return; }
  if (!result?.error && engine.status === "available") window.central.openRelease?.();
  if (result?.error) updateError = `No se pudo actualizar: ${result.error}`;
  await load();
}
byId("updatesPill").addEventListener("click", updateAll);
byId("footUiBack").addEventListener("click", async () => {
  if (!confirm("¿Volver al diseño anterior de BMMS Central?")) return;
  const result = await window.central.rollback("central-ui");
  if (result?.error) { updateError = result.error; render(); }
});
byId("updateAll").addEventListener("click", updateAll);
byId("search").addEventListener("input", event => { query = event.target.value; render(); });
for (const element of document.querySelectorAll(".tab")) element.addEventListener("click", () => { tab = element.dataset.tab; render(); });
byId("navApps").addEventListener("click", () => { tab = "all"; render(); });
byId("navOffline").addEventListener("click", importSelected);
byId("footFolder").addEventListener("click", importSelected);
byId("navData").addEventListener("click", () => window.central.openDataFolder());
byId("footData").addEventListener("click", () => window.central.openDataFolder());
load();
