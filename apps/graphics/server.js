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
import { defaultAppState } from "../../packages/shared/src/default-app-state.js";
import { ProPresenterAdapter } from "../../packages/integrations/src/propresenter/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "../..");
const publicDir = path.join(__dirname, "public");
const configPath = path.join(projectRoot, "data", "bmms-state.json");

const services = new ServiceContainer();
const logger = services.register("logger", new Logger("graphics"));
const events = services.register("events", new EventBus());
const config = services.register(
  "configuration",
  new ConfigurationService(configPath, defaultAppState)
);

const persistedState = await config.load();
const overlays = services.register(
  "overlays",
  new OverlayRuntime(persistedState.lowerThird)
);
const proPresenter = services.register(
  "propresenter",
  new ProPresenterAdapter({
    events,
    logger,
    config: persistedState.settings?.integrations?.propresenter
  })
);

let appState = persistedState;
const appClients = new Set();

function broadcast(type, payload) {
  const message = `event: ${type}\ndata: ${JSON.stringify(payload)}\n\n`;
  for (const client of appClients) client.write(message);
}

async function saveState(nextState) {
  appState = nextState;
  await config.save(appState);
  return appState;
}

events.subscribe("graphics.lower-third.updated", async event => {
  overlays.setState(event.payload);
  await saveState({ ...appState, lowerThird: event.payload });
});

events.subscribe("integration.propresenter.status.changed", event => {
  broadcast("propresenter-status", event.payload);
});

events.subscribe("propresenter.text.changed", async event => {
  const incoming = {
    ...appState.scripture.propresenter,
    ...event.payload,
    receivedAt: new Date().toISOString()
  };

  const scripture = {
    ...appState.scripture,
    propresenter: incoming
  };

  await saveState({ ...appState, scripture });
  broadcast("scripture-updated", scripture);
});

function json(response, statusCode, body) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  response.end(JSON.stringify(body));
}

async function readJson(request) {
  let raw = "";
  for await (const chunk of request) raw += chunk;
  return JSON.parse(raw || "{}");
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

  if (request.method === "GET" && url.pathname === "/api/app-state") {
    return json(response, 200, {
      ...appState,
      propresenterStatus: proPresenter.getStatus()
    });
  }

  if (request.method === "GET" && url.pathname === "/api/app-events") {
    response.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive"
    });
    response.write("\n");
    appClients.add(response);
    request.on("close", () => appClients.delete(response));
    return;
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
    try {
      const nextState = await readJson(request);
      const merged = { ...overlays.getState(), ...nextState };
      events.publish("graphics.lower-third.updated", merged, {
        source: "graphics.editor"
      });
      return json(response, 200, merged);
    } catch (error) {
      logger.error("Invalid state update", { error: error.message });
      return json(response, 400, { error: "Invalid JSON payload." });
    }
  }

  if (request.method === "POST" && url.pathname === "/api/settings/propresenter") {
    try {
      const incoming = await readJson(request);
      const normalized = proPresenter.updateConfig(incoming);
      const settings = {
        ...appState.settings,
        integrations: {
          ...appState.settings.integrations,
          propresenter: normalized
        }
      };
      await saveState({ ...appState, settings });
      return json(response, 200, {
        config: normalized,
        status: proPresenter.getStatus()
      });
    } catch (error) {
      return json(response, 400, { error: error.message });
    }
  }

  if (request.method === "POST" && url.pathname === "/api/propresenter/test") {
    try {
      const result = await proPresenter.testConnection();
      return json(response, 200, result);
    } catch (error) {
      return json(response, 400, { error: error.message });
    }
  }

  if (request.method === "POST" && url.pathname === "/api/scripture") {
    try {
      const patch = await readJson(request);
      const scripture = {
        ...appState.scripture,
        ...patch,
        manual: { ...appState.scripture.manual, ...patch.manual },
        propresenter: { ...appState.scripture.propresenter, ...patch.propresenter },
        composition: { ...appState.scripture.composition, ...patch.composition },
        appearance: { ...appState.scripture.appearance, ...patch.appearance },
        animation: { ...appState.scripture.animation, ...patch.animation },
        output: { ...appState.scripture.output, ...patch.output }
      };
      await saveState({ ...appState, scripture });
      broadcast("scripture-updated", scripture);
      return json(response, 200, scripture);
    } catch (error) {
      return json(response, 400, { error: error.message });
    }
  }

  if (request.method === "POST" && url.pathname === "/api/simulator/propresenter/scripture") {
    try {
      const payload = await readJson(request);
      proPresenter.publishTextChanged({
        reference: payload.reference || "Salmos 23:1",
        version: payload.version || "RVR1960",
        text: payload.text || "Jehová es mi pastor; nada me faltará.",
        presentation: payload.presentation || "Culto General",
        slideIndex: Number(payload.slideIndex ?? 1)
      });
      return json(response, 200, { ok: true });
    } catch (error) {
      return json(response, 400, { error: error.message });
    }
  }

  response.writeHead(404);
  response.end("Not found");
});

const port = Number(process.env.PORT || 4173);
const host = process.env.BMMS_HOST || "127.0.0.1";
server.listen(port, host, () => {
  logger.info("BMMS Graphics ready", {
    editor: `http://localhost:${port}`,
    overlay: `http://localhost:${port}/overlay/lower-third`
  });
});
