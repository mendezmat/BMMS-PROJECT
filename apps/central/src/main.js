// BMMS Central — proceso principal (Electron).
// Hub de aplicaciones: lee el manifiesto firmado, instala/actualiza apps por archivos y las abre.
import { app, BrowserWindow, dialog, ipcMain, session, shell, systemPreferences } from "electron";
import electronUpdater from "electron-updater";
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { startAppHost } from "./app-host.js";
import { currentAppDir, installApp, installAssets, missingAssets, readInstallState, rollbackApp, verifyManifest } from "./updater.js";

const { autoUpdater } = electronUpdater;
if (process.env.BMMS_CENTRAL_USERDATA) app.setPath("userData", process.env.BMMS_CENTRAL_USERDATA); // pruebas
const here = path.dirname(fileURLToPath(import.meta.url));
const CHANNEL_URL = process.env.BMMS_CENTRAL_CHANNEL || "https://raw.githubusercontent.com/mendezmat/BMMS-PROJECT/main/central/channel/stable.json";
const PUBLIC_KEY = fs.readFileSync(path.join(here, "central-public-key.pem"), "utf8");

const root = () => app.getPath("userData");
const dataDir = () => path.join(root(), "data");       // ajustes y sesiones del usuario: nunca se tocan al actualizar
const assetsDir = () => path.join(root(), "assets");   // modelos compartidos (descarga única)
const cachePath = () => path.join(root(), "channel-cache");

let hubWindow = null;
let manifest = null;
let manifestSource = "none";
let manifestError = null;
const busy = new Map(); // appId -> tarea en curso
const hosts = new Map(); // appId -> { dir, host }
const appWindows = new Map(); // appId -> BrowserWindow
let selfUpdate = { status: "idle" };

/* ---------- Manifiesto ---------- */

async function readSigned(dir) {
  const bytes = await fsp.readFile(path.join(dir, "stable.json"));
  const signature = await fsp.readFile(path.join(dir, "stable.json.sig"), "utf8");
  return { bytes, signature, manifest: verifyManifest(bytes, signature, PUBLIC_KEY) };
}

async function loadManifest() {
  manifestError = null;
  try {
    const bust = `?t=${Date.now()}`;
    const [bytes, signature] = await Promise.all([
      fetch(CHANNEL_URL + bust, { cache: "no-store" }).then(async response => { if (!response.ok) throw new Error(`HTTP ${response.status}`); return Buffer.from(await response.arrayBuffer()); }),
      fetch(`${CHANNEL_URL}.sig${bust}`, { cache: "no-store" }).then(async response => { if (!response.ok) throw new Error(`HTTP ${response.status}`); return response.text(); })
    ]);
    manifest = verifyManifest(bytes, signature, PUBLIC_KEY);
    manifestSource = "online";
    await fsp.mkdir(cachePath(), { recursive: true });
    await fsp.writeFile(path.join(cachePath(), "stable.json"), bytes);
    await fsp.writeFile(path.join(cachePath(), "stable.json.sig"), signature);
    return;
  } catch (error) {
    manifestError = `Sin conexión con el canal de actualizaciones (${error.message}).`;
  }
  // Sin internet: último manifiesto descargado, o el que viene dentro de Central.
  for (const [dir, source] of [[cachePath(), "cache"], [path.join(process.resourcesPath || "", "channel"), "bundled"], [path.join(here, "../../../central/channel"), "bundled"]]) {
    try {
      const loaded = await readSigned(dir);
      if (!manifest || new Date(loaded.manifest.publishedAt) > new Date(manifest.publishedAt)) { manifest = loaded.manifest; manifestSource = source; }
      return;
    } catch { /* siguiente */ }
  }
}

async function catalog() {
  if (!manifest) await loadManifest();
  const apps = [];
  for (const entry of manifest?.apps || []) {
    const state = entry.status === "available" ? await readInstallState(root(), entry.id) : null;
    const missing = state && entry.assets ? await missingAssets(root(), entry.assets) : [];
    const installedHash = state?.current?.files ? JSON.stringify(state.current.files.map(file => [file.path, file.sha256])) : null;
    const latestHash = entry.files ? JSON.stringify(entry.files.map(file => [file.path, file.sha256])) : null;
    apps.push({
      id: entry.id, name: entry.name, status: entry.status, category: entry.category, color: entry.color, summary: entry.summary,
      version: entry.version || null,
      installed: state?.current ? { version: state.current.version, installedAt: state.current.installedAt } : null,
      previous: state?.previous ? { version: state.previous.version } : null,
      updateAvailable: Boolean(state?.current && latestHash && installedHash !== latestHash),
      missingAssetsBytes: missing.reduce((sum, asset) => sum + asset.size, 0),
      totalAssetsBytes: (entry.assets || []).reduce((sum, asset) => sum + asset.size, 0),
      busy: busy.get(entry.id) || null,
      running: appWindows.has(entry.id)
    });
  }
  return {
    apps,
    source: manifestSource,
    error: manifestError,
    publishedAt: manifest?.publishedAt || null,
    central: { version: app.getVersion(), update: selfUpdate }
  };
}

