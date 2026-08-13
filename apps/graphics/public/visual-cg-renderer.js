(function () {
  "use strict";

  const WIDTH = 1920;
  const HEIGHT = 1080;
  const ASSET_ROOT = "/visual-cg-assets";

  const DESIGNS = Object.freeze({
    "thin-glass-speaker": { type: "speaker", surface: "glass", panelNode: "15:136" },
    "thin-glass-verse": { type: "verse", surface: "glass", panelNode: "15:148" },
    "thin-glass-announcement": { type: "announcement", surface: "glass", panelNode: "15:163" },
    "thin-glass-welcome": { type: "welcome", surface: "glass", panelNode: "15:178" },
    "thin-solid-speaker": { type: "speaker", surface: "solid", panelNode: "15:192" },
    "thin-solid-verse": { type: "verse", surface: "solid", panelNode: "15:205" },
    "thin-solid-announcement": { type: "announcement", surface: "solid", panelNode: "15:221" },
    "thin-solid-welcome": { type: "welcome", surface: "solid", panelNode: "15:237" }
  });

  const DEFAULTS = Object.freeze({
    speaker: {
      title: "Pastor Juan Rodríguez",
      subtitle: "Pastor Principal",
      date: "",
      time: "",
      location: ""
    },
    verse: {
      title: "\u201cPorque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito...\u201d",
      subtitle: "",
      date: "JUAN 3:16",
      time: "",
      location: ""
    },
    announcement: {
      title: "Noche de Alabanza",
      subtitle: "Viernes 20 de Agosto · 7:00 PM",
      date: "PRÓXIMO EVENTO",
      time: "",
      location: ""
    },
    welcome: {
      title: "BIENVENIDOS · IGLESIA NUEVA VIDA",
      subtitle: "@iglesianv",
      date: "",
      time: "",
      location: ""
    }
  });

  function clean(value) {
    return typeof value === "string" ? value.trim() : "";
  }

  function field(document, key, fallback) {
    return Object.prototype.hasOwnProperty.call(document, key) ? clean(document[key]) : fallback;
  }

  function clamp(value, min, max, fallback) {
    const number = Number(value);
    return Number.isFinite(number) ? Math.min(max, Math.max(min, number)) : fallback;
  }

  function color(value, fallback) {
    const candidate = clean(value);
    return /^#[0-9a-f]{6}$/i.test(candidate) ? candidate : fallback;
  }

  function flag(source, key, fallback) {
    return Object.prototype.hasOwnProperty.call(source, key) ? source[key] !== false : fallback;
  }

  function defaultStyle(family) {
    const design = DESIGNS[family] || DESIGNS["thin-glass-speaker"];
    const glass = design.surface === "glass";
    const titleWeights = glass
      ? { speaker: 600, verse: 400, announcement: 400, welcome: 500 }
      : { speaker: 700, verse: 400, announcement: 500, welcome: 600 };
    return {
      backgroundColor: glass ? "#ffffff" : "#0f172a",
      backgroundOpacity: glass ? 7 : 100,
      borderColor: glass ? "#ffffff" : "#1e293b",
      accentColor: glass ? "#ffffff" : "#f59e0b",
      primaryColor: "#ffffff",
      secondaryColor: "#94a3b8",
      titleFont: design.type === "welcome" ? "Outfit" : "Instrument Sans",
      metadataFont: design.type === "welcome" ? "Instrument Sans" : "Outfit",
      titleSize: 100,
      metadataSize: 100,
      titleWeight: titleWeights[design.type],
      metadataWeight: design.type === "speaker"
        ? (glass ? 500 : 600)
        : design.type === "welcome"
          ? 500
          : (glass ? 700 : 800),
      alignment: design.type === "welcome" ? "center" : "left",
      showLive: true,
      showAccent: true,
      showSecondary: true,
      showKicker: true,
      showQr: false,
      showQrCopy: true,
      showBorder: true
    };
  }

  function normalize(scene) {
    const input = scene && typeof scene === "object" ? scene : {};
    const requestedFamily = clean(input.profile && input.profile.family);
    const family = DESIGNS[requestedFamily] ? requestedFamily : "thin-glass-speaker";
    const design = DESIGNS[family];
    const defaults = DEFAULTS[design.type];
    const styleDefaults = defaultStyle(family);
    const document = input.document && typeof input.document === "object" ? input.document : {};
    const assets = input.assets && typeof input.assets === "object" ? input.assets : {};
    const style = input.style && typeof input.style === "object" ? input.style : {};
    const allowedFonts = ["Instrument Sans", "Outfit", "Arial", "Georgia", "Times New Roman"];
    const allowedAlignments = ["left", "center", "right"];

    return {
      kind: "visual-intent",
      schemaVersion: 6,
      profile: { family },
      document: {
        title: field(document, "title", defaults.title),
        subtitle: field(document, "subtitle", defaults.subtitle),
        date: field(document, "date", defaults.date),
        time: clean(document.time),
        location: clean(document.location),
        additionalInfo: clean(document.additionalInfo)
      },
      assets: {
        qr: clean(assets.qr),
        qrLabel: clean(assets.qrLabel) || "Para más info"
      },
      animation: {
        duration: 1500,
        loop: false
      },
      style: {
        backgroundColor: color(style.backgroundColor, styleDefaults.backgroundColor),
        backgroundOpacity: clamp(style.backgroundOpacity, 0, 100, styleDefaults.backgroundOpacity),
        borderColor: color(style.borderColor, styleDefaults.borderColor),
        accentColor: color(style.accentColor, styleDefaults.accentColor),
        primaryColor: color(style.primaryColor, styleDefaults.primaryColor),
        secondaryColor: color(style.secondaryColor, styleDefaults.secondaryColor),
        titleFont: allowedFonts.includes(style.titleFont) ? style.titleFont : styleDefaults.titleFont,
        metadataFont: allowedFonts.includes(style.metadataFont) ? style.metadataFont : styleDefaults.metadataFont,
        titleSize: clamp(style.titleSize, 60, 180, styleDefaults.titleSize),
        metadataSize: clamp(style.metadataSize, 60, 180, styleDefaults.metadataSize),
        titleWeight: clamp(style.titleWeight, 400, 800, styleDefaults.titleWeight),
        metadataWeight: clamp(style.metadataWeight, 400, 800, styleDefaults.metadataWeight),
        alignment: allowedAlignments.includes(style.alignment) ? style.alignment : styleDefaults.alignment,
        showLive: flag(style, "showLive", styleDefaults.showLive),
        showAccent: flag(style, "showAccent", styleDefaults.showAccent),
        showSecondary: flag(style, "showSecondary", styleDefaults.showSecondary),
        showKicker: flag(style, "showKicker", styleDefaults.showKicker),
        showQr: flag(style, "showQr", styleDefaults.showQr),
        showQrCopy: flag(style, "showQrCopy", styleDefaults.showQrCopy),
        showBorder: flag(style, "showBorder", styleDefaults.showBorder)
      },
      design
    };
  }

  function create(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }

  function withNodeId(node, nodeId) {
    if (nodeId) node.dataset.figmaNode = nodeId;
    return node;
  }

  function image(className, src, alt) {
    const node = create("img", className);
    node.src = src;
    node.alt = alt || "";
    node.decoding = "async";
    return node;
  }

  function pulseDot() {
    return image("figma-cg-pulse-dot", `${ASSET_ROOT}/pulse-dot.svg`, "");
  }

  function separatorDot() {
    return image("figma-cg-separator-dot", `${ASSET_ROOT}/separator-dot.svg`, "");
  }

  function qrModule(scene, surface) {
    const module = create("div", `figma-cg-qr figma-cg-qr-${surface}`);
    const qrFrame = create("div", "figma-cg-qr-frame");
    const source = scene.assets.qr || `${ASSET_ROOT}/qr-glyph.svg`;
    qrFrame.appendChild(image("figma-cg-qr-image", source, scene.assets.qr ? "Código QR" : ""));

    const copy = create("div", "figma-cg-qr-copy");
    if (scene.style.showQrCopy) {
      copy.appendChild(create("span", "figma-cg-qr-title", "ESCANEA"));
      copy.appendChild(create("span", "figma-cg-qr-label", scene.assets.qrLabel));
    }

    module.appendChild(qrFrame);
    if (scene.style.showQrCopy) module.appendChild(copy);
    return module;
  }

  function eventLine(scene) {
    return [scene.document.title, scene.style.showSecondary ? scene.document.subtitle : ""].filter(Boolean).join(" — ");
  }

  function buildGlass(scene, canvas) {
    const panel = withNodeId(create("div", `figma-cg-panel figma-cg-glass-panel figma-cg-${scene.design.type}`), scene.design.panelNode);

    if (scene.design.type === "speaker") {
      const profile = create("div", "figma-cg-speaker-profile motion-glass-content");
      if (scene.style.showAccent) profile.appendChild(create("span", "figma-cg-accent-line"));
      const text = create("div", "figma-cg-speaker-text");
      text.appendChild(create("span", "figma-cg-speaker-name", scene.document.title));
      if (scene.style.showSecondary && scene.document.subtitle) {
        text.appendChild(create("span", "figma-cg-speaker-bullet", "•"));
        text.appendChild(create("span", "figma-cg-speaker-role", scene.document.subtitle));
      }
      profile.appendChild(text);

      panel.appendChild(profile);
      if (scene.style.showLive) {
        const live = create("div", "figma-cg-live motion-glass-side");
        live.append(pulseDot(), create("span", "figma-cg-live-label", "EN VIVO"));
        panel.appendChild(live);
      }
    }

    if (scene.design.type === "verse" || scene.design.type === "announcement") {
      const content = create("div", "figma-cg-copy-row motion-glass-content");
      if (scene.style.showAccent) content.appendChild(create("span", "figma-cg-accent-line"));
      const copy = create("div", "figma-cg-inline-copy");
      if (scene.style.showKicker && scene.document.date) copy.appendChild(create("span", `figma-cg-kicker figma-cg-kicker-${scene.design.type}`, scene.document.date));
      copy.appendChild(create("span", "figma-cg-main-copy", scene.design.type === "announcement" ? eventLine(scene) : scene.document.title));
      content.appendChild(copy);

      panel.appendChild(content);
      if (scene.style.showQr) {
        const qr = qrModule(scene, "glass");
        qr.classList.add("motion-glass-qr");
        panel.appendChild(qr);
      }
    }

    if (scene.design.type === "welcome") {
      const title = create("div", "figma-cg-welcome-title motion-glass-welcome-center", scene.document.title);
      if (scene.style.showLive) {
        const live = create("div", "figma-cg-live motion-glass-welcome-left");
        live.append(pulseDot(), create("span", "figma-cg-live-label", "EN VIVO"));
        panel.appendChild(live);
      } else panel.appendChild(create("span", "figma-cg-empty-slot"));
      panel.appendChild(title);
      if (scene.style.showSecondary && scene.document.subtitle) panel.appendChild(create("div", "figma-cg-welcome-social motion-glass-welcome-right", scene.document.subtitle));
      else panel.appendChild(create("span", "figma-cg-empty-slot"));
    }

    canvas.appendChild(panel);
  }

  function buildSolid(scene, canvas) {
    const panel = withNodeId(create("div", `figma-cg-panel figma-cg-solid-panel figma-cg-${scene.design.type}`), scene.design.panelNode);
    if (scene.style.showAccent) panel.appendChild(create("span", "figma-cg-solid-accent motion-solid-accent"));

    if (scene.design.type === "speaker") {
      const profile = create("div", "figma-cg-solid-profile motion-solid-content");
      profile.appendChild(create("span", "figma-cg-speaker-name", scene.document.title));
      if (scene.style.showSecondary && scene.document.subtitle) {
        profile.appendChild(separatorDot());
        profile.appendChild(create("span", "figma-cg-speaker-role", scene.document.subtitle));
      }

      panel.appendChild(profile);
      if (scene.style.showLive) {
        const live = create("div", "figma-cg-live-badge motion-solid-side");
        live.append(pulseDot(), create("span", "figma-cg-live-badge-label", "EN VIVO"));
        panel.appendChild(live);
      }
    }

    if (scene.design.type === "verse" || scene.design.type === "announcement") {
      const content = create("div", "figma-cg-solid-copy motion-solid-content");
      if (scene.style.showKicker && scene.document.date) content.appendChild(create("span", `figma-cg-kicker figma-cg-kicker-${scene.design.type}`, scene.document.date));
      content.appendChild(create("span", "figma-cg-main-copy", scene.design.type === "announcement" ? eventLine(scene) : scene.document.title));

      panel.appendChild(content);
      if (scene.style.showQr) {
        const qr = qrModule(scene, "solid");
        qr.classList.add("motion-solid-qr");
        panel.appendChild(qr);
      }
    }

    if (scene.design.type === "welcome") {
      const titleText = scene.document.title.replace(/\s·\s/g, " • ");
      const title = create("div", "figma-cg-welcome-title motion-solid-welcome-center", titleText);
      if (scene.style.showLive) {
        const live = create("div", "figma-cg-live motion-solid-welcome-left");
        live.append(pulseDot(), create("span", "figma-cg-live-label", "EN VIVO"));
        panel.appendChild(live);
      } else panel.appendChild(create("span", "figma-cg-empty-slot"));
      panel.appendChild(title);
      if (scene.style.showSecondary && scene.document.subtitle) panel.appendChild(create("div", "figma-cg-welcome-social motion-solid-welcome-right", scene.document.subtitle));
      else panel.appendChild(create("span", "figma-cg-empty-slot"));
    }

    canvas.appendChild(panel);
  }

  function build(scene) {
    const normalized = normalize(scene);
    const canvas = create("div", "figma-cg-canvas");
    canvas.dataset.family = normalized.profile.family;
    canvas.dataset.surface = normalized.design.surface;
    canvas.dataset.type = normalized.design.type;
    canvas.dataset.motion = "figma-once-1500";
    canvas.dataset.align = normalized.style.alignment;
    canvas.dataset.hasQr = normalized.style.showQr ? "true" : "false";
    canvas.dataset.showBorder = normalized.style.showBorder ? "true" : "false";
    canvas.style.width = `${WIDTH}px`;
    canvas.style.height = `${HEIGHT}px`;
    canvas.style.setProperty("--cg-background", normalized.style.backgroundColor);
    canvas.style.setProperty("--cg-background-opacity", `${normalized.style.backgroundOpacity}%`);
    canvas.style.setProperty("--cg-border", normalized.style.borderColor);
    canvas.style.setProperty("--cg-accent", normalized.style.accentColor);
    canvas.style.setProperty("--cg-primary", normalized.style.primaryColor);
    canvas.style.setProperty("--cg-secondary", normalized.style.secondaryColor);
    canvas.style.setProperty("--cg-title-font", `"${normalized.style.titleFont}"`);
    canvas.style.setProperty("--cg-metadata-font", `"${normalized.style.metadataFont}"`);
    canvas.style.setProperty("--cg-title-scale", normalized.style.titleSize / 100);
    canvas.style.setProperty("--cg-metadata-scale", normalized.style.metadataSize / 100);
    canvas.style.setProperty("--cg-title-weight", normalized.style.titleWeight);
    canvas.style.setProperty("--cg-metadata-weight", normalized.style.metadataWeight);
    canvas.style.setProperty("--cg-text-align", normalized.style.alignment);

    if (normalized.design.surface === "glass") buildGlass(normalized, canvas);
    else buildSolid(normalized, canvas);

    return canvas;
  }

  function boundsFor(sceneOrCanvas) {
    let surface = "glass";
    if (sceneOrCanvas && sceneOrCanvas.dataset) surface = sceneOrCanvas.dataset.surface || surface;
    else surface = normalize(sceneOrCanvas).design.surface;
    return surface === "solid"
      ? { x: 0, y: 1000, width: 1920, height: 80 }
      : { x: 40, y: 940, width: 1840, height: 80 };
  }

  function fit(host, canvas, view) {
    const rect = host.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const bounds = view === "composition" ? boundsFor(canvas) : { x: 0, y: 0, width: WIDTH, height: HEIGHT };
    const scale = Math.min(rect.width / bounds.width, rect.height / bounds.height);
    const left = (rect.width - bounds.width * scale) / 2 - bounds.x * scale;
    const top = (rect.height - bounds.height * scale) / 2 - bounds.y * scale;
    canvas.style.transform = `translate(${left}px, ${top}px) scale(${scale})`;
  }

  function render(host, scene, options) {
    if (!host) return null;
    const settings = options && typeof options === "object" ? options : {};
    const view = settings.view === "composition" ? "composition" : "frame";
    host.replaceChildren();
    host.classList.add("figma-cg-viewport");
    host.dataset.view = view;
    const canvas = build(scene);
    host.appendChild(canvas);

    const resize = () => fit(host, canvas, view);
    resize();
    requestAnimationFrame(resize);

    let observer = null;
    if (typeof ResizeObserver === "function") {
      observer = new ResizeObserver(resize);
      observer.observe(host);
    }

    return {
      canvas,
      resize,
      destroy() {
        if (observer) observer.disconnect();
        if (canvas.parentNode === host) host.removeChild(canvas);
      }
    };
  }

  function clear(host) {
    if (host) host.replaceChildren();
  }

  window.BmmsVisualCgRenderer = Object.freeze({
    width: WIDTH,
    height: HEIGHT,
    families: Object.keys(DESIGNS),
    designs: DESIGNS,
    defaults: DEFAULTS,
    defaultStyle,
    normalize,
    build,
    boundsFor,
    render,
    clear
  });
})();
