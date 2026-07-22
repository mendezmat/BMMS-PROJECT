export function buildGraphicsDataContext(appState = {}) {
  const scriptureState = appState.scripture || {};
  const active =
    scriptureState.source === "propresenter"
      ? scriptureState.propresenter || {}
      : scriptureState.manual || {};

  return {
    scripture: {
      reference: active.reference || "",
      version: active.version || "",
      text: active.text || "",
      presentation: active.presentation || "",
      slideIndex: active.slideIndex ?? ""
    },
    lowerThird: {
      title: appState.lowerThird?.title || "",
      subtitle: appState.lowerThird?.subtitle || ""
    },
    system: {
      now: new Date().toISOString()
    }
  };
}
