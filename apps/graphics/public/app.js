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


const scriptureHistory = {
  undo: [],
  redo: [],
  restoring: false,
  max: 60
};

function cloneScriptureState(value = appState.scripture) {
  return JSON.parse(JSON.stringify(value));
}

function updateHistoryButtons() {
  const undo = $("#scriptureUndo");
  const redo = $("#scriptureRedo");
  if (undo) undo.disabled = scriptureHistory.undo.length === 0;
  if (redo) redo.disabled = scriptureHistory.redo.length === 0;
}

function pushScriptureHistory() {
  if (scriptureHistory.restoring) return;
  scriptureHistory.undo.push(cloneScriptureState());
  if (scriptureHistory.undo.length > scriptureHistory.max) {
    scriptureHistory.undo.shift();
  }
  scriptureHistory.redo = [];
  updateHistoryButtons();
}

async function restoreScriptureSnapshot(snapshot) {
  scriptureHistory.restoring = true;
  appState.scripture = cloneScriptureState(snapshot);
  renderScripture();
  await api("/api/scripture", {
    method: "POST",
    body: JSON.stringify(appState.scripture)
  });
  scriptureHistory.restoring = false;
  updateVisualEditorGeometry();
  updateHistoryButtons();
}

function updateScripture(patch, { render = true, immediate = false, history = true } = {}) {
  if (history) pushScriptureHistory();
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

const scriptureEditorLayer = $("#scriptureEditorLayer");
const scriptureCompositionSelection = $("#scriptureCompositionSelection");
const scriptureActionSafe = $("#scriptureActionSafe");
const scriptureTitleSafe = $("#scriptureTitleSafe");
const scriptureGrid = $("#scriptureGrid");
const scriptureGuides = $("#scriptureGuides");
const scriptureHorizontalRuler = $("#scriptureHorizontalRuler");
const scriptureVerticalRuler = $("#scriptureVerticalRuler");
const scriptureSmartGuideVertical = $("#scriptureSmartGuideVertical");
const scriptureSmartGuideHorizontal = $("#scriptureSmartGuideHorizontal");
const scriptureGeometryInspector = $("#scriptureGeometryInspector");
const scriptureNavigator = $("#scriptureNavigator");
const scriptureNavigatorViewport = $("#scriptureNavigatorViewport");

const scriptureEditorState = {
  scale: 1,
  panX: 0,
  panY: 0,
  actionSafe: true,
  titleSafe: true,
  grid: false,
  rulers: true,
  snapGrid: true,
  snapCenter: true,
  snapSafe: true,
  gridSize: 32,
  guides: [],
  spacePressed: false,
  panning: null,
  interaction: null
};

function editorSettings() {
  return appState.scripture?.composition?.editor || {};
}

function setToolbarToggle(id, active) {
  const button = $(id);
  if (!button) return;
  button.classList.toggle("is-active", active);
  button.setAttribute("aria-pressed", String(active));
}

function hydrateEditorSettings() {
  const settings = editorSettings();
  scriptureEditorState.actionSafe =
    settings.actionSafe ?? settings.safeArea ?? true;
  scriptureEditorState.titleSafe = settings.titleSafe !== false;
  scriptureEditorState.grid = settings.grid === true;
  scriptureEditorState.rulers = settings.rulers !== false;
  scriptureEditorState.snapGrid =
    settings.snapGrid ?? settings.snap ?? true;
  scriptureEditorState.snapCenter = settings.snapCenter !== false;
  scriptureEditorState.snapSafe = settings.snapSafe !== false;
  scriptureEditorState.gridSize = Number(settings.gridSize || 32);
  scriptureEditorState.guides = Array.isArray(settings.guides)
    ? settings.guides
    : [];

  setToolbarToggle("#toggleActionSafe", scriptureEditorState.actionSafe);
  setToolbarToggle("#toggleTitleSafe", scriptureEditorState.titleSafe);
  setToolbarToggle("#toggleGrid", scriptureEditorState.grid);
  setToolbarToggle("#toggleRulers", scriptureEditorState.rulers);
  setToolbarToggle("#toggleSnapGrid", scriptureEditorState.snapGrid);
  setToolbarToggle("#toggleSnapCenter", scriptureEditorState.snapCenter);
  setToolbarToggle("#toggleSnapSafe", scriptureEditorState.snapSafe);

  if ($("#scriptureGridSize")) {
    $("#scriptureGridSize").value = String(scriptureEditorState.gridSize);
  }
}

function persistEditorSettings(patch) {
  const current = editorSettings();
  updateScripture({
    composition: {
      editor: { ...current, ...patch }
    }
  }, { render: false, history: false });
}

function editorGeometry() {
  const c = appState.scripture?.composition || {};
  const g = appState.scripture?.gradient || {};
  const width = Math.max(240, Math.min(1920, Number(c.width ?? 1660)));
  const height = Math.max(100, Math.min(1080, Number(g.height ?? 430)));
  const offsetX = Number(c.offsetX ?? 0);
  const bottom = Number(c.bottom ?? 28);
  const x = ((1920 - width) / 2) + offsetX;
  const y = 1080 - bottom - height;
  return { x, y, width, height, bottom, offsetX };
}

// Compatibility helper retained for Update 027 extensions.
function snapValue(value, points = []) {
  const candidates = points.map(point => ({ value: point, type: "legacy" }));
  if (scriptureEditorState.snapGrid) {
    const grid = scriptureEditorState.gridSize || 32;
    candidates.unshift({
      value: Math.round(value / grid) * grid,
      type: "grid"
    });
  }
  return snapCoordinate(value, candidates).value;
}

function snapCoordinate(value, candidates, threshold = 12) {
  let best = value;
  let bestDistance = threshold;
  let matched = null;

  for (const candidate of candidates) {
    const distance = Math.abs(value - candidate.value);
    if (distance < bestDistance) {
      best = candidate.value;
      bestDistance = distance;
      matched = candidate;
    }
  }

  return { value: best, matched };
}

function snapPosition(x, y, width, height) {
  const xCandidates = [];
  const yCandidates = [];
  const grid = scriptureEditorState.gridSize || 32;

  if (scriptureEditorState.snapGrid) {
    xCandidates.push({
      value: Math.round(x / grid) * grid,
      type: "grid"
    });
    yCandidates.push({
      value: Math.round(y / grid) * grid,
      type: "grid"
    });
  }

  if (scriptureEditorState.snapCenter) {
    xCandidates.push({
      value: (1920 - width) / 2,
      type: "center"
    });
    yCandidates.push({
      value: (1080 - height) / 2,
      type: "center"
    });
  }

  if (scriptureEditorState.snapSafe) {
    const action = 96;
    const title = 192;
    for (const edge of [action, title]) {
      xCandidates.push(
        { value: edge, type: "safe" },
        { value: 1920 - edge - width, type: "safe" }
      );
      yCandidates.push(
        { value: edge, type: "safe" },
        { value: 1080 - edge - height, type: "safe" }
      );
    }
  }

  for (const guide of scriptureEditorState.guides) {
    if (guide.axis === "x") {
      xCandidates.push({ value: guide.position, type: "guide" });
    } else {
      yCandidates.push({ value: guide.position, type: "guide" });
    }
  }

  return {
    x: snapCoordinate(x, xCandidates),
    y: snapCoordinate(y, yCandidates)
  };
}

function renderRulers() {
  if (!scriptureHorizontalRuler || !scriptureVerticalRuler) return;
  const step = 100;
  const scale = scriptureEditorState.scale;

  scriptureHorizontalRuler.innerHTML = "";
  scriptureVerticalRuler.innerHTML = "";

  for (let value = 0; value <= 1920; value += step) {
    const mark = document.createElement("span");
    mark.style.left = `${value * scale}px`;
    mark.textContent = value;
    scriptureHorizontalRuler.append(mark);
  }

  for (let value = 0; value <= 1080; value += step) {
    const mark = document.createElement("span");
    mark.style.top = `${value * scale}px`;
    mark.textContent = value;
    scriptureVerticalRuler.append(mark);
  }
}

function renderPersistentGuides() {
  if (!scriptureGuides) return;
  scriptureGuides.innerHTML = "";
  const scale = scriptureEditorState.scale;

  scriptureEditorState.guides.forEach((guide, index) => {
    const line = document.createElement("button");
    line.type = "button";
    line.className = `persistent-guide ${guide.axis === "x" ? "vertical" : "horizontal"}`;
    line.dataset.guideIndex = String(index);
    line.title = "Doble clic para eliminar";

    if (guide.axis === "x") {
      line.style.left = `${guide.position * scale}px`;
    } else {
      line.style.top = `${guide.position * scale}px`;
    }

    line.addEventListener("dblclick", () => {
      scriptureEditorState.guides.splice(index, 1);
      persistEditorSettings({ guides: scriptureEditorState.guides });
      renderPersistentGuides();
    });

    scriptureGuides.append(line);
  });
}

function updateInspector(geometry, visible = false) {
  if (!scriptureGeometryInspector) return;
  $("#inspectorX").textContent = Math.round(geometry.x);
  $("#inspectorY").textContent = Math.round(geometry.y);
  $("#inspectorW").textContent = Math.round(geometry.width);
  $("#inspectorH").textContent = Math.round(geometry.height);
  scriptureGeometryInspector.classList.toggle("is-visible", visible);
  scriptureGeometryInspector.setAttribute("aria-hidden", String(!visible));
}

function showSmartGuides(xMatch, yMatch) {
  scriptureSmartGuideVertical?.classList.toggle(
    "is-visible",
    Boolean(xMatch && ["center", "safe", "guide"].includes(xMatch.type))
  );
  scriptureSmartGuideHorizontal?.classList.toggle(
    "is-visible",
    Boolean(yMatch && ["center", "safe", "guide"].includes(yMatch.type))
  );

  if (scriptureSmartGuideVertical && xMatch) {
    scriptureSmartGuideVertical.style.left =
      `${xMatch.value * scriptureEditorState.scale}px`;
    scriptureSmartGuideVertical.querySelector("span").textContent =
      xMatch.type === "center" ? "Centro" : "Snap";
  }

  if (scriptureSmartGuideHorizontal && yMatch) {
    scriptureSmartGuideHorizontal.style.top =
      `${yMatch.value * scriptureEditorState.scale}px`;
    scriptureSmartGuideHorizontal.querySelector("span").textContent =
      yMatch.type === "center" ? "Centro" : "Snap";
  }
}

function updateNavigator() {
  if (!scriptureNavigator || !scriptureNavigatorViewport) return;
  const visible = scriptureEditorState.scale > 0.72;
  scriptureNavigator.classList.toggle("is-visible", visible);
  scriptureNavigator.setAttribute("aria-hidden", String(!visible));

  if (!visible || !scripturePreviewViewport) return;

  const sceneWidth = 1920 * scriptureEditorState.scale;
  const sceneHeight = 1080 * scriptureEditorState.scale;
  const viewportWidth = scripturePreviewViewport.clientWidth;
  const viewportHeight = scripturePreviewViewport.clientHeight;

  scriptureNavigatorViewport.style.width =
    `${Math.min(100, viewportWidth / sceneWidth * 100)}%`;
  scriptureNavigatorViewport.style.height =
    `${Math.min(100, viewportHeight / sceneHeight * 100)}%`;
  scriptureNavigatorViewport.style.left =
    `${Math.max(0, scripturePreviewViewport.scrollLeft / sceneWidth * 100)}%`;
  scriptureNavigatorViewport.style.top =
    `${Math.max(0, scripturePreviewViewport.scrollTop / sceneHeight * 100)}%`;
}

function updateVisualEditorGeometry() {
  if (!scriptureCompositionSelection || !scriptureEditorLayer) return;
  const geometry = editorGeometry();
  const scale = scriptureEditorState.scale || 1;

  scriptureCompositionSelection.style.left = `${geometry.x * scale}px`;
  scriptureCompositionSelection.style.top = `${Math.max(0, geometry.y) * scale}px`;
  scriptureCompositionSelection.style.width = `${geometry.width * scale}px`;
  scriptureCompositionSelection.style.height = `${Math.min(geometry.height, 1080) * scale}px`;
  scriptureEditorLayer.style.setProperty("--editor-scale", String(scale));

  scriptureActionSafe?.classList.toggle(
    "is-hidden",
    !scriptureEditorState.actionSafe
  );
  scriptureTitleSafe?.classList.toggle(
    "is-hidden",
    !scriptureEditorState.titleSafe
  );
  scriptureGrid?.classList.toggle("is-hidden", !scriptureEditorState.grid);
  scriptureHorizontalRuler?.classList.toggle(
    "is-hidden",
    !scriptureEditorState.rulers
  );
  scriptureVerticalRuler?.classList.toggle(
    "is-hidden",
    !scriptureEditorState.rulers
  );
  $(".ruler-corner")?.classList.toggle(
    "is-hidden",
    !scriptureEditorState.rulers
  );

  if (scriptureGrid) {
    scriptureGrid.style.setProperty(
      "--grid-size",
      `${scriptureEditorState.gridSize * scale}px`
    );
  }

  renderRulers();
  renderPersistentGuides();
  updateInspector(geometry, Boolean(scriptureEditorState.interaction));
  updateNavigator();
}

function beginVisualInteraction(event, handle = "move") {
  if (!scriptureCompositionSelection) return;
  if (scriptureEditorState.spacePressed) return;
  event.preventDefault();

  const geometry = editorGeometry();
  pushScriptureHistory();
  scriptureEditorState.interaction = {
    handle,
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    ...geometry
  };

  scriptureCompositionSelection.setPointerCapture(event.pointerId);
  scriptureCompositionSelection.classList.add("is-editing");
  updateInspector(geometry, true);
}

function moveVisualInteraction(event) {
  const interaction = scriptureEditorState.interaction;
  if (!interaction) return;

  const scale = scriptureEditorState.scale || 1;
  const dx = (event.clientX - interaction.startX) / scale;
  const dy = (event.clientY - interaction.startY) / scale;

  let x = interaction.x;
  let y = interaction.y;
  let width = interaction.width;
  let height = interaction.height;

  if (interaction.handle === "move") {
    x += dx;
    y += dy;
  } else {
    if (["left", "nw", "sw"].includes(interaction.handle)) {
      x += dx;
      width -= dx;
    }
    if (["right", "ne", "se"].includes(interaction.handle)) {
      width += dx;
    }
    if (["top", "nw", "ne"].includes(interaction.handle)) {
      y += dy;
      height -= dy;
    }
    if (["bottom", "sw", "se"].includes(interaction.handle)) {
      height += dy;
    }
  }

  width = Math.max(240, Math.min(1920, width));
  height = Math.max(100, Math.min(1080, height));
  x = Math.max(-960, Math.min(1920 - 120, x));
  y = Math.max(-540, Math.min(1080 - 60, y));

  const snapped = snapPosition(x, y, width, height);
  x = snapped.x.value;
  y = snapped.y.value;
  showSmartGuides(snapped.x.matched, snapped.y.matched);

  const offsetX = x - ((1920 - width) / 2);
  const bottom = 1080 - y - height;

  appState.scripture = mergeScripturePatch(appState.scripture, {
    composition: { width, bottom, offsetX },
    gradient: { height }
  });

  renderScripture();
  updateVisualEditorGeometry();
  queueScriptureSave({
    composition: { width, bottom, offsetX },
    gradient: { height }
  }, 25);
}

function endVisualInteraction(event) {
  if (!scriptureEditorState.interaction) return;

  try {
    scriptureCompositionSelection.releasePointerCapture(event.pointerId);
  } catch {}

  scriptureEditorState.interaction = null;
  scriptureCompositionSelection.classList.remove("is-editing");
  showSmartGuides(null, null);
  updateInspector(editorGeometry(), false);
  updateHistoryButtons();
}

function setCanvasZoom(nextScale, anchor = null) {
  const clamped = Math.max(0.1, Math.min(2.5, nextScale));
  const previous = scriptureEditorState.scale || 1;
  scriptureEditorState.scale = clamped;

  if ($("#scripturePreviewZoom")) {
    $("#scripturePreviewZoom").value = "";
  }

  scripturePreviewFrame.style.setProperty(
    "--scripture-preview-scale",
    String(clamped)
  );
  scripturePreviewViewport.style.height = `${1080 * clamped}px`;
  scripturePreviewViewport.style.overflow = "auto";

  if (anchor && previous !== clamped) {
    const ratio = clamped / previous;
    scripturePreviewViewport.scrollLeft =
      (scripturePreviewViewport.scrollLeft + anchor.x) * ratio - anchor.x;
    scripturePreviewViewport.scrollTop =
      (scripturePreviewViewport.scrollTop + anchor.y) * ratio - anchor.y;
  }

  updateVisualEditorGeometry();
}

function resizeScripturePreview() {
  if (!scripturePreviewFrame || !scripturePreviewViewport) return;

  const zoomValue = $("#scripturePreviewZoom")?.value || "fit";
  const availableWidth = scripturePreviewViewport.clientWidth || 960;
  const availableHeight = Math.max(320, window.innerHeight - 210);
  const fitScale = Math.min(availableWidth / 1920, availableHeight / 1080);
  const scale = zoomValue === "fit"
    ? Math.max(0.1, fitScale)
    : Math.max(0.1, Number(zoomValue));

  scriptureEditorState.scale = scale;
  scripturePreviewFrame.style.setProperty(
    "--scripture-preview-scale",
    String(scale)
  );
  scripturePreviewViewport.style.height = `${1080 * scale}px`;
  scripturePreviewViewport.style.overflow =
    scale > availableWidth / 1920 ? "auto" : "hidden";
  updateVisualEditorGeometry();
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

  scripturePreviewViewport.addEventListener("wheel", event => {
    if (!(event.ctrlKey || event.metaKey)) return;
    event.preventDefault();
    const rect = scripturePreviewViewport.getBoundingClientRect();
    const anchor = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
    const factor = event.deltaY < 0 ? 1.1 : 0.9;
    setCanvasZoom(scriptureEditorState.scale * factor, anchor);
  }, { passive: false });

  scripturePreviewViewport.addEventListener("scroll", updateNavigator);
  scripturePreviewViewport.addEventListener("dblclick", event => {
    if (event.target.closest(".composition-selection")) return;
    $("#scripturePreviewZoom").value = "fit";
    resizeScripturePreview();
  });

  scripturePreviewViewport.addEventListener("pointerdown", event => {
    if (!scriptureEditorState.spacePressed) return;
    scriptureEditorState.panning = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      scrollLeft: scripturePreviewViewport.scrollLeft,
      scrollTop: scripturePreviewViewport.scrollTop
    };
    scripturePreviewViewport.setPointerCapture(event.pointerId);
    scripturePreviewViewport.classList.add("is-panning");
  });

  scripturePreviewViewport.addEventListener("pointermove", event => {
    const pan = scriptureEditorState.panning;
    if (!pan) return;
    scripturePreviewViewport.scrollLeft =
      pan.scrollLeft - (event.clientX - pan.startX);
    scripturePreviewViewport.scrollTop =
      pan.scrollTop - (event.clientY - pan.startY);
  });

  scripturePreviewViewport.addEventListener("pointerup", event => {
    if (!scriptureEditorState.panning) return;
    try {
      scripturePreviewViewport.releasePointerCapture(event.pointerId);
    } catch {}
    scriptureEditorState.panning = null;
    scripturePreviewViewport.classList.remove("is-panning");
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

function bindEditorToggle(id, stateKey, settingKey = stateKey) {
  $(id)?.addEventListener("click", () => {
    scriptureEditorState[stateKey] = !scriptureEditorState[stateKey];
    setToolbarToggle(id, scriptureEditorState[stateKey]);
    persistEditorSettings({ [settingKey]: scriptureEditorState[stateKey] });
    updateVisualEditorGeometry();
  });
}

bindEditorToggle("#toggleActionSafe", "actionSafe");
bindEditorToggle("#toggleTitleSafe", "titleSafe");
bindEditorToggle("#toggleGrid", "grid");
bindEditorToggle("#toggleRulers", "rulers");
bindEditorToggle("#toggleSnapGrid", "snapGrid");
bindEditorToggle("#toggleSnapCenter", "snapCenter");
bindEditorToggle("#toggleSnapSafe", "snapSafe");

$("#scriptureGridSize")?.addEventListener("change", event => {
  scriptureEditorState.gridSize = Number(event.target.value || 32);
  persistEditorSettings({ gridSize: scriptureEditorState.gridSize });
  updateVisualEditorGeometry();
});

$("#clearScriptureGuides")?.addEventListener("click", () => {
  scriptureEditorState.guides = [];
  persistEditorSettings({ guides: [] });
  renderPersistentGuides();
});

function createGuide(axis, event) {
  if (!scriptureEditorLayer) return;
  const rect = scriptureEditorLayer.getBoundingClientRect();
  const scale = scriptureEditorState.scale || 1;
  const position = axis === "x"
    ? (event.clientX - rect.left) / scale
    : (event.clientY - rect.top) / scale;

  scriptureEditorState.guides.push({
    axis,
    position: Math.max(0, Math.round(position))
  });
  persistEditorSettings({ guides: scriptureEditorState.guides });
  renderPersistentGuides();
}

scriptureHorizontalRuler?.addEventListener("dblclick", event => {
  createGuide("x", event);
});
scriptureVerticalRuler?.addEventListener("dblclick", event => {
  createGuide("y", event);
});

$("#scriptureUndo")?.addEventListener("click", async () => {
  const snapshot = scriptureHistory.undo.pop();
  if (!snapshot) return;
  scriptureHistory.redo.push(cloneScriptureState());
  await restoreScriptureSnapshot(snapshot);
});

$("#scriptureRedo")?.addEventListener("click", async () => {
  const snapshot = scriptureHistory.redo.pop();
  if (!snapshot) return;
  scriptureHistory.undo.push(cloneScriptureState());
  await restoreScriptureSnapshot(snapshot);
});

window.addEventListener("keydown", event => {
  if (event.code === "Space" && !event.repeat) {
    scriptureEditorState.spacePressed = true;
    scripturePreviewViewport?.classList.add("can-pan");
  }

  const modifier = event.ctrlKey || event.metaKey;
  if (!modifier || event.altKey) return;

  if (event.key.toLowerCase() === "z") {
    event.preventDefault();
    if (event.shiftKey) $("#scriptureRedo")?.click();
    else $("#scriptureUndo")?.click();
  }

  if (event.key.toLowerCase() === "y") {
    event.preventDefault();
    $("#scriptureRedo")?.click();
  }

  if (event.key === "0") {
    event.preventDefault();
    $("#scripturePreviewZoom").value = "fit";
    resizeScripturePreview();
  }

  if (event.key === "1") {
    event.preventDefault();
    setCanvasZoom(1);
  }
});

window.addEventListener("keyup", event => {
  if (event.code !== "Space") return;
  scriptureEditorState.spacePressed = false;
  scripturePreviewViewport?.classList.remove("can-pan", "is-panning");
});

const scripturePresets = {
  lower: {
    format: "lower",
    composition: { width: 1660, bottom: 28, offsetX: 0, scaleX: 1, scaleY: 1 },
    gradient: { height: 430, topOffset: 0, bottomExtension: 0, extendToBottom: true }
  },
  wide: {
    format: "lower",
    composition: { width: 1820, bottom: 20, offsetX: 0, scaleX: 1, scaleY: 1 },
    gradient: { height: 500, topOffset: 0, bottomExtension: 0, extendToBottom: true }
  },
  compact: {
    format: "minimal",
    composition: { width: 1480, bottom: 54, offsetX: 0, scaleX: .92, scaleY: .82 },
    gradient: { height: 300, topOffset: 0, bottomExtension: 0, extendToBottom: false }
  },
  fullscreen: {
    format: "fullscreen",
    composition: { width: 1620, bottom: 150, offsetX: 0, scaleX: 1, scaleY: 1 },
    gradient: { height: 780, topOffset: 100, bottomExtension: 0, extendToBottom: false }
  }
};

$("#applyScripturePreset")?.addEventListener("click", () => {
  const preset = scripturePresets[$("#scriptureCompositionPreset")?.value];
  if (!preset) return;
  updateScripture(preset, { immediate: true });
  updateVisualEditorGeometry();
});

scriptureCompositionSelection?.addEventListener("pointerdown", event => {
  const handle = event.target?.dataset?.handle || "move";
  beginVisualInteraction(event, handle);
});
scriptureCompositionSelection?.addEventListener("pointermove", moveVisualInteraction);
scriptureCompositionSelection?.addEventListener("pointerup", endVisualInteraction);
scriptureCompositionSelection?.addEventListener("pointercancel", endVisualInteraction);

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


/* Update 027 bootstrap */
window.addEventListener("load", () => {
  hydrateEditorSettings();
  updateVisualEditorGeometry();
  updateHistoryButtons();
});
