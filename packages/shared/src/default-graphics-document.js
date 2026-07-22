import { createElement, createGraphicsDocument } from "../../graphics-engine/src/index.js";

export const defaultGraphicsDocument = createGraphicsDocument({
  id: "bmms-default-document",
  name: "BMMS Visual Editor",
  width: 1920,
  height: 1080,
  background: "#0d1015",
  elements: [
    createElement("shape", {
      id: "default-accent",
      name: "Accent",
      x: 130,
      y: 735,
      width: 26,
      height: 190,
      fill: "#2c73ff",
      radius: 13
    }),
    createElement("text", {
      id: "default-title",
      name: "Title",
      x: 190,
      y: 720,
      width: 920,
      height: 120,
      text: "BMMS VISUAL EDITOR",
      contentMode: "manual",
      bindingTemplate: "{scripture.reference}",
      fontSize: 72,
      fontWeight: 800
    }),
    createElement("text", {
      id: "default-subtitle",
      name: "Subtitle",
      x: 194,
      y: 850,
      width: 860,
      height: 70,
      text: "Motor gráfico compartido para broadcast",
      contentMode: "manual",
      bindingTemplate: "{scripture.text}",
      fontSize: 34,
      fontWeight: 400,
      color: "#b9c0ca"
    })
  ]
});
