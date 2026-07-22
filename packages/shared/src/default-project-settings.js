import { defaultProPresenterConfig } from "../../integrations/src/propresenter/default-config.js";

export const defaultProjectSettings = Object.freeze({
  integrations: {
    propresenter: defaultProPresenterConfig
  },
  scripture: {
    source: "manual",
    propresenter: {
      useGlobalIntegration: true,
      listenToText: true,
      listenToPresentationChanges: true
    },
    interface: {
      advancedSectionsCollapsed: true
    }
  },
  smartFlyer: {
    source: "upload",
    automationMode: "assisted",
    propresenter: {
      useGlobalIntegration: true,
      analyzeStaticMedia: true,
      ignoreVideo: true,
      ignoreRepeatedMedia: true,
      cooldownMs: 1500
    },
    interface: {
      advancedSectionsCollapsed: true
    }
  }
});
