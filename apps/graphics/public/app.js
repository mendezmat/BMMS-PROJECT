const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];

let appState = {};
let saveTimer;

const lowerThirdFields = {
  primary: $("#primary"),
  secondary: $("#secondary"),
  accent: $("#accent"),
  align: $("#align"),
  animationMs: $("#animationMs")
};

const scriptureControls = {
  reference: $("#scriptureReference"),
  version: $("#scriptureVersion"),
  text: $("#scriptureText"),
  layoutMode: $("#layoutMode"),
  columns: $("#columns"),
  alignment: $("#scriptureAlign"),
  maxLines: $("#maxLines"),
  balance: $("#balanceText"),
  selectedElement: $("#selectedElement"),
  fontFamily: $("#fontFamily"),
  fontSize: $("#fontSize"),
  fontWeight: $("#fontWeight"),
  lineHeight: $("#lineHeight"),
  textColor: $("#textColor"),
  backgroundColor: $("#backgroundColor"),
  animationIn: $("#animationIn"),
  animationOut: $("#animationOut"),
  animationMs: $("#scriptureAnimationMs")
};

function markSaving() {
  $("#saveState").textContent = "Guardando…";
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => $("#saveState").textContent = "Guardado", 650);
}

async function api(path, options = {}) {
  const response = await fetch(path, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error || "La operación no pudo completarse.");
  return body;
}

async function loadState() {
  appState = await api("/api/app-state");
  renderAll();
}

function switchView(name) {
  $$(".nav[data-view]").forEach(button => button.classList.toggle("active", button.dataset.view === name));
  $$(".view").forEach(view => view.classList.toggle("active", view.id === `view-${name}`));
  $("#lowerThirdInspector").classList.toggle("hidden", name !== "lower-third");
}

$$(".nav[data-view]").forEach(button => {
  button.addEventListener("click", () => switchView(button.dataset.view));
});
$$("[data-open-integrations]").forEach(button => {
  button.addEventListener("click", () => switchView("integrations"));
});

function renderLowerThird() {
  const state = appState.lowerThird;
  for (const [key, element] of Object.entries(lowerThirdFields)) element.value = state[key] ?? "";
  $("#animationValue").value = `${state.animationMs} ms`;
  $("#statusBadge").textContent = state.visible ? "PROGRAM" : "PREVIEW";
  $("#statusBadge").className = `badge ${state.visible ? "program" : "preview"}`;
}

async function updateLowerThird(patch) {
  appState.lowerThird = { ...appState.lowerThird, ...patch };
  renderLowerThird();
  markSaving();
  await api("/api/state", { method: "POST", body: JSON.stringify(appState.lowerThird) });
}

for (const [key, element] of Object.entries(lowerThirdFields)) {
  element.addEventListener("input", () => {
    updateLowerThird({ [key]: key === "animationMs" ? Number(element.value) : element.value });
  });
}
$("#takeIn").addEventListener("click", () => updateLowerThird({ visible: true }));
$("#takeOut").addEventListener("click", () => updateLowerThird({ visible: false }));


function getActiveScriptureContent() {
  return appState.scripture.source === "propresenter"
    ? appState.scripture.propresenter
    : appState.scripture.manual;
}

let scriptureUiMode = localStorage.getItem("bmms.scripture.mode") || "simple";
let scriptureBroadcast = {
  preview: null,
  program: null,
  visible: false,
  autoTake: false
};

const scriptureDesigns = {
  classic: {
    appearance: {
      fontFamily: "Inter, Arial, sans-serif",
      fontSize: 68,
      fontWeight: 800,
      lineHeight: 1.08,
      textColor: "#ffffff",
      backgroundColor: "#101827"
    },
    composition: { alignment: "left", balance: true, maxLines: 5 },
    animation: { in: "fade-up", out: "fade-down", durationMs: 380 }
  },
  clean: {
    appearance: {
      fontFamily: "Inter, Arial, sans-serif",
      fontSize: 64,
      fontWeight: 700,
      lineHeight: 1.12,
      textColor: "#111827",
      backgroundColor: "#f4f6fa"
    },
    composition: { alignment: "left", balance: true, maxLines: 5 },
    animation: { in: "fade", out: "fade", durationMs: 300 }
  },
  minimal: {
    appearance: {
      fontFamily: "Inter, Arial, sans-serif",
      fontSize: 70,
      fontWeight: 800,
      lineHeight: 1.06,
      textColor: "#ffffff",
      backgroundColor: "#000000"
    },
    composition: { alignment: "center", balance: true, maxLines: 4 },
    animation: { in: "fade-up", out: "fade", durationMs: 420 }
  }
};

