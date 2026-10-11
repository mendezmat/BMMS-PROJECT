// BMMS Central — accesos directos de las apps instaladas en el sistema.
// Mac: "/Applications/BMMS <App>.app" (o ~/Applications), un lanzador pequeño con su propio icono
//      que abre la app dentro de Central con el enlace bmms-central://open/<id>.
// Windows: accesos "BMMS <App>" en el menú Inicio y el Escritorio que abren Central con --open-app=<id>.
import { execFile } from "node:child_process";
import fsp from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

const run = promisify(execFile);
export const PROTOCOL = "bmms-central";

const safeId = id => String(id).replace(/[^a-z0-9-]/gi, "");
export const launcherName = name => `BMMS ${name}`;

// Destinos posibles del lanzador en Mac (el primero escribible gana).
function macTargets(name) {
  if (process.env.BMMS_LAUNCHER_DIR) return [path.join(process.env.BMMS_LAUNCHER_DIR, `${launcherName(name)}.app`)]; // pruebas: no toca Aplicaciones
  return [path.join("/Applications", `${launcherName(name)}.app`), path.join(os.homedir(), "Applications", `${launcherName(name)}.app`)];
}

function windowsTargets(electronApp, name) {
  return [
    path.join(electronApp.getPath("appData"), "Microsoft", "Windows", "Start Menu", "Programs", `${launcherName(name)}.lnk`),
    path.join(electronApp.getPath("desktop"), `${launcherName(name)}.lnk`)
  ];
}

// Icono redondo con las iniciales y el color de la app, dibujado por Electron (sin archivos externos).
export async function renderIconPng(BrowserWindow, { name, short, color }, size = 1024) {
  const initials = short ? String(short).slice(0, 3).toUpperCase() : name.replace(/^BMMS\s+/i, "").split(/\s+/).map(word => word[0]).join("").slice(0, 2).toUpperCase();
  const html = `<!doctype html><html><body style="margin:0;width:1024px;height:1024px;background:transparent;display:grid;place-items:center">
    <div style="width:824px;height:824px;border-radius:50%;display:grid;place-items:center;
      background:radial-gradient(circle at 30% 25%,rgba(255,255,255,.35),transparent 55%),linear-gradient(140deg,${color},#111 120%);
      box-shadow:inset 0 0 0 10px rgba(255,255,255,.10);font:700 340px/1 -apple-system,'Segoe UI',Roboto,sans-serif;color:#fff;letter-spacing:-8px">${initials}</div></body></html>`;
  const window = new BrowserWindow({ show: false, width: 1024, height: 1024, transparent: true, frame: false, useContentSize: true, webPreferences: { offscreen: true } });
  try {
    await window.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(html)}`);
    await new Promise(resolve => setTimeout(resolve, 150));
    const image = await window.webContents.capturePage();
    return image.resize({ width: size, height: size }).toPNG();
  } finally {
    window.destroy();
  }
}

async function macIcon(BrowserWindow, app, resourcesDir) {
  const work = await fsp.mkdtemp(path.join(os.tmpdir(), "bmms-icon-"));
  try {
    const png = path.join(work, "icon.png");
    // El logo de la app si lo trae; si no, uno generado con sus iniciales.
    if (app.iconPath) await fsp.copyFile(app.iconPath, png);
    else await fsp.writeFile(png, await renderIconPng(BrowserWindow, app));
    const iconset = path.join(work, "icon.iconset");
    await fsp.mkdir(iconset);
    for (const size of [16, 32, 128, 256, 512]) {
      await run("sips", ["-z", String(size), String(size), png, "--out", path.join(iconset, `icon_${size}x${size}.png`)]);
      await run("sips", ["-z", String(size * 2), String(size * 2), png, "--out", path.join(iconset, `icon_${size}x${size}@2x.png`)]);
    }
    await run("iconutil", ["-c", "icns", iconset, "-o", path.join(resourcesDir, "icon.icns")]);
  } finally {
    await fsp.rm(work, { recursive: true, force: true });
  }
}

async function createMacLauncher(BrowserWindow, app) {
  let lastError = null;
  for (const target of macTargets(app.name)) {
    try {
      const contents = path.join(target, "Contents");
      await fsp.rm(target, { recursive: true, force: true });
      await fsp.mkdir(path.join(contents, "MacOS"), { recursive: true });
      await fsp.mkdir(path.join(contents, "Resources"), { recursive: true });
      const id = safeId(app.id);
      await fsp.writeFile(path.join(contents, "Info.plist"), `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>CFBundleName</key><string>${launcherName(app.name)}</string>
  <key>CFBundleDisplayName</key><string>${launcherName(app.name)}</string>
  <key>CFBundleIdentifier</key><string>com.bmms.app.${id}</string>
  <key>CFBundleExecutable</key><string>launcher</string>
  <key>CFBundleIconFile</key><string>icon</string>
  <key>CFBundlePackageType</key><string>APPL</string>
  <key>CFBundleShortVersionString</key><string>${String(app.version || "1.0.0").replace(/[^0-9.]/g, "")}</string>
  <key>LSUIElement</key><true/>
</dict></plist>
`);
      const launcher = path.join(contents, "MacOS", "launcher");
      await fsp.writeFile(launcher, `#!/bin/sh\n# Abre ${app.name} dentro de BMMS Central.\nexec /usr/bin/open "${PROTOCOL}://open/${id}"\n`);
      await fsp.chmod(launcher, 0o755);
      await macIcon(BrowserWindow, app, path.join(contents, "Resources")).catch(() => {}); // sin icono propio, macOS usa el genérico
      await fsp.writeFile(path.join(contents, "Resources", "bmms-launcher.json"), JSON.stringify(launcherSignature(app)));
      await run("touch", [target]).catch(() => {}); // que Finder refresque el icono
      return target;
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error("No se pudo crear el acceso en Aplicaciones.");
}

