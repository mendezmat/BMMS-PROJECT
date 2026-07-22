import fs from "node:fs/promises";
import path from "node:path";

export class ConfigurationService {
  constructor(filePath, defaults = {}) {
    this.filePath = filePath;
    this.defaults = structuredClone(defaults);
    this.value = structuredClone(defaults);
  }

  async load() {
    try {
      const raw = await fs.readFile(this.filePath, "utf8");
      this.value = { ...this.defaults, ...JSON.parse(raw) };
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
      await this.save(this.defaults);
    }
    return structuredClone(this.value);
  }

  get() {
    return structuredClone(this.value);
  }

  async save(nextValue) {
    this.value = { ...this.defaults, ...nextValue };
    await fs.mkdir(path.dirname(this.filePath), { recursive: true });
    await fs.writeFile(this.filePath, JSON.stringify(this.value, null, 2), "utf8");
    return this.get();
  }
}
