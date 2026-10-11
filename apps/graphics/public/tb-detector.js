// BMMS TB Tool — lógica pura de detección (sin DOM ni Web Audio) para poder probarla en Node.

export const TB_COLORS = Object.freeze(["#ff3b30", "#0a84ff", "#30d158", "#ffd60a", "#bf5af2", "#ff9f0a", "#64d2ff", "#ff375f"]);
export const MIN_DB = -100;

export function defaultChannel(index = 0) {
  return {
    id: `ch-${Date.now().toString(36)}-${index}`,
    name: `Canal ${index + 1}`,
    color: TB_COLORS[index % TB_COLORS.length],
    enabled: true,
    deviceId: "default",
    channelIndex: 0,
    thresholdDb: -42,
    attackMs: 60,
    holdMs: 900,
    transcribe: true,
    detection: "voice",
    voiceSensitivity: 0.5
  };
}

export function defaultSettings() {
  return {
    schemaVersion: 1,
    channels: [defaultChannel(0)],
    alert: { thickness: 48, opacity: 0.85, pulse: true, flash: false, edge: "top", showText: false, small: true, band: "keywords" },
    keywords: ["atención", "urgente"],
    transcription: { enabled: true, language: "es-US", fontSize: 28, engine: "local", model: "auto" }
  };
}

const clamp = (value, min, max, fallback) => {
  const number = Number(value);
  return Number.isFinite(number) ? Math.min(max, Math.max(min, number)) : fallback;
};
const isColor = value => typeof value === "string" && /^#[0-9a-f]{6}$/i.test(value);

export function normalizeSettings(input = {}) {
  const base = defaultSettings();
  const channels = Array.isArray(input.channels) && input.channels.length ? input.channels.slice(0, 8) : base.channels;
  return {
    schemaVersion: 1,
    channels: channels.map((channel, index) => {
      const fallback = defaultChannel(index);
      return {
        id: typeof channel?.id === "string" && channel.id ? channel.id.slice(0, 64) : fallback.id,
        name: typeof channel?.name === "string" && channel.name.trim() ? channel.name.trim().slice(0, 40) : fallback.name,
        color: isColor(channel?.color) ? channel.color : fallback.color,
        enabled: channel?.enabled !== false,
        deviceId: typeof channel?.deviceId === "string" && channel.deviceId ? channel.deviceId.slice(0, 256) : "default",
        deviceLabel: typeof channel?.deviceLabel === "string" ? channel.deviceLabel.slice(0, 200) : "",
        channelIndex: Math.round(clamp(channel?.channelIndex, 0, 31, 0)),
        thresholdDb: clamp(channel?.thresholdDb, -90, 0, fallback.thresholdDb),
        attackMs: Math.round(clamp(channel?.attackMs, 0, 2000, fallback.attackMs)),
        holdMs: Math.round(clamp(channel?.holdMs, 0, 10000, fallback.holdMs)),
        transcribe: channel?.transcribe !== false,
        detection: channel?.detection === "level" ? "level" : "voice",
        voiceSensitivity: clamp(channel?.voiceSensitivity, 0, 1, fallback.voiceSensitivity)
      };
    }),
    alert: {
      thickness: Math.round(clamp(input.alert?.thickness, 4, 400, base.alert.thickness)),
      opacity: clamp(input.alert?.opacity, 0.1, 1, base.alert.opacity),
      pulse: input.alert?.pulse !== false,
      flash: input.alert?.flash === true,
      showText: input.alert?.showText === true,
      small: input.alert?.small !== false,
      band: input.alert?.band === "voice" ? "voice" : "keywords",
      edge: input.alert?.edge === "all" ? "all" : "top"
    },
    keywords: Array.isArray(input.keywords)
      ? [...new Set(input.keywords.map(word => String(word || "").replace(/\s+/g, " ").trim().slice(0, 40)).filter(Boolean))].slice(0, 50)
      : base.keywords,
    transcription: {
      enabled: input.transcription?.enabled !== false,
      language: typeof input.transcription?.language === "string" && /^[a-z]{2}(-[A-Z0-9]{2,3})?$/.test(input.transcription.language) ? input.transcription.language : base.transcription.language,
      fontSize: Math.round(clamp(input.transcription?.fontSize, 14, 72, base.transcription.fontSize)),
      engine: input.transcription?.engine === "browser" ? "browser" : "local",
      model: ["small", "base"].includes(input.transcription?.model) ? input.transcription.model : "auto"
    }
  };
}