async function createWindowsLaunchers(electronApp, shell, app) {
  const created = [];
  for (const target of windowsTargets(electronApp, app.name)) {
    await fsp.mkdir(path.dirname(target), { recursive: true });
    const ok = shell.writeShortcutLink(target, "create", {
      target: process.execPath,
      args: `--open-app=${safeId(app.id)}`,
      description: `${app.name} — BMMS Central`,
      icon: process.execPath,
      iconIndex: 0,
      appUserModelId: `com.bmms.app.${safeId(app.id)}`
    });
    if (ok) created.push(target);
  }
  return created;
}

export async function createLauncher({ electronApp, shell, BrowserWindow }, app) {
  if (process.platform === "darwin") return [await createMacLauncher(BrowserWindow, app)];
  if (process.platform === "win32") return createWindowsLaunchers(electronApp, shell, app);
  return [];
}

// Lo que define el aspecto del lanzador: si cambia (nombre, iniciales, color), se vuelve a crear.
// v2: la app es independiente (copia del motor); se rehace si cambia el motor de Central.
const launcherSignature = app => ({ v: 2, id: app.id, name: app.name, short: app.short || null, color: app.color || null, engine: app.engine || null, standalone: Boolean(app.standalone), icon: app.iconHash || null });

export async function launcherExists({ electronApp }, app) {
  if (process.platform === "darwin") {
    for (const target of macTargets(app.name)) {
      try {
        const saved = JSON.parse(await fsp.readFile(path.join(target, "Contents", "Resources", "bmms-launcher.json"), "utf8"));
        return JSON.stringify(saved) === JSON.stringify(launcherSignature(app));
      } catch { /* siguiente */ }
    }
    return false;
  }
  const targets = process.platform === "win32" ? windowsTargets(electronApp, app.name).slice(0, 1) : [];
  for (const target of targets) {
    try { await fsp.access(target); return true; } catch { /* siguiente */ }
  }
  return process.platform !== "darwin" && process.platform !== "win32";
}

export async function removeLauncher({ electronApp }, app) {
  const targets = process.platform === "darwin" ? macTargets(app.name) : process.platform === "win32" ? windowsTargets(electronApp, app.name) : [];
  for (const target of targets) await fsp.rm(target, { recursive: true, force: true }).catch(() => {});
}