function send(channel, payload) {
  if (hubWindow && !hubWindow.isDestroyed()) hubWindow.webContents.send(channel, payload);
}

/* ---------- Instalar / actualizar ---------- */

async function runTask(appId, label, task) {
  if (busy.has(appId)) throw new Error("Ya hay una tarea en curso para esta aplicación.");
  busy.set(appId, { label, percent: 0 });
  send("central:changed");
  const progress = info => {
    busy.set(appId, { label: info.label || label, percent: info.percent ?? 0 });
    send("central:progress", { appId, ...busy.get(appId) });
  };
  try {
    return await task(progress);
  } finally {
    busy.delete(appId);
    send("central:changed");
  }
}

async function installOrUpdate(appId, { fromFolder = null } = {}) {
  let source = manifest;
  if (fromFolder) source = (await readSigned(path.join(fromFolder, "central/channel"))).manifest;
  else await loadManifest();
  const entry = source?.apps.find(item => item.id === appId && item.status === "available");
  if (!entry) throw new Error("La aplicación no está disponible en el canal.");
  return runTask(appId, "Preparando…", async progress => {
    await installApp(root(), entry, {
      source: file => fromFolder ? { localPath: path.join(fromFolder, file.src) } : file.url,
      onProgress: info => progress({ label: info.phase === "verify" ? "Verificando archivos…" : "Descargando cambios…", percent: Math.round(info.percent * (entry.assets ? 0.1 : 1)) })
    });
    if (entry.assets) {
      const missing = await installAssets(root(), entry.assets, {
        fromFolder,
        onProgress: info => progress({ label: fromFolder ? "Copiando modelos de transcripción…" : "Descargando modelos de transcripción…", percent: 10 + Math.round(info.percent * 0.9) })
      });
      if (missing.length && fromFolder) return { warning: "La carpeta no tenía todos los modelos de transcripción. Puedes descargarlos después." };
    }
    await restartHost(appId);
    return { ok: true };
  });
}

async function restartHost(appId) {
  const running = hosts.get(appId);
  if (!running) return;
  const state = await readInstallState(root(), appId);
  if (running.dir === currentAppDir(root(), state)) return;
  await running.host.close();
  hosts.delete(appId);
  const window = appWindows.get(appId);
  if (window) { const url = await hostUrl(appId); window.loadURL(`${url}/tb`); }
}

async function hostUrl(appId) {
  const state = await readInstallState(root(), appId);
  const dir = currentAppDir(root(), state);
  if (!dir) throw new Error("La aplicación no está instalada.");
  const running = hosts.get(appId);
  if (running?.dir === dir) return running.host.url;
  if (running) { await running.host.close(); hosts.delete(appId); }
  const host = await startAppHost({ appDir: dir, assetsDir: assetsDir(), dataDir: path.join(dataDir(), appId) });
  hosts.set(appId, { dir, host });
  return host.url;
}

/* ---------- Ventanas ---------- */

const isLocal = url => /^http:\/\/127\.0\.0\.1:\d+\//.test(url || "");

