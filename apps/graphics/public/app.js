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
  reference: $("#scriptureReference"), version: $("#scriptureVersion"), text: $("#scriptureText"),
  format: $("#scriptureFormat"), alignment: $("#scriptureAlign"), maxLines: $("#maxLines"), balance: $("#balanceText"),
  bottom: $("#scriptureBottom"), width: $("#scriptureWidth"), horizontalPadding: $("#scripturePadding"), scaleX: $("#compositionScaleX"), scaleY: $("#compositionScaleY"),
  gradientMode: $("#gradientMode"), gradientColor: $("#gradientColor"), gradientOpacity: $("#gradientOpacity"),
  gradientHeight: $("#gradientHeight"), gradientTopOffset: $("#gradientTopOffset"), gradientBottomExtension: $("#gradientBottomExtension"), gradientExtendToBottom: $("#gradientExtendToBottom"), gradientSoftness: $("#gradientSoftness"), edgeFadeEnabled: $("#edgeFadeEnabled"), edgeFade: $("#edgeFade"),
  titleFont: $("#titleFont"), bodyFont: $("#bodyFont"), titleSize: $("#titleSize"), bodySize: $("#bodySize"),
  titleWeight: $("#titleWeight"), bodyWeight: $("#bodyWeight"), lineHeight: $("#lineHeight"), letterSpacing: $("#letterSpacing"),
  titleColor: $("#titleColor"), textColor: $("#textColor"), lineColor: $("#lineColor"),
  wordCascade: $("#wordCascade"), wordCascadeStepMs: $("#wordCascadeStep"), sameChapterOutMs: $("#sameChapterOutMs"),
  sameChapterInMs: $("#sameChapterInMs"), chapterChangeMs: $("#chapterChangeMs"), bookChangeMs: $("#bookChangeMs")
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

const scriptureDesigns = { classic:{}, editorial:{}, worship:{}, broadcast:{}, glass:{}, kinetic:{} };

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
  $("#integratedAutoButton").textContent = `AUTO: ${scriptureBroadcast.autoTake ? "ENCENDIDO" : "APAGADO"}`;
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

function rgbaToHex(value) {
  if (String(value).startsWith("#")) return String(value).slice(0, 7);
  const match = String(value).match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (!match) return "#ffffff";
  return `#${[match[1],match[2],match[3]].map(n=>Number(n).toString(16).padStart(2,"0")).join("")}`;
}