// Nivel RMS en dBFS de un bloque de muestras.
export function rmsDb(samples) {
  if (!samples?.length) return MIN_DB;
  let sum = 0;
  for (let index = 0; index < samples.length; index++) sum += samples[index] * samples[index];
  const rms = Math.sqrt(sum / samples.length);
  return rms > 0 ? Math.max(MIN_DB, 20 * Math.log10(rms)) : MIN_DB;
}

// Detector con ataque y retención: evita que un golpe corto dispare la alerta
// y que la alerta parpadee entre palabras.
export function createDetector() {
  let active = false;
  let aboveSince = null;
  let lastAbove = null;
  return {
    get active() { return active; },
    update(levelDb, now, config) {
      return this.step(levelDb >= config.thresholdDb, now, config);
    },
    // Paso genérico: "above" puede ser nivel sobre el umbral o voz detectada.
    step(above, now, { attackMs, holdMs }) {
      if (above) {
        lastAbove = now;
        if (aboveSince === null) aboveSince = now;
        if (!active && now - aboveSince >= attackMs) active = true;
      } else {
        aboveSince = null;
        if (active && (lastAbove === null || now - lastAbove >= holdMs)) active = false;
      }
      return active;
    },
    // La compuerta de audio hacia la transcripción se abre sin esperar el ataque
    // para no cortar la primera sílaba.
    gateOpen(now, holdMs) {
      return lastAbove !== null && now - lastAbove < Math.max(holdMs, 300);
    },
    reset() { active = false; aboveSince = null; lastAbove = null; }
  };
}

// Calibración: con el ruido del lugar, recomienda un umbral por encima del ruido habitual.
export function recommendThreshold(samplesDb, marginDb = 10) {
  const values = samplesDb.filter(Number.isFinite).sort((a, b) => a - b);
  if (!values.length) return { floorDb: MIN_DB, thresholdDb: -42 };
  const floorDb = values[Math.min(values.length - 1, Math.floor(values.length * 0.9))];
  return { floorDb: Math.round(floorDb), thresholdDb: Math.round(Math.min(-6, Math.max(-80, floorDb + marginDb))) };
}

// Asigna una frase transcrita al canal que más tiempo estuvo activo mientras se dijo.
export function dominantChannel(activityMs) {
  let best = null;
  for (const [id, ms] of Object.entries(activityMs || {})) if (ms > 0 && (!best || ms > best.ms)) best = { id, ms };
  return best?.id || null;
}

// Detección de voz: probabilidad del modelo (0–1) con histéresis para que la alerta
// no parpadee. Más sensibilidad = umbral de probabilidad más bajo.
export function voiceThreshold(sensitivity) {
  return Math.round((0.9 - 0.6 * clamp(sensitivity, 0, 1, 0.5)) * 100) / 100;
}

export function isVoice(probability, wasVoice, sensitivity) {
  const start = voiceThreshold(sensitivity);
  return probability >= (wasVoice ? Math.max(0.1, start - 0.15) : start);
}

/* ---------- Transcripción sin internet (Whisper) ---------- */

// Idioma de Whisper según el idioma elegido en la página.
export function whisperLanguage(language) {
  return String(language || "").toLowerCase().startsWith("en") ? "english" : "spanish";
}

// Modelo según la elección y el equipo: "auto" usa small con WebGPU y base sin GPU.
export function whisperModel(choice, hasWebGpu) {
  if (choice === "small" || choice === "base") return `whisper-${choice}`;
  return hasWebGpu ? "whisper-small" : "whisper-base";
}