// Qué app abrir según los argumentos de arranque o un enlace bmms-central://open/<id>.
export function targetFromArgs(argv = []) {
  for (const arg of argv) {
    const flag = /^--open-app=([a-z0-9-]+)$/i.exec(arg);
    if (flag) return flag[1];
    const link = targetFromUrl(arg);
    if (link) return link;
  }
  return null;
}

export function targetFromUrl(url) {
  const match = new RegExp(`^${PROTOCOL}://open/([a-z0-9-]+)/?$`, "i").exec(String(url || ""));
  return match ? match[1] : null;
}

/* ---------- Apps independientes ----------
   La app instalada es una copia del motor de Central con su propio nombre, icono e identidad
   (Dock / barra de tareas). Al abrirla corre sola, sin Central. Lee los archivos de la app,
   los modelos y los datos desde la carpeta de Central, que es quien instala y actualiza. */

const isPackagedMac = () => process.platform === "darwin" && /\.app\/Contents\/MacOS\/[^/]+$/.test(process.execPath);
const centralBundle = () => path.resolve(process.execPath, "../../..");

export function standaloneTarget(electronApp, app) {
  if (process.platform === "darwin") return macTargets(app.name).map(target => ({ bundle: target, exe: path.join(target, "Contents", "MacOS") }));
  if (process.platform === "win32") {
    const dir = path.join(process.env.BMMS_LAUNCHER_DIR || path.join(electronApp.getPath("home"), "AppData", "Local", "Programs"), launcherName(app.name));
    return [{ dir, exe: path.join(dir, `${launcherName(app.name)}.exe`) }];
  }
  return [];
}

export async function isStandaloneRunning(electronApp, app) {
  try {
    if (process.platform === "darwin") {
      for (const target of macTargets(app.name)) {
        const { stdout } = await run("pgrep", ["-f", `${target}/Contents/MacOS/`]).catch(() => ({ stdout: "" }));
        if (stdout.trim()) return true;
      }
      return false;
    }
    if (process.platform === "win32") {
      const { stdout } = await run("tasklist", ["/FI", `IMAGENAME eq ${launcherName(app.name)}.exe`, "/NH"]);
      return stdout.toLowerCase().includes(`${launcherName(app.name)}.exe`.toLowerCase());
    }
  } catch { /* sin información */ }
  return false;
}