function renderScripture() {
  const s=appState.scripture, m=s.manual, c=s.composition||{}, a=s.appearance||{}, g=s.gradient||{}, an=s.animation||{};
  $("#scriptureReference").value=m.reference||""; $("#scriptureVersion").value=m.version||""; $("#scriptureText").value=m.text||"";
  $("#scriptureFormat").value=s.format||"lower"; $("#scriptureAlign").value=c.alignment||"center"; $("#maxLines").value=String(c.maxLines||4); $("#balanceText").checked=c.balance!==false;
  $("#scriptureBottom").value=c.bottom??28; $("#scriptureWidth").value=c.width??1660; $("#scripturePadding").value=c.horizontalPadding??72;
  $("#scriptureBottomValue").value=`${c.bottom??28}px`; $("#scriptureWidthValue").value=`${c.width??1660}px`; $("#scripturePaddingValue").value=`${c.horizontalPadding??72}px`;
  $("#compositionScaleX").value=c.scaleX??1; $("#compositionScaleY").value=c.scaleY??1;
  $("#compositionScaleXValue").value=`${Math.round((c.scaleX??1)*100)}%`; $("#compositionScaleYValue").value=`${Math.round((c.scaleY??1)*100)}%`;
  $("#gradientMode").value=g.mode||"adaptive"; $("#gradientColor").value=g.color||"#000000"; $("#gradientOpacity").value=g.opacity??.96; $("#gradientHeight").value=g.height??430; $("#gradientTopOffset").value=g.topOffset??0; $("#gradientBottomExtension").value=g.bottomExtension??0; $("#gradientExtendToBottom").checked=g.extendToBottom!==false; $("#gradientSoftness").value=g.softness??58; $("#edgeFadeEnabled").checked=g.edgeFadeEnabled!==false; $("#edgeFade").value=g.edgeFade??150;
  $("#gradientOpacityValue").value=`${Math.round((g.opacity??.96)*100)}%`; $("#gradientHeightValue").value=`${g.height??430}px`; $("#gradientTopOffsetValue").value=`${g.topOffset??0}px`; $("#gradientBottomExtensionValue").value=`${g.bottomExtension??0}px`; $("#gradientSoftnessValue").value=`${g.softness??58}%`; $("#edgeFadeValue").value=`${g.edgeFade??150}px`;
  $("#titleFont").value=a.titleFont||"Montserrat"; $("#bodyFont").value=a.bodyFont||"Montserrat"; $("#titleSize").value=a.titleSize??44; $("#bodySize").value=a.bodySize??72; $("#titleWeight").value=String(a.titleWeight??800); $("#bodyWeight").value=String(a.bodyWeight??500); $("#lineHeight").value=a.lineHeight??1.16; $("#letterSpacing").value=a.letterSpacing??-.01; $("#titleColor").value=a.titleColor||"#ffffff"; $("#textColor").value=a.textColor||"#ffffff"; $("#lineColor").value=rgbaToHex(a.lineColor||"rgba(255,255,255,.90)");
  $("#wordCascade").checked=an.wordCascade!==false; $("#wordCascadeStep").value=an.wordCascadeStepMs??18; $("#sameChapterOutMs").value=an.sameChapterOutMs??100; $("#sameChapterInMs").value=an.sameChapterInMs??170; $("#chapterChangeMs").value=an.chapterChangeMs??320; $("#bookChangeMs").value=an.bookChangeMs??420;
  $("#wordCascadeStepValue").value=`${an.wordCascadeStepMs??18} ms/palabra`; $("#sameChapterOutValue").value=`${an.sameChapterOutMs??100} ms`; $("#sameChapterInValue").value=`${an.sameChapterInMs??170} ms`; $("#chapterChangeValue").value=`${an.chapterChangeMs??320} ms`; $("#bookChangeValue").value=`${an.bookChangeMs??420} ms`;
  $$(".source-option").forEach(o=>o.classList.toggle("active",o.dataset.source===s.source)); $("#manualContent").classList.toggle("hidden",s.source!=="manual"); $("#propresenterContent").classList.toggle("hidden",s.source!=="propresenter"); $("#scriptureSourceBadge").textContent=s.source==="manual"?"MANUAL":"PROPRESENTER";
  $$('[data-scripture-design]').forEach(card=>card.classList.toggle('active',card.dataset.scriptureDesign===(s.design||'classic')));
  const help={lower:'Composición inferior original con degradado adaptativo.','center-lower':'Versión inferior centrada y más contenida.','left-column':'Columna vertical anclada al lado izquierdo.','right-column':'Columna vertical anclada al lado derecho.',fullscreen:'Lectura amplia centrada dentro del área segura.',minimal:'Texto limpio con presencia gráfica reducida.'}; $("#scriptureFormatHelp").textContent=help[s.format||'lower'];
  const incoming=s.propresenter; $("#incomingReference").textContent=incoming.reference||"Sin contenido"; $("#incomingText").textContent=incoming.text||"Cuando llegue un cambio desde ProPresenter aparecerá aquí."; $("#incomingMeta").textContent=incoming.receivedAt?`${incoming.presentation||"Presentación"} · Slide ${incoming.slideIndex??"-"} · ${new Date(incoming.receivedAt).toLocaleTimeString()}`:"";
  setScriptureMode(scriptureUiMode); renderConnection(); refreshScriptureBroadcast();
}

let scriptureSaveTimer = null;
let scriptureSaveQueue = {};
let scriptureSaveSequence = 0;

function mergeScripturePatch(current, patch) {
  return {
    ...current,
    ...patch,
    manual: { ...current.manual, ...(patch.manual || {}) },
    propresenter: { ...current.propresenter, ...(patch.propresenter || {}) },
    composition: { ...current.composition, ...(patch.composition || {}) },
    appearance: { ...current.appearance, ...(patch.appearance || {}) },
    gradient: { ...current.gradient, ...(patch.gradient || {}) },
    animation: { ...current.animation, ...(patch.animation || {}) },
    output: { ...current.output, ...(patch.output || {}) }
  };
}

function queueScriptureSave(patch, delay = 90) {
  scriptureSaveQueue = mergeScripturePatch(scriptureSaveQueue, patch);
  clearTimeout(scriptureSaveTimer);
  const sequence = ++scriptureSaveSequence;

  scriptureSaveTimer = setTimeout(async () => {
    const payload = scriptureSaveQueue;
    scriptureSaveQueue = {};
    try {
      const saved = await api("/api/scripture", {
        method: "POST",
        body: JSON.stringify(payload)
      });
      if (sequence === scriptureSaveSequence) {
        appState.scripture = saved;
      }
      $("#saveState").textContent = "Guardado";
    } catch (error) {
      $("#saveState").textContent = "Error al guardar";
      console.error(error);
    }
  }, delay);
}

