# BMMS Update 024 Validation

## repository_check
Exit code: 0

```text
BMMS repository check passed.

```

## tests
Exit code: 1

```text
TAP version 13
# Subtest: animation preview controls are connected
ok 1 - animation preview controls are connected
  ---
  duration_ms: 4.093813
  type: 'test'
  ...
# Subtest: editor animation playback uses requestAnimationFrame
ok 2 - editor animation playback uses requestAnimationFrame
  ---
  duration_ms: 2.201157
  type: 'test'
  ...
# Subtest: publishes a versioned event envelope
ok 3 - publishes a versioned event envelope
  ---
  duration_ms: 1.589606
  type: 'test'
  ...
# Subtest: registers and resolves a service
ok 4 - registers and resolves a service
  ---
  duration_ms: 0.639872
  type: 'test'
  ...
# Subtest: rejects duplicate registrations
ok 5 - rejects duplicate registrations
  ---
  duration_ms: 0.20156
  type: 'test'
  ...
# Subtest: normalizes an animation configuration
ok 6 - normalizes an animation configuration
  ---
  duration_ms: 0.856745
  type: 'test'
  ...
# Subtest: provides enter and exit animation defaults
ok 7 - provides enter and exit animation defaults
  ---
  duration_ms: 0.156823
  type: 'test'
  ...
# Subtest: creates slide keyframes
ok 8 - creates slide keyframes
  ---
  duration_ms: 0.417491
  type: 'test'
  ...
# Subtest: disabled animations produce no keyframes
ok 9 - disabled animations produce no keyframes
  ---
  duration_ms: 0.593894
  type: 'test'
  ...
# Subtest: lists built-in broadcast components
ok 10 - lists built-in broadcast components
  ---
  duration_ms: 1.79359
  type: 'test'
  ...
# Subtest: creates a Scripture component with shared component identity
ok 11 - creates a Scripture component with shared component identity
  ---
  duration_ms: 2.522745
  type: 'test'
  ...
# Subtest: creates a Lower Third component with live bindings
ok 12 - creates a Lower Third component with live bindings
  ---
  duration_ms: 0.365744
  type: 'test'
  ...
# Subtest: generic component factory rejects unknown components
ok 13 - generic component factory rejects unknown components
  ---
  duration_ms: 0.379114
  type: 'test'
  ...
# Subtest: gets nested values by path
ok 14 - gets nested values by path
  ---
  duration_ms: 1.092917
  type: 'test'
  ...
# Subtest: resolves single and double brace tokens
ok 15 - resolves single and double brace tokens
  ---
  duration_ms: 0.337753
  type: 'test'
  ...
# Subtest: resolves binding text elements without mutating source
ok 16 - resolves binding text elements without mutating source
  ---
  duration_ms: 0.270432
  type: 'test'
  ...
# Subtest: resolves documents and lists tokens
ok 17 - resolves documents and lists tokens
  ---
  duration_ms: 0.729877
  type: 'test'
  ...
# Subtest: creates normalized text elements
ok 18 - creates normalized text elements
  ---
  duration_ms: 3.059784
  type: 'test'
  ...
# Subtest: updates and removes elements immutably
ok 19 - updates and removes elements immutably
  ---
  duration_ms: 0.593463
  type: 'test'
  ...
# Subtest: reorders layers
ok 20 - reorders layers
  ---
  duration_ms: 0.963554
  type: 'test'
  ...
# Subtest: normalization preserves grouping metadata
ok 21 - normalization preserves grouping metadata
  ---
  duration_ms: 1.309539
  type: 'test'
  ...
# Subtest: undoes and redoes document commits
ok 22 - undoes and redoes document commits
  ---
  duration_ms: 0.755334
  type: 'test'
  ...
# Subtest: creates and categorizes templates
ok 23 - creates and categorizes templates
  ---
  duration_ms: 3.381663
  type: 'test'
  ...
# Subtest: duplicates templates with a new identity
ok 24 - duplicates templates with a new identity
  ---
  duration_ms: 0.36944
  type: 'test'
  ...
# Subtest: instantiates templates with new element and group ids
ok 25 - instantiates templates with new element and group ids
  ---
  duration_ms: 0.473995
  type: 'test'
  ...
# Subtest: updates metadata without replacing the stored document
ok 26 - updates metadata without replacing the stored document
  ---
  duration_ms: 0.221209
  type: 'test'
  ...
# Subtest: Scripture defaults to manual source
ok 27 - Scripture defaults to manual source
  ---
  duration_ms: 0.708815
  type: 'test'
  ...
# Subtest: ProPresenter settings are globally available
ok 28 - ProPresenter settings are globally available
  ---
  duration_ms: 0.158687
  type: 'test'
  ...
# Subtest: Smart Flyer defaults to assisted automation
ok 29 - Smart Flyer defaults to assisted automation
  ---
  duration_ms: 0.139337
  type: 'test'
  ...
# Subtest: builds manual scripture context
ok 30 - builds manual scripture context
  ---
  duration_ms: 0.990985
  type: 'test'
  ...
# Subtest: uses ProPresenter scripture when selected
ok 31 - uses ProPresenter scripture when selected
  ---
  duration_ms: 0.377692
  type: 'test'
  ...
# Subtest: reads the official status and presentation endpoints
ok 32 - reads the official status and presentation endpoints
  ---
  duration_ms: 2.704726
  type: 'test'
  ...
# Subtest: does not emit a duplicate verse
ok 33 - does not emit a duplicate verse
  ---
  duration_ms: 0.734363
  type: 'test'
  ...
# Subtest: starts disabled by default
ok 34 - starts disabled by default
  ---
  duration_ms: 0.923535
  type: 'test'
  ...
# Subtest: validates port range
ok 35 - validates port range
  ---
  duration_ms: 0.411042
  type: 'test'
  ...
# Subtest: publishes normalized ProPresenter media events
ok 36 - publishes normalized ProPresenter media events
  ---
  duration_ms: 0.804217
  type: 'test'
  ...
# {"timestamp":"2026-07-23T05:41:44.004Z","level":"INFO","scope":"test","message":"Connecting to ProPresenter","context":{"host":"127.0.0.1","port":1025,"protocol":"tcp"}}
# Subtest: tests the connection through the documented system-time endpoint
ok 37 - tests the connection through the documented system-time endpoint
  ---
  duration_ms: 0.949043
  type: 'test'
  ...
# Subtest: connects and subscribes configured streaming endpoints
ok 38 - connects and subscribes configured streaming endpoints
  ---
  duration_ms: 1.956732
  type: 'test'
  ...
# Subtest: normalizes a ProPresenter Scripture payload
ok 39 - normalizes a ProPresenter Scripture payload
  ---
  duration_ms: 1.775332
  type: 'test'
  ...
# Subtest: uses newline-delimited JSON for a real TCP request
ok 40 - uses newline-delimited JSON for a real TCP request
  ---
  duration_ms: 11.998088
  type: 'test'
  ...
# Subtest: receives chunked streaming messages
ok 41 - receives chunked streaming messages
  ---
  duration_ms: 43.680709
  type: 'test'
  ...
# Subtest: applies capped exponential backoff
ok 42 - applies capped exponential backoff
  ---
  duration_ms: 1.015341
  type: 'test'
  ...
# Subtest: normalizes a common current slide payload
ok 43 - normalizes a common current slide payload
  ---
  duration_ms: 2.173425
  type: 'test'
  ...
# Subtest: supports snake case response variants
ok 44 - supports snake case response variants
  ---
  duration_ms: 0.372034
  type: 'test'
  ...
# Subtest: balances text into visually similar lines
ok 45 - balances text into visually similar lines
  ---
  duration_ms: 0.979067
  type: 'test'
  ...
# Subtest: penalizes a one-word final line when a better partition exists
ok 46 - penalizes a one-word final line when a better partition exists
  ---
  duration_ms: 1.429738
  type: 'test'
  ...
# Subtest: reports overflow when minimum font still exceeds the box
ok 47 - reports overflow when minimum font still exceeds the box
  ---
  duration_ms: 0.260108
  type: 'test'
  ...
# Subtest: Scripture includes a default simple-mode design
ok 48 - Scripture includes a default simple-mode design
  ---
  duration_ms: 0.594425
  type: 'test'
  ...
# Subtest: Scripture broadcast state starts safely off air
ok 49 - Scripture broadcast state starts safely off air
  ---
  duration_ms: 0.18807
  type: 'test'
  ...
# Subtest: publishes verse and program events
ok 50 - publishes verse and program events
  ---
  duration_ms: 2.074127
  type: 'test'
  ...
# Subtest: does not mark identical normalized content as changed
ok 51 - does not mark identical normalized content as changed
  ---
  duration_ms: 0.475959
  type: 'test'
  ...
# Subtest: preview iframe is not hidden behind a ready-message race
ok 52 - preview iframe is not hidden behind a ready-message race
  ---
  duration_ms: 0.989303
  type: 'test'
  ...
# Subtest: lateral padding overrides every Scripture format
ok 53 - lateral padding overrides every Scripture format
  ---
  duration_ms: 0.483529
  type: 'test'
  ...
# Subtest: text fitting performs real rendered candidate measurements
ok 54 - text fitting performs real rendered candidate measurements
  ---
  duration_ms: 0.205376
  type: 'test'
  ...
# Subtest: preview initialization cannot abort the whole app
ok 55 - preview initialization cannot abort the whole app
  ---
  duration_ms: 1.824465
  type: 'test'
  ...
# Subtest: saved Scripture state is deeply hydrated
ok 56 - saved Scripture state is deeply hydrated
  ---
  duration_ms: 0.231084
  type: 'test'
  ...
# Subtest: restores original Scripture geometry
ok 57 - restores original Scripture geometry
  ---
  duration_ms: 0.648455
  type: 'test'
  ...
# Subtest: restores writing and contextual transitions
ok 58 - restores writing and contextual transitions
  ---
  duration_ms: 0.170264
  type: 'test'
  ...
# Subtest: restores gradient and typography
ok 59 - restores gradient and typography
  ---
  duration_ms: 0.100509
  type: 'test'
  ...
# Subtest: Scripture restores the original template and format defaults
ok 60 - Scripture restores the original template and format defaults
  ---
  duration_ms: 0.573643
  type: 'test'
  ...
# Subtest: Appearance and animation configuration have usable defaults
ok 61 - Appearance and animation configuration have usable defaults
  ---
  duration_ms: 0.224284
  type: 'test'
  ...
# Subtest: TV Broadcast CG is available in the advanced template library
ok 62 - TV Broadcast CG is available in the advanced template library
  ---
  duration_ms: 2.463892
  type: 'test'
  ...
# Subtest: Scripture output contains the robust fitting engine
ok 63 - Scripture output contains the robust fitting engine
  ---
  duration_ms: 0.294268
  type: 'test'
  ...
# Subtest: Preview uses one scaled 1920 by 1080 stage
ok 64 - Preview uses one scaled 1920 by 1080 stage
  ---
  duration_ms: 0.32249
  type: 'test'
  ...
# Subtest: preview iframe preserves a 1920 by 1080 viewport
ok 65 - preview iframe preserves a 1920 by 1080 viewport
  ---
  duration_ms: 2.165553
  type: 'test'
  ...
# Subtest: overlay no longer polls and rerenders every two seconds
ok 66 - overlay no longer polls and rerenders every two seconds
  ---
  duration_ms: 0.357492
  type: 'test'
  ...
# Subtest: signature excludes volatile ProPresenter timestamps
ok 67 - signature excludes volatile ProPresenter timestamps
  ---
  duration_ms: 0.2759
  type: 'test'
  ...
# Subtest: verse width follows configured lateral padding without a legacy cap
ok 68 - verse width follows configured lateral padding without a legacy cap
  ---
  duration_ms: 0.430571
  type: 'test'
  ...
# Subtest: verse size is authoritative and is never silently reduced
ok 69 - verse size is authoritative and is never silently reduced
  ---
  duration_ms: 0.362189
  type: 'test'
  ...
# Subtest: composition supports independent X and Y scale
not ok 70 - composition supports independent X and Y scale
  ---
  duration_ms: 3.23156
  type: 'test'
  location: '/mnt/data/bmms-update-024/BMMS-PROJECT/tests/scripture-core/scripture-update-024.test.js:8:1'
  failureType: 'testCodeFailure'
  error: |-
    The input did not match the regular expression /compositionScaleX/. Input:
    
    'const $ = selector => document.querySelector(selector);\n' +
      'const $$ = selector => [...document.querySelectorAll(selector)];\n' +
      '\n' +
      'let appState = {};\n' +
      'let saveTimer;\n' +
      '\n' +
      'const lowerThirdFields = {\n' +
      '  primary: $("#primary"),\n' +
      '  secondary: $("#secondary"),\n' +
      '  accent: $("#accent"),\n' +
      '  align: $("#align"),\n' +
      '  animationMs: $("#animationMs")\n' +
      '};\n' +
      '\n' +
      'const scriptureControls = {\n' +
      '  reference: $("#scriptureReference"), version: $("#scriptureVersion"), text: $("#scriptureText"),\n' +
      '  format: $("#scriptureFormat"), alignment: $("#scriptureAlign"), maxLines: $("#maxLines"), balance: $("#balanceText"),\n' +
      '  bottom: $("#scriptureBottom"), width: $("#scriptureWidth"), horizontalPadding: $("#scripturePadding"),\n' +
      '  gradientMode: $("#gradientMode"), gradientColor: $("#gradientColor"), gradientOpacity: $("#gradientOpacity"),\n' +
      '  gradientHeight: $("#gradientHeight"), gradientSoftness: $("#gradientSoftness"), edgeFadeEnabled: $("#edgeFadeEnabled"), edgeFade: $("#edgeFade"),\n' +
      '  titleFont: $("#titleFont"), bodyFont: $("#bodyFont"), titleSize: $("#titleSize"), bodySize: $("#bodySize"),\n' +
      '  titleWeight: $("#titleWeight"), bodyWeight: $("#bodyWeight"), lineHeight: $("#lineHeight"), letterSpacing: $("#letterSpacing"),\n' +
      '  titleColor: $("#titleColor"), textColor: $("#textColor"), lineColor: $("#lineColor"),\n' +
      '  wordCascade: $("#wordCascade"), wordCascadeStepMs: $("#wordCascadeStep"), sameChapterOutMs: $("#sameChapterOutMs"),\n' +
      '  sameChapterInMs: $("#sameChapterInMs"), chapterChangeMs: $("#chapterChangeMs"), bookChangeMs: $("#bookChangeMs")\n' +
      '};\n' +
      '\n' +
      'function markSaving() {\n' +
      '  $("#saveState").textContent = "Guardando…";\n' +
      '  clearTimeout(saveTimer);\n' +
      '  saveTimer = setTimeout(() => $("#saveState").textContent = "Guardado", 650);\n' +
      '}\n' +
      '\n' +
      'async function api(path, options = {}) {\n' +
      '  const response = await fetch(path, {\n' +
      '    headers: { "Content-Type": "application/json", ...(options.headers || {}) },\n' +
      '    ...options\n' +
      '  });\n' +
      '  const body = await response.json().catch(() => ({}));\n' +
      '  if (!response.ok) throw new Error(body.error || "La operación no pudo completarse.");\n' +
      '  return body;\n' +
      '}\n' +
      '\n' +
      'async function loadState() {\n' +
      '  appState = await api("/api/app-state");\n' +
      '  renderAll();\n' +
      '}\n' +
      '\n' +
      'function switchView(name) {\n' +
      '  $$(".nav[data-view]").forEach(button => button.classList.toggle("active", button.dataset.view === name));\n' +
      '  $$(".view").forEach(view => view.classList.toggle("active", view.id === `view-${name}`));\n' +
      '  $("#lowerThirdInspector").classList.toggle("hidden", name !== "lower-third");\n' +
      '}\n' +
      '\n' +
      '$$(".nav[data-view]").forEach(button => {\n' +
      '  button.addEventListener("click", () => switchView(button.dataset.view));\n' +
      '});\n' +
      '$$("[data-open-integrations]").forEach(button => {\n' +
      '  button.addEventListener("click", () => switchView("integrations"));\n' +
      '});\n' +
      '\n' +
      'function renderLowerThird() {\n' +
      '  const state = appState.lowerThird;\n' +
      '  for (const [key, element] of Object.entries(lowerThirdFields)) element.value = state[key] ?? "";\n' +
      '  $("#animationValue").value = `${state.animationMs} ms`;\n' +
      '  $("#statusBadge").textContent = state.visible ? "PROGRAM" : "PREVIEW";\n' +
      '  $("#statusBadge").className = `badge ${state.visible ? "program" : "preview"}`;\n' +
      '}\n' +
      '\n' +
      'async function updateLowerThird(patch) {\n' +
      '  appState.lowerThird = { ...appState.lowerThird, ...patch };\n' +
      '  renderLowerThird();\n' +
      '  markSaving();\n' +
      '  await api("/api/state", { method: "POST", body: JSON.stringify(appState.lowerThird) });\n' +
      '}\n' +
      '\n' +
      'for (const [key, element] of Object.entries(lowerThirdFields)) {\n' +
      '  element.addEventListener("input", () => {\n' +
      '    updateLowerThird({ [key]: key === "animationMs" ? Number(element.value) : element.value });\n' +
      '  });\n' +
      '}\n' +
      '$("#takeIn").addEventListener("click", () => updateLowerThird({ visible: true }));\n' +
      '$("#takeOut").addEventListener("click", () => updateLowerThird({ visible: false }));\n' +
      '\n' +
      '\n' +
      'function getActiveScriptureContent() {\n' +
      '  return appState.scripture.source === "propresenter"\n' +
      '    ? appState.scripture.propresenter\n' +
      '    : appState.scripture.manual;\n' +
      '}\n' +
      '\n' +
      'let scriptureUiMode = localStorage.getItem("bmms.scripture.mode") || "simple";\n' +
      'let scriptureBroadcast = {\n' +
      '  preview: null,\n' +
      '  program: null,\n' +
      '  visible: false,\n' +
      '  autoTake: false\n' +
      '};\n' +
      '\n' +
      'const scriptureDesigns = { classic:{}, editorial:{}, worship:{}, broadcast:{}, glass:{}, kinetic:{} };\n' +
      '\n' +
      'function setScriptureMode(mode) {\n' +
      '  scriptureUiMode = mode;\n' +
      '  localStorage.setItem("bmms.scripture.mode", mode);\n' +
      '  $("#scriptureSimpleMode").classList.toggle("active", mode === "simple");\n' +
      '  $("#scriptureAdvancedMode").classList.toggle("active", mode === "advanced");\n' +
      '  $("#scriptureSimpleView").classList.toggle("hidden", mode !== "simple");\n' +
      '  $("#scriptureAdvancedView").classList.toggle("hidden", mode !== "advanced");\n' +
      '}\n' +
      '\n' +
      'function renderVerseBus(prefix, verse, fallback) {\n' +
      '  $(`#integrated${prefix}Reference`).textContent = verse?.reference || "Sin contenido";\n' +
      '  $(`#integrated${prefix}Text`).textContent = verse?.text || fallback;\n' +
      '  $(`#integrated${prefix}Version`).textContent = verse?.version || "";\n' +
      '}\n' +
      '\n' +
      'function renderBroadcastState() {\n' +
      '  renderVerseBus("Program", scriptureBroadcast.program, "El contenido al aire aparecerá aquí.");\n' +
      '  renderVerseBus("Preview", scriptureBroadcast.preview, "La siguiente Escritura aparecerá aquí.");\n' +
      '  $("#integratedOnAir").textContent = scriptureBroadcast.visible ? "ON AIR" : "OFF AIR";\n' +
      '  $("#integratedAutoButton").textContent = `AUTO: ${scriptureBroadcast.autoTake ? "ENCENDIDO" : "APAGADO"}`;\n' +
      '  $("#integratedAutoButton").classList.toggle("active", scriptureBroadcast.autoTake);\n' +
      '}\n' +
      '\n' +
      'async function refreshScriptureBroadcast() {\n' +
      '  try {\n' +
      '    const [state, live] = await Promise.all([\n' +
      '      api("/api/scripture/program"),\n' +
      '      api("/api/scripture/live/status")\n' +
      '    ]);\n' +
      '    scriptureBroadcast = state;\n' +
      '    renderBroadcastState();\n' +
      '    $("#integratedScriptureDiagnostics").textContent = JSON.stringify({ broadcast: state, live }, null, 2);\n' +
      '    $("#integratedLiveButton").textContent = live.running ? "Detener Live" : "Iniciar Live";\n' +
      '    $("#integratedLiveButton").dataset.running = String(Boolean(live.running));\n' +
      '  } catch (error) {\n' +
      '    $("#integratedScriptureDiagnostics").textContent = error.message;\n' +
      '  }\n' +
      '}\n' +
      '\n' +
      'function rgbaToHex(value) {\n' +
      '  if (String(value).startsWith("#")) return String(value).slice(0, 7);\n' +
      '  const match = String(value).match(/rgba?\\((\\d+),\\s*(\\d+),\\s*(\\d+)/i);\n' +
      '  if (!match) return "#ffffff";\n' +
      '  return `#${[match[1],match[2],match[3]].map(n=>Number(n).toString(16).padStart(2,"0")).join("")}`;\n' +
      '}\n' +
      '\n' +
      'function renderScripture() {\n' +
      '  const s=appState.scripture, m=s.manual, c=s.composition||{}, a=s.appearance||{}, g=s.gradient||{}, an=s.animation||{};\n' +
      '  $("#scriptureReference").value=m.reference||""; $("#scriptureVersion").value=m.version||""; $("#scriptureText").value=m.text||"";\n' +
      '  $("#scriptureFormat").value=s.format||"lower"; $("#scriptureAlign").value=c.alignment||"center"; $("#maxLines").value=String(c.maxLines||4); $("#balanceText").checked=c.balance!==false;\n' +
      '  $("#scriptureBottom").value=c.bottom??28; $("#scriptureWidth").value=c.width??1660; $("#scripturePadding").value=c.horizontalPadding??72;\n' +
      '  $("#scriptureBottomValue").value=`${c.bottom??28}px`; $("#scriptureWidthValue").value=`${c.width??1660}px`; $("#scripturePaddingValue").value=`${c.horizontalPadding??72}px`;\n' +
      '  $("#gradientMode").value=g.mode||"adaptive"; $("#gradientColor").value=g.color||"#000000"; $("#gradientOpacity").value=g.opacity??.96; $("#gradientHeight").value=g.height??430; $("#gradientSoftness").value=g.softness??58; $("#edgeFadeEnabled").checked=g.edgeFadeEnabled!==false; $("#edgeFade").value=g.edgeFade??150;\n' +
      '  $("#gradientOpacityValue").value=`${Math.round((g.opacity??.96)*100)}%`; $("#gradientHeightValue").value=`${g.height??430}px`; $("#gradientSoftnessValue").value=`${g.softness??58}%`; $("#edgeFadeValue").value=`${g.edgeFade??150}px`;\n' +
      '  $("#titleFont").value=a.titleFont||"Montserrat"; $("#bodyFont").value=a.bodyFont||"Montserrat"; $("#titleSize").value=a.titleSize??44; $("#bodySize").value=a.bodySize??72; $("#titleWeight").value=String(a.titleWeight??800); $("#bodyWeight").value=String(a.bodyWeight??500); $("#lineHeight").value=a.lineHeight??1.16; $("#letterSpacing").value=a.letterSpacing??-.01; $("#titleColor").value=a.titleColor||"#ffffff"; $("#textColor").value=a.textColor||"#ffffff"; $("#lineColor").value=rgbaToHex(a.lineColor||"rgba(255,255,255,.90)");\n' +
      '  $("#wordCascade").checked=an.wordCascade!==false; $("#wordCascadeStep").value=an.wordCascadeStepMs??18; $("#sameChapterOutMs").value=an.sameChapterOutMs??100; $("#sameChapterInMs").value=an.sameChapterInMs??170; $("#chapterChangeMs").value=an.chapterChangeMs??320; $("#bookChangeMs").value=an.bookChangeMs??420;\n' +
      '  $("#wordCascadeStepValue").value=`${an.wordCascadeStepMs??18} ms/palabra`; $("#sameChapterOutValue").value=`${an.sameChapterOutMs??100} ms`; $("#sameChapterInValue").value=`${an.sameChapterInMs??170} ms`; $("#chapterChangeValue").value=`${an.chapterChangeMs??320} ms`; $("#bookChangeValue").value=`${an.bookChangeMs??420} ms`;\n' +
      '  $$(".source-option").forEach(o=>o.classList.toggle("active",o.dataset.source===s.source)); $("#manualContent").classList.toggle("hidden",s.source!=="manual"); $("#propresenterContent").classList.toggle("hidden",s.source!=="propresenter"); $("#scriptureSourceBadge").textContent=s.source==="manual"?"MANUAL":"PROPRESENTER";\n' +
      "  $$('[data-scripture-design]').forEach(card=>card.classList.toggle('active',card.dataset.scriptureDesign===(s.design||'classic')));\n" +
      `  const help={lower:'Composición inferior original con degradado adaptativo.','center-lower':'Versión inferior centrada y más contenida.','left-column':'Columna vertical anclada al lado izquierdo.','right-column':'Columna vertical anclada al lado derecho.',fullscreen:'Lectura amplia centrada dentro del área segura.',minimal:'Texto limpio con presencia gráfica reducida.'}; $("#scriptureFormatHelp").textContent=help[s.format||'lower'];\n` +
      '  const incoming=s.propresenter; $("#incomingReference").textContent=incoming.reference||"Sin contenido"; $("#incomingText").textContent=incoming.text||"Cuando llegue un cambio desde ProPresenter aparecerá aquí."; $("#incomingMeta").textContent=incoming.receivedAt?`${incoming.presentation||"Presentación"} · Slide'... 13185 more characters
    
  code: 'ERR_ASSERTION'
  name: 'AssertionError'
  expected:
  actual: |-
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
      bottom: $("#scriptureBottom"), width: $("#scriptureWidth"), horizontalPadding: $("#scripturePadding"),
      gradientMode: $("#gradientMode"), gradientColor: $("#gradientColor"), gradientOpacity: $("#gradientOpacity"),
      gradientHeight: $("#gradientHeight"), gradientSoftness: $("#gradientSoftness"), edgeFadeEnabled: $("#edgeFadeEnabled"), edgeFade: $("#edgeFade"),
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
      $("#gradientMode").value=g.mode||"adaptive"; $("#gradientColor").value=g.color||"#000000"; $("#gradientOpacity").value=g.opacity??.96; $("#gradientHeight").value=g.height??430; $("#gradientSoftness").value=g.softness??58; $("#edgeFadeEnabled").checked=g.edgeFadeEnabled!==false; $("#edgeFade").value=g.edgeFade??150;
      $("#gradientOpacityValue").value=`${Math.round((g.opacity??.96)*100)}%`; $("#gradientHeightValue").value=`${g.height??430}px`; $("#gradientSoftnessValue").value=`${g.softness??58}%`; $("#edgeFadeValue").value=`${g.edgeFade??150}px`;
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
     ["format",null,"format"],["alignment","composition","alignment"],["maxLines","composition","maxLines",Number],["bottom","composition","bottom",Number],["width","composition","width",Number],["horizontalPadding","composition","horizontalPadding",Number],
     ["gradientMode","gradient","mode"],["gradientColor","gradient","color"],["gradientOpacity","gradient","opacity",Number],["gradientHeight","gradient","height",Number],["gradientSoftness","gradient","softness",Number],["edgeFade","gradient","edgeFade",Number],
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
    scriptureControls.wordCascade.addEventListener("change",()=>updateScripture({animation:{wordCascade:scriptureControls.wordCascade.checked}}));
    
    $("#testScriptureAnimation").addEventListener("click", async () => { await api("/api/scripture/replay",{method:"POST"}); $("#scriptureOutputPreview").contentWindow?.postMessage({type:"bmms-scripture-replay"},"*"); });
    const scripturePreviewFrame = $("#scriptureOutputPreview");
    const scripturePreviewViewport = scripturePreviewFrame?.closest(".scripture-output-frame");
    const scripturePreviewStatus = $("#scripturePreviewStatus");
    
    function resizeScripturePreview() {
      if (!scripturePreviewFrame || !scripturePreviewViewport) return;
    
      const width = scripturePreviewViewport.clientWidth || 960;
      const scale = Math.max(0.1, width / 1920);
    
      scripturePreviewFrame.style.setProperty(
        "--scripture-preview-scale",
        String(scale)
      );
      scripturePreviewViewport.style.height = `${1080 * scale}px`;
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
    
  operator: 'match'
  stack: |-
    TestContext.<anonymous> (file:///mnt/data/bmms-update-024/BMMS-PROJECT/tests/scripture-core/scripture-update-024.test.js:28:10)
    Test.runInAsyncScope (node:async_hooks:214:14)
    Test.run (node:internal/test_runner/test:1047:25)
    Test.start (node:internal/test_runner/test:944:17)
    startSubtestAfterBootstrap (node:internal/test_runner/harness:296:17)
  ...
# Subtest: broadcast action labels are in Spanish
not ok 71 - broadcast action labels are in Spanish
  ---
  duration_ms: 1.221197
  type: 'test'
  location: '/mnt/data/bmms-update-024/BMMS-PROJECT/tests/scripture-core/scripture-update-024.test.js:35:1'
  failureType: 'testCodeFailure'
  error: |-
    The input did not match the regular expression /AUTO: ENCENDIDO/. Input:
    
    'const $ = selector => document.querySelector(selector);\n' +
      'const $$ = selector => [...document.querySelectorAll(selector)];\n' +
      '\n' +
      'let appState = {};\n' +
      'let saveTimer;\n' +
      '\n' +
      'const lowerThirdFields = {\n' +
      '  primary: $("#primary"),\n' +
      '  secondary: $("#secondary"),\n' +
      '  accent: $("#accent"),\n' +
      '  align: $("#align"),\n' +
      '  animationMs: $("#animationMs")\n' +
      '};\n' +
      '\n' +
      'const scriptureControls = {\n' +
      '  reference: $("#scriptureReference"), version: $("#scriptureVersion"), text: $("#scriptureText"),\n' +
      '  format: $("#scriptureFormat"), alignment: $("#scriptureAlign"), maxLines: $("#maxLines"), balance: $("#balanceText"),\n' +
      '  bottom: $("#scriptureBottom"), width: $("#scriptureWidth"), horizontalPadding: $("#scripturePadding"),\n' +
      '  gradientMode: $("#gradientMode"), gradientColor: $("#gradientColor"), gradientOpacity: $("#gradientOpacity"),\n' +
      '  gradientHeight: $("#gradientHeight"), gradientSoftness: $("#gradientSoftness"), edgeFadeEnabled: $("#edgeFadeEnabled"), edgeFade: $("#edgeFade"),\n' +
      '  titleFont: $("#titleFont"), bodyFont: $("#bodyFont"), titleSize: $("#titleSize"), bodySize: $("#bodySize"),\n' +
      '  titleWeight: $("#titleWeight"), bodyWeight: $("#bodyWeight"), lineHeight: $("#lineHeight"), letterSpacing: $("#letterSpacing"),\n' +
      '  titleColor: $("#titleColor"), textColor: $("#textColor"), lineColor: $("#lineColor"),\n' +
      '  wordCascade: $("#wordCascade"), wordCascadeStepMs: $("#wordCascadeStep"), sameChapterOutMs: $("#sameChapterOutMs"),\n' +
      '  sameChapterInMs: $("#sameChapterInMs"), chapterChangeMs: $("#chapterChangeMs"), bookChangeMs: $("#bookChangeMs")\n' +
      '};\n' +
      '\n' +
      'function markSaving() {\n' +
      '  $("#saveState").textContent = "Guardando…";\n' +
      '  clearTimeout(saveTimer);\n' +
      '  saveTimer = setTimeout(() => $("#saveState").textContent = "Guardado", 650);\n' +
      '}\n' +
      '\n' +
      'async function api(path, options = {}) {\n' +
      '  const response = await fetch(path, {\n' +
      '    headers: { "Content-Type": "application/json", ...(options.headers || {}) },\n' +
      '    ...options\n' +
      '  });\n' +
      '  const body = await response.json().catch(() => ({}));\n' +
      '  if (!response.ok) throw new Error(body.error || "La operación no pudo completarse.");\n' +
      '  return body;\n' +
      '}\n' +
      '\n' +
      'async function loadState() {\n' +
      '  appState = await api("/api/app-state");\n' +
      '  renderAll();\n' +
      '}\n' +
      '\n' +
      'function switchView(name) {\n' +
      '  $$(".nav[data-view]").forEach(button => button.classList.toggle("active", button.dataset.view === name));\n' +
      '  $$(".view").forEach(view => view.classList.toggle("active", view.id === `view-${name}`));\n' +
      '  $("#lowerThirdInspector").classList.toggle("hidden", name !== "lower-third");\n' +
      '}\n' +
      '\n' +
      '$$(".nav[data-view]").forEach(button => {\n' +
      '  button.addEventListener("click", () => switchView(button.dataset.view));\n' +
      '});\n' +
      '$$("[data-open-integrations]").forEach(button => {\n' +
      '  button.addEventListener("click", () => switchView("integrations"));\n' +
      '});\n' +
      '\n' +
      'function renderLowerThird() {\n' +
      '  const state = appState.lowerThird;\n' +
      '  for (const [key, element] of Object.entries(lowerThirdFields)) element.value = state[key] ?? "";\n' +
      '  $("#animationValue").value = `${state.animationMs} ms`;\n' +
      '  $("#statusBadge").textContent = state.visible ? "PROGRAM" : "PREVIEW";\n' +
      '  $("#statusBadge").className = `badge ${state.visible ? "program" : "preview"}`;\n' +
      '}\n' +
      '\n' +
      'async function updateLowerThird(patch) {\n' +
      '  appState.lowerThird = { ...appState.lowerThird, ...patch };\n' +
      '  renderLowerThird();\n' +
      '  markSaving();\n' +
      '  await api("/api/state", { method: "POST", body: JSON.stringify(appState.lowerThird) });\n' +
      '}\n' +
      '\n' +
      'for (const [key, element] of Object.entries(lowerThirdFields)) {\n' +
      '  element.addEventListener("input", () => {\n' +
      '    updateLowerThird({ [key]: key === "animationMs" ? Number(element.value) : element.value });\n' +
      '  });\n' +
      '}\n' +
      '$("#takeIn").addEventListener("click", () => updateLowerThird({ visible: true }));\n' +
      '$("#takeOut").addEventListener("click", () => updateLowerThird({ visible: false }));\n' +
      '\n' +
      '\n' +
      'function getActiveScriptureContent() {\n' +
      '  return appState.scripture.source === "propresenter"\n' +
      '    ? appState.scripture.propresenter\n' +
      '    : appState.scripture.manual;\n' +
      '}\n' +
      '\n' +
      'let scriptureUiMode = localStorage.getItem("bmms.scripture.mode") || "simple";\n' +
      'let scriptureBroadcast = {\n' +
      '  preview: null,\n' +
      '  program: null,\n' +
      '  visible: false,\n' +
      '  autoTake: false\n' +
      '};\n' +
      '\n' +
      'const scriptureDesigns = { classic:{}, editorial:{}, worship:{}, broadcast:{}, glass:{}, kinetic:{} };\n' +
      '\n' +
      'function setScriptureMode(mode) {\n' +
      '  scriptureUiMode = mode;\n' +
      '  localStorage.setItem("bmms.scripture.mode", mode);\n' +
      '  $("#scriptureSimpleMode").classList.toggle("active", mode === "simple");\n' +
      '  $("#scriptureAdvancedMode").classList.toggle("active", mode === "advanced");\n' +
      '  $("#scriptureSimpleView").classList.toggle("hidden", mode !== "simple");\n' +
      '  $("#scriptureAdvancedView").classList.toggle("hidden", mode !== "advanced");\n' +
      '}\n' +
      '\n' +
      'function renderVerseBus(prefix, verse, fallback) {\n' +
      '  $(`#integrated${prefix}Reference`).textContent = verse?.reference || "Sin contenido";\n' +
      '  $(`#integrated${prefix}Text`).textContent = verse?.text || fallback;\n' +
      '  $(`#integrated${prefix}Version`).textContent = verse?.version || "";\n' +
      '}\n' +
      '\n' +
      'function renderBroadcastState() {\n' +
      '  renderVerseBus("Program", scriptureBroadcast.program, "El contenido al aire aparecerá aquí.");\n' +
      '  renderVerseBus("Preview", scriptureBroadcast.preview, "La siguiente Escritura aparecerá aquí.");\n' +
      '  $("#integratedOnAir").textContent = scriptureBroadcast.visible ? "ON AIR" : "OFF AIR";\n' +
      '  $("#integratedAutoButton").textContent = `AUTO: ${scriptureBroadcast.autoTake ? "ENCENDIDO" : "APAGADO"}`;\n' +
      '  $("#integratedAutoButton").classList.toggle("active", scriptureBroadcast.autoTake);\n' +
      '}\n' +
      '\n' +
      'async function refreshScriptureBroadcast() {\n' +
      '  try {\n' +
      '    const [state, live] = await Promise.all([\n' +
      '      api("/api/scripture/program"),\n' +
      '      api("/api/scripture/live/status")\n' +
      '    ]);\n' +
      '    scriptureBroadcast = state;\n' +
      '    renderBroadcastState();\n' +
      '    $("#integratedScriptureDiagnostics").textContent = JSON.stringify({ broadcast: state, live }, null, 2);\n' +
      '    $("#integratedLiveButton").textContent = live.running ? "Detener Live" : "Iniciar Live";\n' +
      '    $("#integratedLiveButton").dataset.running = String(Boolean(live.running));\n' +
      '  } catch (error) {\n' +
      '    $("#integratedScriptureDiagnostics").textContent = error.message;\n' +
      '  }\n' +
      '}\n' +
      '\n' +
      'function rgbaToHex(value) {\n' +
      '  if (String(value).startsWith("#")) return String(value).slice(0, 7);\n' +
      '  const match = String(value).match(/rgba?\\((\\d+),\\s*(\\d+),\\s*(\\d+)/i);\n' +
      '  if (!match) return "#ffffff";\n' +
      '  return `#${[match[1],match[2],match[3]].map(n=>Number(n).toString(16).padStart(2,"0")).join("")}`;\n' +
      '}\n' +
      '\n' +
      'function renderScripture() {\n' +
      '  const s=appState.scripture, m=s.manual, c=s.composition||{}, a=s.appearance||{}, g=s.gradient||{}, an=s.animation||{};\n' +
      '  $("#scriptureReference").value=m.reference||""; $("#scriptureVersion").value=m.version||""; $("#scriptureText").value=m.text||"";\n' +
      '  $("#scriptureFormat").value=s.format||"lower"; $("#scriptureAlign").value=c.alignment||"center"; $("#maxLines").value=String(c.maxLines||4); $("#balanceText").checked=c.balance!==false;\n' +
      '  $("#scriptureBottom").value=c.bottom??28; $("#scriptureWidth").value=c.width??1660; $("#scripturePadding").value=c.horizontalPadding??72;\n' +
      '  $("#scriptureBottomValue").value=`${c.bottom??28}px`; $("#scriptureWidthValue").value=`${c.width??1660}px`; $("#scripturePaddingValue").value=`${c.horizontalPadding??72}px`;\n' +
      '  $("#gradientMode").value=g.mode||"adaptive"; $("#gradientColor").value=g.color||"#000000"; $("#gradientOpacity").value=g.opacity??.96; $("#gradientHeight").value=g.height??430; $("#gradientSoftness").value=g.softness??58; $("#edgeFadeEnabled").checked=g.edgeFadeEnabled!==false; $("#edgeFade").value=g.edgeFade??150;\n' +
      '  $("#gradientOpacityValue").value=`${Math.round((g.opacity??.96)*100)}%`; $("#gradientHeightValue").value=`${g.height??430}px`; $("#gradientSoftnessValue").value=`${g.softness??58}%`; $("#edgeFadeValue").value=`${g.edgeFade??150}px`;\n' +
      '  $("#titleFont").value=a.titleFont||"Montserrat"; $("#bodyFont").value=a.bodyFont||"Montserrat"; $("#titleSize").value=a.titleSize??44; $("#bodySize").value=a.bodySize??72; $("#titleWeight").value=String(a.titleWeight??800); $("#bodyWeight").value=String(a.bodyWeight??500); $("#lineHeight").value=a.lineHeight??1.16; $("#letterSpacing").value=a.letterSpacing??-.01; $("#titleColor").value=a.titleColor||"#ffffff"; $("#textColor").value=a.textColor||"#ffffff"; $("#lineColor").value=rgbaToHex(a.lineColor||"rgba(255,255,255,.90)");\n' +
      '  $("#wordCascade").checked=an.wordCascade!==false; $("#wordCascadeStep").value=an.wordCascadeStepMs??18; $("#sameChapterOutMs").value=an.sameChapterOutMs??100; $("#sameChapterInMs").value=an.sameChapterInMs??170; $("#chapterChangeMs").value=an.chapterChangeMs??320; $("#bookChangeMs").value=an.bookChangeMs??420;\n' +
      '  $("#wordCascadeStepValue").value=`${an.wordCascadeStepMs??18} ms/palabra`; $("#sameChapterOutValue").value=`${an.sameChapterOutMs??100} ms`; $("#sameChapterInValue").value=`${an.sameChapterInMs??170} ms`; $("#chapterChangeValue").value=`${an.chapterChangeMs??320} ms`; $("#bookChangeValue").value=`${an.bookChangeMs??420} ms`;\n' +
      '  $$(".source-option").forEach(o=>o.classList.toggle("active",o.dataset.source===s.source)); $("#manualContent").classList.toggle("hidden",s.source!=="manual"); $("#propresenterContent").classList.toggle("hidden",s.source!=="propresenter"); $("#scriptureSourceBadge").textContent=s.source==="manual"?"MANUAL":"PROPRESENTER";\n' +
      "  $$('[data-scripture-design]').forEach(card=>card.classList.toggle('active',card.dataset.scriptureDesign===(s.design||'classic')));\n" +
      `  const help={lower:'Composición inferior original con degradado adaptativo.','center-lower':'Versión inferior centrada y más contenida.','left-column':'Columna vertical anclada al lado izquierdo.','right-column':'Columna vertical anclada al lado derecho.',fullscreen:'Lectura amplia centrada dentro del área segura.',minimal:'Texto limpio con presencia gráfica reducida.'}; $("#scriptureFormatHelp").textContent=help[s.format||'lower'];\n` +
      '  const incoming=s.propresenter; $("#incomingReference").textContent=incoming.reference||"Sin contenido"; $("#incomingText").textContent=incoming.text||"Cuando llegue un cambio desde ProPresenter aparecerá aquí."; $("#incomingMeta").textContent=incoming.receivedAt?`${incoming.presentation||"Presentación"} · Slide'... 13185 more characters
    
  code: 'ERR_ASSERTION'
  name: 'AssertionError'
  expected:
  actual: |-
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
      bottom: $("#scriptureBottom"), width: $("#scriptureWidth"), horizontalPadding: $("#scripturePadding"),
      gradientMode: $("#gradientMode"), gradientColor: $("#gradientColor"), gradientOpacity: $("#gradientOpacity"),
      gradientHeight: $("#gradientHeight"), gradientSoftness: $("#gradientSoftness"), edgeFadeEnabled: $("#edgeFadeEnabled"), edgeFade: $("#edgeFade"),
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
      $("#gradientMode").value=g.mode||"adaptive"; $("#gradientColor").value=g.color||"#000000"; $("#gradientOpacity").value=g.opacity??.96; $("#gradientHeight").value=g.height??430; $("#gradientSoftness").value=g.softness??58; $("#edgeFadeEnabled").checked=g.edgeFadeEnabled!==false; $("#edgeFade").value=g.edgeFade??150;
      $("#gradientOpacityValue").value=`${Math.round((g.opacity??.96)*100)}%`; $("#gradientHeightValue").value=`${g.height??430}px`; $("#gradientSoftnessValue").value=`${g.softness??58}%`; $("#edgeFadeValue").value=`${g.edgeFade??150}px`;
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
     ["format",null,"format"],["alignment","composition","alignment"],["maxLines","composition","maxLines",Number],["bottom","composition","bottom",Number],["width","composition","width",Number],["horizontalPadding","composition","horizontalPadding",Number],
     ["gradientMode","gradient","mode"],["gradientColor","gradient","color"],["gradientOpacity","gradient","opacity",Number],["gradientHeight","gradient","height",Number],["gradientSoftness","gradient","softness",Number],["edgeFade","gradient","edgeFade",Number],
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
    scriptureControls.wordCascade.addEventListener("change",()=>updateScripture({animation:{wordCascade:scriptureControls.wordCascade.checked}}));
    
    $("#testScriptureAnimation").addEventListener("click", async () => { await api("/api/scripture/replay",{method:"POST"}); $("#scriptureOutputPreview").contentWindow?.postMessage({type:"bmms-scripture-replay"},"*"); });
    const scripturePreviewFrame = $("#scriptureOutputPreview");
    const scripturePreviewViewport = scripturePreviewFrame?.closest(".scripture-output-frame");
    const scripturePreviewStatus = $("#scripturePreviewStatus");
    
    function resizeScripturePreview() {
      if (!scripturePreviewFrame || !scripturePreviewViewport) return;
    
      const width = scripturePreviewViewport.clientWidth || 960;
      const scale = Math.max(0.1, width / 1920);
    
      scripturePreviewFrame.style.setProperty(
        "--scripture-preview-scale",
        String(scale)
      );
      scripturePreviewViewport.style.height = `${1080 * scale}px`;
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
    
  operator: 'match'
  stack: |-
    TestContext.<anonymous> (file:///mnt/data/bmms-update-024/BMMS-PROJECT/tests/scripture-core/scripture-update-024.test.js:50:10)
    Test.runInAsyncScope (node:async_hooks:214:14)
    Test.run (node:internal/test_runner/test:1047:25)
    Test.processPendingSubtests (node:internal/test_runner/test:744:18)
    Test.postRun (node:internal/test_runner/test:1173:19)
    Test.run (node:internal/test_runner/test:1101:12)
    async startSubtestAfterBootstrap (node:internal/test_runner/harness:296:3)
  ...
# Subtest: normalizes a verse and creates a stable id
ok 72 - normalizes a verse and creates a stable id
  ---
  duration_ms: 1.563507
  type: 'test'
  ...
# Subtest: requires verse text
ok 73 - requires verse text
  ---
  duration_ms: 0.316651
  type: 'test'
  ...
# Subtest: stable id changes when content changes
ok 74 - stable id changes when content changes
  ---
  duration_ms: 0.154409
  type: 'test'
  ...
# Subtest: parses a Spanish Scripture reference
ok 75 - parses a Spanish Scripture reference
  ---
  duration_ms: 1.369478
  type: 'test'
  ...
# Subtest: extracts a reference from the first line
ok 76 - extracts a reference from the first line
  ---
  duration_ms: 0.477601
  type: 'test'
  ...
1..76
# tests 76
# suites 0
# pass 74
# fail 2
# cancelled 0
# skipped 0
# todo 0
# duration_ms 608.76568

```

## server_syntax
Exit code: 0

```text

```

## app_syntax
Exit code: 0

```text

```

## overlay_syntax
Exit code: 0

```text

```

## runtime_flows
Exit code: 0

```text
scaleX=1.25 scaleY=1.4
/api/scripture/preview/manual: 200
/api/simulator/propresenter/scripture: 200
```


# Final validation rerun

## repository_check
Exit code: 0

```text
BMMS repository check passed.

```

## tests
Exit code: 1

```text
TAP version 13
# Subtest: animation preview controls are connected
ok 1 - animation preview controls are connected
  ---
  duration_ms: 3.344388
  type: 'test'
  ...
# Subtest: editor animation playback uses requestAnimationFrame
ok 2 - editor animation playback uses requestAnimationFrame
  ---
  duration_ms: 1.913327
  type: 'test'
  ...
# Subtest: publishes a versioned event envelope
ok 3 - publishes a versioned event envelope
  ---
  duration_ms: 2.288366
  type: 'test'
  ...
# Subtest: registers and resolves a service
ok 4 - registers and resolves a service
  ---
  duration_ms: 0.579442
  type: 'test'
  ...
# Subtest: rejects duplicate registrations
ok 5 - rejects duplicate registrations
  ---
  duration_ms: 0.205246
  type: 'test'
  ...
# Subtest: normalizes an animation configuration
ok 6 - normalizes an animation configuration
  ---
  duration_ms: 0.683888
  type: 'test'
  ...
# Subtest: provides enter and exit animation defaults
ok 7 - provides enter and exit animation defaults
  ---
  duration_ms: 0.14096
  type: 'test'
  ...
# Subtest: creates slide keyframes
ok 8 - creates slide keyframes
  ---
  duration_ms: 0.297052
  type: 'test'
  ...
# Subtest: disabled animations produce no keyframes
ok 9 - disabled animations produce no keyframes
  ---
  duration_ms: 0.474306
  type: 'test'
  ...
# Subtest: lists built-in broadcast components
ok 10 - lists built-in broadcast components
  ---
  duration_ms: 0.981461
  type: 'test'
  ...
# Subtest: creates a Scripture component with shared component identity
ok 11 - creates a Scripture component with shared component identity
  ---
  duration_ms: 1.685979
  type: 'test'
  ...
# Subtest: creates a Lower Third component with live bindings
ok 12 - creates a Lower Third component with live bindings
  ---
  duration_ms: 0.339515
  type: 'test'
  ...
# Subtest: generic component factory rejects unknown components
ok 13 - generic component factory rejects unknown components
  ---
  duration_ms: 0.308139
  type: 'test'
  ...
# Subtest: gets nested values by path
ok 14 - gets nested values by path
  ---
  duration_ms: 0.669597
  type: 'test'
  ...
# Subtest: resolves single and double brace tokens
ok 15 - resolves single and double brace tokens
  ---
  duration_ms: 0.243423
  type: 'test'
  ...
# Subtest: resolves binding text elements without mutating source
ok 16 - resolves binding text elements without mutating source
  ---
  duration_ms: 0.195631
  type: 'test'
  ...
# Subtest: resolves documents and lists tokens
ok 17 - resolves documents and lists tokens
  ---
  duration_ms: 0.587906
  type: 'test'
  ...
# Subtest: creates normalized text elements
ok 18 - creates normalized text elements
  ---
  duration_ms: 2.760379
  type: 'test'
  ...
# Subtest: updates and removes elements immutably
ok 19 - updates and removes elements immutably
  ---
  duration_ms: 0.400225
  type: 'test'
  ...
# Subtest: reorders layers
ok 20 - reorders layers
  ---
  duration_ms: 1.873063
  type: 'test'
  ...
# Subtest: normalization preserves grouping metadata
ok 21 - normalization preserves grouping metadata
  ---
  duration_ms: 0.763436
  type: 'test'
  ...
# Subtest: undoes and redoes document commits
ok 22 - undoes and redoes document commits
  ---
  duration_ms: 0.679822
  type: 'test'
  ...
# Subtest: creates and categorizes templates
ok 23 - creates and categorizes templates
  ---
  duration_ms: 2.04964
  type: 'test'
  ...
# Subtest: duplicates templates with a new identity
ok 24 - duplicates templates with a new identity
  ---
  duration_ms: 0.240458
  type: 'test'
  ...
# Subtest: instantiates templates with new element and group ids
ok 25 - instantiates templates with new element and group ids
  ---
  duration_ms: 0.319806
  type: 'test'
  ...
# Subtest: updates metadata without replacing the stored document
ok 26 - updates metadata without replacing the stored document
  ---
  duration_ms: 0.206197
  type: 'test'
  ...
# Subtest: Scripture defaults to manual source
ok 27 - Scripture defaults to manual source
  ---
  duration_ms: 0.594055
  type: 'test'
  ...
# Subtest: ProPresenter settings are globally available
ok 28 - ProPresenter settings are globally available
  ---
  duration_ms: 0.104195
  type: 'test'
  ...
# Subtest: Smart Flyer defaults to assisted automation
ok 29 - Smart Flyer defaults to assisted automation
  ---
  duration_ms: 0.08749
  type: 'test'
  ...
# Subtest: builds manual scripture context
ok 30 - builds manual scripture context
  ---
  duration_ms: 0.782003
  type: 'test'
  ...
# Subtest: uses ProPresenter scripture when selected
ok 31 - uses ProPresenter scripture when selected
  ---
  duration_ms: 0.307577
  type: 'test'
  ...
# Subtest: reads the official status and presentation endpoints
ok 32 - reads the official status and presentation endpoints
  ---
  duration_ms: 2.554902
  type: 'test'
  ...
# Subtest: does not emit a duplicate verse
ok 33 - does not emit a duplicate verse
  ---
  duration_ms: 0.694794
  type: 'test'
  ...
# Subtest: starts disabled by default
ok 34 - starts disabled by default
  ---
  duration_ms: 0.77303
  type: 'test'
  ...
# Subtest: validates port range
ok 35 - validates port range
  ---
  duration_ms: 0.297223
  type: 'test'
  ...
# Subtest: publishes normalized ProPresenter media events
ok 36 - publishes normalized ProPresenter media events
  ---
  duration_ms: 0.506203
  type: 'test'
  ...
# {"timestamp":"2026-07-23T05:43:38.499Z","level":"INFO","scope":"test","message":"Connecting to ProPresenter","context":{"host":"127.0.0.1","port":1025,"protocol":"tcp"}}
# Subtest: tests the connection through the documented system-time endpoint
ok 37 - tests the connection through the documented system-time endpoint
  ---
  duration_ms: 0.932418
  type: 'test'
  ...
# Subtest: connects and subscribes configured streaming endpoints
ok 38 - connects and subscribes configured streaming endpoints
  ---
  duration_ms: 1.911145
  type: 'test'
  ...
# Subtest: normalizes a ProPresenter Scripture payload
ok 39 - normalizes a ProPresenter Scripture payload
  ---
  duration_ms: 1.264442
  type: 'test'
  ...
# Subtest: uses newline-delimited JSON for a real TCP request
ok 40 - uses newline-delimited JSON for a real TCP request
  ---
  duration_ms: 11.450673
  type: 'test'
  ...
# Subtest: receives chunked streaming messages
ok 41 - receives chunked streaming messages
  ---
  duration_ms: 43.49605
  type: 'test'
  ...
# Subtest: applies capped exponential backoff
ok 42 - applies capped exponential backoff
  ---
  duration_ms: 1.123543
  type: 'test'
  ...
# Subtest: normalizes a common current slide payload
ok 43 - normalizes a common current slide payload
  ---
  duration_ms: 1.908861
  type: 'test'
  ...
# Subtest: supports snake case response variants
ok 44 - supports snake case response variants
  ---
  duration_ms: 0.340697
  type: 'test'
  ...
# Subtest: balances text into visually similar lines
ok 45 - balances text into visually similar lines
  ---
  duration_ms: 1.187197
  type: 'test'
  ...
# Subtest: penalizes a one-word final line when a better partition exists
ok 46 - penalizes a one-word final line when a better partition exists
  ---
  duration_ms: 1.375657
  type: 'test'
  ...
# Subtest: reports overflow when minimum font still exceeds the box
ok 47 - reports overflow when minimum font still exceeds the box
  ---
  duration_ms: 0.22151
  type: 'test'
  ...
# Subtest: Scripture includes a default simple-mode design
ok 48 - Scripture includes a default simple-mode design
  ---
  duration_ms: 0.549748
  type: 'test'
  ...
# Subtest: Scripture broadcast state starts safely off air
ok 49 - Scripture broadcast state starts safely off air
  ---
  duration_ms: 0.241269
  type: 'test'
  ...
# Subtest: publishes verse and program events
ok 50 - publishes verse and program events
  ---
  duration_ms: 1.956812
  type: 'test'
  ...
# Subtest: does not mark identical normalized content as changed
ok 51 - does not mark identical normalized content as changed
  ---
  duration_ms: 0.310703
  type: 'test'
  ...
# Subtest: preview iframe is not hidden behind a ready-message race
ok 52 - preview iframe is not hidden behind a ready-message race
  ---
  duration_ms: 0.834162
  type: 'test'
  ...
# Subtest: lateral padding overrides every Scripture format
ok 53 - lateral padding overrides every Scripture format
  ---
  duration_ms: 0.472704
  type: 'test'
  ...
# Subtest: text fitting performs real rendered candidate measurements
ok 54 - text fitting performs real rendered candidate measurements
  ---
  duration_ms: 0.184164
  type: 'test'
  ...
# Subtest: preview initialization cannot abort the whole app
ok 55 - preview initialization cannot abort the whole app
  ---
  duration_ms: 1.569757
  type: 'test'
  ...
# Subtest: saved Scripture state is deeply hydrated
ok 56 - saved Scripture state is deeply hydrated
  ---
  duration_ms: 0.228149
  type: 'test'
  ...
# Subtest: restores original Scripture geometry
ok 57 - restores original Scripture geometry
  ---
  duration_ms: 0.596428
  type: 'test'
  ...
# Subtest: restores writing and contextual transitions
ok 58 - restores writing and contextual transitions
  ---
  duration_ms: 0.115182
  type: 'test'
  ...
# Subtest: restores gradient and typography
ok 59 - restores gradient and typography
  ---
  duration_ms: 0.09434
  type: 'test'
  ...
# Subtest: Scripture restores the original template and format defaults
ok 60 - Scripture restores the original template and format defaults
  ---
  duration_ms: 0.556428
  type: 'test'
  ...
# Subtest: Appearance and animation configuration have usable defaults
ok 61 - Appearance and animation configuration have usable defaults
  ---
  duration_ms: 0.224554
  type: 'test'
  ...
# Subtest: TV Broadcast CG is available in the advanced template library
ok 62 - TV Broadcast CG is available in the advanced template library
  ---
  duration_ms: 1.371431
  type: 'test'
  ...
# Subtest: Scripture output contains the robust fitting engine
ok 63 - Scripture output contains the robust fitting engine
  ---
  duration_ms: 0.255029
  type: 'test'
  ...
# Subtest: Preview uses one scaled 1920 by 1080 stage
ok 64 - Preview uses one scaled 1920 by 1080 stage
  ---
  duration_ms: 0.298915
  type: 'test'
  ...
# Subtest: preview iframe preserves a 1920 by 1080 viewport
ok 65 - preview iframe preserves a 1920 by 1080 viewport
  ---
  duration_ms: 1.708072
  type: 'test'
  ...
# Subtest: overlay no longer polls and rerenders every two seconds
ok 66 - overlay no longer polls and rerenders every two seconds
  ---
  duration_ms: 0.2485
  type: 'test'
  ...
# Subtest: signature excludes volatile ProPresenter timestamps
ok 67 - signature excludes volatile ProPresenter timestamps
  ---
  duration_ms: 0.1748
  type: 'test'
  ...
# Subtest: verse width follows configured lateral padding without a legacy cap
ok 68 - verse width follows configured lateral padding without a legacy cap
  ---
  duration_ms: 0.351243
  type: 'test'
  ...
# Subtest: verse size is authoritative and is never silently reduced
ok 69 - verse size is authoritative and is never silently reduced
  ---
  duration_ms: 0.291203
  type: 'test'
  ...
# Subtest: composition supports independent X and Y scale
ok 70 - composition supports independent X and Y scale
  ---
  duration_ms: 1.558269
  type: 'test'
  ...
# Subtest: broadcast action labels are in Spanish
not ok 71 - broadcast action labels are in Spanish
  ---
  duration_ms: 1.72657
  type: 'test'
  location: '/mnt/data/bmms-update-024/BMMS-PROJECT/tests/scripture-core/scripture-update-024.test.js:35:1'
  failureType: 'testCodeFailure'
  error: |-
    The input did not match the regular expression /AUTO: ENCENDIDO/. Input:
    
    'const $ = selector => document.querySelector(selector);\n' +
      'const $$ = selector => [...document.querySelectorAll(selector)];\n' +
      '\n' +
      'let appState = {};\n' +
      'let saveTimer;\n' +
      '\n' +
      'const lowerThirdFields = {\n' +
      '  primary: $("#primary"),\n' +
      '  secondary: $("#secondary"),\n' +
      '  accent: $("#accent"),\n' +
      '  align: $("#align"),\n' +
      '  animationMs: $("#animationMs")\n' +
      '};\n' +
      '\n' +
      'const scriptureControls = {\n' +
      '  reference: $("#scriptureReference"), version: $("#scriptureVersion"), text: $("#scriptureText"),\n' +
      '  format: $("#scriptureFormat"), alignment: $("#scriptureAlign"), maxLines: $("#maxLines"), balance: $("#balanceText"),\n' +
      '  bottom: $("#scriptureBottom"), width: $("#scriptureWidth"), horizontalPadding: $("#scripturePadding"), scaleX: $("#compositionScaleX"), scaleY: $("#compositionScaleY"),\n' +
      '  gradientMode: $("#gradientMode"), gradientColor: $("#gradientColor"), gradientOpacity: $("#gradientOpacity"),\n' +
      '  gradientHeight: $("#gradientHeight"), gradientSoftness: $("#gradientSoftness"), edgeFadeEnabled: $("#edgeFadeEnabled"), edgeFade: $("#edgeFade"),\n' +
      '  titleFont: $("#titleFont"), bodyFont: $("#bodyFont"), titleSize: $("#titleSize"), bodySize: $("#bodySize"),\n' +
      '  titleWeight: $("#titleWeight"), bodyWeight: $("#bodyWeight"), lineHeight: $("#lineHeight"), letterSpacing: $("#letterSpacing"),\n' +
      '  titleColor: $("#titleColor"), textColor: $("#textColor"), lineColor: $("#lineColor"),\n' +
      '  wordCascade: $("#wordCascade"), wordCascadeStepMs: $("#wordCascadeStep"), sameChapterOutMs: $("#sameChapterOutMs"),\n' +
      '  sameChapterInMs: $("#sameChapterInMs"), chapterChangeMs: $("#chapterChangeMs"), bookChangeMs: $("#bookChangeMs")\n' +
      '};\n' +
      '\n' +
      'function markSaving() {\n' +
      '  $("#saveState").textContent = "Guardando…";\n' +
      '  clearTimeout(saveTimer);\n' +
      '  saveTimer = setTimeout(() => $("#saveState").textContent = "Guardado", 650);\n' +
      '}\n' +
      '\n' +
      'async function api(path, options = {}) {\n' +
      '  const response = await fetch(path, {\n' +
      '    headers: { "Content-Type": "application/json", ...(options.headers || {}) },\n' +
      '    ...options\n' +
      '  });\n' +
      '  const body = await response.json().catch(() => ({}));\n' +
      '  if (!response.ok) throw new Error(body.error || "La operación no pudo completarse.");\n' +
      '  return body;\n' +
      '}\n' +
      '\n' +
      'async function loadState() {\n' +
      '  appState = await api("/api/app-state");\n' +
      '  renderAll();\n' +
      '}\n' +
      '\n' +
      'function switchView(name) {\n' +
      '  $$(".nav[data-view]").forEach(button => button.classList.toggle("active", button.dataset.view === name));\n' +
      '  $$(".view").forEach(view => view.classList.toggle("active", view.id === `view-${name}`));\n' +
      '  $("#lowerThirdInspector").classList.toggle("hidden", name !== "lower-third");\n' +
      '}\n' +
      '\n' +
      '$$(".nav[data-view]").forEach(button => {\n' +
      '  button.addEventListener("click", () => switchView(button.dataset.view));\n' +
      '});\n' +
      '$$("[data-open-integrations]").forEach(button => {\n' +
      '  button.addEventListener("click", () => switchView("integrations"));\n' +
      '});\n' +
      '\n' +
      'function renderLowerThird() {\n' +
      '  const state = appState.lowerThird;\n' +
      '  for (const [key, element] of Object.entries(lowerThirdFields)) element.value = state[key] ?? "";\n' +
      '  $("#animationValue").value = `${state.animationMs} ms`;\n' +
      '  $("#statusBadge").textContent = state.visible ? "PROGRAM" : "PREVIEW";\n' +
      '  $("#statusBadge").className = `badge ${state.visible ? "program" : "preview"}`;\n' +
      '}\n' +
      '\n' +
      'async function updateLowerThird(patch) {\n' +
      '  appState.lowerThird = { ...appState.lowerThird, ...patch };\n' +
      '  renderLowerThird();\n' +
      '  markSaving();\n' +
      '  await api("/api/state", { method: "POST", body: JSON.stringify(appState.lowerThird) });\n' +
      '}\n' +
      '\n' +
      'for (const [key, element] of Object.entries(lowerThirdFields)) {\n' +
      '  element.addEventListener("input", () => {\n' +
      '    updateLowerThird({ [key]: key === "animationMs" ? Number(element.value) : element.value });\n' +
      '  });\n' +
      '}\n' +
      '$("#takeIn").addEventListener("click", () => updateLowerThird({ visible: true }));\n' +
      '$("#takeOut").addEventListener("click", () => updateLowerThird({ visible: false }));\n' +
      '\n' +
      '\n' +
      'function getActiveScriptureContent() {\n' +
      '  return appState.scripture.source === "propresenter"\n' +
      '    ? appState.scripture.propresenter\n' +
      '    : appState.scripture.manual;\n' +
      '}\n' +
      '\n' +
      'let scriptureUiMode = localStorage.getItem("bmms.scripture.mode") || "simple";\n' +
      'let scriptureBroadcast = {\n' +
      '  preview: null,\n' +
      '  program: null,\n' +
      '  visible: false,\n' +
      '  autoTake: false\n' +
      '};\n' +
      '\n' +
      'const scriptureDesigns = { classic:{}, editorial:{}, worship:{}, broadcast:{}, glass:{}, kinetic:{} };\n' +
      '\n' +
      'function setScriptureMode(mode) {\n' +
      '  scriptureUiMode = mode;\n' +
      '  localStorage.setItem("bmms.scripture.mode", mode);\n' +
      '  $("#scriptureSimpleMode").classList.toggle("active", mode === "simple");\n' +
      '  $("#scriptureAdvancedMode").classList.toggle("active", mode === "advanced");\n' +
      '  $("#scriptureSimpleView").classList.toggle("hidden", mode !== "simple");\n' +
      '  $("#scriptureAdvancedView").classList.toggle("hidden", mode !== "advanced");\n' +
      '}\n' +
      '\n' +
      'function renderVerseBus(prefix, verse, fallback) {\n' +
      '  $(`#integrated${prefix}Reference`).textContent = verse?.reference || "Sin contenido";\n' +
      '  $(`#integrated${prefix}Text`).textContent = verse?.text || fallback;\n' +
      '  $(`#integrated${prefix}Version`).textContent = verse?.version || "";\n' +
      '}\n' +
      '\n' +
      'function renderBroadcastState() {\n' +
      '  renderVerseBus("Program", scriptureBroadcast.program, "El contenido al aire aparecerá aquí.");\n' +
      '  renderVerseBus("Preview", scriptureBroadcast.preview, "La siguiente Escritura aparecerá aquí.");\n' +
      '  $("#integratedOnAir").textContent = scriptureBroadcast.visible ? "ON AIR" : "OFF AIR";\n' +
      '  $("#integratedAutoButton").textContent = `AUTO: ${scriptureBroadcast.autoTake ? "ENCENDIDO" : "APAGADO"}`;\n' +
      '  $("#integratedAutoButton").classList.toggle("active", scriptureBroadcast.autoTake);\n' +
      '}\n' +
      '\n' +
      'async function refreshScriptureBroadcast() {\n' +
      '  try {\n' +
      '    const [state, live] = await Promise.all([\n' +
      '      api("/api/scripture/program"),\n' +
      '      api("/api/scripture/live/status")\n' +
      '    ]);\n' +
      '    scriptureBroadcast = state;\n' +
      '    renderBroadcastState();\n' +
      '    $("#integratedScriptureDiagnostics").textContent = JSON.stringify({ broadcast: state, live }, null, 2);\n' +
      '    $("#integratedLiveButton").textContent = live.running ? "Detener Live" : "Iniciar Live";\n' +
      '    $("#integratedLiveButton").dataset.running = String(Boolean(live.running));\n' +
      '  } catch (error) {\n' +
      '    $("#integratedScriptureDiagnostics").textContent = error.message;\n' +
      '  }\n' +
      '}\n' +
      '\n' +
      'function rgbaToHex(value) {\n' +
      '  if (String(value).startsWith("#")) return String(value).slice(0, 7);\n' +
      '  const match = String(value).match(/rgba?\\((\\d+),\\s*(\\d+),\\s*(\\d+)/i);\n' +
      '  if (!match) return "#ffffff";\n' +
      '  return `#${[match[1],match[2],match[3]].map(n=>Number(n).toString(16).padStart(2,"0")).join("")}`;\n' +
      '}\n' +
      '\n' +
      'function renderScripture() {\n' +
      '  const s=appState.scripture, m=s.manual, c=s.composition||{}, a=s.appearance||{}, g=s.gradient||{}, an=s.animation||{};\n' +
      '  $("#scriptureReference").value=m.reference||""; $("#scriptureVersion").value=m.version||""; $("#scriptureText").value=m.text||"";\n' +
      '  $("#scriptureFormat").value=s.format||"lower"; $("#scriptureAlign").value=c.alignment||"center"; $("#maxLines").value=String(c.maxLines||4); $("#balanceText").checked=c.balance!==false;\n' +
      '  $("#scriptureBottom").value=c.bottom??28; $("#scriptureWidth").value=c.width??1660; $("#scripturePadding").value=c.horizontalPadding??72;\n' +
      '  $("#scriptureBottomValue").value=`${c.bottom??28}px`; $("#scriptureWidthValue").value=`${c.width??1660}px`; $("#scripturePaddingValue").value=`${c.horizontalPadding??72}px`;\n' +
      '  $("#compositionScaleX").value=c.scaleX??1; $("#compositionScaleY").value=c.scaleY??1;\n' +
      '  $("#compositionScaleXValue").value=`${Math.round((c.scaleX??1)*100)}%`; $("#compositionScaleYValue").value=`${Math.round((c.scaleY??1)*100)}%`;\n' +
      '  $("#gradientMode").value=g.mode||"adaptive"; $("#gradientColor").value=g.color||"#000000"; $("#gradientOpacity").value=g.opacity??.96; $("#gradientHeight").value=g.height??430; $("#gradientSoftness").value=g.softness??58; $("#edgeFadeEnabled").checked=g.edgeFadeEnabled!==false; $("#edgeFade").value=g.edgeFade??150;\n' +
      '  $("#gradientOpacityValue").value=`${Math.round((g.opacity??.96)*100)}%`; $("#gradientHeightValue").value=`${g.height??430}px`; $("#gradientSoftnessValue").value=`${g.softness??58}%`; $("#edgeFadeValue").value=`${g.edgeFade??150}px`;\n' +
      '  $("#titleFont").value=a.titleFont||"Montserrat"; $("#bodyFont").value=a.bodyFont||"Montserrat"; $("#titleSize").value=a.titleSize??44; $("#bodySize").value=a.bodySize??72; $("#titleWeight").value=String(a.titleWeight??800); $("#bodyWeight").value=String(a.bodyWeight??500); $("#lineHeight").value=a.lineHeight??1.16; $("#letterSpacing").value=a.letterSpacing??-.01; $("#titleColor").value=a.titleColor||"#ffffff"; $("#textColor").value=a.textColor||"#ffffff"; $("#lineColor").value=rgbaToHex(a.lineColor||"rgba(255,255,255,.90)");\n' +
      '  $("#wordCascade").checked=an.wordCascade!==false; $("#wordCascadeStep").value=an.wordCascadeStepMs??18; $("#sameChapterOutMs").value=an.sameChapterOutMs??100; $("#sameChapterInMs").value=an.sameChapterInMs??170; $("#chapterChangeMs").value=an.chapterChangeMs??320; $("#bookChangeMs").value=an.bookChangeMs??420;\n' +
      '  $("#wordCascadeStepValue").value=`${an.wordCascadeStepMs??18} ms/palabra`; $("#sameChapterOutValue").value=`${an.sameChapterOutMs??100} ms`; $("#sameChapterInValue").value=`${an.sameChapterInMs??170} ms`; $("#chapterChangeValue").value=`${an.chapterChangeMs??320} ms`; $("#bookChangeValue").value=`${an.bookChangeMs??420} ms`;\n' +
      '  $$(".source-option").forEach(o=>o.classList.toggle("active",o.dataset.source===s.source)); $("#manualContent").classList.toggle("hidden",s.source!=="manual"); $("#propresenterContent").classList.toggle("hidden",s.source!=="propresenter"); $("#scriptureSourceBadge").textContent=s.source==="manual"?"MANUAL":"PROPRESENTER";\n' +
      "  $$('[data-scripture-design]').forEach(card=>card.classList.toggle('active',card.dataset.scriptureDesign===(s.design||'classic')));\n" +
      `  const help={lower:'Composición inferior original con degradado adaptativo.','center-lower':'Versión inferior centrada y más contenida.','left-column':'Columna vertical anclada al lado izquierdo.','right-column':'Columna vertical anclada al lado derecho.',fullscreen:'Lectura amplia centrada dentro del área segura.',minimal:'Texto limpio con presencia gráfica reducida.'}; $("#scriptureFormatHelp").textContent=help[s.format||'lower'];\n` +
      '  const incomi'... 13567 more characters
    
  code: 'ERR_ASSERTION'
  name: 'AssertionError'
  expected:
  actual: |-
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
      gradientHeight: $("#gradientHeight"), gradientSoftness: $("#gradientSoftness"), edgeFadeEnabled: $("#edgeFadeEnabled"), edgeFade: $("#edgeFade"),
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
      $("#gradientMode").value=g.mode||"adaptive"; $("#gradientColor").value=g.color||"#000000"; $("#gradientOpacity").value=g.opacity??.96; $("#gradientHeight").value=g.height??430; $("#gradientSoftness").value=g.softness??58; $("#edgeFadeEnabled").checked=g.edgeFadeEnabled!==false; $("#edgeFade").value=g.edgeFade??150;
      $("#gradientOpacityValue").value=`${Math.round((g.opacity??.96)*100)}%`; $("#gradientHeightValue").value=`${g.height??430}px`; $("#gradientSoftnessValue").value=`${g.softness??58}%`; $("#edgeFadeValue").value=`${g.edgeFade??150}px`;
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
     ["gradientMode","gradient","mode"],["gradientColor","gradient","color"],["gradientOpacity","gradient","opacity",Number],["gradientHeight","gradient","height",Number],["gradientSoftness","gradient","softness",Number],["edgeFade","gradient","edgeFade",Number],
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
    scriptureControls.wordCascade.addEventListener("change",()=>updateScripture({animation:{wordCascade:scriptureControls.wordCascade.checked}}));
    
    $("#testScriptureAnimation").addEventListener("click", async () => { await api("/api/scripture/replay",{method:"POST"}); $("#scriptureOutputPreview").contentWindow?.postMessage({type:"bmms-scripture-replay"},"*"); });
    const scripturePreviewFrame = $("#scriptureOutputPreview");
    const scripturePreviewViewport = scripturePreviewFrame?.closest(".scripture-output-frame");
    const scripturePreviewStatus = $("#scripturePreviewStatus");
    
    function resizeScripturePreview() {
      if (!scripturePreviewFrame || !scripturePreviewViewport) return;
    
      const width = scripturePreviewViewport.clientWidth || 960;
      const scale = Math.max(0.1, width / 1920);
    
      scripturePreviewFrame.style.setProperty(
        "--scripture-preview-scale",
        String(scale)
      );
      scripturePreviewViewport.style.height = `${1080 * scale}px`;
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
    
  operator: 'match'
  stack: |-
    TestContext.<anonymous> (file:///mnt/data/bmms-update-024/BMMS-PROJECT/tests/scripture-core/scripture-update-024.test.js:50:10)
    Test.runInAsyncScope (node:async_hooks:214:14)
    Test.run (node:internal/test_runner/test:1047:25)
    Test.processPendingSubtests (node:internal/test_runner/test:744:18)
    Test.postRun (node:internal/test_runner/test:1173:19)
    Test.run (node:internal/test_runner/test:1101:12)
    async startSubtestAfterBootstrap (node:internal/test_runner/harness:296:3)
  ...
# Subtest: normalizes a verse and creates a stable id
ok 72 - normalizes a verse and creates a stable id
  ---
  duration_ms: 1.080288
  type: 'test'
  ...
# Subtest: requires verse text
ok 73 - requires verse text
  ---
  duration_ms: 0.236653
  type: 'test'
  ...
# Subtest: stable id changes when content changes
ok 74 - stable id changes when content changes
  ---
  duration_ms: 0.136063
  type: 'test'
  ...
# Subtest: parses a Spanish Scripture reference
ok 75 - parses a Spanish Scripture reference
  ---
  duration_ms: 1.318272
  type: 'test'
  ...
# Subtest: extracts a reference from the first line
ok 76 - extracts a reference from the first line
  ---
  duration_ms: 0.45068
  type: 'test'
  ...
1..76
# tests 76
# suites 0
# pass 75
# fail 1
# cancelled 0
# skipped 0
# todo 0
# duration_ms 517.997742

```

## server_syntax
Exit code: 0

```text

```

## app_syntax
Exit code: 0

```text

```

## overlay_syntax
Exit code: 0

```text

```


# Final validation rerun 2

## repository_check
Exit code: 0

```text
BMMS repository check passed.

```

## tests
Exit code: 0

```text
TAP version 13
# Subtest: animation preview controls are connected
ok 1 - animation preview controls are connected
  ---
  duration_ms: 3.560199
  type: 'test'
  ...
# Subtest: editor animation playback uses requestAnimationFrame
ok 2 - editor animation playback uses requestAnimationFrame
  ---
  duration_ms: 1.259835
  type: 'test'
  ...
# Subtest: publishes a versioned event envelope
ok 3 - publishes a versioned event envelope
  ---
  duration_ms: 1.394315
  type: 'test'
  ...
# Subtest: registers and resolves a service
ok 4 - registers and resolves a service
  ---
  duration_ms: 1.597938
  type: 'test'
  ...
# Subtest: rejects duplicate registrations
ok 5 - rejects duplicate registrations
  ---
  duration_ms: 0.217223
  type: 'test'
  ...
# Subtest: normalizes an animation configuration
ok 6 - normalizes an animation configuration
  ---
  duration_ms: 0.708876
  type: 'test'
  ...
# Subtest: provides enter and exit animation defaults
ok 7 - provides enter and exit animation defaults
  ---
  duration_ms: 0.135712
  type: 'test'
  ...
# Subtest: creates slide keyframes
ok 8 - creates slide keyframes
  ---
  duration_ms: 0.305535
  type: 'test'
  ...
# Subtest: disabled animations produce no keyframes
ok 9 - disabled animations produce no keyframes
  ---
  duration_ms: 0.457941
  type: 'test'
  ...
# Subtest: lists built-in broadcast components
ok 10 - lists built-in broadcast components
  ---
  duration_ms: 1.201028
  type: 'test'
  ...
# Subtest: creates a Scripture component with shared component identity
ok 11 - creates a Scripture component with shared component identity
  ---
  duration_ms: 1.782854
  type: 'test'
  ...
# Subtest: creates a Lower Third component with live bindings
ok 12 - creates a Lower Third component with live bindings
  ---
  duration_ms: 0.354678
  type: 'test'
  ...
# Subtest: generic component factory rejects unknown components
ok 13 - generic component factory rejects unknown components
  ---
  duration_ms: 0.468778
  type: 'test'
  ...
# Subtest: gets nested values by path
ok 14 - gets nested values by path
  ---
  duration_ms: 0.676096
  type: 'test'
  ...
# Subtest: resolves single and double brace tokens
ok 15 - resolves single and double brace tokens
  ---
  duration_ms: 0.251474
  type: 'test'
  ...
# Subtest: resolves binding text elements without mutating source
ok 16 - resolves binding text elements without mutating source
  ---
  duration_ms: 0.196092
  type: 'test'
  ...
# Subtest: resolves documents and lists tokens
ok 17 - resolves documents and lists tokens
  ---
  duration_ms: 0.576799
  type: 'test'
  ...
# Subtest: creates normalized text elements
ok 18 - creates normalized text elements
  ---
  duration_ms: 1.972827
  type: 'test'
  ...
# Subtest: updates and removes elements immutably
ok 19 - updates and removes elements immutably
  ---
  duration_ms: 0.393916
  type: 'test'
  ...
# Subtest: reorders layers
ok 20 - reorders layers
  ---
  duration_ms: 0.613043
  type: 'test'
  ...
# Subtest: normalization preserves grouping metadata
ok 21 - normalization preserves grouping metadata
  ---
  duration_ms: 1.447354
  type: 'test'
  ...
# Subtest: undoes and redoes document commits
ok 22 - undoes and redoes document commits
  ---
  duration_ms: 1.017314
  type: 'test'
  ...
# Subtest: creates and categorizes templates
ok 23 - creates and categorizes templates
  ---
  duration_ms: 2.002891
  type: 'test'
  ...
# Subtest: duplicates templates with a new identity
ok 24 - duplicates templates with a new identity
  ---
  duration_ms: 0.277933
  type: 'test'
  ...
# Subtest: instantiates templates with new element and group ids
ok 25 - instantiates templates with new element and group ids
  ---
  duration_ms: 0.309601
  type: 'test'
  ...
# Subtest: updates metadata without replacing the stored document
ok 26 - updates metadata without replacing the stored document
  ---
  duration_ms: 0.165837
  type: 'test'
  ...
# Subtest: Scripture defaults to manual source
ok 27 - Scripture defaults to manual source
  ---
  duration_ms: 0.568666
  type: 'test'
  ...
# Subtest: ProPresenter settings are globally available
ok 28 - ProPresenter settings are globally available
  ---
  duration_ms: 0.101821
  type: 'test'
  ...
# Subtest: Smart Flyer defaults to assisted automation
ok 29 - Smart Flyer defaults to assisted automation
  ---
  duration_ms: 0.094951
  type: 'test'
  ...
# Subtest: builds manual scripture context
ok 30 - builds manual scripture context
  ---
  duration_ms: 0.757998
  type: 'test'
  ...
# Subtest: uses ProPresenter scripture when selected
ok 31 - uses ProPresenter scripture when selected
  ---
  duration_ms: 0.345795
  type: 'test'
  ...
# Subtest: reads the official status and presentation endpoints
ok 32 - reads the official status and presentation endpoints
  ---
  duration_ms: 2.623245
  type: 'test'
  ...
# Subtest: does not emit a duplicate verse
ok 33 - does not emit a duplicate verse
  ---
  duration_ms: 0.761894
  type: 'test'
  ...
# Subtest: starts disabled by default
ok 34 - starts disabled by default
  ---
  duration_ms: 0.849544
  type: 'test'
  ...
# Subtest: validates port range
ok 35 - validates port range
  ---
  duration_ms: 0.320266
  type: 'test'
  ...
# Subtest: publishes normalized ProPresenter media events
ok 36 - publishes normalized ProPresenter media events
  ---
  duration_ms: 0.555717
  type: 'test'
  ...
# {"timestamp":"2026-07-23T05:44:01.042Z","level":"INFO","scope":"test","message":"Connecting to ProPresenter","context":{"host":"127.0.0.1","port":1025,"protocol":"tcp"}}
# Subtest: tests the connection through the documented system-time endpoint
ok 37 - tests the connection through the documented system-time endpoint
  ---
  duration_ms: 0.962362
  type: 'test'
  ...
# Subtest: connects and subscribes configured streaming endpoints
ok 38 - connects and subscribes configured streaming endpoints
  ---
  duration_ms: 1.870033
  type: 'test'
  ...
# Subtest: normalizes a ProPresenter Scripture payload
ok 39 - normalizes a ProPresenter Scripture payload
  ---
  duration_ms: 1.377941
  type: 'test'
  ...
# Subtest: uses newline-delimited JSON for a real TCP request
ok 40 - uses newline-delimited JSON for a real TCP request
  ---
  duration_ms: 11.463081
  type: 'test'
  ...
# Subtest: receives chunked streaming messages
ok 41 - receives chunked streaming messages
  ---
  duration_ms: 42.616389
  type: 'test'
  ...
# Subtest: applies capped exponential backoff
ok 42 - applies capped exponential backoff
  ---
  duration_ms: 1.043153
  type: 'test'
  ...
# Subtest: normalizes a common current slide payload
ok 43 - normalizes a common current slide payload
  ---
  duration_ms: 2.05598
  type: 'test'
  ...
# Subtest: supports snake case response variants
ok 44 - supports snake case response variants
  ---
  duration_ms: 0.49737
  type: 'test'
  ...
# Subtest: balances text into visually similar lines
ok 45 - balances text into visually similar lines
  ---
  duration_ms: 1.026027
  type: 'test'
  ...
# Subtest: penalizes a one-word final line when a better partition exists
ok 46 - penalizes a one-word final line when a better partition exists
  ---
  duration_ms: 1.237121
  type: 'test'
  ...
# Subtest: reports overflow when minimum font still exceeds the box
ok 47 - reports overflow when minimum font still exceeds the box
  ---
  duration_ms: 0.203333
  type: 'test'
  ...
# Subtest: Scripture includes a default simple-mode design
ok 48 - Scripture includes a default simple-mode design
  ---
  duration_ms: 0.5783
  type: 'test'
  ...
# Subtest: Scripture broadcast state starts safely off air
ok 49 - Scripture broadcast state starts safely off air
  ---
  duration_ms: 0.198466
  type: 'test'
  ...
# Subtest: publishes verse and program events
ok 50 - publishes verse and program events
  ---
  duration_ms: 1.878395
  type: 'test'
  ...
# Subtest: does not mark identical normalized content as changed
ok 51 - does not mark identical normalized content as changed
  ---
  duration_ms: 0.983053
  type: 'test'
  ...
# Subtest: preview iframe is not hidden behind a ready-message race
ok 52 - preview iframe is not hidden behind a ready-message race
  ---
  duration_ms: 0.978827
  type: 'test'
  ...
# Subtest: lateral padding overrides every Scripture format
ok 53 - lateral padding overrides every Scripture format
  ---
  duration_ms: 0.464702
  type: 'test'
  ...
# Subtest: text fitting performs real rendered candidate measurements
ok 54 - text fitting performs real rendered candidate measurements
  ---
  duration_ms: 0.183644
  type: 'test'
  ...
# Subtest: preview initialization cannot abort the whole app
ok 55 - preview initialization cannot abort the whole app
  ---
  duration_ms: 1.353575
  type: 'test'
  ...
# Subtest: saved Scripture state is deeply hydrated
ok 56 - saved Scripture state is deeply hydrated
  ---
  duration_ms: 0.223122
  type: 'test'
  ...
# Subtest: restores original Scripture geometry
ok 57 - restores original Scripture geometry
  ---
  duration_ms: 0.575918
  type: 'test'
  ...
# Subtest: restores writing and contextual transitions
ok 58 - restores writing and contextual transitions
  ---
  duration_ms: 0.113489
  type: 'test'
  ...
# Subtest: restores gradient and typography
ok 59 - restores gradient and typography
  ---
  duration_ms: 0.107651
  type: 'test'
  ...
# Subtest: Scripture restores the original template and format defaults
ok 60 - Scripture restores the original template and format defaults
  ---
  duration_ms: 0.538922
  type: 'test'
  ...
# Subtest: Appearance and animation configuration have usable defaults
ok 61 - Appearance and animation configuration have usable defaults
  ---
  duration_ms: 0.274729
  type: 'test'
  ...
# Subtest: TV Broadcast CG is available in the advanced template library
ok 62 - TV Broadcast CG is available in the advanced template library
  ---
  duration_ms: 1.629335
  type: 'test'
  ...
# Subtest: Scripture output contains the robust fitting engine
ok 63 - Scripture output contains the robust fitting engine
  ---
  duration_ms: 0.256722
  type: 'test'
  ...
# Subtest: Preview uses one scaled 1920 by 1080 stage
ok 64 - Preview uses one scaled 1920 by 1080 stage
  ---
  duration_ms: 0.311944
  type: 'test'
  ...
# Subtest: preview iframe preserves a 1920 by 1080 viewport
ok 65 - preview iframe preserves a 1920 by 1080 viewport
  ---
  duration_ms: 1.638739
  type: 'test'
  ...
# Subtest: overlay no longer polls and rerenders every two seconds
ok 66 - overlay no longer polls and rerenders every two seconds
  ---
  duration_ms: 0.237493
  type: 'test'
  ...
# Subtest: signature excludes volatile ProPresenter timestamps
ok 67 - signature excludes volatile ProPresenter timestamps
  ---
  duration_ms: 0.173569
  type: 'test'
  ...
# Subtest: verse width follows configured lateral padding without a legacy cap
ok 68 - verse width follows configured lateral padding without a legacy cap
  ---
  duration_ms: 0.399524
  type: 'test'
  ...
# Subtest: verse size is authoritative and is never silently reduced
ok 69 - verse size is authoritative and is never silently reduced
  ---
  duration_ms: 0.293077
  type: 'test'
  ...
# Subtest: composition supports independent X and Y scale
ok 70 - composition supports independent X and Y scale
  ---
  duration_ms: 1.871856
  type: 'test'
  ...
# Subtest: broadcast action labels are in Spanish
ok 71 - broadcast action labels are in Spanish
  ---
  duration_ms: 0.69888
  type: 'test'
  ...
# Subtest: normalizes a verse and creates a stable id
ok 72 - normalizes a verse and creates a stable id
  ---
  duration_ms: 1.137754
  type: 'test'
  ...
# Subtest: requires verse text
ok 73 - requires verse text
  ---
  duration_ms: 0.254859
  type: 'test'
  ...
# Subtest: stable id changes when content changes
ok 74 - stable id changes when content changes
  ---
  duration_ms: 0.14149
  type: 'test'
  ...
# Subtest: parses a Spanish Scripture reference
ok 75 - parses a Spanish Scripture reference
  ---
  duration_ms: 1.19641
  type: 'test'
  ...
# Subtest: extracts a reference from the first line
ok 76 - extracts a reference from the first line
  ---
  duration_ms: 0.453585
  type: 'test'
  ...
1..76
# tests 76
# suites 0
# pass 76
# fail 0
# cancelled 0
# skipped 0
# todo 0
# duration_ms 515.86673

```

## server_syntax
Exit code: 0

```text

```

## app_syntax
Exit code: 0

```text

```

## overlay_syntax
Exit code: 0

```text

```