function setScriptureMode(mode) {
  scriptureUiMode = mode;
  localStorage.setItem("bmms.scripture.mode", mode);
  $("#scriptureSimpleMode").classList.toggle("active", mode === "simple");
  $("#scriptureAdvancedMode").classList.toggle("active", mode === "advanced");
  $("#scriptureSimpleView").classList.toggle("hidden", mode !== "simple");
  $("#scriptureAdvancedView").classList.toggle("hidden", mode !== "advanced");
}

function renderVerseBus(prefix, verse, fallback) {
  $(`#integrated${prefix}Reference`).textContent = verse?.reference || "Sin contenido";
  $(`#integrated${prefix}Text`).textContent = verse?.text || fallback;
  $(`#integrated${prefix}Version`).textContent = verse?.version || "";
}

function renderBroadcastState() {
  renderVerseBus("Program", scriptureBroadcast.program, "El contenido al aire aparecerá aquí.");
  renderVerseBus("Preview", scriptureBroadcast.preview, "La siguiente Escritura aparecerá aquí.");
  $("#integratedOnAir").textContent = scriptureBroadcast.visible ? "ON AIR" : "OFF AIR";
  $("#integratedAutoButton").textContent = `AUTO: ${scriptureBroadcast.autoTake ? "ON" : "OFF"}`;
  $("#integratedAutoButton").classList.toggle("active", scriptureBroadcast.autoTake);
}

async function refreshScriptureBroadcast() {
  try {
    const [state, live] = await Promise.all([
      api("/api/scripture/program"),
      api("/api/scripture/live/status")
    ]);
    scriptureBroadcast = state;
    renderBroadcastState();
    $("#integratedScriptureDiagnostics").textContent = JSON.stringify({ broadcast: state, live }, null, 2);
    $("#integratedLiveButton").textContent = live.running ? "Detener Live" : "Iniciar Live";
    $("#integratedLiveButton").dataset.running = String(Boolean(live.running));
  } catch (error) {
    $("#integratedScriptureDiagnostics").textContent = error.message;
  }
}

function renderScripture() {
  const scripture = appState.scripture;
  const manual = scripture.manual;
  $("#scriptureReference").value = manual.reference || "";
  $("#scriptureVersion").value = manual.version || "";
  $("#scriptureText").value = manual.text || "";

  $("#layoutMode").value = scripture.composition.layoutMode;
  $("#columns").value = String(scripture.composition.columns);
  $("#scriptureAlign").value = scripture.composition.alignment;
  $("#maxLines").value = scripture.composition.maxLines;
  $("#balanceText").checked = scripture.composition.balance;

  $("#selectedElement").value = scripture.appearance.selectedElement;
  $("#fontFamily").value = scripture.appearance.fontFamily;
  $("#fontSize").value = scripture.appearance.fontSize;
  $("#fontWeight").value = String(scripture.appearance.fontWeight);
  $("#lineHeight").value = scripture.appearance.lineHeight;
  $("#textColor").value = scripture.appearance.textColor;
  $("#backgroundColor").value = scripture.appearance.backgroundColor;

  $("#animationIn").value = scripture.animation.in;
  $("#animationOut").value = scripture.animation.out;
  $("#scriptureAnimationMs").value = scripture.animation.durationMs;
  $("#scriptureAnimationValue").value = `${scripture.animation.durationMs} ms`;

  $$(".source-option").forEach(option => option.classList.toggle("active", option.dataset.source === scripture.source));
  $("#manualContent").classList.toggle("hidden", scripture.source !== "manual");
  $("#propresenterContent").classList.toggle("hidden", scripture.source !== "propresenter");
  $("#scriptureSourceBadge").textContent = scripture.source === "manual" ? "MANUAL" : "PROPRESENTER";

  const activeDesign = scripture.design || "classic";
  $$("[data-scripture-design]").forEach(card => {
    card.classList.toggle("active", card.dataset.scriptureDesign === activeDesign);
  });

  const incoming = scripture.propresenter;
  $("#incomingReference").textContent = incoming.reference || "Sin contenido";
  $("#incomingText").textContent = incoming.text || "Cuando llegue un cambio desde ProPresenter aparecerá aquí.";
  $("#incomingMeta").textContent = incoming.receivedAt
    ? `${incoming.presentation || "Presentación"} · Slide ${incoming.slideIndex ?? "-"} · ${new Date(incoming.receivedAt).toLocaleTimeString()}`
    : "";

  setScriptureMode(scriptureUiMode);
  renderConnection();
  refreshScriptureBroadcast();
}