async function createMacStandalone(BrowserWindow, app) {
  const source = centralBundle();
  let lastError = null;
  for (const target of macTargets(app.name)) {
    const staging = `${target}.tmp-${process.pid}`;
    try {
      await fsp.rm(staging, { recursive: true, force: true });
      await run("ditto", [source, staging]);
      const plist = path.join(staging, "Contents", "Info.plist");
      const id = safeId(app.id);
      const set = (key, value) => run("plutil", ["-replace", key, "-string", value, plist]);
      await set("CFBundleName", launcherName(app.name));
      await set("CFBundleDisplayName", launcherName(app.name));
      await set("CFBundleIdentifier", `com.bmms.app.${id}`);
      await set("CFBundleIconFile", "bmms-app.icns");
      // El proceso también se llama como la app (Monitor de Actividad, Dock).
      const oldExe = String((await run("plutil", ["-extract", "CFBundleExecutable", "raw", plist])).stdout).trim();
      await fsp.rename(path.join(staging, "Contents", "MacOS", oldExe), path.join(staging, "Contents", "MacOS", launcherName(app.name)));
      await set("CFBundleExecutable", launcherName(app.name));
      await run("plutil", ["-remove", "CFBundleURLTypes", plist]).catch(() => {}); // los enlaces bmms-central:// siguen siendo de Central
      await run("plutil", ["-remove", "ElectronAsarIntegrity", plist]).catch(() => {});
      // Electron busca sus procesos auxiliares por el nombre de la app: "<Nombre> Helper*.app".
      const frameworks = path.join(staging, "Contents", "Frameworks");
      const oldName = String((await run("plutil", ["-extract", "CFBundleName", "raw", path.join(source, "Contents", "Info.plist")])).stdout).trim();
      for (const entry of await fsp.readdir(frameworks)) {
        if (!entry.startsWith(`${oldName} Helper`) || !entry.endsWith(".app")) continue;
        const suffix = entry.slice(oldName.length, -4); // " Helper", " Helper (GPU)", ...
        const newName = `${launcherName(app.name)}${suffix}`;
        const helper = path.join(frameworks, `${newName}.app`);
        await fsp.rename(path.join(frameworks, entry), helper);
        await fsp.rename(path.join(helper, "Contents", "MacOS", `${oldName}${suffix}`), path.join(helper, "Contents", "MacOS", newName));
        const helperPlist = path.join(helper, "Contents", "Info.plist");
        for (const key of ["CFBundleExecutable", "CFBundleName", "CFBundleDisplayName"]) await run("plutil", ["-replace", key, "-string", newName, helperPlist]);
        await run("plutil", ["-replace", "CFBundleIdentifier", "-string", `com.bmms.app.${id}.helper${suffix.replace(/[^a-z]/gi, "").toLowerCase().replace(/^helper/, "")}`, helperPlist]);
      }
      const resources = path.join(staging, "Contents", "Resources");
      await fsp.writeFile(path.join(resources, "bmms-app-mode.json"), JSON.stringify({ appId: id, name: app.name, centralBundle: source }));
      const work = await fsp.mkdtemp(path.join(os.tmpdir(), "bmms-icon-"));
      try {
        await macIcon(BrowserWindow, app, work);
        await fsp.rename(path.join(work, "icon.icns"), path.join(resources, "bmms-app.icns"));
      } catch { /* sin icono propio */ } finally { await fsp.rm(work, { recursive: true, force: true }); }
      await fsp.writeFile(path.join(resources, "bmms-launcher.json"), JSON.stringify(launcherSignature(app)));
      await run("codesign", ["--force", "--deep", "--sign", "-", staging]).catch(() => {}); // firma local (ad hoc) tras cambiar el Info.plist
      await run("xattr", ["-dr", "com.apple.quarantine", staging]).catch(() => {});
      await fsp.rm(target, { recursive: true, force: true });
      await fsp.rename(staging, target);
      await run("/System/Library/Frameworks/CoreServices.framework/Frameworks/LaunchServices.framework/Support/lsregister", ["-f", target]).catch(() => {});
      return target;
    } catch (error) {
      lastError = error;
      await fsp.rm(staging, { recursive: true, force: true }).catch(() => {});
    }
  }
  throw lastError || new Error("No se pudo crear la app en Aplicaciones.");
}

// Icono .ico (PNG dentro de ICO, válido desde Windows Vista).
function pngToIco(png) {
  const header = Buffer.alloc(22);
  header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(1, 4);
  header.writeUInt8(0, 6); header.writeUInt8(0, 7); header.writeUInt8(0, 8); header.writeUInt8(0, 9);
  header.writeUInt16LE(1, 10); header.writeUInt16LE(32, 12); header.writeUInt32LE(png.length, 14); header.writeUInt32LE(22, 18);
  return Buffer.concat([header, png]);
}

async function createWindowsStandalone(electronApp, shell, BrowserWindow, app) {
  const [{ dir, exe }] = standaloneTarget(electronApp, app);
  const source = path.dirname(process.execPath);
  const staging = `${dir}.tmp-${process.pid}`;
  await fsp.rm(staging, { recursive: true, force: true });
  await fsp.cp(source, staging, { recursive: true, filter: file => !/Uninstall BMMS Central\.exe$/i.test(file) });
  await fsp.rename(path.join(staging, path.basename(process.execPath)), path.join(staging, path.basename(exe)));
  const id = safeId(app.id);
  await fsp.writeFile(path.join(staging, "resources", "bmms-app-mode.json"), JSON.stringify({ appId: id, name: app.name, centralExe: process.execPath }));
  await fsp.writeFile(path.join(staging, "resources", "bmms-launcher.json"), JSON.stringify(launcherSignature(app)));
  const icon = path.join(staging, "resources", "bmms-app.ico");
  await fsp.writeFile(icon, pngToIco(app.iconPng256 || await renderIconPng(BrowserWindow, app, 256))).catch(() => {});
  await fsp.rm(dir, { recursive: true, force: true });
  await fsp.rename(staging, dir);
  const finalIcon = path.join(dir, "resources", "bmms-app.ico");
  for (const target of windowsTargets(electronApp, app.name)) {
    await fsp.mkdir(path.dirname(target), { recursive: true });
    shell.writeShortcutLink(target, "create", { target: exe, description: `${app.name} — BMMS`, icon: finalIcon, iconIndex: 0, appUserModelId: `com.bmms.app.${id}` });
  }
  return dir;
}

