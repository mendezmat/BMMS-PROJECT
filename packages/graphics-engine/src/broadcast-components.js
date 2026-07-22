import { createElement } from "./document-model.js";

const COMPONENT_BUILDERS = {
  scripture: createScriptureComponent,
  lowerThird: createLowerThirdComponent
};

export function listBroadcastComponents() {
  return [
    {
      id: "scripture",
      name: "Versículo",
      description: "Referencia, texto bíblico y versión vinculados a Scripture.",
      category: "Iglesia"
    },
    {
      id: "lowerThird",
      name: "Lower Third",
      description: "Título y subtítulo vinculados al proveedor Lower Third.",
      category: "Broadcast"
    }
  ];
}

export function createBroadcastComponent(type, options = {}) {
  const builder = COMPONENT_BUILDERS[type];
  if (!builder) throw new Error(`Unsupported broadcast component: ${type}`);
  return builder(options);
}

export function createScriptureComponent(options = {}) {
  const componentId = options.componentId || crypto.randomUUID();
  const x = number(options.x, 150);
  const y = number(options.y, 650);
  const width = number(options.width, 1620);
  const accent = options.accent || "#2c73ff";

  return [
    createElement("shape", {
      id: crypto.randomUUID(),
      componentId,
      componentType: "scripture",
      componentRole: "background",
      name: "Scripture · Fondo",
      x,
      y,
      width,
      height: 300,
      fill: options.background || "#10141b",
      radius: 24,
      opacity: 0.94
    }),
    createElement("shape", {
      id: crypto.randomUUID(),
      componentId,
      componentType: "scripture",
      componentRole: "accent",
      name: "Scripture · Acento",
      x: x + 42,
      y: y + 42,
      width: 14,
      height: 216,
      fill: accent,
      radius: 7
    }),
    createElement("text", {
      id: crypto.randomUUID(),
      componentId,
      componentType: "scripture",
      componentRole: "reference",
      name: "Scripture · Referencia",
      x: x + 90,
      y: y + 35,
      width: width - 180,
      height: 58,
      text: "Juan 3:16",
      contentMode: "binding",
      bindingTemplate: "{scripture.reference}",
      fontFamily: "Inter",
      fontSize: 39,
      fontWeight: 800,
      color: accent,
      lineHeight: 1
    }),
    createElement("text", {
      id: crypto.randomUUID(),
      componentId,
      componentType: "scripture",
      componentRole: "text",
      name: "Scripture · Texto",
      x: x + 90,
      y: y + 105,
      width: width - 180,
      height: 135,
      text: "Porque de tal manera amó Dios al mundo...",
      contentMode: "binding",
      bindingTemplate: "{scripture.text}",
      fontFamily: "Inter",
      fontSize: 46,
      fontWeight: 600,
      color: "#ffffff",
      lineHeight: 1.18
    }),
    createElement("text", {
      id: crypto.randomUUID(),
      componentId,
      componentType: "scripture",
      componentRole: "version",
      name: "Scripture · Versión",
      x: x + width - 250,
      y: y + 248,
      width: 160,
      height: 32,
      text: "RVR1960",
      contentMode: "binding",
      bindingTemplate: "{scripture.version}",
      fontFamily: "Inter",
      fontSize: 20,
      fontWeight: 700,
      color: "#aeb7c4",
      align: "right",
      lineHeight: 1
    })
  ];
}

export function createLowerThirdComponent(options = {}) {
  const componentId = options.componentId || crypto.randomUUID();
  const x = number(options.x, 140);
  const y = number(options.y, 785);
  const width = number(options.width, 900);
  const accent = options.accent || "#2c73ff";

  return [
    createElement("shape", {
      id: crypto.randomUUID(),
      componentId,
      componentType: "lowerThird",
      componentRole: "background",
      name: "Lower Third · Fondo",
      x,
      y,
      width,
      height: 180,
      fill: options.background || "#10141b",
      radius: 18,
      opacity: 0.95
    }),
    createElement("shape", {
      id: crypto.randomUUID(),
      componentId,
      componentType: "lowerThird",
      componentRole: "accent",
      name: "Lower Third · Acento",
      x,
      y,
      width: 18,
      height: 180,
      fill: accent,
      radius: 9
    }),
    createElement("text", {
      id: crypto.randomUUID(),
      componentId,
      componentType: "lowerThird",
      componentRole: "title",
      name: "Lower Third · Título",
      x: x + 55,
      y: y + 27,
      width: width - 100,
      height: 72,
      text: "Nombre",
      contentMode: "binding",
      bindingTemplate: "{lowerThird.title}",
      fontFamily: "Inter",
      fontSize: 48,
      fontWeight: 800,
      color: "#ffffff",
      lineHeight: 1
    }),
    createElement("text", {
      id: crypto.randomUUID(),
      componentId,
      componentType: "lowerThird",
      componentRole: "subtitle",
      name: "Lower Third · Subtítulo",
      x: x + 58,
      y: y + 105,
      width: width - 110,
      height: 42,
      text: "Cargo",
      contentMode: "binding",
      bindingTemplate: "{lowerThird.subtitle}",
      fontFamily: "Inter",
      fontSize: 27,
      fontWeight: 500,
      color: "#aeb7c4",
      lineHeight: 1
    })
  ];
}

function number(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}