async function updateScripture(patch) {
  appState.scripture = await api("/api/scripture", {
    method: "POST",
    body: JSON.stringify(patch)
  });
  markSaving();
  renderScripture();
}

$("#scriptureSimpleMode").addEventListener("click", () => setScriptureMode("simple"));
$("#scriptureAdvancedMode").addEventListener("click", () => setScriptureMode("advanced"));

$$("[data-scripture-design]").forEach(card => {
  card.addEventListener("click", async () => {
    const design = card.dataset.scriptureDesign;
    const preset = scriptureDesigns[design];
    await updateScripture({
      design,
      appearance: preset.appearance,
      composition: preset.composition,
      animation: preset.animation
    });
  });
});

$$(".source-option").forEach(option => {
  option.addEventListener("click", () => updateScripture({ source: option.dataset.source }));
});

["reference", "version", "text"].forEach(key => {
  scriptureControls[key].addEventListener("input", () => {
    updateScripture({ manual: { [key]: scriptureControls[key].value } });
  });
});

const scriptureBindings = [
  ["layoutMode", "composition", "layoutMode"],
  ["columns", "composition", "columns", Number],
  ["alignment", "composition", "alignment"],
  ["maxLines", "composition", "maxLines", Number],
  ["selectedElement", "appearance", "selectedElement"],
  ["fontFamily", "appearance", "fontFamily"],
  ["fontSize", "appearance", "fontSize", Number],
  ["fontWeight", "appearance", "fontWeight", Number],
  ["lineHeight", "appearance", "lineHeight", Number],
  ["textColor", "appearance", "textColor"],
  ["backgroundColor", "appearance", "backgroundColor"],
  ["animationIn", "animation", "in"],
  ["animationOut", "animation", "out"],
  ["animationMs", "animation", "durationMs", Number]
];

for (const [controlKey, group, key, cast = value => value] of scriptureBindings) {
  scriptureControls[controlKey].addEventListener("input", () => {
    updateScripture({ [group]: { [key]: cast(scriptureControls[controlKey].value) } });
  });
}
scriptureControls.balance.addEventListener("change", () => {
  updateScripture({ composition: { balance: scriptureControls.balance.checked } });
});

$("#integratedTakeButton").addEventListener("click", async () => {
  await api("/api/scripture/take", { method: "POST" });
  await refreshScriptureBroadcast();
});
$("#integratedClearButton").addEventListener("click", async () => {
  await api("/api/scripture/clear", { method: "POST" });
  await refreshScriptureBroadcast();
});
$("#integratedAutoButton").addEventListener("click", async () => {
  await api("/api/scripture/auto", {
    method: "POST",
    body: JSON.stringify({ enabled: !scriptureBroadcast.autoTake })
  });
  await refreshScriptureBroadcast();
});
$("#loadManualPreview").addEventListener("click", async () => {
  await api("/api/scripture/preview/manual", {
    method: "POST",
    body: JSON.stringify(appState.scripture.manual)
  });
  await refreshScriptureBroadcast();
});
$("#integratedConnectButton").addEventListener("click", async () => {
  await api("/api/integrations/propresenter/connect", { method: "POST" });
  await loadState();
});
$("#integratedLiveButton").addEventListener("click", async () => {
  const running = $("#integratedLiveButton").dataset.running === "true";
  await api(`/api/scripture/live/${running ? "stop" : "start"}`, { method: "POST" });
  await refreshScriptureBroadcast();
});

