// BMMS Central — motor de actualizaciones por archivos.
// - El manifiesto viene firmado (ed25519): un repositorio comprometido no puede enviar código a los PC.
// - Cada archivo trae sha256 y tamaño; nada se usa sin verificar.
// - Solo se descargan los archivos que cambiaron; los iguales se copian de la versión instalada.
// - La versión nueva se arma en una carpeta aparte y se activa al final (cambio atómico);
//   la anterior queda guardada para volver atrás con un clic.
// Sin dependencias de Electron: se puede probar con Node.
import crypto from "node:crypto";
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";

export const MANIFEST_SCHEMA = 1;

/* ---------- Firma y verificación ---------- */

export function verifyManifest(manifestBytes, signatureBase64, publicKeyPem) {
  const key = crypto.createPublicKey(publicKeyPem);
  const ok = crypto.verify(null, Buffer.from(manifestBytes), key, Buffer.from(String(signatureBase64).trim(), "base64"));
  if (!ok) throw new Error("La firma del manifiesto no es válida. No se instalará nada.");
  const manifest = JSON.parse(Buffer.from(manifestBytes).toString("utf8"));
  if (manifest.schema !== MANIFEST_SCHEMA) throw new Error(`Formato de manifiesto no compatible (${manifest.schema}).`);
  return manifest;
}

export function signManifest(manifestBytes, privateKeyPem) {
  return crypto.sign(null, Buffer.from(manifestBytes), crypto.createPrivateKey(privateKeyPem)).toString("base64");
}

/* ---------- Rutas seguras ---------- */

// Rutas relativas sin "..", sin absolutas y con caracteres simples.
export function safeRelative(relativePath) {
  const value = String(relativePath || "");
  if (!/^[A-Za-z0-9._\-/]+$/.test(value) || value.startsWith("/") || value.split("/").some(part => part === ".." || part === "." || part === "")) {
    throw new Error(`Ruta no válida en el manifiesto: ${value}`);
  }
  return value;
}

function inside(root, relativePath) {
  const target = path.resolve(root, safeRelative(relativePath));
  if (!target.startsWith(path.resolve(root) + path.sep)) throw new Error(`Ruta fuera de la carpeta: ${relativePath}`);
  return target;
}

export async function sha256File(filename) {
  const hash = crypto.createHash("sha256");
  for await (const chunk of fs.createReadStream(filename)) hash.update(chunk);
  return hash.digest("hex");
}

async function fileMatches(filename, file) {
  try {
    const stat = await fsp.stat(filename);
    if (stat.size !== file.size) return false;
    return (await sha256File(filename)) === file.sha256;
  } catch {
    return false;
  }
}

/* ---------- Descargas ---------- */

