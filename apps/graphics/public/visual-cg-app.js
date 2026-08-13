(function () {
  "use strict";

  const root = document.getElementById("view-smart-flyer");
  const renderer = window.BmmsVisualCgRenderer;
  if (!root || !renderer) return;

  const DESIGNS = [
    { id: "thin-glass-speaker", name: "Glass · Speaker", type: "speaker", surface: "Glass" },
    { id: "thin-glass-verse", name: "Glass · Verse", type: "verse", surface: "Glass" },
    { id: "thin-glass-announcement", name: "Glass · Announcement", type: "announcement", surface: "Glass" },
    { id: "thin-glass-welcome", name: "Glass · Welcome", type: "welcome", surface: "Glass" },
    { id: "thin-solid-speaker", name: "Solid · Speaker", type: "speaker", surface: "Solid" },
    { id: "thin-solid-verse", name: "Solid · Verse", type: "verse", surface: "Solid" },
    { id: "thin-solid-announcement", name: "Solid · Announcement", type: "announcement", surface: "Solid" },
    { id: "thin-solid-welcome", name: "Solid · Welcome", type: "welcome", surface: "Solid" }
  ];

  const LABELS = {
    speaker: { eyebrow: "", title: "Nombre", subtitle: "Cargo", titleHint: "Pastor Juan Rodríguez", subtitleHint: "Pastor Principal" },
    verse: { eyebrow: "Referencia", title: "Texto bíblico", subtitle: "", titleHint: "Texto del versículo", subtitleHint: "" },
    announcement: { eyebrow: "Categoría", title: "Anuncio", subtitle: "Fecha y hora", titleHint: "Noche de Alabanza", subtitleHint: "Viernes 20 de Agosto · 7:00 PM" },
    welcome: { eyebrow: "", title: "Mensaje central", subtitle: "Usuario o firma", titleHint: "BIENVENIDOS · IGLESIA NUEVA VIDA", subtitleHint: "@iglesianv" }
  };

  const PRESET_STORAGE_KEY = "bmms.visualCg.presets.v1";
  const MAX_PRESETS = 30;

  function loadPresets() {
    try {
      const saved = JSON.parse(window.localStorage.getItem(PRESET_STORAGE_KEY) || "[]");
      if (!Array.isArray(saved)) return [];
      return saved.filter((preset) => preset && typeof preset.id === "string" && typeof preset.name === "string").slice(0, MAX_PRESETS);
    } catch (_error) {
      return [];
    }
  }

  const cloneDefaults = (type) => ({ ...renderer.defaults[type] });
  const state = {
    designId: "thin-glass-speaker",
    documents: {
      speaker: cloneDefaults("speaker"),
      verse: cloneDefaults("verse"),
      announcement: cloneDefaults("announcement"),
      welcome: cloneDefaults("welcome")
    },
    styles: Object.fromEntries(DESIGNS.map(design => [design.id, renderer.defaultStyle(design.id)])),
    qr: "",
    qrLabel: "Para más info",
    presets: loadPresets(),
    previewHandle: null,
    galleryHandles: []
  };

  root.innerHTML = `
    <div class="figma-cg-studio">
      <main class="figma-cg-workspace">
        <section class="figma-cg-preview-section" aria-labelledby="figmaPreviewTitle">
          <header class="figma-cg-section-header">
            <div>
              <span class="figma-cg-eyebrow">FIGMA BROADCAST CG</span>
              <h2 id="figmaPreviewTitle">Preview 1920 × 1080</h2>
            </div>
            <div class="figma-cg-design-chip" id="visualDesignChip">Glass · Speaker</div>
          </header>
          <div class="figma-cg-preview-stage" id="visualPreview" aria-label="Previsualización del CG"></div>
        </section>

        <section class="figma-cg-library-section" aria-labelledby="figmaLibraryTitle">
          <header class="figma-cg-section-header figma-cg-library-header">
            <div>
              <span class="figma-cg-eyebrow">8 DISEÑOS ORIGINALES</span>
              <h2 id="figmaLibraryTitle">Colección Figma</h2>
            </div>
            <span class="figma-cg-library-note">Glass + Solid · 4 usos</span>
          </header>
          <div class="figma-cg-gallery" id="visualGallery"></div>
        </section>
      </main>

      <aside class="figma-cg-editor" aria-labelledby="figmaEditorTitle">
        <header class="figma-cg-editor-header">
          <span class="figma-cg-eyebrow">EDITOR DEL CONTENIDO</span>
          <h2 id="figmaEditorTitle">Composición</h2>
          <p>El diseño y la animación provienen directamente de Figma.</p>
        </header>

        <section class="figma-cg-editor-group figma-cg-presets">
          <div class="figma-cg-presets-heading">
            <div>
              <h3>Presets</h3>
              <p>Guarda e invoca el banner completo.</p>
            </div>
            <span id="visualPresetCount">0</span>
          </div>
          <div class="figma-cg-preset-create">
            <input id="visualPresetName" type="text" maxlength="40" placeholder="Nombre del preset" aria-label="Nombre del preset" />
            <button class="figma-cg-button" id="visualPresetSave" type="button">Guardar</button>
          </div>
          <div class="figma-cg-preset-status" id="visualPresetStatus" role="status"></div>
          <div class="figma-cg-preset-list" id="visualPresetList"></div>
        </section>

        <section class="figma-cg-editor-group">
          <h3>Texto</h3>
          <label class="figma-cg-field" id="visualEyebrowField">
            <span id="visualEyebrowLabel">Referencia</span>
            <input id="visualEyebrow" type="text" maxlength="40" />
          </label>
          <label class="figma-cg-field">
            <span id="visualTitleLabel">Nombre</span>
            <input id="visualTitle" type="text" maxlength="240" />
          </label>
          <label class="figma-cg-field" id="visualSubtitleField">
            <span id="visualSubtitleLabel">Cargo</span>
            <input id="visualSubtitle" type="text" maxlength="120" />
          </label>
        </section>

        <details class="figma-cg-editor-group figma-cg-qr-settings" id="visualQrSettings">
          <summary>QR opcional</summary>
          <div class="figma-cg-details-body">
            <label class="figma-cg-switch-row">
              <span><strong>Mostrar QR</strong><small>Activa o retira el módulo completo.</small></span>
              <input id="visualShowQr" type="checkbox" />
            </label>
            <label class="figma-cg-field">
              <span>Texto o URL</span>
              <textarea id="visualQrValue" rows="3" placeholder="https://..."></textarea>
            </label>
            <div class="figma-cg-action-row">
              <button class="figma-cg-button" id="visualQrCreate" type="button">Crear QR</button>
              <label class="figma-cg-button figma-cg-upload-button">
                Cargar QR
                <input id="visualQrUpload" type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" hidden />
              </label>
            </div>
            <label class="figma-cg-field">
              <span>Texto secundario</span>
              <input id="visualQrLabel" type="text" maxlength="30" value="Para más info" />
            </label>
            <button class="figma-cg-text-button" id="visualQrClear" type="button">Volver al QR de Figma</button>
          </div>
        </details>

        <details class="figma-cg-editor-group" open>
          <summary>Apariencia</summary>
          <div class="figma-cg-details-body">
            <div class="figma-cg-color-grid">
              <label class="figma-cg-color-field"><span>Fondo</span><input id="visualBackgroundColor" type="color" data-style="backgroundColor" /></label>
              <label class="figma-cg-color-field"><span>Acento</span><input id="visualAccentColor" type="color" data-style="accentColor" /></label>
              <label class="figma-cg-color-field"><span>Texto</span><input id="visualPrimaryColor" type="color" data-style="primaryColor" /></label>
              <label class="figma-cg-color-field"><span>Secundario</span><input id="visualSecondaryColor" type="color" data-style="secondaryColor" /></label>
              <label class="figma-cg-color-field"><span>Borde</span><input id="visualBorderColor" type="color" data-style="borderColor" /></label>
            </div>
            <label class="figma-cg-range-field"><span>Opacidad del fondo <output id="visualBackgroundOpacityValue"></output></span><input id="visualBackgroundOpacity" type="range" min="0" max="100" step="1" data-style="backgroundOpacity" /></label>
          </div>
        </details>

        <details class="figma-cg-editor-group">
          <summary>Tipografía y alineación</summary>
          <div class="figma-cg-details-body">
            <div class="figma-cg-two-columns">
              <label class="figma-cg-field"><span>Fuente principal</span><select id="visualTitleFont" data-style="titleFont"><option>Instrument Sans</option><option>Outfit</option><option>Arial</option><option>Georgia</option><option>Times New Roman</option></select></label>
              <label class="figma-cg-field"><span>Fuente secundaria</span><select id="visualMetadataFont" data-style="metadataFont"><option>Outfit</option><option>Instrument Sans</option><option>Arial</option><option>Georgia</option><option>Times New Roman</option></select></label>
              <label class="figma-cg-field"><span>Peso principal</span><select id="visualTitleWeight" data-style="titleWeight"><option value="400">400</option><option value="500">500</option><option value="600">600</option><option value="700">700</option><option value="800">800</option></select></label>
              <label class="figma-cg-field"><span>Peso secundario</span><select id="visualMetadataWeight" data-style="metadataWeight"><option value="400">400</option><option value="500">500</option><option value="600">600</option><option value="700">700</option><option value="800">800</option></select></label>
            </div>
            <label class="figma-cg-range-field"><span>Tamaño principal <output id="visualTitleSizeValue"></output></span><input id="visualTitleSize" type="range" min="60" max="180" step="5" data-style="titleSize" /></label>
            <label class="figma-cg-range-field"><span>Tamaño secundario <output id="visualMetadataSizeValue"></output></span><input id="visualMetadataSize" type="range" min="60" max="180" step="5" data-style="metadataSize" /></label>
            <label class="figma-cg-field"><span>Alineación</span><select id="visualAlignment" data-style="alignment"><option value="left">Izquierda</option><option value="center">Centro</option><option value="right">Derecha</option></select></label>
          </div>
        </details>

        <details class="figma-cg-editor-group">
          <summary>Elementos visibles</summary>
          <div class="figma-cg-details-body">
            <label class="figma-cg-switch-row" id="visualLiveRow"><span><strong>Indicador EN VIVO</strong></span><input id="visualShowLive" type="checkbox" data-style="showLive" /></label>
            <label class="figma-cg-switch-row"><span><strong>Acento gráfico</strong></span><input id="visualShowAccent" type="checkbox" data-style="showAccent" /></label>
            <label class="figma-cg-switch-row"><span><strong>Borde</strong></span><input id="visualShowBorder" type="checkbox" data-style="showBorder" /></label>
            <label class="figma-cg-switch-row" id="visualSecondaryRow"><span><strong>Texto secundario</strong></span><input id="visualShowSecondary" type="checkbox" data-style="showSecondary" /></label>
            <label class="figma-cg-switch-row" id="visualKickerRow"><span><strong>Referencia o categoría</strong></span><input id="visualShowKicker" type="checkbox" data-style="showKicker" /></label>
            <label class="figma-cg-switch-row" id="visualQrCopyRow"><span><strong>Texto junto al QR</strong></span><input id="visualShowQrCopy" type="checkbox" data-style="showQrCopy" /></label>
            <button class="figma-cg-text-button" id="visualResetStyle" type="button">Restablecer este diseño</button>
          </div>
        </details>

        <section class="figma-cg-editor-group figma-cg-motion-card">
          <div>
            <h3>Animación Figma</h3>
            <p>Entrada original · 1.5 s · una sola vez</p>
          </div>
          <button class="figma-cg-button" id="visualReplay" type="button">Reproducir</button>
        </section>

        <footer class="figma-cg-editor-footer">
          <a href="/overlay/visual-cg" target="_blank" rel="noopener">Abrir output visual</a>
          <div class="figma-cg-program-status" id="visualProgramStatus">PROGRAM sin actualizar</div>
          <button class="figma-cg-take" id="visualTake" type="button">TAKE · PREVIEW → PROGRAM</button>
        </footer>
      </aside>
    </div>
  `;

  const elements = {
    preview: document.getElementById("visualPreview"),
    gallery: document.getElementById("visualGallery"),
    designChip: document.getElementById("visualDesignChip"),
    presetName: document.getElementById("visualPresetName"),
    presetSave: document.getElementById("visualPresetSave"),
    presetStatus: document.getElementById("visualPresetStatus"),
    presetCount: document.getElementById("visualPresetCount"),
    presetList: document.getElementById("visualPresetList"),
    eyebrowField: document.getElementById("visualEyebrowField"),
    eyebrowLabel: document.getElementById("visualEyebrowLabel"),
    eyebrow: document.getElementById("visualEyebrow"),
    titleLabel: document.getElementById("visualTitleLabel"),
    title: document.getElementById("visualTitle"),
    subtitleField: document.getElementById("visualSubtitleField"),
    subtitleLabel: document.getElementById("visualSubtitleLabel"),
    subtitle: document.getElementById("visualSubtitle"),
    qrSettings: document.getElementById("visualQrSettings"),
    showQr: document.getElementById("visualShowQr"),
    qrValue: document.getElementById("visualQrValue"),
    qrCreate: document.getElementById("visualQrCreate"),
    qrUpload: document.getElementById("visualQrUpload"),
    qrLabel: document.getElementById("visualQrLabel"),
    qrClear: document.getElementById("visualQrClear"),
    backgroundOpacityValue: document.getElementById("visualBackgroundOpacityValue"),
    titleSizeValue: document.getElementById("visualTitleSizeValue"),
    metadataSizeValue: document.getElementById("visualMetadataSizeValue"),
    liveRow: document.getElementById("visualLiveRow"),
    secondaryRow: document.getElementById("visualSecondaryRow"),
    kickerRow: document.getElementById("visualKickerRow"),
    qrCopyRow: document.getElementById("visualQrCopyRow"),
    resetStyle: document.getElementById("visualResetStyle"),
    replay: document.getElementById("visualReplay"),
    take: document.getElementById("visualTake"),
    status: document.getElementById("visualProgramStatus")
  };

  function currentDesign() {
    return DESIGNS.find((design) => design.id === state.designId) || DESIGNS[0];
  }

  function currentStyle() {
    return state.styles[state.designId];
  }

  function sceneFor(design) {
    const item = design || currentDesign();
    return {
      kind: "visual-intent",
      schemaVersion: 6,
      profile: { family: item.id },
      document: { ...state.documents[item.type] },
      assets: {
        qr: state.qr,
        qrLabel: state.qrLabel
      },
      animation: { duration: 1500, loop: false },
      style: { ...state.styles[item.id] }
    };
  }

  function setPresetStatus(message, isError) {
    elements.presetStatus.textContent = message;
    elements.presetStatus.dataset.error = isError ? "true" : "false";
  }

  function persistPresets(nextPresets) {
    try {
      window.localStorage.setItem(PRESET_STORAGE_KEY, JSON.stringify(nextPresets));
      state.presets = nextPresets;
      return true;
    } catch (_error) {
      setPresetStatus("No se pudo guardar. El almacenamiento local está lleno.", true);
      return false;
    }
  }

  function presetSnapshot(name, id) {
    const design = currentDesign();
    return {
      id: id || (window.crypto && typeof window.crypto.randomUUID === "function" ? window.crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`),
      name,
      designId: design.id,
      document: { ...state.documents[design.type] },
      style: { ...currentStyle() },
      assets: { qr: state.qr, qrLabel: state.qrLabel },
      updatedAt: new Date().toISOString()
    };
  }

  function renderPresets() {
    elements.presetCount.textContent = String(state.presets.length);
    elements.presetList.replaceChildren();

    if (!state.presets.length) {
      const empty = document.createElement("span");
      empty.className = "figma-cg-preset-empty";
      empty.textContent = "Todavía no hay presets guardados.";
      elements.presetList.appendChild(empty);
      return;
    }

    state.presets.forEach((preset) => {
      const design = DESIGNS.find((item) => item.id === preset.designId);
      const row = document.createElement("div");
      row.className = "figma-cg-preset-row";

      const applyButton = document.createElement("button");
      applyButton.type = "button";
      applyButton.className = "figma-cg-preset-apply";
      const title = document.createElement("strong");
      title.textContent = preset.name;
      const detail = document.createElement("small");
      detail.textContent = design ? design.name : "Diseño no disponible";
      applyButton.append(title, detail);
      applyButton.addEventListener("click", () => applyPreset(preset.id));

      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.className = "figma-cg-preset-delete";
      deleteButton.setAttribute("aria-label", `Eliminar preset ${preset.name}`);
      deleteButton.textContent = "×";
      deleteButton.addEventListener("click", () => deletePreset(preset.id));

      row.append(applyButton, deleteButton);
      elements.presetList.appendChild(row);
    });
  }

  function savePreset() {
    const name = elements.presetName.value.trim();
    if (!name) {
      setPresetStatus("Escribe un nombre para el preset.", true);
      elements.presetName.focus();
      return;
    }

    const existing = state.presets.find((preset) => preset.name.localeCompare(name, undefined, { sensitivity: "accent" }) === 0);
    if (!existing && state.presets.length >= MAX_PRESETS) {
      setPresetStatus(`Máximo ${MAX_PRESETS} presets. Elimina uno para continuar.`, true);
      return;
    }

    const snapshot = presetSnapshot(name, existing && existing.id);
    const next = existing
      ? state.presets.map((preset) => preset.id === existing.id ? snapshot : preset)
      : [snapshot, ...state.presets];
    if (!persistPresets(next)) return;

    elements.presetName.value = "";
    setPresetStatus(existing ? `Preset “${name}” actualizado.` : `Preset “${name}” guardado.`, false);
    renderPresets();
  }

  function applyPreset(id) {
    const preset = state.presets.find((item) => item.id === id);
    const design = preset && DESIGNS.find((item) => item.id === preset.designId);
    if (!preset || !design) {
      setPresetStatus("Este preset usa un diseño que ya no está disponible.", true);
      return;
    }

    state.designId = design.id;
    state.documents[design.type] = { ...renderer.defaults[design.type], ...(preset.document || {}) };
    state.styles[design.id] = { ...renderer.defaultStyle(design.id), ...(preset.style || {}) };
    state.qr = preset.assets && typeof preset.assets.qr === "string" ? preset.assets.qr : "";
    state.qrLabel = preset.assets && typeof preset.assets.qrLabel === "string" ? preset.assets.qrLabel : "Para más info";
    syncEditor();
    renderPreview();
    renderGallery();
    setPresetStatus(`Preset “${preset.name}” aplicado.`, false);
  }

  function deletePreset(id) {
    const preset = state.presets.find((item) => item.id === id);
    if (!preset || !window.confirm(`¿Eliminar el preset “${preset.name}”?`)) return;
    const next = state.presets.filter((item) => item.id !== id);
    if (!persistPresets(next)) return;
    setPresetStatus(`Preset “${preset.name}” eliminado.`, false);
    renderPresets();
  }

  function destroyHandles() {
    if (state.previewHandle) state.previewHandle.destroy();
    state.previewHandle = null;
    state.galleryHandles.forEach((handle) => handle && handle.destroy());
    state.galleryHandles = [];
  }

  function renderPreview() {
    if (state.previewHandle) state.previewHandle.destroy();
    state.previewHandle = renderer.render(elements.preview, sceneFor(), { view: "frame" });
  }

  function renderGallery() {
    state.galleryHandles.forEach((handle) => handle && handle.destroy());
    state.galleryHandles = [];
    elements.gallery.replaceChildren();

    DESIGNS.forEach((design) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "figma-cg-design-card";
      button.dataset.design = design.id;
      button.setAttribute("aria-pressed", design.id === state.designId ? "true" : "false");

      const preview = document.createElement("span");
      preview.className = "figma-cg-card-preview";
      const meta = document.createElement("span");
      meta.className = "figma-cg-card-meta";
      const name = document.createElement("strong");
      name.textContent = design.name;
      const type = document.createElement("span");
      type.textContent = design.type.toUpperCase();
      meta.append(name, type);
      button.append(preview, meta);
      button.addEventListener("click", () => selectDesign(design.id));
      elements.gallery.appendChild(button);
      state.galleryHandles.push(renderer.render(preview, sceneFor(design), { view: "composition" }));
    });
  }

  function syncEditor() {
    const design = currentDesign();
    const labels = LABELS[design.type];
    const documentState = state.documents[design.type];
    const style = currentStyle();
    elements.designChip.textContent = design.name;

    elements.eyebrowField.hidden = !labels.eyebrow;
    elements.eyebrowLabel.textContent = labels.eyebrow || "Referencia";
    elements.eyebrow.placeholder = labels.eyebrow || "";
    elements.eyebrow.value = documentState.date || "";

    elements.titleLabel.textContent = labels.title;
    elements.title.placeholder = labels.titleHint;
    elements.title.value = documentState.title || "";

    elements.subtitleField.hidden = !labels.subtitle;
    elements.subtitleLabel.textContent = labels.subtitle || "Texto secundario";
    elements.subtitle.placeholder = labels.subtitleHint;
    elements.subtitle.value = documentState.subtitle || "";

    elements.qrSettings.hidden = !(design.type === "verse" || design.type === "announcement");
    elements.showQr.checked = style.showQr;
    elements.qrLabel.value = state.qrLabel;
    elements.liveRow.hidden = !(design.type === "speaker" || design.type === "welcome");
    elements.secondaryRow.hidden = !labels.subtitle;
    elements.kickerRow.hidden = !labels.eyebrow;
    elements.qrCopyRow.hidden = !(design.type === "verse" || design.type === "announcement");

    root.querySelectorAll("[data-style]").forEach(control => {
      const key = control.dataset.style;
      if (!Object.prototype.hasOwnProperty.call(style, key)) return;
      if (control.type === "checkbox") control.checked = Boolean(style[key]);
      else control.value = String(style[key]);
    });
    elements.backgroundOpacityValue.textContent = `${style.backgroundOpacity}%`;
    elements.titleSizeValue.textContent = `${style.titleSize}%`;
    elements.metadataSizeValue.textContent = `${style.metadataSize}%`;
  }

  function selectDesign(id) {
    if (!DESIGNS.some((design) => design.id === id)) return;
    state.designId = id;
    syncEditor();
    renderPreview();
    renderGallery();
  }

  function updateDocument(key, value) {
    const design = currentDesign();
    state.documents[design.type][key] = value;
    renderPreview();
    renderGallery();
  }

  function updateStyle(key, rawValue, control) {
    const numericKeys = new Set(["backgroundOpacity", "titleSize", "metadataSize", "titleWeight", "metadataWeight"]);
    const value = control && control.type === "checkbox" ? control.checked : numericKeys.has(key) ? Number(rawValue) : rawValue;
    currentStyle()[key] = value;
    syncEditor();
    renderPreview();
    renderGallery();
  }

  function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : "");
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function createQr() {
    const value = elements.qrValue.value.trim();
    if (!value || typeof window.qrcode !== "function") return;
    const qr = window.qrcode(0, "M");
    qr.addData(value);
    qr.make();
    state.qr = qr.createDataURL(6, 2);
    currentStyle().showQr = true;
    syncEditor();
    renderPreview();
    renderGallery();
  }

  async function takeToProgram() {
    const scene = sceneFor();
    scene.playbackId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    if (!scene.document.title.trim()) {
      elements.status.textContent = "Completa el texto principal";
      return;
    }

    elements.take.disabled = true;
    elements.status.textContent = "Enviando a PROGRAM…";
    try {
      const response = await fetch("/api/visual-cg/take", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(scene)
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      elements.status.textContent = `PROGRAM · ${currentDesign().name}`;
    } catch (error) {
      elements.status.textContent = `Error al enviar: ${error.message}`;
    } finally {
      elements.take.disabled = false;
    }
  }

  elements.eyebrow.addEventListener("input", () => updateDocument("date", elements.eyebrow.value));
  elements.title.addEventListener("input", () => updateDocument("title", elements.title.value));
  elements.subtitle.addEventListener("input", () => updateDocument("subtitle", elements.subtitle.value));
  elements.qrLabel.addEventListener("input", () => {
    state.qrLabel = elements.qrLabel.value;
    renderPreview();
    renderGallery();
  });
  elements.showQr.addEventListener("change", () => updateStyle("showQr", elements.showQr.checked, elements.showQr));
  root.querySelectorAll("[data-style]").forEach(control => {
    control.addEventListener(control.type === "range" || control.type === "color" ? "input" : "change", () => updateStyle(control.dataset.style, control.value, control));
  });
  elements.resetStyle.addEventListener("click", () => {
    state.styles[state.designId] = renderer.defaultStyle(state.designId);
    syncEditor();
    renderPreview();
    renderGallery();
  });
  elements.qrCreate.addEventListener("click", createQr);
  elements.qrUpload.addEventListener("change", async () => {
    const [file] = Array.from(elements.qrUpload.files || []);
    if (!file) return;
    state.qr = await fileToDataUrl(file);
    currentStyle().showQr = true;
    syncEditor();
    renderPreview();
    renderGallery();
  });
  elements.qrClear.addEventListener("click", () => {
    state.qr = "";
    elements.qrValue.value = "";
    renderPreview();
    renderGallery();
  });
  elements.replay.addEventListener("click", renderPreview);
  elements.take.addEventListener("click", takeToProgram);
  elements.presetSave.addEventListener("click", savePreset);
  elements.presetName.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    savePreset();
  });

  window.addEventListener("beforeunload", destroyHandles, { once: true });
  syncEditor();
  renderPresets();
  renderPreview();
  renderGallery();
})();