async function openApp(appId) {
  const existing = appWindows.get(appId);
  if (existing && !existing.isDestroyed()) { existing.show(); existing.focus(); return; }
  if (process.platform === "darwin") await systemPreferences.askForMediaAccess("microphone").catch(() => false);
  const url = await hostUrl(appId);
  const entry = manifest?.apps.find(item => item.id === appId);
  const window = new BrowserWindow({
    width: 1320, height: 880, minWidth: 900, minHeight: 600,
    title: `BMMS ${entry?.name || appId}`, backgroundColor: "#090b0e", autoHideMenuBar: true,
    webPreferences: { preload: path.join(here, "app-preload.cjs"), contextIsolation: true, sandbox: true }
  });
  // Ventana flotante del TB Tool: una ventana real del sistema, siempre encima de todo.
  window.webContents.setWindowOpenHandler(({ url: target, frameName }) => {
    if (frameName === "tbfloat") {
      return { action: "allow", overrideBrowserWindowOptions: { width: 460, height: 300, minWidth: 220, minHeight: 140, alwaysOnTop: true, autoHideMenuBar: true, backgroundColor: "#090b0e", title: "BMMS TB", fullscreenable: false } };
    }
    if (/^https?:\/\//.test(target) && !isLocal(target)) shell.openExternal(target);
    return { action: "deny" };
  });
  window.webContents.on("did-create-window", child => {
    child.setAlwaysOnTop(true, "screen-saver");
    child.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  });
  window.on("closed", () => { appWindows.delete(appId); send("central:changed"); });
  appWindows.set(appId, window);
  await window.loadURL(`${url}/tb`);
  send("central:changed");
}

function createHub() {
  hubWindow = new BrowserWindow({
    width: 1180, height: 780, minWidth: 820, minHeight: 560,
    title: "BMMS Central", backgroundColor: "#0b0d11", autoHideMenuBar: true,
    webPreferences: { preload: path.join(here, "hub-preload.cjs"), contextIsolation: true, sandbox: true }
  });
  hubWindow.webContents.setWindowOpenHandler(({ url }) => { if (/^https:\/\//.test(url)) shell.openExternal(url); return { action: "deny" }; });
  hubWindow.loadFile(path.join(here, "../hub/index.html"));
  hubWindow.on("closed", () => { hubWindow = null; });
}

/* ---------- Actualización de Central (instalador completo, GitHub Releases) ---------- */

function setupSelfUpdate() {
  if (!app.isPackaged) { selfUpdate = { status: "dev" }; return; }
  autoUpdater.autoDownload = true;
  autoUpdater.on("checking-for-update", () => { selfUpdate = { status: "checking" }; send("central:changed"); });
  autoUpdater.on("update-not-available", () => { selfUpdate = { status: "current" }; send("central:changed"); });
  autoUpdater.on("download-progress", info => { selfUpdate = { status: "downloading", percent: Math.round(info.percent) }; send("central:changed"); });
  autoUpdater.on("update-downloaded", info => { selfUpdate = { status: "ready", version: info.version }; send("central:changed"); });
  autoUpdater.on("error", error => { selfUpdate = { status: "error", message: error?.message || String(error) }; send("central:changed"); });
  autoUpdater.checkForUpdates().catch(() => {});
}

/* ---------- IPC ---------- */

const handlers = {
  "central:catalog": () => catalog(),
  "central:refresh": async () => { await loadManifest(); return catalog(); },
  "central:install": (_, appId) => installOrUpdate(appId),
  "central:open": (_, appId) => openApp(appId),
  "central:rollback": async (_, appId) => { await rollbackApp(root(), appId); await restartHost(appId); return catalog(); },
  "central:download-assets": async (_, appId) => {
    const entry = manifest?.apps.find(item => item.id === appId);
    if (!entry?.assets) return { ok: true };
    return runTask(appId, "Descargando modelos…", async progress => {
      await installAssets(root(), entry.assets, { onProgress: info => progress({ label: "Descargando modelos de transcripción…", percent: info.percent }) });
      return { ok: true };
    });
  },
  "central:import-folder": async (_, appId) => {
    const result = await dialog.showOpenDialog(hubWindow, {
      title: "Elige la carpeta BMMS-PROJECT (por ejemplo, en un pendrive)",
      properties: ["openDirectory"]
    });
    if (result.canceled || !result.filePaths[0]) return { canceled: true };
    return installOrUpdate(appId, { fromFolder: result.filePaths[0] });
  },
  "central:restart-to-update": () => { autoUpdater.quitAndInstall(); },
  "central:open-data-folder": () => shell.openPath(dataDir())
};

for (const [channel, handler] of Object.entries(handlers)) {
  ipcMain.handle(channel, async (event, ...args) => {
    if (event.sender !== hubWindow?.webContents) throw new Error("Origen no permitido.");
    try { return await handler(event, ...args); } catch (error) { return { error: error?.message || String(error) }; }
  });
}

/* ---------- Arranque ---------- */

if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on("second-instance", () => { if (hubWindow) { if (hubWindow.isMinimized()) hubWindow.restore(); hubWindow.focus(); } });
  app.whenReady().then(async () => {
    // Micrófono solo para las apps locales de Central.
    session.defaultSession.setPermissionRequestHandler((_, permission, callback, details) => callback(permission === "media" && isLocal(details.requestingUrl)));
    session.defaultSession.setPermissionCheckHandler((_, permission, origin) => permission === "media" && isLocal(`${origin}/`));
    createHub();
    setupSelfUpdate();
    loadManifest().then(() => send("central:changed"));
    setInterval(() => loadManifest().then(() => send("central:changed")), 30 * 60 * 1000);
  });
  app.on("window-all-closed", async () => {
    for (const { host } of hosts.values()) await host.close().catch(() => {});
    app.quit();
  });
  app.on("activate", () => { if (!hubWindow) createHub(); });
}
