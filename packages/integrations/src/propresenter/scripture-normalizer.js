import {
  createVerse,
  parseScriptureText
} from "../../../scripture-core/src/index.js";

export function normalizeProPresenterScripture(payload = {}) {
  const candidateText =
    payload.text ??
    payload.currentText ??
    payload.slideText ??
    payload.presentationText ??
    "";

  const candidateReference =
    payload.reference ??
    payload.bibleReference ??
    payload.title ??
    "";

  const parsed = parseScriptureText(candidateText, {
    reference: candidateReference,
    version: payload.version ?? payload.translation ?? ""
  });

  return createVerse({
    ...parsed,
    source: "propresenter",
    presentationId:
      payload.presentationId ??
      payload.presentation?.id ??
      payload.presentation?.uuid ??
      "",
    slideIndex:
      payload.slideIndex ??
      payload.index ??
      payload.slide?.index ??
      null,
    receivedAt: payload.receivedAt
  });
}
