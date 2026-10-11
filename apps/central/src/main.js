// BMMS Central — proceso principal (Electron).
// Hub de aplicaciones: lee el manifiesto firmado, instala/actualiza apps por archivos y las abre.
import { app, BrowserWindow, dialog, ipcMain, Menu, Notification, session, shell, systemPreferences } from "electron";
import electronUpdater from "electron-updater";
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { startAppHost } from "./app-host.js";
import { createLauncher, launcherExists, PROTOCOL, removeLauncher, targetFromArgs, targetFromUrl } from "./launchers.js";
import { currentAppDir, installApp, installAssets, missingAssets, readInstallState, rollbackApp, uninstallApp, verifyManifest, versionAtLeast } from "./updater.js";

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
const UI_ID = "central-ui"; // diseño de Central (HTML/CSS/JS del hub): se actualiza por el canal como una app
const osTools = () => ({ electronApp: app, shell, BrowserWindow });

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
  let ui = null;
  for (const entry of manifest?.apps || []) {
    if (entry.id === UI_ID) { ui = await uiStatus(entry); continue; }
    if (entry.hidden) continue;
    const state = entry.status === "available" ? await readInstallState(root(), entry.id) : null;
    const missing = state && entry.assets ? await missingAssets(root(), entry.assets) : [];
    const installedHash = state?.current?.files ? JSON.stringify(state.current.files.map(file => [file.path, file.sha256])) : null;
    const latestHash = entry.files ? JSON.stringify(entry.files.map(file => [file.path, file.sha256])) : null;
    apps.push({
      id: entry.id, name: entry.name, short: entry.short || null, status: entry.status, category: entry.category, color: entry.color, summary: entry.summary,
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
    central: { version: app.getVersion(), update: selfUpdate, ui }
  };
}

// Estado del diseño de Central: instalado desde el canal, o el que vino con el instalador.
async function uiStatus(entry) {
  const state = await readInstallState(root(), UI_ID);
  const compatible = versionAtLeast(app.getVersion(), entry.minCentral || "0.0.0");
  const installedHash = state?.current?.files ? JSON.stringify(state.current.files.map(file => [file.path, file.sha256])) : null;
  const latestHash = JSON.stringify(entry.files.map(file => [file.path, file.sha256]));
  // Se usa el diseño más nuevo entre el descargado y el que trae el instalador; solo se ofrece uno más nuevo.
  const bundled = await bundledUiVersion();
  const usingDownloaded = Boolean(state?.current) && versionAtLeast(state.current.version, bundled); // igual que hubIndexPath()
  const active = usingDownloaded ? state.current.version : bundled;
  const newer = !versionAtLeast(active, entry.version);
  const republished = usingDownloaded && state.current.version === entry.version && installedHash !== latestHash;
  return {
    version: entry.version,
    active,
    installed: usingDownloaded ? { version: state.current.version } : null,
    previous: state?.previous ? { version: state.previous.version } : null,
    updateAvailable: compatible && (newer || republished),
    compatible,
    busy: busy.get(UI_ID) || null
  };
}

async function bundledUiVersion() {
  try { return JSON.parse(await fsp.readFile(path.join(here, "../hub/version.json"), "utf8")).version || "0.0.0"; } catch { return "0.0.0"; }
}

async function hubIndexPath() {
  const entry = manifest?.apps.find(item => item.id === UI_ID);
  const state = await readInstallState(root(), UI_ID);
  const dir = currentAppDir(root(), state);
  const newerThanBundled = state?.current && versionAtLeast(state.current.version, await bundledUiVersion());
  if (dir && newerThanBundled && (!entry || versionAtLeast(app.getVersion(), entry.minCentral || "0.0.0"))) {
    const index = path.join(dir, "hub", "index.html");
    try { await fsp.access(index); return index; } catch { /* copia dañada: usar la incluida */ }
  }
  return path.join(here, "../hub/index.html");
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
    if (appId === UI_ID) await reloadHub();
    else await ensureLauncher(entry).catch(error => console.warn("Acceso directo", error));
    return { ok: true };
  });
}

async function ensureLauncher(entry) {
  return createLauncher(osTools(), { id: entry.id, name: entry.name, short: entry.short, color: entry.color || "#666", version: entry.version });
}

