import test from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs/promises";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import { installApp, planUpdate, readInstallState, rollbackApp, safeRelative, signManifest, verifyManifest, currentAppDir, installAssets, missingAssets } from "../src/updater.js";

const sha = text => crypto.createHash("sha256").update(text).digest("hex");
const fileEntry = (filePath, text) => ({ path: filePath, size: Buffer.byteLength(text), sha256: sha(text) });

async function serve(files) {
  const requests = [];
  const server = http.createServer((request, response) => {
    const name = decodeURIComponent(request.url.slice(1));
    requests.push(name);
    if (!(name in files)) { response.writeHead(404); response.end(); return; }
    response.writeHead(200); response.end(files[name]);
  });
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  return { base: `http://127.0.0.1:${server.address().port}/`, requests, close: () => server.close() };
}

test("a signed manifest verifies and any change to it is rejected", () => {
  const { privateKey, publicKey } = crypto.generateKeyPairSync("ed25519");
  const bytes = Buffer.from(JSON.stringify({ schema: 1, apps: [] }));
  const signature = signManifest(bytes, privateKey.export({ type: "pkcs8", format: "pem" }));
  const pem = publicKey.export({ type: "spki", format: "pem" });
  assert.equal(verifyManifest(bytes, signature, pem).schema, 1);
  assert.throws(() => verifyManifest(Buffer.from(JSON.stringify({ schema: 1, apps: [{ id: "evil" }] })), signature, pem), /firma/);
});

test("paths that escape the app folder are refused", () => {
  assert.equal(safeRelative("public/tb.js"), "public/tb.js");
  for (const bad of ["../x", "/etc/passwd", "a/../../b", "a//b", "C:\\x", "a/./b"]) assert.throws(() => safeRelative(bad));
});

test("only changed files are planned for download", () => {
  const v1 = [fileEntry("a.js", "1"), fileEntry("b.js", "2")];
  const v2 = [fileEntry("a.js", "1"), fileEntry("b.js", "22"), fileEntry("c.js", "3")];
  const plan = planUpdate(v1, v2);
  assert.deepEqual(plan.reuse.map(file => file.path), ["a.js"]);
  assert.deepEqual(plan.download.map(file => file.path), ["b.js", "c.js"]);
});

test("install, incremental update, tamper detection and rollback", async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "central-"));
  const remote = { "v1/a.js": "console.log(1)", "v1/b.js": "B1", "v2/b.js": "B2", "bad/b.js": "B2-tampered" };
  const server = await serve(remote);
  try {
    const app1 = { id: "tb-tool", version: "1.0.0", files: [{ ...fileEntry("a.js", remote["v1/a.js"]), src: "v1/a.js" }, { ...fileEntry("public/b.js", remote["v1/b.js"]), src: "v1/b.js" }] };
    await installApp(root, app1, { source: file => server.base + file.src });
    let state = await readInstallState(root, "tb-tool");
    assert.equal(state.current.version, "1.0.0");
    assert.equal(await fs.readFile(path.join(currentAppDir(root, state), "public/b.js"), "utf8"), "B1");

    // v2: solo cambia b.js → solo se descarga b.js
    server.requests.length = 0;
    const app2 = { id: "tb-tool", version: "1.0.1", files: [app1.files[0], { ...fileEntry("public/b.js", remote["v2/b.js"]), src: "v2/b.js" }] };
    const result = await installApp(root, app2, { source: file => server.base + file.src });
    assert.deepEqual(server.requests, ["v2/b.js"]);
    assert.equal(result.downloaded, Buffer.byteLength("B2"));
    state = await readInstallState(root, "tb-tool");
    assert.equal(state.current.version, "1.0.1");
    assert.equal(state.previous.version, "1.0.0");

    // Archivo alterado en el servidor: se rechaza y la versión activa no cambia.
    const evil = { id: "tb-tool", version: "1.0.2", files: [app1.files[0], { ...fileEntry("public/b.js", "B3"), src: "bad/b.js" }] };
    await assert.rejects(installApp(root, evil, { source: file => server.base + file.src }), /dañado|sha256/);
    assert.equal((await readInstallState(root, "tb-tool")).current.version, "1.0.1");

    // Volver atrás con un clic.
    state = await rollbackApp(root, "tb-tool");
    assert.equal(state.current.version, "1.0.0");
    assert.equal(await fs.readFile(path.join(currentAppDir(root, state), "public/b.js"), "utf8"), "B1");
  } finally {
    server.close();
    await fs.rm(root, { recursive: true, force: true });
  }
});

test("models download once and can be imported from a folder", async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "central-assets-"));
  const usb = await fs.mkdtemp(path.join(os.tmpdir(), "central-usb-"));
  const server = await serve({ "m/config.json": "{}" });
  try {
    const assets = [{ path: "models/org/m/config.json", url: `${server.base}m/config.json`, ...fileEntry("x", "{}") }, { path: "models/org/m/onnx/model.onnx", url: `${server.base}missing`, ...fileEntry("x", "WEIGHTS") }];
    assets[0].path = "models/org/m/config.json"; assets[1].path = "models/org/m/onnx/model.onnx";
    await fs.mkdir(path.join(usb, "apps/graphics/public/vendor/models/org/m/onnx"), { recursive: true });
    await fs.writeFile(path.join(usb, "apps/graphics/public/vendor/models/org/m/onnx/model.onnx"), "WEIGHTS");
    let missing = await installAssets(root, assets, { fromFolder: usb });
    assert.deepEqual(missing.map(asset => asset.path), ["models/org/m/config.json"]);
    missing = await installAssets(root, missing);
    assert.equal(missing.length, 0);
    assert.equal((await missingAssets(root, assets)).length, 0);
  } finally {
    server.close();
    await fs.rm(root, { recursive: true, force: true });
    await fs.rm(usb, { recursive: true, force: true });
  }
});
