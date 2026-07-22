export class Logger {
  constructor(scope = "BMMS") {
    this.scope = scope;
  }

  #write(level, message, context = {}) {
    const entry = {
      timestamp: new Date().toISOString(),
      level,
      scope: this.scope,
      message,
      context
    };
    const method = level === "ERROR" ? "error" : level === "WARN" ? "warn" : "log";
    console[method](JSON.stringify(entry));
  }

  info(message, context) { this.#write("INFO", message, context); }
  warn(message, context) { this.#write("WARN", message, context); }
  error(message, context) { this.#write("ERROR", message, context); }
}