function updateScripture(patch, { render = true, immediate = false } = {}) {
  appState.scripture = mergeScripturePatch(appState.scripture, patch);
  markSaving();
  if (render) renderScripture();
  queueScriptureSave(patch, immediate ? 0 : 90);
  return Promise.resolve(appState.scripture);
}

$("#scriptureSimpleMode").addEventListener("click", () => setScriptureMode("simple"));
$("#scriptureAdvancedMode").addEventListener("click", () => setScriptureMode("advanced"));

$$("[data-scripture-design]").forEach(card => {
  card.addEventListener("click", () => updateScripture({ design: card.dataset.scriptureDesign }, { immediate: true }));
});

$$(".source-option").forEach(option => {
  option.addEventListener("click", () => updateScripture({ source: option.dataset.source }));
});

["reference", "version", "text"].forEach(key => {
  scriptureControls[key].addEventListener("input", () => {
    updateScripture({ manual: { [key]: scriptureControls[key].value } }, { render: false });
  });
});

const scriptureBindings = [
 ["format",null,"format"],["alignment","composition","alignment"],["maxLines","composition","maxLines",Number],["bottom","composition","bottom",Number],["width","composition","width",Number],["horizontalPadding","composition","horizontalPadding",Number],["scaleX","composition","scaleX",Number],["scaleY","composition","scaleY",Number],
 ["gradientMode","gradient","mode"],["gradientColor","gradient","color"],["gradientOpacity","gradient","opacity",Number],["gradientHeight","gradient","height",Number],["gradientTopOffset","gradient","topOffset",Number],["gradientBottomExtension","gradient","bottomExtension",Number],["gradientSoftness","gradient","softness",Number],["edgeFade","gradient","edgeFade",Number],
 ["titleFont","appearance","titleFont"],["bodyFont","appearance","bodyFont"],["titleSize","appearance","titleSize",Number],["bodySize","appearance","bodySize",Number],["titleWeight","appearance","titleWeight",Number],["bodyWeight","appearance","bodyWeight",Number],["lineHeight","appearance","lineHeight",Number],["letterSpacing","appearance","letterSpacing",Number],["titleColor","appearance","titleColor"],["textColor","appearance","textColor"],["lineColor","appearance","lineColor"],
 ["wordCascadeStepMs","animation","wordCascadeStepMs",Number],["sameChapterOutMs","animation","sameChapterOutMs",Number],["sameChapterInMs","animation","sameChapterInMs",Number],["chapterChangeMs","animation","chapterChangeMs",Number],["bookChangeMs","animation","bookChangeMs",Number]
];
for (const [controlKey, group, key, cast = value => value] of scriptureBindings) {
  const control = scriptureControls[controlKey];
  if (!control) {
    console.warn(`Scripture control missing: ${controlKey}`);
    continue;
  }

  control.addEventListener("input", () => {
    const value = cast(control.value);
    updateScripture(
      group ? { [group]: { [key]: value } } : { [key]: value }
    );
  });
}
scriptureControls.balance.addEventListener("change",()=>updateScripture({composition:{balance:scriptureControls.balance.checked}}));
scriptureControls.edgeFadeEnabled.addEventListener("change",()=>updateScripture({gradient:{edgeFadeEnabled:scriptureControls.edgeFadeEnabled.checked}}));
scriptureControls.gradientExtendToBottom.addEventListener("change",()=>updateScripture({gradient:{extendToBottom:scriptureControls.gradientExtendToBottom.checked}}));
scriptureControls.wordCascade.addEventListener("change",()=>updateScripture({animation:{wordCascade:scriptureControls.wordCascade.checked}}));

$("#testScriptureAnimation").addEventListener("click", async () => { await api("/api/scripture/replay",{method:"POST"}); $("#scriptureOutputPreview").contentWindow?.postMessage({type:"bmms-scripture-replay"},"*"); });
const scripturePreviewFrame = $("#scriptureOutputPreview");
const scripturePreviewViewport = scripturePreviewFrame?.closest(".scripture-output-frame");
const scripturePreviewStatus = $("#scripturePreviewStatus");

function resizeScripturePreview() {
  if (!scripturePreviewFrame || !scripturePreviewViewport) return;

  const zoomValue = $("#scripturePreviewZoom")?.value || "fit";
  const availableWidth = scripturePreviewViewport.clientWidth || 960;
  const availableHeight = Math.max(320, window.innerHeight - 210);
  const fitScale = Math.min(availableWidth / 1920, availableHeight / 1080);
  const scale = zoomValue === "fit"
    ? Math.max(0.1, fitScale)
    : Math.max(0.1, Number(zoomValue));

  scripturePreviewFrame.style.setProperty(
    "--scripture-preview-scale",
    String(scale)
  );
  scripturePreviewViewport.style.height = `${1080 * scale}px`;
  scripturePreviewViewport.style.overflow =
    scale > availableWidth / 1920 ? "auto" : "hidden";
}

