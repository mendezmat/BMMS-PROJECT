const clean = value => String(value || "").replace(/\s+/g, " ").replace(/[|]/g, "I").trim();

const readable = value => {
  const text = clean(value);
  if (!text) return "";
  const useful = [...text].filter(character => /[\p{L}\p{N}\s.,:+#&'’/-]/u.test(character)).length / text.length;
  return useful >= .86 && !/(.)\1{3,}/.test(text) ? text : "";
};

export function trustedDetection(lines = [], analysis = {}) {
  const records = lines.map(line => ({ text: readable(line.text), confidence: Number(line.confidence || 0) })).filter(line => line.text);
  const raw = records.map(line => line.text);
  const joined = raw.join(" · ");
  const detected = {};
  const titleCandidate = readable(analysis.document?.title?.value);
  const titleConfidence = Number(analysis.document?.title?.confidence || 0);
  if (titleConfidence >= 82 && titleCandidate.length >= 10 && /\p{L}+\s+\p{L}+/u.test(titleCandidate) && !/\b\d{1,2}[:.]\d{2}\b/.test(titleCandidate)) detected.title = titleCandidate.slice(0, 80);
  const subtitleCandidate = readable(analysis.document?.subtitle?.value);
  if (Number(analysis.document?.subtitle?.confidence || 0) >= 82 && subtitleCandidate.length >= 6) detected.subtitle = subtitleCandidate.slice(0, 100);
  const date = joined.match(/\b(?:lunes|martes|mi[eé]rcoles|jueves|viernes|s[aá]bado|domingo)?\s*\d{1,2}\s+de\s+[a-záéíóúüñ]+(?:\s+de\s+\d{4})?\b/iu)?.[0]
    || joined.match(/\b\d{1,2}[/-]\d{1,2}(?:[/-]\d{2,4})?\b/)?.[0];
  if (date) detected.date = clean(date).slice(0, 40);
  const time = joined.match(/\b(?:[01]?\d|2[0-3])[:.]\d{2}\s*(?:h(?:rs?)?\.?|a\.?m\.?|p\.?m\.?)?\b/i)?.[0];
  if (time) detected.time = clean(time).slice(0, 30);
  const location = records.map(record => {
    const match = record.text.match(/\b(?:iglesia|templo|sal[oó]n|auditorio|centro|ipa|avenida|calle|pasaje|ruta|camino)\b/i);
    const value = match ? record.text.slice(match.index).replace(/^[^\p{L}\p{N}]+/u, "").trim() : "";
    const noise = value ? [...value].filter(character => !/[\p{L}\p{N}\s.,#&'’/-]/u.test(character)).length : 99;
    const startsAtKeyword = match?.index === 0 ? 1 : 0;
    return { ...record, value, score: startsAtKeyword * 30 + record.confidence - noise * 20 - value.length * .12 };
  }).filter(record => record.value.length >= 4 && record.value.length <= 90 && !/\b\d{1,2}\s+de\s+/i.test(record.value) && !/\b\d{1,2}[:.]\d{2}\b/.test(record.value))
    .sort((a, b) => b.score - a.score)[0]?.value;
  if (location) detected.location = location.slice(0, 90);
  return detected;
}
