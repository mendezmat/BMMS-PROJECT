import fs from "node:fs";
import path from "node:path";

const required = [
  "package.json",
  "README.md",
  "PROJECT-STATUS.md",
  "ROADMAP.md",
  "CHANGELOG.md",
  "apps/graphics/server.js",
  "packages/foundation/src/index.js",
  "packages/overlay-runtime/src/index.js"
];

const missing = required.filter(file => !fs.existsSync(path.resolve(file)));

if (missing.length) {
  console.error("Missing required repository files:");
  for (const file of missing) console.error(`- ${file}`);
  process.exit(1);
}

const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
if (pkg.private !== true) {
  console.error("The repository must remain private until licensing is finalized.");
  process.exit(1);
}

console.log("BMMS repository check passed.");
