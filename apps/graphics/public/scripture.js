const $ = selector => document.querySelector(selector);
const nodes = {
  badge: $("#connectionBadge"),
  connection: $("#connectionDetail"),
  sync: $("#syncDetail"),
  last: $("#lastReceived"),
  programReference: $("#programReference"),
  programVerse: $("#programVerse"),
  programVersion: $("#programVersion"),
  previewReference: $("#previewReference"),
  previewVerse: $("#previewVerse"),
  previewVersion: $("#previewVersion"),
  onAir: $("#onAir"),
  diagnostics: $("#diagnostics"),
  take: $("#takeButton"),
  clear: $("#clearButton"),
  auto: $("#autoButton"),
  connect: $("#connectButton"),
  start: $("#startButton"),
  syncNow: $("#syncButton")
};

async function api(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: { "Content-Type":"application/json", ...(options.headers || {}) }
  });
  const body = await response.json();
  if (!response.ok) throw new Error(body.error || "Error BMMS");
  return body;
}

function verseInto(prefix, verse, emptyText) {
  nodes[`${prefix}Reference`].textContent = verse?.reference || "Sin contenido";
  nodes[`${prefix}Verse`].textContent = verse?.text || emptyText;
  nodes[`${prefix}Version`].textContent = verse?.version || "";
}

async function refresh() {
  const [integration, live, state] = await Promise.all([
    api("/api/integrations/propresenter/status"),
    api("/api/scripture/live/status"),
    api("/api/scripture/program")
  ]);

  nodes.badge.textContent = integration.connected ? "Conectado" : integration.state;
  nodes.badge.className = `badge ${integration.connected ? "badge-online" : "badge-offline"}`;
  nodes.connection.textContent = integration.connected
    ? `${integration.host}:${integration.port}`
    : integration.lastError?.message || "Sin conexión";
  nodes.sync.textContent = live.running ? `Live · ${live.intervalMs} ms` : "Live detenido";
  nodes.last.textContent = live.lastSuccessAt
    ? `Última recepción ${new Date(live.lastSuccessAt).toLocaleTimeString()}`
    : "Sin datos";

  verseInto("program", state.program, "El contenido al aire aparecerá aquí.");
  verseInto("preview", state.preview, "Cambie a un versículo para cargarlo en Preview.");
  nodes.onAir.textContent = state.visible ? "ON AIR" : "OFF AIR";
  nodes.auto.textContent = `AUTO: ${state.autoTake ? "ON" : "OFF"}`;
  nodes.auto.classList.toggle("active", state.autoTake);
  nodes.diagnostics.textContent = JSON.stringify({ integration, live, state }, null, 2);
}

async function action(fn) {
  try { await fn(); } catch (error) { alert(error.message); }
  await refresh();
}

nodes.take.onclick = () => action(() => api("/api/scripture/take", { method:"POST" }));
nodes.clear.onclick = () => action(() => api("/api/scripture/clear", { method:"POST" }));
nodes.auto.onclick = () => action(async () => {
  const state = await api("/api/scripture/program");
  return api("/api/scripture/auto", {
    method:"POST",
    body:JSON.stringify({ enabled: !state.autoTake })
  });
});
nodes.connect.onclick = () => action(() => api("/api/integrations/propresenter/connect", { method:"POST" }));
nodes.start.onclick = () => action(() => api("/api/scripture/live/start", { method:"POST" }));
nodes.syncNow.onclick = () => action(() => api("/api/scripture/live/sync", { method:"POST" }));

const events = new EventSource("/api/app-events");
["scripture-program","scripture-updated","scripture-live-status","propresenter-status"].forEach(name => {
  events.addEventListener(name, refresh);
});
refresh();
setInterval(refresh, 3000);