export async function createStandalone({ electronApp, shell, BrowserWindow }, app) {
  // Solo desde una Central instalada: en desarrollo el motor no lleva la app dentro y la copia no serviría.
  if (electronApp.isPackaged && isPackagedMac()) return [await createMacStandalone(BrowserWindow, { ...app, standalone: true })];
  if (process.platform === "win32" && electronApp.isPackaged) return [await createWindowsStandalone(electronApp, shell, BrowserWindow, { ...app, standalone: true })];
  return createLauncher({ electronApp, shell, BrowserWindow }, app); // en desarrollo: acceso que abre Central
}

// Si la app está abierta y solo cambió el logo, se actualiza el icono sin reemplazar la app.
export async function refreshStandaloneIcon({ electronApp, BrowserWindow }, app) {
  if (process.platform === "darwin") {
    for (const target of macTargets(app.name)) {
      const resources = path.join(target, "Contents", "Resources");
      let saved;
      try { saved = JSON.parse(await fsp.readFile(path.join(resources, "bmms-launcher.json"), "utf8")); } catch { continue; }
      if (saved.engine !== (app.engine || null)) return false; // cambió el motor: hay que rehacer la app completa (cuando esté cerrada)
      const work = await fsp.mkdtemp(path.join(os.tmpdir(), "bmms-icon-"));
      try {
        await macIcon(BrowserWindow, app, work);
        await fsp.rename(path.join(work, "icon.icns"), path.join(resources, "bmms-app.icns"));
      } finally { await fsp.rm(work, { recursive: true, force: true }); }
      await fsp.writeFile(path.join(resources, "bmms-launcher.json"), JSON.stringify(launcherSignature({ ...app, standalone: true })));
      await run("codesign", ["--force", "--deep", "--sign", "-", target]).catch(() => {});
      await run("touch", [target]).catch(() => {});
      await run("/System/Library/Frameworks/CoreServices.framework/Frameworks/LaunchServices.framework/Support/lsregister", ["-f", target]).catch(() => {});
      return true;
    }
  }
  return false;
}

export async function standaloneSignatureMatches(electronApp, app) {
  const files = process.platform === "darwin"
    ? macTargets(app.name).map(target => path.join(target, "Contents", "Resources", "bmms-launcher.json"))
    : standaloneTarget(electronApp, app).map(target => path.join(target.dir, "resources", "bmms-launcher.json"));
  for (const file of files) {
    try { return JSON.stringify(JSON.parse(await fsp.readFile(file, "utf8"))) === JSON.stringify(launcherSignature({ ...app, standalone: true })); } catch { /* siguiente */ }
  }
  return false;
}

export async function standaloneInstalled(electronApp, app) {
  for (const target of standaloneTarget(electronApp, app)) {
    try { await fsp.access(path.join(target.bundle || target.dir, process.platform === "darwin" ? "Contents/Resources/bmms-app-mode.json" : "resources/bmms-app-mode.json")); return target; } catch { /* siguiente */ }
  }
  return null;
}

export async function removeStandalone({ electronApp }, app) {
  for (const target of standaloneTarget(electronApp, app)) await fsp.rm(target.bundle || target.dir, { recursive: true, force: true }).catch(() => {});
  await removeLauncher({ electronApp }, app);
}