if (scripturePreviewFrame && scripturePreviewViewport) {
  if ("ResizeObserver" in window) {
    const scripturePreviewObserver = new ResizeObserver(() => {
      resizeScripturePreview();
    });
    scripturePreviewObserver.observe(scripturePreviewViewport);
  } else {
    window.addEventListener("resize", resizeScripturePreview);
  }

  scripturePreviewFrame.addEventListener("load", () => {
    scripturePreviewFrame.classList.remove("preview-loading");
    if (scripturePreviewStatus) {
      scripturePreviewStatus.textContent = "Sincronizado";
    }
  });

  resizeScripturePreview();
}

$("#scripturePreviewZoom")?.addEventListener("change", resizeScripturePreview);

$("#toggleLargeScripturePreview")?.addEventListener("click", () => {
  document.body.classList.toggle("scripture-preview-large");
  const expanded = document.body.classList.contains("scripture-preview-large");
  $("#toggleLargeScripturePreview").textContent = expanded ? "Restaurar" : "Ampliar";
  requestAnimationFrame(resizeScripturePreview);
});

$("#fullscreenScripturePreview")?.addEventListener("click", async () => {
  const panel = scripturePreviewViewport?.closest(".scripture-live-preview");
  if (!panel) return;
  if (document.fullscreenElement) {
    await document.exitFullscreen();
  } else {
    await panel.requestFullscreen();
  }
  requestAnimationFrame(resizeScripturePreview);
});

document.addEventListener("fullscreenchange", () => {
  requestAnimationFrame(resizeScripturePreview);
});

$("#refreshScripturePreview")?.addEventListener("click", () => {
  if (!scripturePreviewFrame) return;

  scripturePreviewFrame.classList.add("preview-loading");
  if (scripturePreviewStatus) {
    scripturePreviewStatus.textContent = "Recargando…";
  }

  scripturePreviewFrame.src =
    `/overlay/scripture?preview=1&t=${Date.now()}`;
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
$("#integratedConnectButton").addEventListener("click", async () => { await api("/api/integrations/propresenter/connect",{method:"POST"}); await refreshScriptureBroadcast(); });
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


async function loadNetworkInfo() {
  try {
    const network = await api("/api/network");
    const outputUrl = network.scriptureOutputUrl;

    $("#scriptureOutputUrl").textContent = outputUrl;
    $("#openScriptureOutputUrl").href = outputUrl;

    if (network.addresses.length) {
      $("#scriptureNetworkHelp").textContent =
        `Desde otro PC de la misma red use esta URL. Puerto ${network.port}.`;
    } else {
      $("#scriptureNetworkHelp").textContent =
        "No se detectó una IP de red. Revise que el PC esté conectado al mismo router o switch.";
    }
  } catch (error) {
    $("#scriptureOutputUrl").textContent = `${location.origin}/overlay/scripture`;
    console.error("No fue posible detectar la dirección LAN", error);
  }
}

$("#copyScriptureOutputUrl").addEventListener("click", async () => {
  const url = $("#scriptureOutputUrl").textContent.trim();
  try {
    await navigator.clipboard.writeText(url);
    $("#copyScriptureOutputUrl").textContent = "Copiado";
    setTimeout(() => {
      $("#copyScriptureOutputUrl").textContent = "Copiar URL";
    }, 1200);
  } catch {
    window.prompt("Copie esta URL:", url);
  }
});

const events = new EventSource("/api/app-events");

events.addEventListener("scripture-updated", event => {
  const incoming = JSON.parse(event.data);
  if (incoming?.manual && incoming?.appearance && incoming?.animation) {
    appState.scripture = incoming;
    renderScripture();
  }
});

events.addEventListener("scripture-program", event => {
  scriptureBroadcast = JSON.parse(event.data);
  renderBroadcastState();
});

events.addEventListener("scripture-live-status", () => refreshScriptureBroadcast());

events.addEventListener("propresenter-status", event => {
  appState.propresenterStatus = JSON.parse(event.data);
  renderConnection();
});

events.onerror = () => {
  setTimeout(() => {
    refreshScriptureBroadcast();
  }, 500);
};

loadNetworkInfo();
loadState();
