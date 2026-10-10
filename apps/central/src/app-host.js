// BMMS Central — servidor local de una app instalada (TB Tool).
// Escucha solo en 127.0.0.1: nadie de la red puede entrar.
// Sirve los archivos de la versión activa, los modelos compartidos y la API de la app
// (ajustes y sesiones) con los datos en la carpeta de usuario, fuera de la app.
import fs from "node:fs";
import fsp from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { pathToFileURL } from "node:url";

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".wasm": "application/wasm",
  ".onnx": "application/octet-stream",
  ".svg": "image/svg+xml",
  ".png": "image/png"
};

function within(root, relative) {
  const target = path.resolve(root, `.${path.posix.normalize(`/${relative}`)}`);
  return target.startsWith(path.resolve(root) + path.sep) ? target : null;
}

export async function startAppHost({ appDir, assetsDir, dataDir, port = 4180 }) {
  const { createTbApi } = await import(`${pathToFileURL(path.join(appDir, "tb-api.js")).href}?v=${encodeURIComponent(path.basename(appDir))}`);
  await fsp.mkdir(dataDir, { recursive: true });
  const api = createTbApi({ dataDir });
  const publicDir = path.join(appDir, "public");
  const modelsDir = path.join(assetsDir, "models");

  const server = http.createServer(async (request, response) => {
    try {
      const url = new URL(request.url, "http://127.0.0.1");
      if (url.pathname.startsWith("/api/tb/") && await api.handle(request, response, url)) return;
      if (request.method !== "GET" && request.method !== "HEAD") { response.writeHead(405); response.end(); return; }
      let pathname;
      try { pathname = decodeURIComponent(url.pathname); } catch { response.writeHead(400); response.end(); return; }
      let filename;
      if (pathname === "/" || pathname === "/tb" || pathname === "/tb/") filename = path.join(publicDir, "tb.html");
      else if (pathname.startsWith("/vendor/models/")) filename = within(modelsDir, pathname.slice("/vendor/models/".length));
      else filename = within(publicDir, pathname.slice(1));
      const type = filename && TYPES[path.extname(filename).toLowerCase()];
      const stat = type ? await fsp.stat(filename).catch(() => null) : null;
      if (!stat?.isFile()) { response.writeHead(404); response.end("Not found"); return; }
      const longCache = pathname.startsWith("/vendor/");
      response.writeHead(200, { "Content-Type": type, "Content-Length": stat.size, "Cache-Control": longCache ? "public, max-age=604800" : "no-store" });
      if (request.method === "HEAD") { response.end(); return; }
      fs.createReadStream(filename).on("error", () => response.destroy()).pipe(response);
    } catch (error) {
      if (!response.headersSent) response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      response.end(String(error?.message || error));
    }
  });

  // Puerto fijo para que el navegador recuerde los ajustes locales; si está ocupado, uno libre.
  const actualPort = await new Promise((resolve, reject) => {
    server.once("error", error => {
      if (error.code !== "EADDRINUSE" || port === 0) { reject(error); return; }
      server.listen(0, "127.0.0.1", () => resolve(server.address().port));
    });
    server.listen(port, "127.0.0.1", () => resolve(server.address().port));
  });

  return {
    url: `http://127.0.0.1:${actualPort}`,
    close: () => new Promise(resolve => server.close(() => resolve()))
  };
}
