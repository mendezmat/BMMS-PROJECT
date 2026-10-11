// BMMS TB Tool — API del servidor (ajustes y sesiones guardadas).
// La usan el servidor de BMMS Graphics y el servidor interno de BMMS Central.
// Los datos del usuario viven en dataDir, nunca dentro de la carpeta de la app.
import fs from "node:fs/promises";
import path from "node:path";
import { normalizeSettings as normalizeTbSettings } from "./public/tb-detector.js";

export const TB_SESSION_ID = /^[a-z0-9][a-z0-9_-]{0,80}$/;

function send(response, statusCode, body) {
  response.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
  response.end(JSON.stringify(body));
  return true;
}

async function readJson(request) {
  let raw = "";
  for await (const chunk of request) {
    raw += chunk;
    if (raw.length > 20 * 1024 * 1024) throw new Error("Solicitud demasiado grande.");
  }
  return JSON.parse(raw || "{}");
}

export function createTbApi({ dataDir }) {
  const tbSettingsPath = path.join(dataDir, "tb-tool.json");
  const tbSessionsDir = path.join(dataDir, "tb-sessions");


  // Sesiones guardadas del TB Tool: data/tb-sessions/<id>.json (para abrirlas en BMMS) y <id>.txt (legible).
  function tbSessionSlug(name) {
    return String(name || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
      .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40);
  }

  function tbSessionStamp(date) {
    const pad = value => String(value).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}_${pad(date.getHours())}${pad(date.getMinutes())}`;
  }

  function tbSessionLines(lines) {
    return (Array.isArray(lines) ? lines.slice(-5000) : []).flatMap(line => {
      const at = new Date(line?.at);
      const text = typeof line?.text === "string" ? line.text.replace(/\s+/g, " ").trim().slice(0, 2000) : "";
      if (Number.isNaN(at.getTime()) || !text) return [];
      return [{
        at: at.toISOString(),
        channelId: typeof line.channelId === "string" ? line.channelId.slice(0, 64) : null,
        name: typeof line.name === "string" && line.name.trim() ? line.name.trim().slice(0, 40) : "Talkback",
        color: typeof line.color === "string" && /^#[0-9a-f]{6}$/i.test(line.color) ? line.color : "#888888",
        text
      }];
    });
  }

  const tbSessionFile = (id, extension) => path.join(tbSessionsDir, `${id}.${extension}`);
  const tbSessionExists = filename => fs.access(filename).then(() => true, () => false);

  async function saveTbSession(incoming = {}) {
    const lines = tbSessionLines(incoming.lines);
    if (!lines.length) throw Object.assign(new Error("No hay transcripción para guardar."), { statusCode: 400 });
    const savedAt = new Date();
    const name = typeof incoming.name === "string" && incoming.name.trim()
      ? incoming.name.trim().slice(0, 80)
      : `Servicio ${savedAt.toLocaleDateString("es")}`;
    const base = [tbSessionStamp(savedAt), tbSessionSlug(name)].filter(Boolean).join("_").slice(0, 76);
    let id = base;
    for (let copy = 2; await tbSessionExists(tbSessionFile(id, "json")); copy++) id = `${base}-${copy}`;
    const session = { id, name, savedAt: savedAt.toISOString(), lines };
    const time = value => new Date(value).toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
    const text = [`${name}`, `Guardado: ${savedAt.toLocaleString("es")}`, "", ...lines.map(line => `[${time(line.at)}] ${line.name}: ${line.text}`)].join("\n");
    await fs.mkdir(tbSessionsDir, { recursive: true });
    for (const [extension, content] of [["json", `${JSON.stringify(session, null, 2)}\n`], ["txt", `${text}\n`]]) {
      const filename = tbSessionFile(id, extension);
      await fs.writeFile(`${filename}.tmp`, content, "utf8");
      await fs.rename(`${filename}.tmp`, filename);
    }
    return { id, name, savedAt: session.savedAt, lines: lines.length };
  }

  async function listTbSessions() {
    let entries = [];
    try { entries = await fs.readdir(tbSessionsDir); } catch { return []; }
    const sessions = await Promise.all(entries
      .filter(entry => entry.endsWith(".json") && TB_SESSION_ID.test(entry.slice(0, -5)))
      .map(async entry => {
        try {
          const session = JSON.parse(await fs.readFile(path.join(tbSessionsDir, entry), "utf8"));
          return { id: entry.slice(0, -5), name: session.name || entry.slice(0, -5), savedAt: session.savedAt || null, lines: Array.isArray(session.lines) ? session.lines.length : 0 };
        } catch { return null; }
      }));
    return sessions.filter(Boolean).sort((a, b) => String(b.savedAt).localeCompare(String(a.savedAt)));
  }

  // Ajustes: si el archivo está dañado (corte de luz, disco lleno) se usa la copia anterior (.bak) y el
  // archivo dañado se guarda aparte; nunca se pierden los canales en silencio.
  const backupPath = `${tbSettingsPath}.bak`;
  async function loadTbSettings() {
    let raw;
    try { raw = await fs.readFile(tbSettingsPath, "utf8"); } catch { raw = null; }
    if (raw !== null) {
      try { return normalizeTbSettings(JSON.parse(raw)); } catch {
        await fs.copyFile(tbSettingsPath, `${tbSettingsPath}.danado-${Date.now()}`).catch(() => {});
      }
    }
    try {
      const settings = normalizeTbSettings(JSON.parse(await fs.readFile(backupPath, "utf8")));
      if (raw !== null) await saveTbSettings(settings).catch(() => {});
      return settings;
    } catch {
      return normalizeTbSettings();
    }
  }

  async function saveTbSettings(settings) {
    await fs.mkdir(path.dirname(tbSettingsPath), { recursive: true });
    const temporaryPath = `${tbSettingsPath}.tmp`;
    await fs.writeFile(temporaryPath, `${JSON.stringify(settings, null, 2)}\n`, "utf8");
    // La versión anterior (si era válida) queda como copia de seguridad.
    try { JSON.parse(await fs.readFile(tbSettingsPath, "utf8")); await fs.copyFile(tbSettingsPath, backupPath); } catch { /* sin anterior válido */ }
    await fs.rename(temporaryPath, tbSettingsPath);
  }

  // Registro del servicio: una línea JSON por evento, un archivo por día (para diagnosticar después).
  const logsDir = path.join(dataDir, "logs");
  // Se guardan 30 días de registros; los más viejos se borran solos (nunca llenan el disco).
  let lastCleanup = "";
  async function removeOldLogs(now) {
    const limit = now.getTime() - 30 * 24 * 60 * 60 * 1000;
    for (const name of await fs.readdir(logsDir)) {
      const match = name.match(/^tb-(\d{4})-(\d{2})-(\d{2})\.jsonl$/);
      if (match && new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3])).getTime() < limit) await fs.rm(path.join(logsDir, name), { force: true });
    }
  }

  async function appendLog(entries) {
    if (!Array.isArray(entries) || !entries.length) return 0;
    const now = new Date();
    const day = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    const file = path.join(logsDir, `tb-${day}.jsonl`);
    await fs.mkdir(logsDir, { recursive: true });
    if (lastCleanup !== day) { lastCleanup = day; await removeOldLogs(now).catch(() => {}); }
    try { if ((await fs.stat(file)).size > 25 * 1024 * 1024) return 0; } catch { /* nuevo */ }
    const lines = entries.slice(0, 500).map(entry => JSON.stringify({ ...entry, t: typeof entry?.t === "string" ? entry.t : now.toISOString() }).slice(0, 4000));
    await fs.appendFile(file, `${lines.join("\n")}\n`, "utf8");
    return lines.length;
  }

  // Devuelve true si la ruta era de la API del TB Tool.
  async function handle(request, response, url) {
    if (request.method === "POST" && url.pathname === "/api/tb/log") {
      try {
        const { entries } = await readJson(request);
        return send(response, 200, { ok: true, written: await appendLog(entries) });
      } catch (error) {
        return send(response, 400, { error: error.message });
      }
    }
    if (request.method === "GET" && url.pathname === "/api/tb/settings") {
      return send(response, 200, { settings: await loadTbSettings() });
    }
    if (request.method === "POST" && url.pathname === "/api/tb/settings") {
      try {
        const settings = normalizeTbSettings(await readJson(request));
        await saveTbSettings(settings);
        return send(response, 200, { ok: true, settings });
      } catch (error) {
        return send(response, 400, { error: error.message });
      }
    }
    if (request.method === "GET" && url.pathname === "/api/tb/sessions") {
      return send(response, 200, { sessions: await listTbSessions() });
    }
    if (request.method === "POST" && url.pathname === "/api/tb/sessions") {
      try {
        return send(response, 200, { ok: true, session: await saveTbSession(await readJson(request)) });
      } catch (error) {
        return send(response, error.statusCode || 400, { error: error.message });
      }
    }
    const tbSessionMatch = url.pathname.match(/^\/api\/tb\/sessions\/([^/]+)$/);
    if (tbSessionMatch && (request.method === "GET" || request.method === "DELETE")) {
      let id = "";
      try { id = decodeURIComponent(tbSessionMatch[1]); } catch { /* id inválido */ }
      if (!TB_SESSION_ID.test(id)) return send(response, 400, { error: "Sesión no válida." });
      if (!(await tbSessionExists(tbSessionFile(id, "json")))) return send(response, 404, { error: "La sesión no existe." });
      if (request.method === "DELETE") {
        await fs.unlink(tbSessionFile(id, "json"));
        await fs.unlink(tbSessionFile(id, "txt")).catch(() => {});
        return send(response, 200, { ok: true });
      }
      return send(response, 200, { session: JSON.parse(await fs.readFile(tbSessionFile(id, "json"), "utf8")) });
    }
    return false;
  }

  return { handle, loadSettings: loadTbSettings, saveSettings: saveTbSettings, appendLog };
}
