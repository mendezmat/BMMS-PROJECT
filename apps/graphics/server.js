import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  ServiceContainer,
  EventBus,
  Logger,
  ConfigurationService
} from "../../packages/foundation/src/index.js";
import { OverlayRuntime } from "../../packages/overlay-runtime/src/index.js";
import { defaultLowerThird } from "../../packages/shared/src/default-lower-third.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "../..");
const publicDir = path.join(__dirname, "public");
const configPath = path.join(projectRoot, "data", "graphics-state.json");

const services = new ServiceContainer();
const logger = services.register("logger", new Logger("graphics"));
const events = services.register("events", new EventBus());
const config = services.register(
  "configuration",
  new ConfigurationService(configPath, defaultLowerThird)
);

const persistedState = await config.load();
const overlays = services.register(
  "overlays",
  new OverlayRuntime(persistedState)
);

events.subscribe("graphics.lower-third.updated", async (event) => {
  overlays.setState(event.payload);
  await config.save(event.payload);
});

function json(response, statusCode, body) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  response.end(JSON.stringify(body));
}

async function serveFile(response, filename, contentType) {
  try {
    const content = await fs.readFile(path.join(publicDir, filename));
    response.writeHead(200, {
      "Content-Type": contentType,
      "Cache-Control": "no-store"
    });
    response.end(content);
  } catch {
    response.writeHead(404);
    response.end("Not found");
  }
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);

  if (request.method === "GET" && url.pathname === "/") {
    return serveFile(response, "index.html", "text/html; charset=utf-8");
  }

  if (request.method === "GET" && url.pathname === "/app.js") {
    return serveFile(response, "app.js", "text/javascript; charset=utf-8");
  }

  if (request.method === "GET" && url.pathname === "/styles.css") {
    return serveFile(response, "styles.css", "text/css; charset=utf-8");
  }

  if (request.method === "GET" && url.pathname === "/overlay/lower-third") {
    return serveFile(response, "overlay.html", "text/html; charset=utf-8");
  }

  if (request.method === "GET" && url.pathname === "/api/state") {
    return json(response, 200, overlays.getState());
  }

  if (request.method === "GET" && url.pathname === "/api/events") {
    response.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
      "Access-Control-Allow-Origin": "*"
    });
    response.write("\n");
    overlays.attachClient(response);
    return;
  }

  if (request.method === "POST" && url.pathname === "/api/state") {
    let raw = "";
    request.on("data", chunk => raw += chunk);
    request.on("end", () => {
      try {
        const nextState = JSON.parse(raw || "{}");
        const current = overlays.getState();
        const merged = { ...current, ...nextState };
        events.publish(
          "graphics.lower-third.updated",
          merged,
          { source: "graphics.editor" }
        );
        json(response, 200, merged);
      } catch (error) {
        logger.error("Invalid state update", { error: error.message });
        json(response, 400, { error: "Invalid JSON payload." });
      }
    });
    return;
  }

  response.writeHead(404);
  response.end("Not found");
});

const port = Number(process.env.PORT || 4173);
server.listen(port, "127.0.0.1", () => {
  logger.info("BMMS Graphics ready", {
    editor: `http://localhost:${port}`,
    overlay: `http://localhost:${port}/overlay/lower-third`
  });
});
