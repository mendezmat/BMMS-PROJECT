import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";
import {
  ServiceContainer,
  EventBus,
  Logger,
  ConfigurationService
} from "../../packages/foundation/src/index.js";
import { OverlayRuntime } from "../../packages/overlay-runtime/src/index.js";
import { defaultAppState } from "../../packages/shared/src/default-app-state.js";
import { defaultGraphicsDocument } from "../../packages/shared/src/default-graphics-document.js";
import { buildGraphicsDataContext } from "../../packages/shared/src/build-graphics-data-context.js";
import { resolveDocument, createBroadcastComponent, listBroadcastComponents, createTemplate, duplicateTemplate, instantiateTemplate, updateTemplateMetadata } from "../../packages/graphics-engine/src/index.js";
import { ProPresenterAdapter, ProPresenterLiveScriptureService } from "../../packages/integrations/src/propresenter/index.js";
import { ScriptureController } from "../../packages/scripture-core/src/index.js";


function getLanAddresses() {
  const addresses = [];
  const interfaces = os.networkInterfaces();

  for (const entries of Object.values(interfaces)) {
    for (const entry of entries || []) {
      if (
        entry.family === "IPv4" &&
        !entry.internal &&
        !entry.address.startsWith("169.254.")
      ) {
        addresses.push(entry.address);
      }
    }
  }

  return [...new Set(addresses)];
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "../..");
const publicDir = path.join(__dirname, "public");
const configPath = path.join(projectRoot, "data", "bmms-state.json");
const connectionsPath = path.join(projectRoot, "data", "bmms-connections.json");

async function loadGlobalConnections() {
  try {
    return JSON.parse(await fs.readFile(connectionsPath, "utf8"));
  } catch {
    return {};
  }
}

async function saveGlobalConnections(connections) {
  await fs.mkdir(path.dirname(connectionsPath), { recursive: true });
  const temporaryPath = `${connectionsPath}.tmp`;
  await fs.writeFile(
    temporaryPath,
    `${JSON.stringify(connections, null, 2)}\n`,
    "utf8"
  );
  await fs.rename(temporaryPath, connectionsPath);
}

const services = new ServiceContainer();
const logger = services.register("logger", new Logger("graphics"));
const events = services.register("events", new EventBus());
const config = services.register(
  "configuration",
  new ConfigurationService(configPath, defaultAppState)
);


function mergeScriptureDefaults(defaults, saved = {}) {
  return {
    ...defaults,
    ...saved,
    manual: { ...defaults.manual, ...(saved.manual || {}) },
    propresenter: { ...defaults.propresenter, ...(saved.propresenter || {}) },
    composition: { ...defaults.composition, ...(saved.composition || {}) },
    appearance: { ...defaults.appearance, ...(saved.appearance || {}) },
    gradient: { ...defaults.gradient, ...(saved.gradient || {}) },
    animation: { ...defaults.animation, ...(saved.animation || {}) },
    broadcast: { ...defaults.broadcast, ...(saved.broadcast || {}) },
    output: { ...defaults.output, ...(saved.output || {}) }
  };
}

function hydrateAppState(saved = {}) {
  return {
    ...defaultAppState,
    ...saved,
    settings: {
      ...defaultAppState.settings,
      ...(saved.settings || {}),
      integrations: {
        ...defaultAppState.settings?.integrations,
        ...(saved.settings?.integrations || {}),
        propresenter: {
          ...defaultAppState.settings?.integrations?.propresenter,
          ...(saved.settings?.integrations?.propresenter || {})
        }
      }
    },
    scripture: mergeScriptureDefaults(
      defaultAppState.scripture,
      saved.scripture || {}
    )
  };
}

const savedAppState = await config.load();
const savedConnections = await loadGlobalConnections();
const persistedState = hydrateAppState({
  ...savedAppState,
  settings: {
    ...(savedAppState.settings || {}),
    integrations: {
      ...(savedAppState.settings?.integrations || {}),
      propresenter: {
        ...(savedAppState.settings?.integrations?.propresenter || {}),
        ...(savedConnections.propresenter || {})
      }
    }
  }
});
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

const scriptureController = services.register(
  "scriptureController",
  new ScriptureController({
    events,
    logger,
    autoTake: Boolean(persistedState.scripture?.autoTake?.enabled),
    autoTakeDelayMs: persistedState.scripture?.autoTake?.delayMs ?? 400
  })
);
const liveScripture = services.register(
  "liveScripture",
  new ProPresenterLiveScriptureService({
    adapter: proPresenter,
    events,
    logger,
    intervalMs: persistedState.scripture?.live?.intervalMs ?? 180
  })
);


