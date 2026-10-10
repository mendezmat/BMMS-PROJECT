#!/usr/bin/env node
// Genera el manifiesto firmado de BMMS Central (central/channel/stable.json + .sig).
//
//   node scripts/central-publish.mjs --init-key   → crea la llave de firma (una sola vez, fuera del repo)
//   node scripts/central-publish.mjs              → manifiesto para el commit actual (HEAD)
//
// Flujo: 1) commit de los cambios de las apps, 2) este script, 3) commit del manifiesto, 4) push.
// Los archivos de las apps se descargan desde raw.githubusercontent.com fijados al commit de HEAD,
// así que el contenido es inmutable; los hashes se calculan del contenido de ese commit.
// Los modelos de Whisper se descargan de huggingface.co fijados a una revisión.
import { execFileSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { signManifest, verifyManifest } from "../apps/central/src/updater.js";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const keyDir = process.env.BMMS_KEY_DIR || path.join(os.homedir(), ".bmms");
const privateKeyPath = path.join(keyDir, "central-signing-key.pem");
const publicKeyPath = path.join(projectRoot, "apps/central/src/central-public-key.pem");

if (process.argv.includes("--init-key")) {
  if (fs.existsSync(privateKeyPath)) { console.error(`Ya existe una llave en ${privateKeyPath}. No se sobrescribe.`); process.exit(1); }
  const { privateKey, publicKey } = crypto.generateKeyPairSync("ed25519");
  fs.mkdirSync(keyDir, { recursive: true, mode: 0o700 });
  fs.writeFileSync(privateKeyPath, privateKey.export({ type: "pkcs8", format: "pem" }), { mode: 0o600 });
  fs.writeFileSync(publicKeyPath, publicKey.export({ type: "spki", format: "pem" }));
  console.log(`Llave privada: ${privateKeyPath} (guárdala con copia de seguridad; NO va al repositorio).`);
  console.log(`Llave pública: ${path.relative(projectRoot, publicKeyPath)} (va dentro de Central).`);
  process.exit(0);
}

// Modo de prueba local: --local http://127.0.0.1:4190/ --out carpeta → usa los archivos tal como están
// en disco, servidos por un servidor local, y no toca central/channel.
const localIndex = process.argv.indexOf("--local");
const localBase = localIndex > 0 ? process.argv[localIndex + 1] : null;
const outIndex = process.argv.indexOf("--out");
const outDir = path.resolve(projectRoot, outIndex > 0 ? process.argv[outIndex + 1] : "central/channel");

const git = (...args) => execFileSync("git", args, { cwd: projectRoot, encoding: "buffer", maxBuffer: 256 * 1024 * 1024 });
const commit = git("rev-parse", "HEAD").toString().trim();
const catalog = JSON.parse(fs.readFileSync(path.join(projectRoot, "central/catalog.json"), "utf8"));
const rawBase = localBase || `https://raw.githubusercontent.com/${catalog.repository}/${commit}/`;

// Archivos del repositorio tal como están en HEAD (lo que servirá raw.githubusercontent.com).
function headFile(repoPath) {
  if (localBase) {
    const content = fs.readFileSync(path.join(projectRoot, repoPath));
    return { size: content.length, sha256: crypto.createHash("sha256").update(content).digest("hex") };
  }
  const dirty = git("status", "--porcelain", "--", repoPath).toString().trim();
  if (dirty) throw new Error(`${repoPath} tiene cambios sin commit. Haz commit antes de publicar.`);
  const content = git("show", `${commit}:${repoPath}`);
  return { size: content.length, sha256: crypto.createHash("sha256").update(content).digest("hex") };
}

function listHeadFiles(repoDir) {
  if (localBase) return fs.readdirSync(path.join(projectRoot, repoDir), { recursive: true }).map(name => path.posix.join(repoDir, String(name).split(path.sep).join("/"))).filter(name => fs.statSync(path.join(projectRoot, name)).isFile());
  return git("ls-tree", "-r", "--name-only", commit, "--", repoDir).toString().split("\n").filter(Boolean);
}

function packageFiles(spec) {
  const files = [];
  for (const [target, source] of Object.entries(spec)) {
    const sources = target.endsWith("/") ? listHeadFiles(source).map(repoPath => [target + repoPath.slice(source.length), repoPath]) : [[target, source]];
    if (!sources.length) throw new Error(`No hay archivos en HEAD para ${source}. ¿Falta hacer commit?`);
    for (const [packagePath, repoPath] of sources) files.push({ path: packagePath, src: repoPath, ...headFile(repoPath) });
  }
  return files.sort((a, b) => a.path.localeCompare(b.path));
}

async function modelAssets(assets) {
  const list = [];
  for (const model of assets.models) {
    for (const file of model.files) {
      const local = path.join(projectRoot, assets.localRoot, model.repo, file);
      if (!fs.existsSync(local)) throw new Error(`Falta ${local}. Ejecuta: node scripts/download-tb-model.mjs ${model.repo.split("/")[1]}`);
      const content = fs.readFileSync(local);
      const sha256 = crypto.createHash("sha256").update(content).digest("hex");
      const url = localBase ? `${localBase}${assets.localRoot}/${model.repo}/${file}` : `https://huggingface.co/${model.repo}/resolve/${model.revision}/${file}`;
      if (localBase) { list.push({ path: `models/${model.repo}/${file}`, url, size: content.length, sha256, group: model.label }); continue; }
      // Comprobar que la revisión fijada tiene exactamente este archivo.
      const head = await fetch(url, { method: "HEAD", redirect: "manual" });
      const remoteSha = (head.headers.get("x-linked-etag") || "").replace(/"/g, "");
      const remoteSize = Number(head.headers.get("x-linked-size") || head.headers.get("content-length"));
      if (remoteSha && remoteSha !== sha256) throw new Error(`${model.repo}/${file}: el archivo local no coincide con la revisión ${model.revision}.`);
      if (!remoteSha) {
        const remote = Buffer.from(await (await fetch(url, { redirect: "follow" })).arrayBuffer());
        if (crypto.createHash("sha256").update(remote).digest("hex") !== sha256) throw new Error(`${model.repo}/${file}: no coincide con la revisión ${model.revision}.`);
      } else if (remoteSize && remoteSize !== content.length) {
        throw new Error(`${model.repo}/${file}: tamaño distinto en la revisión ${model.revision}.`);
      }
      list.push({ path: `models/${model.repo}/${file}`, url, size: content.length, sha256, group: model.label });
    }
  }
  return list;
}

const apps = [];
for (const app of catalog.apps) {
  const entry = { id: app.id, name: app.name, status: app.status, category: app.category, color: app.color, summary: app.summary };
  if (app.status === "available") {
    Object.assign(entry, { version: app.version, entry: app.entry, files: packageFiles(app.package) });
    entry.files = entry.files.map(file => ({ ...file, url: rawBase + file.src }));
    if (app.assets) entry.assets = await modelAssets(app.assets);
  }
  apps.push(entry);
}

const manifest = { schema: 1, channel: "stable", publishedAt: new Date().toISOString(), commit, apps };
const bytes = Buffer.from(`${JSON.stringify(manifest, null, 2)}\n`);
if (!fs.existsSync(privateKeyPath)) throw new Error(`No hay llave de firma en ${privateKeyPath}. Ejecuta: node scripts/central-publish.mjs --init-key`);
const signature = signManifest(bytes, fs.readFileSync(privateKeyPath, "utf8"));
verifyManifest(bytes, signature, fs.readFileSync(publicKeyPath, "utf8")); // la llave pública de Central debe validarla
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "stable.json"), bytes);
fs.writeFileSync(path.join(outDir, "stable.json.sig"), `${signature}\n`);
for (const app of apps.filter(item => item.files)) {
  const size = app.files.reduce((sum, file) => sum + file.size, 0);
  const assets = (app.assets || []).reduce((sum, file) => sum + file.size, 0);
  console.log(`${app.name} ${app.version}: ${app.files.length} archivos (${(size / 1e6).toFixed(1)} MB) + modelos ${(assets / 1e6).toFixed(0)} MB`);
}
console.log(`Manifiesto firmado para el commit ${commit.slice(0, 7)}. Ahora: git add central/channel && git commit && git push.`);