// Repara los accesos de las apps instaladas (por ejemplo, si alguien los borró).
async function repairLaunchers() {
  for (const entry of manifest?.apps || []) {
    if (entry.status !== "available" || entry.hidden || entry.id === UI_ID) continue;
    if (!(await readInstallState(root(), entry.id))?.current) continue;
    if (!(await launcherExists(osTools(), entry))) await ensureLauncher(entry).catch(() => {});
  }
}

async function reloadHub() {
  if (hubWindow && !hubWindow.isDestroyed()) await hubWindow.loadFile(await hubIndexPath());
}

/* ---------- Avisos de actualización ---------- */

const notifiedPath = () => path.join(root(), "notified.json");

async function pendingUpdates() {
  const info = await catalog();
  const list = info.apps.filter(item => item.updateAvailable).map(item => ({ key: `${item.id}@${item.version}`, label: `${item.name} ${item.version}` }));
  if (info.central.ui?.updateAvailable) list.push({ key: `${UI_ID}@${info.central.ui.version}`, label: `diseño de BMMS Central ${info.central.ui.version}` });
  if (["available", "downloading", "ready"].includes(selfUpdate.status)) list.push({ key: `engine@${selfUpdate.version}`, label: `motor de BMMS Central ${selfUpdate.version}` });
  return list;
}

// Notificación del sistema al detectar actualizaciones nuevas (una vez por versión).
async function notifyUpdates() {
  const list = await pendingUpdates();
  if (!list.length || !Notification.isSupported()) return;
  let seen = [];
  try { seen = JSON.parse(await fsp.readFile(notifiedPath(), "utf8")); } catch { /* primera vez */ }
  const fresh = list.filter(item => !seen.includes(item.key));
  if (!fresh.length) return;
  const notification = new Notification({
    title: "BMMS Central: actualización disponible",
    body: fresh.length === 1 ? `Hay una actualización de ${fresh[0].label}.` : `Hay ${fresh.length} actualizaciones: ${fresh.map(item => item.label).join(", ")}.`
  });
  notification.on("click", () => showHub());
  notification.show();
  await fsp.writeFile(notifiedPath(), JSON.stringify([...new Set([...seen, ...fresh.map(item => item.key)])].slice(-200)));
}

async function checkForUpdates() {
  checkSelfUpdate();
  await loadManifest();
  send("central:changed");
  await repairLaunchers().catch(() => {});
  await notifyUpdates().catch(() => {});
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
      return { action: "allow", overrideBrowserWindowOptions: { width: 460, height: 300, minWidth: 220, minHeight: 140, show: false, alwaysOnTop: true, autoHideMenuBar: true, backgroundColor: "#090b0e", title: "BMMS TB", fullscreenable: false, minimizable: false } };
    }
    if (/^https?:\/\//.test(target) && !isLocal(target)) shell.openExternal(target);
    return { action: "deny" };
  });
  // La alerta flotante nunca le quita el foco a otras apps (OBS, ProPresenter): aparece sin activarse.
  window.webContents.on("did-create-window", child => {
    child.setAlwaysOnTop(true, "screen-saver");
    child.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
    child.showInactive();
  });
  if (process.platform === "win32") window.setAppDetails({ appId: `com.bmms.app.${appId}`, appIconPath: process.execPath, relaunchCommand: `"${process.execPath}" --open-app=${appId}`, relaunchDisplayName: `BMMS ${entry?.name || appId}` });
  window.on("closed", () => {
    appWindows.delete(appId);
    // Al cerrar la última app, el hub oculto vuelve (si no, Central quedaría abierto sin ventanas).
    if (!appWindows.size && hubWindow && !hubWindow.isDestroyed() && !hubWindow.isVisible()) hubWindow.show();
    send("central:changed");
  });
  appWindows.set(appId, window);
  await window.loadURL(`${url}/tb`);
  // El hub se oculta al abrir una app: así nada lo vuelve a traer al frente mientras se usa la app.
  if (hubWindow && !hubWindow.isDestroyed()) hubWindow.hide();
  send("central:changed");
}

function showHub() {
  if (!hubWindow || hubWindow.isDestroyed()) { createHub(); return; }
  if (hubWindow.isMinimized()) hubWindow.restore();
  hubWindow.show();
  hubWindow.focus();
}