if (proPresenter.getConfig().enabled && proPresenter.getConfig().autoConnect) {
  proPresenter.connect()
    .then(status => {
      if (status.connected) liveScripture.start();
    })
    .catch(error => {
      logger.error("Initial ProPresenter connection failed", {
        error: error.message
      });
    });
}

let appState = persistedState;
let scriptureBroadcast = {
  preview: persistedState.scripture?.broadcast?.preview || persistedState.scripture?.currentVerse || null,
  program:
    persistedState.scripture?.broadcast?.program ||
    (persistedState.scripture?.output?.visible ? persistedState.scripture?.currentVerse : null) ||
    null,
  visible: Boolean(
    persistedState.scripture?.broadcast?.visible ??
    persistedState.scripture?.output?.visible
  ),
  autoTake: Boolean(persistedState.scripture?.autoTake?.enabled)
};
let graphicsDocument = persistedState.graphicsDocument || defaultGraphicsDocument;
let templates = Array.isArray(persistedState.templates) ? persistedState.templates : [];
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
  broadcast("lower-third-updated", event.payload);
});

events.subscribe("integration.propresenter.status.changed", event => {
  broadcast("propresenter-status", event.payload);
});

events.subscribe("propresenter.scripture.status.changed", event => {
  broadcast("scripture-live-status", event.payload);
});