function ppFormState() {
  return {
    enabled: $("#ppEnabled").checked,
    host: $("#ppHost").value.trim(),
    port: Number($("#ppPort").value),
    protocol: $("#ppProtocol").value,
    autoConnect: $("#ppAutoConnect").checked,
    reconnect: { enabled: $("#ppReconnect").checked },
    monitoring: {
      presentations: true,
      text: $("#ppMonitorText").checked,
      media: $("#ppMonitorMedia").checked
    }
  };
}

function renderIntegration() {
  const config = appState.settings.integrations.propresenter;
  $("#ppEnabled").checked = config.enabled;
  $("#ppHost").value = config.host;
  $("#ppPort").value = config.port;
  $("#ppProtocol").value = config.protocol;
  $("#ppAutoConnect").checked = config.autoConnect;
  $("#ppReconnect").checked = config.reconnect.enabled;
  $("#ppMonitorText").checked = config.monitoring.text;
  $("#ppMonitorMedia").checked = config.monitoring.media;
  renderConnection();
}

function renderConnection() {
  const status = appState.propresenterStatus || { state: "disabled", connected: false };
  const labels = {
    disabled: "Desactivado",
    disconnected: "Desconectado",
    connecting: "Conectando",
    connected: "Conectado",
    error: "Error"
  };
  const pill = $("#integrationStatus");
  pill.textContent = labels[status.state] || status.state;
  pill.className = `connection-pill ${status.state}`;

  $("#scriptureConnectionTitle").textContent = status.connected
    ? "ProPresenter conectado"
    : "ProPresenter desconectado";
  $("#scriptureConnectionDetail").textContent = status.connected
    ? "Scripture está escuchando los cambios de contenido."
    : "Puede usar el simulador mientras implementamos el transporte real.";
  $("#scriptureConnectionDot").classList.toggle("connected", status.connected);
}

$("#saveProPresenter").addEventListener("click", async () => {
  try {
    const result = await api("/api/settings/propresenter", {
      method: "POST",
      body: JSON.stringify(ppFormState())
    });
    appState.settings.integrations.propresenter = result.config;
    appState.propresenterStatus = result.status;
    $("#integrationMessage").className = "message success";
    $("#integrationMessage").textContent = "Configuración guardada correctamente.";
    markSaving();
    renderIntegration();
  } catch (error) {
    $("#integrationMessage").className = "message error";
    $("#integrationMessage").textContent = error.message;
  }
});

$("#testProPresenter").addEventListener("click", async () => {
  try {
    const result = await api("/api/propresenter/test", { method: "POST", body: "{}" });
    $("#integrationMessage").className = "message neutral";
    $("#integrationMessage").textContent = result.status === "transport-not-implemented"
      ? "La configuración es válida. El transporte real todavía no está implementado."
      : "Prueba completada.";
  } catch (error) {
    $("#integrationMessage").className = "message error";
    $("#integrationMessage").textContent = error.message;
  }
});

$("#simulateScripture").addEventListener("click", async () => {
  await api("/api/simulator/propresenter/scripture", {
    method: "POST",
    body: JSON.stringify({
      reference: $("#simReference").value,
      version: $("#simVersion").value,
      text: $("#simText").value,
      presentation: "Simulador BMMS",
      slideIndex: 1
    })
  });
  await updateScripture({ source: "propresenter" });
  switchView("scripture");
});

function renderAll() {
  renderLowerThird();
  renderScripture();
  renderIntegration();
}

const events = new EventSource("/api/app-events");
events.addEventListener("scripture-updated", event => {
  appState.scripture = JSON.parse(event.data);
  renderScripture();
});
events.addEventListener("propresenter-status", event => {
  appState.propresenterStatus = JSON.parse(event.data);
  renderConnection();
});

loadState();

const integratedEvents = new EventSource("/api/app-events");
["scripture-program","scripture-live-status"].forEach(name => integratedEvents.addEventListener(name, refreshScriptureBroadcast));
