import { defaultLowerThird } from "./default-lower-third.js";
import { defaultProjectSettings } from "./default-project-settings.js";

export const defaultAppState = Object.freeze({
  lowerThird: defaultLowerThird,
  settings: defaultProjectSettings,
  scripture: {
    source: "manual",
    manual: {
      reference: "Juan 3:16",
      version: "RVR1960",
      text: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito..."
    },
    propresenter: {
      reference: "",
      version: "",
      text: "",
      presentation: "",
      slideIndex: null,
      receivedAt: null
    },
    composition: {
      layoutMode: "automatic",
      columns: 1,
      alignment: "left",
      maxLines: 6,
      balance: true
    },
    appearance: {
      selectedElement: "text",
      fontFamily: "Inter",
      fontSize: 48,
      fontWeight: 700,
      lineHeight: 1.12,
      textColor: "#ffffff",
      backgroundColor: "#10141a"
    },
    animation: {
      in: "fade-up",
      out: "fade-down",
      durationMs: 400
    },
    output: {
      visible: false
    }
  }
});
