(function () {
  "use strict";

  const WIDTH = 1920;
  const HEIGHT = 1080;
  const templates = new Set(["modern", "broadcast", "glass", "compact"]);
  const formats = new Set(["banner", "compact", "left", "right"]);
  const compositionBounds = {
    banner: { x: 96, y: 716, width: 1728, height: 292 },
    compact: { x: 96, y: 770, width: 1320, height: 238 },
    left: { x: 96, y: 96, width: 650, height: 888 },
    right: { x: 1174, y: 96, width: 650, height: 888 }
  };
  const text = value => String(value ?? "").trim();
  const limited = (value, maximum) => text(value).slice(0, maximum);
  const safeUrl = value => {
    const url = text(value);
    return /^(data:image\/(png|jpeg|jpg|webp|gif);base64,|blob:)/i.test(url) ? url : "";
  };

  function normalize(scene = {}) {
    const document = scene.document && typeof scene.document === "object" ? scene.document : {};
    const template = templates.has(scene.template) ? scene.template : "modern";
    const format = formats.has(scene.format) ? scene.format : "banner";
    const titleArt = scene.useOriginalTitle === true ? safeUrl(scene.titleGraphicDataUrl || scene.regionGraphics?.title) : "";
    const qr = scene.showQr === false ? "" : safeUrl(scene.qrGraphicDataUrl || scene.regionGraphics?.qr);
    return {
      template,
      format,
      accent: /^#[0-9a-f]{3,8}$/i.test(scene.palette?.[0] || "") ? scene.palette[0] : "#d59a4a",
      title: limited(document.title, 80) || "Título del evento",
      subtitle: limited(document.subtitle, 100),
      date: limited(document.date, 40),
      time: limited(document.time, 30),
      location: limited(document.location, 90),
      additional: limited(document.additionalInfo, 220),
      titleArt,
      qr
    };
  }

  function element(tag, className, value) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (value) node.textContent = value;
    return node;
  }

  function build(scene) {
    const s = normalize(scene);
    const canvas = element("div", `bmms-cg-canvas template-${s.template} format-${s.format}`);
    canvas.style.setProperty("--accent", s.accent);
    canvas.dataset.titleSize = s.title.length > 55 ? "long" : s.title.length > 34 ? "medium" : "short";
    canvas.dataset.infoSize = s.location.length > 34 ? "long" : "normal";
    canvas.setAttribute("role", "img");
    canvas.setAttribute("aria-label", `Gráfica: ${s.title}`);

    const composition = element("section", "bmms-cg-composition");
    composition.append(element("div", "bmms-cg-accent"));

    const info = element("div", "bmms-cg-info");
    [s.date, s.time, s.location].filter(Boolean).forEach(value => info.append(element("span", "", value)));
    info.hidden = !info.childElementCount;
    composition.append(info);

    const title = element("div", "bmms-cg-title");
    if (s.titleArt) {
      const image = element("img", "bmms-cg-title-art");
      image.src = s.titleArt;
      image.alt = "Arte original del título";
      image.addEventListener("error", () => image.replaceWith(element("h2", "", s.title)), { once: true });
      title.append(image);
    } else {
      title.append(element("h2", "", s.title));
    }
    if (s.subtitle) title.append(element("p", "", s.subtitle));
    if (s.additional) title.append(element("small", "bmms-cg-additional", s.additional));
    composition.append(title);

    if (s.qr) {
      const qrBox = element("div", "bmms-cg-qr");
      const image = element("img");
      image.src = s.qr;
      image.alt = "Código QR";
      image.addEventListener("error", () => qrBox.remove(), { once: true });
      qrBox.append(image);
      composition.append(qrBox);
    }

    canvas.append(composition);
    return canvas;
  }

  function fit(host) {
    const viewport = host?.querySelector(".bmms-cg-viewport");
    const canvas = viewport?.firstElementChild;
    if (!canvas) return;
    const width = Math.max(1, viewport.clientWidth);
    const height = Math.max(1, viewport.clientHeight);
    const mode = host.dataset.bmmsCgView || "frame";
    const format = [...canvas.classList].find(name => name.startsWith("format-"))?.slice(7) || "banner";
    const compactTemplate = canvas.classList.contains("template-compact") && format === "banner";
    const bounds = mode === "composition" ? (compactTemplate ? { x: 120, y: 770, width: 1240, height: 238 } : compositionBounds[format]) : { x: 0, y: 0, width: WIDTH, height: HEIGHT };
    const scale = Math.min(width / bounds.width, height / bounds.height);
    const x = (width - bounds.width * scale) / 2 - bounds.x * scale;
    const y = (height - bounds.height * scale) / 2 - bounds.y * scale;
    canvas.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
  }

  function observe(host) {
    if (host.__bmmsSmartFlyerObserver || typeof ResizeObserver !== "function") return;
    host.__bmmsSmartFlyerObserver = new ResizeObserver(() => fit(host));
    host.__bmmsSmartFlyerObserver.observe(host);
  }

  function render(host, scene, options = {}) {
    if (!host) return;
    host.classList.add("bmms-cg-host");
    host.dataset.bmmsCgView = options.view === "composition" ? "composition" : "frame";
    host.replaceChildren();
    const viewport = element("div", "bmms-cg-viewport");
    viewport.append(build(scene));
    host.append(viewport);
    host.hidden = false;
    observe(host);
    requestAnimationFrame(() => fit(host));
  }

  function clear(host, message = "Sin composición al aire.") {
    if (!host) return;
    host.classList.add("bmms-cg-host");
    host.replaceChildren(element("span", "bmms-cg-empty", message));
  }

  window.BmmsSmartFlyerRenderer = Object.freeze({ WIDTH, HEIGHT, normalize, render, clear, fit });
})();
