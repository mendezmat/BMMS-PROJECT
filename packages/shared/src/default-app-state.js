import { defaultLowerThird } from "./default-lower-third.js";
import { defaultProjectSettings } from "./default-project-settings.js";

export const defaultAppState = Object.freeze({
  lowerThird: defaultLowerThird,
  settings: defaultProjectSettings,
  scripture: {
    source: "manual",
    design: "classic",
    format: "lower",
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
      alignment: "center",
      maxLines: 4,
      balance: true,
      bottom: 28,
      width: 1660,
      horizontalPadding: 72
    },
    appearance: {
      selectedElement: "both",
      fontFamily: "Montserrat",
      fontSize: 36,
      fontWeight: 500,
      titleFont: "Montserrat",
      bodyFont: "Montserrat",
      titleSize: 44,
      bodySize: 36,
      titleWeight: 800,
      bodyWeight: 500,
      lineHeight: 1.16,
      letterSpacing: -0.01,
      titleColor: "#ffffff",
      textColor: "#ffffff",
      lineColor: "rgba(255,255,255,0.90)",
      backgroundColor: "#000000"
    },
    gradient: {
      mode: "adaptive",
      color: "#000000",
      opacity: 0.96,
      height: 430,
      softness: 58,
      edgeFade: 150,
      edgeFadeEnabled: true
    },
    animation: {
      in: "legacy",
      out: "legacy",
      durationMs: 360,
      sameChapterOutMs: 100,
      sameChapterInMs: 170,
      chapterChangeMs: 320,
      bookChangeMs: 420,
      wordCascade: true,
      wordCascadeStepMs: 18
    },
    broadcast: {
      preview: null,
      program: null,
      visible: false,
      autoTake: false
    },
    output: {
      visible: false
    }
  }
});