function assertHttps(url) {
  if (!/^https:\/\//.test(url) && !/^http:\/\/(127\.0\.0\.1|localhost)(:\d+)?\//.test(url)) throw new Error(`Solo se permiten descargas HTTPS: ${url}`);
}

// Descarga con reanudación (Range) y verificación sha256. Devuelve los bytes descargados.
export async function downloadVerified(url, destination, file, { onBytes = () => {}, signal, fetchImpl = fetch } = {}) {
  assertHttps(url);
  await fsp.mkdir(path.dirname(destination), { recursive: true });
  const partial = `${destination}.part`;
  let offset = 0;
  try { offset = (await fsp.stat(partial)).size; } catch { /* nuevo */ }
  if (offset > file.size) { await fsp.rm(partial, { force: true }); offset = 0; }
  if (offset < file.size) {
    const response = await fetchImpl(url, { headers: offset ? { Range: `bytes=${offset}-` } : {}, redirect: "follow", signal });
    if (!response.ok) throw new Error(`No se pudo descargar ${file.path} (HTTP ${response.status}).`);
    if (offset && response.status !== 206) offset = 0; // el servidor no reanuda: empezar de nuevo
    const handle = await fsp.open(partial, offset ? "a" : "w");
    try {
      for await (const chunk of response.body) {
        await handle.write(chunk);
        onBytes(chunk.length);
      }
    } finally {
      await handle.close();
    }
  }
  if (!(await fileMatches(partial, file))) {
    await fsp.rm(partial, { force: true });
    throw new Error(`El archivo ${file.path} llegó dañado o fue modificado (sha256 no coincide).`);
  }
  await fsp.rename(partial, destination);
}

/* ---------- Estado instalado ---------- */

export function appPaths(root, appId) {
  const base = path.join(root, "apps", safeRelative(appId));
  return { base, versions: path.join(base, "versions"), staging: path.join(base, "staging"), state: path.join(base, "state.json") };
}

export async function readInstallState(root, appId) {
  try { return JSON.parse(await fsp.readFile(appPaths(root, appId).state, "utf8")); } catch { return null; }
}

async function writeJsonAtomic(filename, value) {
  await fsp.mkdir(path.dirname(filename), { recursive: true });
  await fsp.writeFile(`${filename}.tmp`, `${JSON.stringify(value, null, 2)}\n`, "utf8");
  await fsp.rename(`${filename}.tmp`, filename);
}

// Qué archivos hay que bajar: los que no existen o cambiaron respecto de la versión instalada.
export function planUpdate(installedFiles = [], manifestFiles = []) {
  const installed = new Map(installedFiles.map(file => [file.path, file]));
  const reuse = [];
  const download = [];
  for (const file of manifestFiles) {
    const current = installed.get(file.path);
    if (current && current.sha256 === file.sha256 && current.size === file.size) reuse.push(file);
    else download.push(file);
  }
  return { reuse, download, downloadBytes: download.reduce((sum, file) => sum + file.size, 0) };
}

/* ---------- Instalar / actualizar una app ---------- */

// manifestApp: entrada de la app en el manifiesto. source(file) → URL https del archivo,
// o { localPath } para instalar desde una carpeta (USB) sin internet.
export async function installApp(root, manifestApp, { source, onProgress = () => {}, signal, fetchImpl } = {}) {
  const appId = safeRelative(manifestApp.id);
  const paths = appPaths(root, appId);
  const state = await readInstallState(root, appId);
  const files = manifestApp.files.map(file => ({ ...file, path: safeRelative(file.path) }));
  const versionDir = `${manifestApp.version}-${crypto.createHash("sha256").update(JSON.stringify(files.map(file => [file.path, file.sha256]))).digest("hex").slice(0, 8)}`;
  if (state?.current?.dir === versionDir) return { changed: false, state, downloaded: 0 };

  const currentDir = state?.current ? path.join(paths.versions, state.current.dir) : null;
  const plan = planUpdate(state?.current?.files || [], files);
  const stagingDir = path.join(paths.staging, versionDir);
  await fsp.mkdir(stagingDir, { recursive: true });

  const total = plan.downloadBytes || 1;
  let done = 0;
  onProgress({ phase: "download", percent: 0, files: plan.download.length, bytes: plan.downloadBytes });

  // 1. Reutilizar lo que no cambió (copia local, verificada).
  for (const file of plan.reuse) {
    const target = inside(stagingDir, file.path);
    await fsp.mkdir(path.dirname(target), { recursive: true });
    const from = currentDir ? inside(currentDir, file.path) : null;
    if (from && await fileMatches(from, file)) await fsp.copyFile(from, target);
    else plan.download.push(file); // la copia local se dañó: se vuelve a bajar
  }

  // 2. Bajar solo lo que cambió.
  for (const file of plan.download) {
    const target = inside(stagingDir, file.path);
    if (await fileMatches(target, file)) { done += file.size; continue; } // ya quedó de un intento anterior
    const origin = source(file);
    if (origin?.localPath) {
      await fsp.mkdir(path.dirname(target), { recursive: true });
      await fsp.copyFile(origin.localPath, `${target}.part`);
      if (!(await fileMatches(`${target}.part`, file))) throw new Error(`El archivo ${file.path} de la carpeta no coincide con el manifiesto.`);
      await fsp.rename(`${target}.part`, target);
      done += file.size;
    } else {
      await downloadVerified(origin, target, file, { signal, fetchImpl, onBytes: bytes => { done += bytes; onProgress({ phase: "download", percent: Math.min(99, Math.round((done / total) * 100)) }); } });
    }
    onProgress({ phase: "download", percent: Math.min(99, Math.round((done / total) * 100)) });
  }

  // 3. Verificación completa antes de activar.
  onProgress({ phase: "verify", percent: 99 });
  for (const file of files) {
    if (!(await fileMatches(inside(stagingDir, file.path), file))) throw new Error(`Verificación fallida: ${file.path}`);
  }

  // 4. Activar: mover a versions/ y apuntar state.json (cambio atómico). La anterior queda para volver atrás.
  await fsp.mkdir(paths.versions, { recursive: true });
  const finalDir = path.join(paths.versions, versionDir);
  await fsp.rm(finalDir, { recursive: true, force: true });
  await fsp.rename(stagingDir, finalDir);
  const next = {
    appId,
    current: { version: manifestApp.version, dir: versionDir, files, installedAt: new Date().toISOString() },
    previous: state?.current || null
  };
  await writeJsonAtomic(paths.state, next);

  // 5. Limpiar versiones viejas (se conservan la actual y la anterior).
  const keep = new Set([next.current.dir, next.previous?.dir].filter(Boolean));
  for (const entry of await fsp.readdir(paths.versions)) {
    if (!keep.has(entry)) await fsp.rm(path.join(paths.versions, entry), { recursive: true, force: true });
  }
  await fsp.rm(paths.staging, { recursive: true, force: true });
  onProgress({ phase: "done", percent: 100 });
  return { changed: true, state: next, downloaded: plan.downloadBytes };
}

export async function rollbackApp(root, appId) {
  const paths = appPaths(root, appId);
  const state = await readInstallState(root, appId);
  if (!state?.previous) throw new Error("No hay una versión anterior guardada.");
  const next = { ...state, current: state.previous, previous: state.current };
  await writeJsonAtomic(paths.state, next);
  return next;
}

export function currentAppDir(root, state) {
  return state?.current ? path.join(appPaths(root, state.appId).versions, state.current.dir) : null;
}

/* ---------- Recursos grandes compartidos (modelos de Whisper) ---------- */

// Se guardan una sola vez en root/assets y no cambian con las versiones de la app.
export async function missingAssets(root, assets = []) {
  const missing = [];
  for (const asset of assets) {
    const target = inside(path.join(root, "assets"), asset.path);
    try {
      const stat = await fsp.stat(target);
      if (stat.size === asset.size) continue; // verificado con sha256 al descargarlo o importarlo
    } catch { /* falta */ }
    missing.push(asset);
  }
  return missing;
}

export async function installAssets(root, assets, { onProgress = () => {}, signal, fetchImpl, fromFolder = null } = {}) {
  const missing = await missingAssets(root, assets);
  const total = missing.reduce((sum, asset) => sum + asset.size, 0) || 1;
  let done = 0;
  for (const asset of missing) {
    const target = inside(path.join(root, "assets"), asset.path);
    const local = fromFolder ? await findLocalAsset(fromFolder, asset) : null;
    if (local) {
      await fsp.mkdir(path.dirname(target), { recursive: true });
      await fsp.copyFile(local, `${target}.part`);
      if (!(await fileMatches(`${target}.part`, asset))) { await fsp.rm(`${target}.part`, { force: true }); throw new Error(`${asset.path} de la carpeta está dañado.`); }
      await fsp.rename(`${target}.part`, target);
      done += asset.size;
    } else if (fromFolder) {
      continue; // importando desde carpeta: lo que no está ahí se deja para después
    } else {
      await downloadVerified(asset.url, target, asset, { signal, fetchImpl, onBytes: bytes => { done += bytes; onProgress({ percent: Math.min(99, Math.round((done / total) * 100)), file: asset.path }); } });
    }
    onProgress({ percent: Math.min(99, Math.round((done / total) * 100)), file: asset.path });
  }
  onProgress({ percent: 100 });
  return missingAssets(root, assets);
}

// Busca un modelo dentro de una carpeta copiada (USB): acepta la carpeta BMMS-PROJECT,
// la carpeta "models" o la carpeta "assets" de otro Central.
async function findLocalAsset(folder, asset) {
  const relative = safeRelative(asset.path);
  const withoutPrefix = relative.replace(/^models\//, "");
  const candidates = [
    path.join(folder, relative),
    path.join(folder, withoutPrefix),
    path.join(folder, "apps/graphics/public/vendor/models", withoutPrefix),
    path.join(folder, "vendor/models", withoutPrefix),
    path.join(folder, "assets", relative)
  ];
  for (const candidate of candidates) {
    try { if ((await fsp.stat(candidate)).size === asset.size) return candidate; } catch { /* siguiente */ }
  }
  return null;
}