// Corta el audio de un canal (bloques de 16 kHz) en frases: empieza con voz (con ~300 ms
// previos para no cortar la primera sílaba) y termina tras el silencio de retención o a los 15 s.
export function createSegmenter({ sampleRate = 16000, preRollMs = 300, tailMs = 300, maxMs = 15000, minVoiceMs = 400 } = {}) {
  let preRoll = [];
  let frames = null;
  let voicedMs = 0;
  let silentMs = 0;
  let totalMs = 0;
  let lastVoicedEnd = 0; // cantidad de bloques hasta el último con voz
  const duration = frame => (frame.length / sampleRate) * 1000;

  function finish() {
    const collected = frames;
    const voiced = voicedMs;
    let keep = lastVoicedEnd;
    let extraMs = 0;
    while (keep < collected.length && extraMs < tailMs) extraMs += duration(collected[keep++]);
    frames = null; voicedMs = 0; silentMs = 0; totalMs = 0; lastVoicedEnd = 0;
    if (voiced < minVoiceMs) return null;
    const kept = collected.slice(0, keep);
    const audio = new Float32Array(kept.reduce((sum, frame) => sum + frame.length, 0));
    let offset = 0;
    for (const frame of kept) { audio.set(frame, offset); offset += frame.length; }
    return audio;
  }

  return {
    get recording() { return frames !== null; },
    get voicedMs() { return voicedMs; },
    // Copia del audio acumulado de la frase en curso (para transcripción parcial mientras se habla).
    snapshot() {
      if (!frames) return null;
      const audio = new Float32Array(frames.reduce((sum, frame) => sum + frame.length, 0));
      let offset = 0;
      for (const frame of frames) { audio.set(frame, offset); offset += frame.length; }
      return audio;
    },
    // Devuelve una frase completa (Float32Array) o null.
    push(frame, voiced, holdMs = 900) {
      const ms = duration(frame);
      if (!frames) {
        if (!voiced) {
          preRoll.push(frame);
          let rollMs = preRoll.reduce((sum, item) => sum + duration(item), 0);
          while (preRoll.length && rollMs > preRollMs) rollMs -= duration(preRoll.shift());
          return null;
        }
        frames = preRoll;
        preRoll = [];
        totalMs = frames.reduce((sum, item) => sum + duration(item), 0);
      }
      frames.push(frame);
      totalMs += ms;
      if (voiced) { voicedMs += ms; silentMs = 0; lastVoicedEnd = frames.length; } else silentMs += ms;
      if (silentMs >= Math.max(300, holdMs) || totalMs >= maxMs) return finish();
      return null;
    },
    flush() { return frames ? finish() : null; },
    reset() { preRoll = []; frames = null; voicedMs = 0; silentMs = 0; totalMs = 0; lastVoicedEnd = 0; }
  };
}

// Frases que Whisper "inventa" con silencio o ruido.
const HALLUCINATIONS = [
  /amara\.org/i,
  /subt[ií]tul(os|ado) (realizad|hech|por)/i,
  /gracias por (ver|mirar|su atenci[oó]n)/i,
  /suscr[ií]b(e|ete|anse)/i,
  /dale (like|me gusta)/i,
  /^(thank you|thanks) for watching/i,
  /^(m[uú]sica|music|aplausos|applause|risas|silencio)$/i
];

export function cleanTranscript(text) {
  let clean = String(text || "")
    .replace(/\[[^\]]*\]|\([^)]*\)|[♪♫*]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const bare = clean.replace(/[^\p{L}\p{N}\s]/gu, "").trim();
  if (!bare) return "";
  if (HALLUCINATIONS.some(pattern => pattern.test(bare) || pattern.test(clean))) return "";
  const words = bare.toLowerCase().split(/\s+/);
  if (words.length >= 3 && new Set(words).size === 1) return ""; // "sí sí sí sí"
  // Bucles: la misma frase repetida muchas veces se deja una vez.
  clean = clean.replace(/(\b.{3,40}?[.,!?]?)(\s+\1){2,}/giu, "$1");
  return clean;
}

/* ---------- Palabras clave ---------- */

// Sin tildes, sin mayúsculas y sin signos: "¡Atención, Cámara 2!" → "atencion camara 2".
// Los números escritos en palabras cuentan igual que en cifras ("cámara dos" = "Cámara 2").
const NUMBER_WORDS = Object.freeze({ cero: "0", uno: "1", una: "1", dos: "2", tres: "3", cuatro: "4", cinco: "5", seis: "6", siete: "7", ocho: "8", nueve: "9", diez: "10", once: "11", doce: "12", trece: "13", catorce: "14", quince: "15", dieciseis: "16", diecisiete: "17", dieciocho: "18", diecinueve: "19", veinte: "20" });

export function normalizeForMatch(text) {
  return String(text || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9ñ]+/g, " ").trim()
    .split(" ").map(word => NUMBER_WORDS[word] || word).join(" ");
}

// Devuelve la primera palabra clave que aparece completa en el texto (o null).
export function matchKeyword(text, keywords = []) {
  const haystack = ` ${normalizeForMatch(text)} `;
  if (haystack.trim() === "") return null;
  for (const keyword of keywords) {
    const needle = normalizeForMatch(keyword);
    if (needle && haystack.includes(` ${needle} `)) return keyword;
  }
  return null;
}

// Nivel de la alerta a pantalla completa: "band" (franja grande), "small" (pastilla) o "none".
// La franja sale solo con palabra clave, salvo que se elija "Siempre que alguien habla".
export function alertLevel(alert, activeCount, keywordHit) {
  if (keywordHit) return "band";
  if (!activeCount) return "none";
  if (alert?.band === "voice") return "band";
  return alert?.small ? "small" : "none";
}
