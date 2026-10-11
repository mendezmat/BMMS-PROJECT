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
  return [path.join("/Applications", `${launcherName(name)}.app`), path.join(os.homedir(), "Applications", `${launcherName(name)}.app`)];
}

function windowsTargets(electronApp, name) {
  return [
    path.join(electronApp.getPath("appData"), "Microsoft", "Windows", "Start Menu", "Programs", `${launcherName(name)}.lnk`),
    path.join(electronApp.getPath("desktop"), `${launcherName(name)}.lnk`)
  ];
}

// Icono redondo con las iniciales y el color de la app, dibujado por Electron (sin archivos externos).
async function renderIconPng(BrowserWindow, { name, short, color }) {
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
    return image.resize({ width: 1024, height: 1024 }).toPNG();
  } finally {
    window.destroy();
  }
}

async function macIcon(BrowserWindow, app, resourcesDir) {
  const work = await fsp.mkdtemp(path.join(os.tmpdir(), "bmms-icon-"));
  try {
    const png = path.join(work, "icon.png");
    await fsp.writeFile(png, await renderIconPng(BrowserWindow, app));
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
const launcherSignature = app => ({ v: 1, id: app.id, name: app.name, short: app.short || null, color: app.color || null });

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
