import { classifyVisionLines } from "./smart-flyer-vision.js";
import { trustedDetection } from "./smart-flyer-detection.js";
import { proposeTitleRegion, extractTitleFromRegion, extractTitleContinuation, titleVerticalCoverage, repairTitleWithFilename } from "./smart-flyer-extraction.js";

const byId = id => document.getElementById(id);
const root = byId("view-smart-flyer");

if (root) {
  const LABELS = Object.freeze({
    title: "TÍTULO", subtitle: "SUBTÍTULO", date: "FECHA", time: "HORA",
    location: "LUGAR", additionalInfo: "INFORMACIÓN", qr: "QR", logo: "LOGO", image: "IMAGEN"
  });
  const OCR_TYPES = new Set(["title", "subtitle", "date", "time", "location", "additionalInfo"]);
  const TEMPLATE_LABELS = Object.freeze({ modern: "Studio", broadcast: "Carbon", glass: "Frost", compact: "Mono" });
  const emptyDocument = () => ({ title: "", subtitle: "", date: "", time: "", location: "", additionalInfo: "", qr: { detected: false, rawValue: "" } });
  const state = {
    file: null, image: null, imageDataUrl: "", document: emptyDocument(), regions: {}, graphics: {},
    activeType: "title", tool: "select", template: "modern", format: "banner", palette: ["#d59a4a"],
    showQr: true, useOriginalTitle: false, program: null, gesture: null
  };
  let analysisToken = 0;

  const renderer = () => window.BmmsSmartFlyerRenderer;
  const sourceImage = byId("smartFlyerImage");
  const stage = byId("smartFlyerOriginalStage");
  const regionLayer = byId("smartFlyerRegionLayer");
  const setStatus = message => { byId("smartFlyerAnalysis").textContent = message; };
  const clone = value => typeof structuredClone === "function" ? structuredClone(value) : JSON.parse(JSON.stringify(value));

  function scene() {
    return {
      schemaVersion: 2,
      canvas: { width: 1920, height: 1080 },
      template: state.template,
      format: state.format,
      document: clone(state.document),
      palette: [...state.palette],
      regions: clone(state.regions),
      regionGraphics: clone(state.graphics),
      titleGraphicDataUrl: state.useOriginalTitle ? state.graphics.title || "" : "",
      qrGraphicDataUrl: state.showQr ? state.graphics.qr || "" : "",
      showQr: Boolean(state.showQr && state.graphics.qr),
      useOriginalTitle: Boolean(state.useOriginalTitle && state.graphics.title),
      updatedAt: new Date().toISOString()
    };
  }

  function imageBox() {
    if (!state.image || sourceImage.hidden) return null;
    const imageRect = sourceImage.getBoundingClientRect();
    const stageRect = stage.getBoundingClientRect();
    return {
      left: imageRect.left - stageRect.left,
      top: imageRect.top - stageRect.top,
      width: imageRect.width,
      height: imageRect.height,
      viewport: imageRect
    };
  }

  function point(event) {
    const box = imageBox();
    if (!box) return null;
    return {
      x: Math.max(0, Math.min(1, (event.clientX - box.viewport.left) / box.width)),
      y: Math.max(0, Math.min(1, (event.clientY - box.viewport.top) / box.height))
    };
  }

  function normalized(a, b) {
    if (!a || !b) return null;
    const region = { x: Math.min(a.x, b.x), y: Math.min(a.y, b.y), width: Math.abs(a.x - b.x), height: Math.abs(a.y - b.y) };
    return region.width >= .008 && region.height >= .008 ? region : null;
  }

  function crop(region) {
    if (!region || !state.image) return "";
    const x = Math.round(region.x * state.image.naturalWidth);
    const y = Math.round(region.y * state.image.naturalHeight);
    const width = Math.max(2, Math.round(region.width * state.image.naturalWidth));
    const height = Math.max(2, Math.round(region.height * state.image.naturalHeight));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d", { alpha: true }).drawImage(state.image, x, y, width, height, 0, 0, width, height);
    return canvas.toDataURL("image/png");
  }

  async function extractRegionTitle(region, run) {
    const graphic = crop(region);
    const lines = await ocr(graphic, { language: OCR_LANGUAGE, maxMs: 11000, run });
    let title = extractTitleFromRegion(lines);
    const cropHeight = Math.max(1, state.image.naturalHeight * region.height);
    if (title && titleVerticalCoverage(lines, cropHeight) < .62) {
      const lowerY = region.y + region.height * .36;
      const lowerRegion = { x: region.x, y: lowerY, width: region.width, height: Math.min(region.height * .64, 1 - lowerY) };
      const continuation = extractTitleContinuation(await ocr(crop(lowerRegion), { language: OCR_LANGUAGE, maxMs: 9000, run }));
      if (continuation && !title.toLocaleLowerCase("es").includes(continuation.toLocaleLowerCase("es"))) title = `${title} ${continuation}`.slice(0, 80);
      else title = "";
    }
    title = repairTitleWithFilename(title, state.file?.name || "");
    return { title, graphic };
  }

  function palette(image) {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 24;
    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, 24, 24);
    const pixels = context.getImageData(0, 0, 24, 24).data;
    let red = 0, green = 0, blue = 0, count = 0;
    for (let index = 0; index < pixels.length; index += 20) {
      red += pixels[index]; green += pixels[index + 1]; blue += pixels[index + 2]; count++;
    }
    return `#${[red, green, blue].map(value => Math.round(value / count).toString(16).padStart(2, "0")).join("")}`;
  }

  function setTool(tool) {
    state.tool = tool;
    ["select", "move", "adjust"].forEach(name => byId(`smartFlyerTool${name[0].toUpperCase()}${name.slice(1)}`)?.classList.toggle("active", name === tool));
    stage.classList.toggle("is-marking", tool === "select" || tool === "adjust");
  }

  function arm(type) {
    if (!state.image || !type) return;
    state.activeType = type;
    byId("smartFlyerBlockPicker").value = type;
    setTool("select");
    const marker = byId("smartFlyerMarkingStatus");
    marker.hidden = false;
    marker.querySelector("b").textContent = `Marcando: ${LABELS[type] || type}`;
    setStatus(`Arrastra sobre el flyer para marcar ${LABELS[type] || type}.`);
    renderRegions();
    renderBlocks();
  }

  function finishGesture() {
    state.gesture = null;
    byId("smartFlyerMarkingStatus").hidden = true;
    setTool("move");
  }

  function setRegion(type, region) {
    if (!type) return;
    if (region) {
      state.regions[type] = region;
      state.graphics[type] = crop(region);
    } else {
      delete state.regions[type];
      delete state.graphics[type];
    }
    if (type === "title") {
      state.useOriginalTitle = Boolean(region);
      const toggle = byId("smartFlyerUseOriginalTitle");
      toggle.disabled = !region;
      toggle.checked = state.useOriginalTitle;
      byId("smartFlyerOriginalTitleHint").textContent = region ? "El recorte reemplazará al título escrito." : "Marca el bloque Título para habilitar esta opción.";
    }
    if (type === "qr") {
      state.showQr = Boolean(region);
      state.document.qr = { detected: Boolean(region), rawValue: state.document.qr?.rawValue || "" };
    }
    renderAll();
  }

  function renderRegions() {
    regionLayer.replaceChildren();
    const box = imageBox();
    if (!box) return;
    Object.entries(state.regions).forEach(([type, region]) => {
      const node = document.createElement("button");
      node.type = "button";
      node.className = `sfv2-region${type === state.activeType ? " active" : ""}`;
      node.dataset.type = type;
      node.setAttribute("aria-label", `Región ${LABELS[type] || type}`);
      const label = document.createElement("span");
      label.textContent = LABELS[type] || type;
      node.append(label);
      Object.assign(node.style, {
        left: `${box.left + region.x * box.width}px`, top: `${box.top + region.y * box.height}px`,
        width: `${region.width * box.width}px`, height: `${region.height * box.height}px`
      });
      regionLayer.append(node);
    });
  }

  function renderBlocks() {
    const list = byId("smartFlyerBlockList");
    list.replaceChildren();
    const entries = Object.keys(state.regions);
    if (!entries.length) {
      const empty = document.createElement("small");
      empty.className = "sfv2-empty-blocks";
      empty.textContent = state.image ? "No hay áreas marcadas." : "Carga un flyer para comenzar.";
      list.append(empty);
    }
    entries.forEach(type => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `sfv2-block${type === state.activeType ? " active" : ""}`;
      button.dataset.type = type;
      const copy = String(state.document[type] || "Área marcada");
      button.innerHTML = `<span class="sfv2-block-state">✓</span><span class="sfv2-block-copy"><b>${LABELS[type] || type}</b><small></small></span>`;
      button.querySelector("small").textContent = copy;
      button.addEventListener("click", () => { state.activeType = type; byId("smartFlyerBlockPicker").value = type; setTool("move"); renderRegions(); renderBlocks(); });
      list.append(button);
    });
    byId("smartFlyerClearTitle").disabled = !state.regions[state.activeType];
    byId("smartFlyerReanalyze").disabled = !Object.keys(state.regions).some(type => OCR_TYPES.has(type));
  }

  function renderContent() {
    const values = [state.document.title, state.document.subtitle, state.document.date, state.document.time, state.document.location, state.document.additionalInfo];
    const filled = values.filter(value => String(value || "").trim()).length;
    const percent = Math.round(filled / values.length * 100);
    byId("smartFlyerContentPercent").textContent = `${percent}%`;
    byId("smartFlyerContentProgress").style.width = `${percent}%`;
    byId("smartFlyerTitleCount").textContent = `${state.document.title.length}/80`;
    byId("smartFlyerSubtitleCount").textContent = `${state.document.subtitle.length}/100`;
    byId("smartFlyerAdditionalCount").textContent = `${state.document.additionalInfo.length}/220`;
    const ready = Boolean(state.document.title.trim() || state.graphics.title);
    const hint = byId("smartFlyerContentHint");
    hint.classList.toggle("ready", ready);
    hint.textContent = ready ? "Contenido listo para PREVIEW y TAKE." : "Completa al menos el título para preparar el CG.";
    const qrToggle = byId("smartFlyerShowQr");
    qrToggle.disabled = !state.graphics.qr;
    qrToggle.checked = Boolean(state.graphics.qr && state.showQr);
    byId("smartFlyerQrHint").textContent = state.graphics.qr ? (state.showQr ? "QR incluido en el CG." : "QR oculto en el CG.") : "No hay un QR detectado o marcado.";
    byId("smartFlyerTake").disabled = !ready;
  }

  function renderPreview() {
    const host = byId("smartFlyerLivePreview");
    const empty = byId("smartFlyerOutputEmpty");
    const result = root.querySelector(".sfv2-result");
    const ready = Boolean(state.document.title.trim() || state.document.subtitle.trim() || state.document.date.trim() || state.document.time.trim() || state.document.location.trim() || (state.useOriginalTitle && state.graphics.title));
    host.hidden = !ready;
    empty.hidden = ready;
    result?.classList.toggle("is-empty", !ready);
    byId("smartFlyerActiveTemplate").textContent = TEMPLATE_LABELS[state.template] || state.template;
    if (ready) renderer().render(host, scene(), { view: "composition" });
  }

  function renderProgram(value = state.program) {
    const host = byId("smartFlyerProgramMonitor");
    if (value) renderer().render(host, value, { view: "composition" });
    else renderer().clear(host, "Sin composición al aire.");
  }

  function renderFields() {
    root.querySelectorAll("[data-smart-field]").forEach(input => { if (input.value !== state.document[input.dataset.smartField]) input.value = state.document[input.dataset.smartField] || ""; });
  }

  function renderAll() {
    renderFields(); renderRegions(); renderBlocks(); renderContent(); renderPreview();
  }

  async function loadFile(file) {
    if (!file || !/^image\/(png|jpeg|webp)$/i.test(file.type)) { setStatus("Selecciona una imagen PNG, JPG o WEBP."); return; }
    analysisToken++;
    byId("smartFlyerAnalyze").dataset.busy = "false";
    const dataUrl = await new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = reject; reader.readAsDataURL(file); });
    const image = new Image();
    await new Promise((resolve, reject) => { image.onload = resolve; image.onerror = reject; image.src = dataUrl; });
    Object.assign(state, { file, image, imageDataUrl: dataUrl, document: emptyDocument(), regions: {}, graphics: {}, showQr: true, useOriginalTitle: false, palette: [palette(image)], activeType: "title" });
    sourceImage.src = dataUrl;
    sourceImage.hidden = false;
    byId("smartFlyerEmpty").hidden = true;
    byId("smartFlyerFileMeta").textContent = `${file.name} · ${(file.size / 1048576).toFixed(2)} MB · ${image.naturalWidth} × ${image.naturalHeight}`;
    byId("smartFlyerAnalyze").disabled = false;
    byId("smartFlyerBlockPicker").disabled = false;
    byId("smartFlyerUseOriginalTitle").disabled = true;
    byId("smartFlyerUseOriginalTitle").checked = false;
    setStatus("Imagen lista. Analiza el flyer o marca áreas manualmente.");
    ocrWorker().catch(error => console.warn("OCR no precargado", error));
    setTool("select");
    renderAll();
    requestAnimationFrame(renderRegions);
  }

  function timeout(promise, milliseconds, label) {
    let timer;
    return Promise.race([promise, new Promise((_, reject) => { timer = setTimeout(() => reject(new Error(`${label}: tiempo agotado`)), milliseconds); })]).finally(() => clearTimeout(timer));
  }

  // OCR en español. Se carga desde /vendor/tesseract para funcionar sin internet;
  // si esos archivos no están instalados, se usa el CDN como antes.
  const OCR_LANGUAGE = "spa";
  const OCR_LOCAL = Object.freeze({
    script: "/vendor/tesseract/tesseract.min.js",
    workerPath: "/vendor/tesseract/worker.min.js",
    corePath: "/vendor/tesseract/core",
    langPath: "/vendor/tesseract/lang"
  });
  const OCR_CDN_SCRIPT = "https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js";
  const absolute = value => new URL(value, window.location.origin).href;

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => window.Tesseract ? resolve(window.Tesseract) : reject(new Error("Tesseract no disponible"));
      script.onerror = () => { script.remove(); reject(new Error(`No se pudo cargar ${src}`)); };
      document.head.append(script);
    });
  }

  let tesseractPromise;
  async function tesseract() {
    if (!tesseractPromise) tesseractPromise = (async () => {
      if (window.Tesseract) return { engine: window.Tesseract, local: false };
      try {
        return { engine: await timeout(loadScript(OCR_LOCAL.script), 8000, "Carga OCR local"), local: true };
      } catch (error) {
        console.warn("OCR local no instalado; se usará internet", error);
        return { engine: await timeout(loadScript(OCR_CDN_SCRIPT), 12000, "Carga OCR"), local: false };
      }
    })().catch(error => { tesseractPromise = undefined; throw error; });
    return tesseractPromise;
  }

  // Un solo worker por idioma, reutilizado entre análisis: el modelo se carga una vez.
  let ocrProgress = null;
  const ocrWorkers = new Map();
  function ocrWorker(language = OCR_LANGUAGE) {
    if (!ocrWorkers.has(language)) {
      const pending = (async () => {
        const { engine, local } = await tesseract();
        const options = { logger: progress => ocrProgress?.(progress) };
        if (local) Object.assign(options, { workerPath: absolute(OCR_LOCAL.workerPath), corePath: absolute(OCR_LOCAL.corePath), langPath: absolute(OCR_LOCAL.langPath) });
        return timeout(engine.createWorker(language, 1, options), 45000, "Preparación OCR");
      })().catch(error => { ocrWorkers.delete(language); throw error; });
      ocrWorkers.set(language, pending);
    }
    return ocrWorkers.get(language);
  }

  function discardOcrWorker(language) {
    const pending = ocrWorkers.get(language);
    ocrWorkers.delete(language);
    pending?.then(worker => worker.terminate()).catch(() => {});
  }

  async function ocr(dataUrl, { language = OCR_LANGUAGE, maxMs = 30000, run = analysisToken } = {}) {
    if (!dataUrl) return [];
    try {
      if ("TextDetector" in window) {
        const blob = await (await fetch(dataUrl)).blob();
        const bitmap = await createImageBitmap(blob);
        const rows = await timeout(new TextDetector().detect(bitmap), 12000, "TextDetector");
        if (rows.length) return rows.map(item => ({ text: item.rawValue || "", confidence: 85, bbox: item.boundingBox }));
      }
    } catch (error) { console.warn("TextDetector omitido", error); }
    try {
      const worker = await ocrWorker(language);
      if (run !== analysisToken) return [];
      ocrProgress = progress => {
        if (run === analysisToken && progress.status === "recognizing text") setStatus(`OCR ${Math.round((progress.progress || 0) * 100)}% · Puedes cancelar o marcar áreas manualmente.`);
      };
      const result = await timeout(worker.recognize(dataUrl), maxMs, "Reconocimiento OCR").catch(error => {
        // Un reconocimiento colgado bloquearía la cola del worker: se descarta y el siguiente crea uno nuevo.
        discardOcrWorker(language);
        throw error;
      });
      return (result?.data?.lines || []).map(line => ({ text: line.text || "", confidence: line.confidence || 0, bbox: line.bbox }));
    } catch (error) { console.warn("OCR omitido", error); return []; }
    finally { ocrProgress = null; }
  }

  function prepareOcrSource(image) {
    const maximumWidth = 1280;
    const scale = Math.min(1, maximumWidth / image.naturalWidth);
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
    const context = canvas.getContext("2d", { alpha: false });
    context.filter = "grayscale(1) contrast(1.25)";
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    return { dataUrl: canvas.toDataURL("image/jpeg", .84), width: canvas.width, height: canvas.height };
  }

  const cleanText = value => String(value || "").replace(/\s+/g, " ").replace(/[|]/g, "I").trim();
  function bestText(lines) {
    return lines.map(line => ({ text: cleanText(line.text), confidence: Number(line.confidence || 0) }))
      .filter(line => line.text.length > 1 && line.confidence >= 35 && /[\p{L}\p{N}]/u.test(line.text))
      .sort((a, b) => b.confidence - a.confidence || b.text.length - a.text.length)[0]?.text || "";
  }

  async function detectQr() {
    if (!("BarcodeDetector" in window) || !state.image) return;
    try {
      const codes = await timeout(new BarcodeDetector({ formats: ["qr_code"] }).detect(state.image), 8000, "Detección QR");
      const code = codes[0];
      if (!code) return;
      const box = code.boundingBox;
      setRegion("qr", { x: box.x / state.image.naturalWidth, y: box.y / state.image.naturalHeight, width: box.width / state.image.naturalWidth, height: box.height / state.image.naturalHeight });
      state.document.qr = { detected: true, rawValue: code.rawValue || "" };
    } catch (error) { console.warn("QR omitido", error); }
  }

  async function analyzeFull() {
    if (!state.image) return;
    const button = byId("smartFlyerAnalyze");
    if (button.dataset.busy === "true") {
      analysisToken++;
      button.dataset.busy = "false";
      button.disabled = false;
      button.textContent = "Volver a analizar";
      setStatus("Análisis cancelado. Marca áreas o completa los campos manualmente.");
      return;
    }
    const run = ++analysisToken;
    button.dataset.busy = "true";
    button.disabled = false;
    button.textContent = "Cancelar análisis";
    setStatus("Preparando análisis rápido. La edición manual permanece disponible.");
    try {
      await detectQr();
      if (run !== analysisToken) return;
      const prepared = prepareOcrSource(state.image);
      const lines = await ocr(prepared.dataUrl, { language: OCR_LANGUAGE, maxMs: 16000, run });
      if (run !== analysisToken) return;
      const analysis = classifyVisionLines(lines);
      const detected = trustedDetection(lines, analysis);
      const titleRegion = proposeTitleRegion(lines, prepared.width, prepared.height);
      if (titleRegion && !detected.title) {
        setStatus("Título localizado. Analizando el recorte aislado…");
        const titleGraphic = crop(titleRegion);
        state.regions.title = titleRegion;
        state.graphics.title = titleGraphic;
        state.useOriginalTitle = false;
        byId("smartFlyerUseOriginalTitle").disabled = false;
        byId("smartFlyerUseOriginalTitle").checked = false;
        byId("smartFlyerOriginalTitleHint").textContent = "Título localizado automáticamente. Puedes usar el arte original o mantener el texto.";
        try {
          const regional = await extractRegionTitle(titleRegion, run);
          if (run !== analysisToken) return;
          if (regional.title) detected.title = regional.title;
        } catch (error) {
          console.warn("OCR aislado del título omitido", error);
        }
        if (!detected.title) {
          state.useOriginalTitle = true;
          byId("smartFlyerUseOriginalTitle").checked = true;
          byId("smartFlyerOriginalTitleHint").textContent = "El texto quedó incompleto; se usará automáticamente el arte original localizado.";
        }
      }
      Object.entries(detected).forEach(([key, value]) => { if (!state.document[key]) state.document[key] = value; });
      const count = Object.keys(detected).length;
      setStatus(count ? `Análisis listo · ${count} campos confiables. Verifica el texto.` : "OCR sin resultados confiables. No se agregó texto dudoso; marca áreas o escribe el contenido.");
      renderAll();
    } catch (error) {
      console.error("Smart Flyer analysis", error);
      if (run === analysisToken) setStatus("El análisis rápido terminó sin bloquear BMMS. Marca áreas o escribe el contenido manualmente.");
    } finally {
      if (run === analysisToken) {
        button.dataset.busy = "false";
        button.disabled = false;
        button.textContent = "Volver a analizar";
      }
    }
  }

  async function analyzeRegions() {
    const types = Object.keys(state.regions).filter(type => OCR_TYPES.has(type));
    if (!types.length) { setStatus("Marca áreas de texto antes de reanalizar."); return; }
    const button = byId("smartFlyerReanalyze");
    button.disabled = true;
    let updated = 0;
    try {
      for (const type of types) {
        setStatus(`Analizando ${LABELS[type]}…`);
        if (type === "title") {
          const regional = await extractRegionTitle(state.regions.title, analysisToken);
          state.graphics.title = regional.graphic;
          if (regional.title) {
            state.document.title = regional.title;
            state.useOriginalTitle = false;
            byId("smartFlyerUseOriginalTitle").checked = false;
            updated++;
          } else {
            state.useOriginalTitle = true;
            byId("smartFlyerUseOriginalTitle").checked = true;
            byId("smartFlyerOriginalTitleHint").textContent = "El texto quedó incompleto; se usará el arte original localizado.";
          }
        } else {
          const value = bestText(await ocr(state.graphics[type]));
          if (value) { state.document[type] = value; updated++; }
        }
      }
      setStatus(`${updated}/${types.length} áreas actualizadas. Corrige manualmente lo necesario.`);
      renderAll();
    } finally { button.disabled = false; }
  }

  async function take() {
    const button = byId("smartFlyerTake");
    button.disabled = true;
    try {
      const response = await fetch("/api/smart-flyer/take", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(scene()) });
      if (!response.ok) throw new Error("TAKE rechazado por el servidor");
      const payload = await response.json();
      state.program = payload.scene;
      renderProgram();
      byId("smartFlyerProgramStatus").textContent = "PROGRAM activo";
      byId("smartFlyerPreviewStatus").textContent = "EN PROGRAM";
    } catch (error) {
      setStatus(`No se pudo enviar a PROGRAM: ${error.message}`);
    } finally { renderContent(); }
  }

  async function hydrate() {
    try {
      const response = await fetch("/api/smart-flyer/program", { cache: "no-store" });
      const payload = await response.json();
      state.program = payload.scene || null;
      renderProgram();
      if (state.program) byId("smartFlyerProgramStatus").textContent = "PROGRAM activo";
    } catch { renderProgram(null); }
  }

  const fileInput = byId("smartFlyerFile");
  const dropzone = byId("smartFlyerDropzone");
  fileInput.addEventListener("change", () => loadFile(fileInput.files?.[0]).catch(error => setStatus(error.message)));
  dropzone.addEventListener("dragover", event => { event.preventDefault(); dropzone.classList.add("dragging"); });
  dropzone.addEventListener("dragleave", () => dropzone.classList.remove("dragging"));
  dropzone.addEventListener("drop", event => { event.preventDefault(); dropzone.classList.remove("dragging"); loadFile(event.dataTransfer.files?.[0]).catch(error => setStatus(error.message)); });
  byId("smartFlyerAnalyze").addEventListener("click", analyzeFull);
  byId("smartFlyerReanalyze").addEventListener("click", analyzeRegions);
  byId("smartFlyerTake").addEventListener("click", take);
  byId("smartFlyerBlockPicker").addEventListener("change", event => arm(event.target.value));
  byId("smartFlyerClearTitle").addEventListener("click", () => setRegion(state.activeType, null));
  byId("smartFlyerToolSelect").addEventListener("click", () => arm(state.activeType));
  byId("smartFlyerToolMove").addEventListener("click", () => setTool("move"));
  byId("smartFlyerToolAdjust").addEventListener("click", () => { setTool("adjust"); setStatus(`Dibuja nuevamente el bloque ${LABELS[state.activeType]}.`); });
  byId("smartFlyerTemplateSelect").querySelectorAll("[data-template]").forEach(button => button.addEventListener("click", () => {
    state.template = button.dataset.template;
    byId("smartFlyerTemplateSelect").querySelectorAll("[data-template]").forEach(item => item.classList.toggle("active", item === button));
    renderPreview();
  }));
  byId("smartFlyerFormatSelect").addEventListener("change", event => { state.format = event.target.value; renderPreview(); });
  byId("smartFlyerUseOriginalTitle").addEventListener("change", event => { state.useOriginalTitle = event.target.checked; renderPreview(); renderContent(); });
  byId("smartFlyerShowQr").addEventListener("change", event => { state.showQr = event.target.checked; renderPreview(); renderContent(); });
  root.querySelectorAll("[data-smart-field]").forEach(input => input.addEventListener("input", () => {
    state.document[input.dataset.smartField] = input.value;
    renderBlocks(); renderContent(); renderPreview();
  }));

  stage.addEventListener("pointerdown", event => {
    if (!state.image) return;
    const start = point(event);
    if (!start) return;
    const hit = event.target.closest?.(".sfv2-region");
    if (hit) { state.activeType = hit.dataset.type; byId("smartFlyerBlockPicker").value = state.activeType; }
    if (state.tool === "move" && hit) state.gesture = { kind: "move", start, original: { ...state.regions[state.activeType] } };
    else state.gesture = { kind: "draw", start };
    stage.setPointerCapture?.(event.pointerId);
    event.preventDefault();
  }, true);
  stage.addEventListener("pointermove", event => {
    if (!state.gesture) return;
    const current = point(event);
    if (!current) return;
    if (state.gesture.kind === "move") {
      const original = state.gesture.original;
      state.regions[state.activeType] = {
        ...original,
        x: Math.max(0, Math.min(1 - original.width, original.x + current.x - state.gesture.start.x)),
        y: Math.max(0, Math.min(1 - original.height, original.y + current.y - state.gesture.start.y))
      };
    } else {
      const region = normalized(state.gesture.start, current);
      if (region) state.regions[state.activeType] = region;
    }
    renderRegions();
  });
  stage.addEventListener("pointerup", event => {
    if (!state.gesture) return;
    const current = point(event);
    const region = state.gesture.kind === "move" ? state.regions[state.activeType] : normalized(state.gesture.start, current);
    if (region) setRegion(state.activeType, region);
    finishGesture();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") finishGesture();
    if ((event.key === "Delete" || event.key === "Backspace") && !/INPUT|TEXTAREA/.test(document.activeElement?.tagName || "") && state.regions[state.activeType]) setRegion(state.activeType, null);
  });
  window.addEventListener("resize", () => requestAnimationFrame(renderRegions));

  renderAll();
  hydrate();
}