events.subscribe("propresenter.scripture.changed", async event => {
  const verse = scriptureController.receiveVerse(event.payload.verse);
  scriptureBroadcast.preview = verse;

  if (scriptureBroadcast.autoTake) {
    scriptureBroadcast.program = verse;
    scriptureBroadcast.visible = true;
  }

  const scripture = {
    ...appState.scripture,
    source: "propresenter",
    currentVerse: verse,
    autoTake: {
      ...(appState.scripture?.autoTake || {}),
      enabled: scriptureBroadcast.autoTake
    },
    broadcast: scriptureBroadcast,
    propresenter: {
      reference: verse.reference,
      version: verse.version,
      text: verse.text,
      presentation: verse.presentationId,
      slideIndex: verse.slideIndex,
      receivedAt: verse.receivedAt
    }
  };

  await saveState({ ...appState, scripture });
  broadcast("scripture-updated", scripture);
  broadcast("scripture-program", scriptureBroadcast);
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
  if (request.method === "GET" && url.pathname === "/overlay/scripture") {
    return serveFile(response, "scripture-overlay.html", "text/html; charset=utf-8");
  }
  if (request.method === "GET" && url.pathname === "/scripture-overlay.js") {
    return serveFile(response, "scripture-overlay.js", "text/javascript; charset=utf-8");
  }
  if (request.method === "GET" && url.pathname === "/scripture-overlay.css") {
    return serveFile(response, "scripture-overlay.css", "text/css; charset=utf-8");
  }
  if (request.method === "GET" && url.pathname === "/scripture-layout.js") {
    return serveFile(response, "scripture-layout.js", "text/javascript; charset=utf-8");
  }
  if (request.method === "GET" && url.pathname === "/scripture-balance.js") {
    return serveFile(response, "scripture-balance.js", "text/javascript; charset=utf-8");
  }
  if (request.method === "GET" && url.pathname === "/scripture") {
    return serveFile(response, "scripture.html", "text/html; charset=utf-8");
  }
  if (request.method === "GET" && url.pathname === "/scripture.js") {
    return serveFile(response, "scripture.js", "text/javascript; charset=utf-8");
  }
  if (request.method === "GET" && url.pathname === "/scripture.css") {
    return serveFile(response, "scripture.css", "text/css; charset=utf-8");
  }
  if (request.method === "GET" && url.pathname === "/editor") {
    return serveFile(response, "editor.html", "text/html; charset=utf-8");
  }
  if (request.method === "GET" && url.pathname === "/editor.js") {
    return serveFile(response, "editor.js", "text/javascript; charset=utf-8");
  }
  if (request.method === "GET" && url.pathname === "/editor.css") {
    return serveFile(response, "editor.css", "text/css; charset=utf-8");
  }
  if (request.method === "GET" && url.pathname === "/overlay/graphics") {
    return serveFile(response, "graphics-overlay.html", "text/html; charset=utf-8");
  }
  if (request.method === "GET" && url.pathname === "/graphics-overlay.js") {
    return serveFile(response, "graphics-overlay.js", "text/javascript; charset=utf-8");
  }
  if (request.method === "GET" && url.pathname === "/overlay/lower-third") {
    return serveFile(response, "overlay.html", "text/html; charset=utf-8");
  }



  if (request.method === "GET" && url.pathname === "/api/integrations/propresenter/status") {
    return json(response, 200, proPresenter.getStatus());
  }

  if (request.method === "POST" && url.pathname === "/api/integrations/propresenter/test") {
    try {
      const result = await proPresenter.testConnection();
      return json(response, 200, result);
    } catch (error) {
      return json(response, 503, {
        ok: false,
        error: error.message,
        status: proPresenter.getStatus()
      });
    }
  }

  if (request.method === "POST" && url.pathname === "/api/integrations/propresenter/connect") {
    const status = await proPresenter.connect();
    return json(response, status.connected ? 200 : 503, status);
  }

  if (request.method === "POST" && url.pathname === "/api/integrations/propresenter/disconnect") {
    return json(response, 200, await proPresenter.disconnect());
  }

  if (request.method === "POST" && url.pathname === "/api/scripture/preview/manual") {
    const incoming = await readJson(request);
    const verse = {
      id: `manual-${Date.now()}`,
      reference: String(incoming.reference || "").trim(),
      version: String(incoming.version || "").trim(),
      text: String(incoming.text || "").trim(),
      source: "manual",
      receivedAt: new Date().toISOString()
    };

    if (!verse.text) {
      return json(response, 400, { error: "Ingrese un texto antes de cargar Preview." });
    }

    scriptureBroadcast.preview = verse;
    if (scriptureBroadcast.autoTake) {
      scriptureBroadcast.program = verse;
      scriptureBroadcast.visible = true;
    }

    const scripture = {
      ...appState.scripture,
      source: "manual",
      currentVerse: verse,
      broadcast: scriptureBroadcast
    };
    await saveState({ ...appState, scripture });
    broadcast("scripture-updated", scripture);
    broadcast("scripture-program", scriptureBroadcast);
    return json(response, 200, scriptureBroadcast);
  }

  if (request.method === "GET" && url.pathname === "/api/scripture/program") {
    return json(response, 200, scriptureBroadcast);
  }

  if (request.method === "POST" && url.pathname === "/api/scripture/replay") {
    broadcast("scripture-replay", {
      ...scriptureBroadcast,
      replayId: Date.now()
    });
    return json(response, 200, { ok: true });
  }

  if (request.method === "POST" && url.pathname === "/api/scripture/take") {
    if (!scriptureBroadcast.preview) {
      return json(response, 409, { error: "No hay contenido en Preview." });
    }
    scriptureBroadcast.program = scriptureBroadcast.preview;
    scriptureBroadcast.visible = true;
    const scripture = {
      ...appState.scripture,
      broadcast: scriptureBroadcast
    };
    await saveState({ ...appState, scripture });
    broadcast("scripture-program", scriptureBroadcast);
    return json(response, 200, scriptureBroadcast);
  }

  if (request.method === "POST" && url.pathname === "/api/scripture/clear") {
    scriptureBroadcast.visible = false;
    const scripture = {
      ...appState.scripture,
      broadcast: scriptureBroadcast
    };
    await saveState({ ...appState, scripture });
    broadcast("scripture-program", scriptureBroadcast);
    return json(response, 200, scriptureBroadcast);
  }

  if (request.method === "POST" && url.pathname === "/api/scripture/auto") {
    const incoming = await readJson(request);
    scriptureBroadcast.autoTake = Boolean(incoming.enabled);
    scriptureController.setAutoTake(scriptureBroadcast.autoTake);

    if (scriptureBroadcast.autoTake && scriptureBroadcast.preview) {
      scriptureBroadcast.program = scriptureBroadcast.preview;
      scriptureBroadcast.visible = true;
    }

    const scripture = {
      ...appState.scripture,
      autoTake: {
        ...(appState.scripture?.autoTake || {}),
        enabled: scriptureBroadcast.autoTake
      },
      broadcast: scriptureBroadcast
    };
    await saveState({ ...appState, scripture });
    broadcast("scripture-program", scriptureBroadcast);
    return json(response, 200, scriptureBroadcast);
  }

  if (request.method === "GET" && url.pathname === "/api/scripture/current") {
    return json(response, 200, {
      ...scriptureController.getState(),
      persisted: appState.scripture
    });
  }

  if (request.method === "GET" && url.pathname === "/api/scripture/live/status") {
    return json(response, 200, liveScripture.getStatus());
  }

  if (request.method === "GET" && url.pathname === "/api/scripture/live/snapshot") {
    return json(response, 200, {
      snapshot: liveScripture.getSnapshot()
    });
  }

  if (request.method === "POST" && url.pathname === "/api/scripture/live/start") {
    const connection = await proPresenter.connect();
    if (!connection.connected) {
      return json(response, 503, {
        error: connection.lastError?.message || "ProPresenter is not connected.",
        connection
      });
    }
    liveScripture.start();
    return json(response, 200, liveScripture.getStatus());
  }

  if (request.method === "POST" && url.pathname === "/api/scripture/live/stop") {
    return json(response, 200, liveScripture.stop());
  }

  if (request.method === "POST" && url.pathname === "/api/scripture/live/sync") {
    const verse = await liveScripture.syncNow();
    return json(response, verse ? 200 : 202, {
      verse,
      status: liveScripture.getStatus()
    });
  }

  if (request.method === "GET" && url.pathname === "/api/templates") {
    return json(response, 200, { templates });
  }

  if (request.method === "POST" && url.pathname === "/api/templates") {
    try {
      const incoming = await readJson(request);
      const template = createTemplate(graphicsDocument, incoming);
      templates = [...templates, template];
      await saveState({ ...appState, graphicsDocument, templates });
      broadcast("templates-updated", templates);
      return json(response, 201, template);
    } catch (error) {
      return json(response, 400, { error: error.message });
    }
  }

  if (request.method === "POST" && /^\/api\/templates\/[^/]+\/load$/.test(url.pathname)) {
    const templateId = url.pathname.split("/")[3];
    const template = templates.find(item => item.id === templateId);
    if (!template) return json(response, 404, { error: "Template not found." });

    graphicsDocument = instantiateTemplate(template);
    await saveState({ ...appState, graphicsDocument, templates });
    broadcast("graphics-document-updated", graphicsDocument);
    return json(response, 200, graphicsDocument);
  }

  if (request.method === "POST" && /^\/api\/templates\/[^/]+\/duplicate$/.test(url.pathname)) {
    try {
      const templateId = url.pathname.split("/")[3];
      const source = templates.find(item => item.id === templateId);
      if (!source) return json(response, 404, { error: "Template not found." });
      const incoming = await readJson(request);
      const duplicate = duplicateTemplate(source, incoming.name);
      templates = [...templates, duplicate];
      await saveState({ ...appState, graphicsDocument, templates });
      broadcast("templates-updated", templates);
      return json(response, 201, duplicate);
    } catch (error) {
      return json(response, 400, { error: error.message });
    }
  }

  if (request.method === "PATCH" && /^\/api\/templates\/[^/]+$/.test(url.pathname)) {
    try {
      const templateId = url.pathname.split("/")[3];
      const incoming = await readJson(request);
      let found = false;
      templates = templates.map(template => {
        if (template.id !== templateId) return template;
        found = true;
        return updateTemplateMetadata(template, incoming);
      });
      if (!found) return json(response, 404, { error: "Template not found." });
      await saveState({ ...appState, graphicsDocument, templates });
      broadcast("templates-updated", templates);
      return json(response, 200, templates.find(item => item.id === templateId));
    } catch (error) {
      return json(response, 400, { error: error.message });
    }
  }

  if (request.method === "DELETE" && /^\/api\/templates\/[^/]+$/.test(url.pathname)) {
    const templateId = url.pathname.split("/")[3];
    const previousLength = templates.length;
    templates = templates.filter(template => template.id !== templateId);
    if (templates.length === previousLength) {
      return json(response, 404, { error: "Template not found." });
    }
    await saveState({ ...appState, graphicsDocument, templates });
    broadcast("templates-updated", templates);
    return json(response, 200, { deleted: templateId });
  }

  if (request.method === "GET" && url.pathname === "/api/editor/components") {
    return json(response, 200, { components: listBroadcastComponents() });
  }

  if (request.method === "POST" && url.pathname.startsWith("/api/editor/components/")) {
    try {
      const componentType = url.pathname.split("/").pop();
      const options = await readJson(request);
      const elements = createBroadcastComponent(componentType, options || {});
      graphicsDocument = {
        ...graphicsDocument,
        elements: [...graphicsDocument.elements, ...elements],
        updatedAt: new Date().toISOString()
      };
      await saveState({ ...appState, graphicsDocument });
      broadcast("graphics-document-updated", graphicsDocument);
      return json(response, 201, { document: graphicsDocument, elements });
    } catch (error) {
      return json(response, 400, { error: error.message });
    }
  }

  if (request.method === "GET" && url.pathname === "/api/editor/document") {
    return json(response, 200, graphicsDocument);
  }

  if (request.method === "POST" && url.pathname === "/api/editor/document") {
    try {
      const incoming = await readJson(request);
      if (!incoming || !Array.isArray(incoming.elements)) {
        return json(response, 400, { error: "Invalid graphics document." });
      }
      graphicsDocument = {
        ...incoming,
        width: 1920,
        height: 1080,
        updatedAt: new Date().toISOString()
      };
      await saveState({ ...appState, graphicsDocument });
      broadcast("graphics-document-updated", graphicsDocument);
      return json(response, 200, graphicsDocument);
    } catch (error) {
      return json(response, 400, { error: error.message });
    }
  }

  if (request.method === "GET" && url.pathname === "/api/graphics/output") {
    const context = buildGraphicsDataContext(appState);
    return json(response, 200, {
      document: resolveDocument(graphicsDocument, context),
      context
    });
  }

  if (request.method === "GET" && url.pathname === "/api/scripture/diagnostics") {
    return json(response, 200, {
      ok: true,
      version: appState.version || null,
      source: appState.scripture?.source,
      design: appState.scripture?.design,
      format: appState.scripture?.format,
      browserOutput: {
        html: true,
        javascript: true,
        stylesheet: true,
        layoutModule: true
      },
      broadcast: {
        visible: Boolean(scriptureBroadcast.visible),
        hasPreview: Boolean(scriptureBroadcast.preview?.text),
        hasProgram: Boolean(scriptureBroadcast.program?.text),
        autoTake: Boolean(scriptureBroadcast.autoTake)
      }
    });
  }

  if (request.method === "GET" && url.pathname === "/api/network") {
    const addresses = getLanAddresses();
    const preferredAddress = addresses[0] || "localhost";
    return json(response, 200, {
      port,
      host,
      addresses,
      preferredAddress,
      editorUrl: `http://${preferredAddress}:${port}`,
      scriptureOutputUrl: `http://${preferredAddress}:${port}/overlay/scripture`
    });
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
      await Promise.all([
        saveState({ ...appState, settings }),
        saveGlobalConnections({ propresenter: normalized })
      ]);
      return json(response, 200, {
        config: normalized,
        status: proPresenter.getStatus()
      });
    } catch (error) {
      return json(response, 400, { error: error.message });
    }
  }

  if (request.method === "GET" && url.pathname === "/api/settings/propresenter/persistence") {
    const savedConnections = await loadGlobalConnections();
    return json(response, 200, {
      persisted: Boolean(savedConnections.propresenter),
      config: savedConnections.propresenter || proPresenter.getConfig()
    });
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
        design: patch.design ?? appState.scripture.design ?? "classic",
        format: patch.format ?? appState.scripture.format ?? "lower",
        manual: { ...appState.scripture.manual, ...(patch.manual || {}) },
        propresenter: { ...appState.scripture.propresenter, ...(patch.propresenter || {}) },
        composition: { ...appState.scripture.composition, ...(patch.composition || {}) },
        appearance: { ...appState.scripture.appearance, ...(patch.appearance || {}) },
        gradient: { ...appState.scripture.gradient, ...(patch.gradient || {}) },
        animation: { ...appState.scripture.animation, ...(patch.animation || {}) },
        output: { ...appState.scripture.output, ...(patch.output || {}) },
        broadcast: scriptureBroadcast
      };
      await saveState({ ...appState, scripture });
      broadcast("scripture-updated", scripture);
      broadcast("scripture-config", scripture);
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
const host = process.env.BMMS_HOST || "0.0.0.0";
server.listen(port, host, () => {
  const addresses = getLanAddresses();
  logger.info("BMMS Graphics ready", {
    localEditor: `http://localhost:${port}`,
    lanEditors: addresses.map(address => `http://${address}:${port}`),
    scriptureOutputs: addresses.map(address => `http://${address}:${port}/overlay/scripture`)
  });
});