function createHub() {
  hubWindow = new BrowserWindow({
    width: 1180, height: 780, minWidth: 820, minHeight: 560,
    title: "BMMS Central", backgroundColor: "#0b0d11", autoHideMenuBar: true,
    webPreferences: { preload: path.join(here, "hub-preload.cjs"), contextIsolation: true, sandbox: true }
  });
  hubWindow.webContents.setWindowOpenHandler(({ url }) => { if (/^https:\/\//.test(url)) shell.openExternal(url); return { action: "deny" }; });
  hubIndexPath().then(index => hubWindow?.loadFile(index));
  hubWindow.on("closed", () => { hubWindow = null; });
}

/* ---------- Actualización de Central (instalador completo, GitHub Releases) ---------- */

const RELEASES_URL = "https://github.com/mendezmat/BMMS-PROJECT/releases";
// En Mac, instalar solo una actualización exige una app firmada por Apple (Developer ID, de pago).
// Sin firma: se avisa y el botón abre la página de descarga. En Windows se descarga y se instala al reiniciar.
const canAutoInstall = () => process.platform === "win32";

function setupSelfUpdate() {
  if (!app.isPackaged) { selfUpdate = { status: "dev" }; return; }
  if (process.env.BMMS_CENTRAL_UPDATE_URL) autoUpdater.setFeedURL({ provider: "generic", url: process.env.BMMS_CENTRAL_UPDATE_URL }); // pruebas
  autoUpdater.autoDownload = canAutoInstall();
  autoUpdater.autoInstallOnAppQuit = false; // nunca se reinicia ni se instala sin que la persona lo pida
  autoUpdater.on("update-available", info => {
    selfUpdate = { status: canAutoInstall() ? "downloading" : "available", version: info.version, percent: 0, manual: !canAutoInstall() };
    send("central:changed");
    notifyUpdates().catch(() => {});
  });
  autoUpdater.on("update-not-available", () => { selfUpdate = { status: "current" }; send("central:changed"); });
  autoUpdater.on("download-progress", info => { selfUpdate = { ...selfUpdate, status: "downloading", percent: Math.round(info.percent) }; send("central:changed"); });
  autoUpdater.on("update-downloaded", info => { selfUpdate = { status: "ready", version: info.version }; send("central:changed"); });
  autoUpdater.on("error", error => {
    // Sin conexión o sin releases todavía: no es un problema para el usuario.
    if (selfUpdate.status !== "available" && selfUpdate.status !== "ready") selfUpdate = { status: "error", message: error?.message || String(error) };
    send("central:changed");
  });
  checkSelfUpdate();
}

function checkSelfUpdate() {
  if (app.isPackaged && !["downloading", "ready"].includes(selfUpdate.status)) autoUpdater.checkForUpdates().catch(() => {});
}

/* ---------- IPC ---------- */

const handlers = {
  "central:catalog": () => catalog(),
  "central:refresh": async () => { await checkForUpdates(); return catalog(); },
  "central:install": (_, appId) => installOrUpdate(appId),
  "central:open": (_, appId) => openApp(appId),
  "central:rollback": async (_, appId) => {
    if (appId === UI_ID) {
      // Sin versión anterior descargada se vuelve al diseño que vino con el instalador.
      const state = await readInstallState(root(), UI_ID);
      if (state?.previous) await rollbackApp(root(), UI_ID); else await uninstallApp(root(), UI_ID);
      await reloadHub();
      return { ok: true };
    }
    await rollbackApp(root(), appId);
    await restartHost(appId);
    return catalog();
  },
  "central:uninstall": async (_, appId) => {
    if (appId === UI_ID) throw new Error("No se puede desinstalar Central desde aquí.");
    const entry = manifest?.apps.find(item => item.id === appId);
    const window = appWindows.get(appId);
    if (window && !window.isDestroyed()) window.close();
    const running = hosts.get(appId);
    if (running) { await running.host.close(); hosts.delete(appId); }
    await uninstallApp(root(), appId);
    if (entry) await removeLauncher(osTools(), entry);
    return { ok: true };
  },
  "central:update-all": async () => {
    const info = await catalog();
    const errors = [];
    for (const item of info.apps.filter(entry => entry.updateAvailable)) {
      const result = await installOrUpdate(item.id).catch(error => ({ error: error.message }));
      if (result?.error) errors.push(`${item.name}: ${result.error}`);
    }
    if (info.central.ui?.updateAvailable) await installOrUpdate(UI_ID); // al final: recarga el hub
    return errors.length ? { error: errors.join(" · ") } : { ok: true };
  },
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
  "central:restart-to-update": () => {
    if (selfUpdate.status !== "ready") throw new Error("La actualización todavía no está lista.");
    setImmediate(() => autoUpdater.quitAndInstall(false, true));
    return { ok: true };
  },
  "central:open-release": () => {
    const version = String(selfUpdate.version || "").replace(/[^0-9.]/g, "");
    return shell.openExternal(version ? `${RELEASES_URL}/tag/central-v${version}` : RELEASES_URL);
  },
  "central:open-data-folder": () => shell.openPath(dataDir())
};

for (const [channel, handler] of Object.entries(handlers)) {
  ipcMain.handle(channel, async (event, ...args) => {
    if (event.sender !== hubWindow?.webContents) throw new Error("Origen no permitido.");
    try { return await handler(event, ...args); } catch (error) { return { error: error?.message || String(error) }; }
  });
}

/* ---------- Arranque ---------- */

// Enlaces bmms-central://open/<id> (lanzadores de Aplicaciones en Mac) y --open-app=<id> (Windows).
if (!process.env.BMMS_CENTRAL_USERDATA) { // en pruebas no se registra, para no quitarle el enlace a la Central instalada
  if (process.defaultApp) app.setAsDefaultProtocolClient(PROTOCOL, process.execPath, [path.resolve(process.argv[1] || ".")]);
  else app.setAsDefaultProtocolClient(PROTOCOL);
}
if (process.platform === "win32") app.setAppUserModelId("com.bmms.central");

let launchTarget = targetFromArgs(process.argv);
let ready = false;

async function openTarget(appId) {
  try {
    if (!manifest) await loadManifest();
    await openApp(appId);
  } catch (error) {
    showHub();
    dialog.showMessageBox({ type: "warning", message: `No se pudo abrir la app: ${error.message}`, detail: "Instálala de nuevo desde BMMS Central." });
  }
}

app.on("open-url", (event, url) => {
  event.preventDefault();
  const target = targetFromUrl(url);
  if (!target) return;
  if (ready) openTarget(target); else launchTarget = target;
});

if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on("second-instance", (_, argv) => {
    const target = targetFromArgs(argv);
    if (target) openTarget(target); else showHub();
  });
  app.whenReady().then(async () => {
    // Micrófono solo para las apps locales de Central.
    session.defaultSession.setPermissionRequestHandler((_, permission, callback, details) => callback(permission === "media" && isLocal(details.requestingUrl)));
    session.defaultSession.setPermissionCheckHandler((_, permission, origin) => permission === "media" && isLocal(`${origin}/`));
    ready = true;
    if (process.platform === "darwin") {
      app.dock?.setMenu(Menu.buildFromTemplate([{ label: "Abrir BMMS Central", click: () => showHub() }]));
      Menu.setApplicationMenu(Menu.buildFromTemplate([
        { role: "appMenu", submenu: [{ label: "Abrir BMMS Central", accelerator: "CmdOrCtrl+Shift+B", click: () => showHub() }, { type: "separator" }, { role: "hide" }, { role: "hideOthers" }, { type: "separator" }, { role: "quit" }] },
        { role: "editMenu" },
        { role: "windowMenu" }
      ]));
    }
    await loadManifest();
    // Abierta desde el acceso de una app: solo esa app. Si no, el hub.
    if (launchTarget) openTarget(launchTarget); else createHub();
    setupSelfUpdate();
    send("central:changed");
    repairLaunchers().catch(() => {});
    notifyUpdates().catch(() => {});
    setInterval(() => checkForUpdates().catch(() => {}), 30 * 60 * 1000);
  });
  app.on("window-all-closed", async () => {
    for (const { host } of hosts.values()) await host.close().catch(() => {});
    app.quit();
  });
  // Reabrir desde el Dock: solo muestra el hub si no hay ninguna ventana visible.
  app.on("activate", () => { if (!BrowserWindow.getAllWindows().some(window => window.isVisible())) showHub(); });
}
