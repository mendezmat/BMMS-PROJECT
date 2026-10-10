#!/usr/bin/env node
// Descarga el modelo Whisper oficial (onnx-community en huggingface.co) para la
// transcripción sin internet del TB Tool. Se puede repetir: omite lo ya descargado.
//
//   node scripts/download-tb-model.mjs            → whisper-small (predeterminado)
//   node scripts/download-tb-model.mjs whisper-base
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const model = process.argv[2] || "whisper-small";
if (!/^whisper-(tiny|base|small)$/.test(model)) {
  console.error("Modelo no válido. Usa whisper-tiny, whisper-base o whisper-small.");
  process.exit(1);
}
const repo = `onnx-community/${model}`;
const target = path.join(projectRoot, "apps/graphics/public/vendor/models", repo);

const FILES = [
  "config.json",
  "generation_config.json",
  "preprocessor_config.json",
  "tokenizer.json",
  "tokenizer_config.json",
  // WebGPU (Chrome en Mac Apple Silicon): codificador fp16 + decodificador q4.
  ...(model === "whisper-small" ? ["onnx/encoder_model_fp16.onnx"] : []), // base en fp16 da texto basura en WebGPU
  "onnx/decoder_model_merged_q4.onnx",
  // Sin WebGPU (WASM): codificador q8; el decodificador q4 sirve para ambos.
  "onnx/encoder_model_quantized.onnx"
];

async function download(file) {
  const destination = path.join(target, file);
  const url = `https://huggingface.co/${repo}/resolve/main/${file}`;
  const head = await fetch(url, { method: "HEAD", redirect: "follow" });
  if (!head.ok) throw new Error(`${file}: HTTP ${head.status}`);
  const expected = Number(head.headers.get("content-length")) || null;
  try {
    const { size } = await fs.stat(destination);
    if (expected && size === expected) { console.log(`✓ ${file} (ya estaba)`); return size; }
  } catch { /* no existe todavía */ }
  await fs.mkdir(path.dirname(destination), { recursive: true });
  const response = await fetch(url, { redirect: "follow" });
  if (!response.ok || !response.body) throw new Error(`${file}: HTTP ${response.status}`);
  const partial = `${destination}.part`;
  const handle = await fs.open(partial, "w");
  let received = 0;
  let lastLog = 0;
  try {
    for await (const chunk of response.body) {
      await handle.write(chunk);
      received += chunk.length;
      if (expected && Date.now() - lastLog > 2000) {
        lastLog = Date.now();
        process.stdout.write(`  ${file}: ${Math.round((received / expected) * 100)}%\r`);
      }
    }
  } finally {
    await handle.close();
  }
  if (expected && received !== expected) throw new Error(`${file}: descarga incompleta (${received}/${expected} bytes)`);
  await fs.rename(partial, destination);
  console.log(`✓ ${file} (${(received / 1e6).toFixed(1)} MB)`);
  return received;
}

let total = 0;
for (const file of FILES) total += await download(file);
console.log(`\nModelo ${repo} listo en ${path.relative(projectRoot, target)} (${(total / 1e6).toFixed(0)} MB).`);
