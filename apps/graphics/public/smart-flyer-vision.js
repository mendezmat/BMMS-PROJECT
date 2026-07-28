/** BMMS Vision Engine 1.0 — deterministic OCR cleanup and semantic classification. */
const MONTHS = "enero febrero marzo abril mayo junio julio agosto septiembre octubre noviembre diciembre".split(" ");
const DAYS = "lunes martes miércoles miercoles jueves viernes sábado sabado domingo".split(" ");

export function normalizeVisionText(value = "") {
  return String(value)
    .replace(/[|]/g, "I")
    .replace(/[“”„]/g, '"')
    .replace(/[’‘]/g, "'")
    .replace(/\s+/g, " ")
    .replace(/\s+([,.;:])/g, "$1")
    .trim();
}

export function lineQuality(value = "", confidence = 0) {
  const text = normalizeVisionText(value);
  if (text.length < 2) return 0;
  const chars = [...text];
  const letters = chars.filter(c => /[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9]/.test(c)).length;
  const noise = chars.filter(c => /[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9\s.,:;#@+\-/&'()]/.test(c)).length;
  const readableRatio = letters / Math.max(chars.length, 1);
  const repeatedNoise = /(.)\1{3,}|(?:[=<>_\[\]{}]){2,}/.test(text) ? 0.35 : 0;
  const conf = Math.max(0, Math.min(1, Number(confidence || 0) / 100));
  return Math.max(0, Math.min(1, readableRatio * 0.58 + conf * 0.42 - noise / chars.length - repeatedNoise));
}

export function cleanVisionLines(lines = []) {
  const seen = new Set();
  return lines.map((line, index) => {
    const text = normalizeVisionText(line.text ?? line.rawValue ?? line);
    const confidence = Number(line.confidence ?? 65);
    const quality = lineQuality(text, confidence);
    return { text, confidence, quality, bbox: line.bbox || null, index };
  }).filter(line => {
    const key = line.text.toLocaleLowerCase("es");
    if (line.quality < 0.48 || line.text.length > 140 || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function scoreDate(text) {
  const lower = text.toLocaleLowerCase("es");
  const month = MONTHS.some(m => lower.includes(m));
  const day = DAYS.some(d => lower.includes(d));
  const numeric = /\b(?:0?[1-9]|[12]\d|3[01])[\/.-](?:0?[1-9]|1[0-2])(?:[\/.-]\d{2,4})?\b/.test(text);
  return month ? 0.98 : numeric ? 0.94 : day && /\d/.test(text) ? 0.88 : 0;
}
function scoreTime(text) { return /\b(?:[01]?\d|2[0-3])[:.]\d{2}\s*(?:h(?:rs?)?|am|pm)?\b/i.test(text) ? 0.98 : 0; }
function scoreLocation(text) { return /\b(?:calle|avenida|av\.?|pasaje|ruta|camino|iglesia|templo|sal[oó]n|auditorio|centro|ipa|#\s*\d+|\d{3,})\b/i.test(text) ? 0.88 : 0; }

export function classifyVisionLines(rawLines = []) {
  const lines = cleanVisionLines(rawLines);
  const used = new Set();
  const takeBest = scorer => {
    const ranked = lines.map((line, i) => ({ ...line, i, semantic: scorer(line.text) }))
      .filter(x => x.semantic > 0 && !used.has(x.i))
      .sort((a,b) => (b.semantic * b.quality) - (a.semantic * a.quality));
    const best = ranked[0]; if (!best) return null; used.add(best.i); return best;
  };
  const date = takeBest(scoreDate), time = takeBest(scoreTime), location = takeBest(scoreLocation);
  const candidates = lines.map((line, i) => ({...line, i})).filter(x => !used.has(x.i));
  const titleCandidates = candidates.filter(x => x.text.length >= 4 && x.text.length <= 65)
    .sort((a,b) => ((b.bbox?.height || 0) - (a.bbox?.height || 0)) || (b.quality-a.quality) || (b.text.length-a.text.length));
  const title = titleCandidates[0] || candidates[0] || null;
  if (title) used.add(title.i);
  const subtitle = candidates.filter(x => !used.has(x.i) && x.text.length <= 85)
    .sort((a,b) => b.quality-a.quality)[0] || null;
  if (subtitle) used.add(subtitle.i);
  const extra = lines.filter((_,i)=>!used.has(i)).slice(0,4);
  const field = (item, semantic=0.75) => ({ value:item?.text || "", confidence: item ? Math.round(Math.min(99, (item.quality*0.55+semantic*0.45)*100)) : 0 });
  return {
    document: {
      title: field(title,0.9), subtitle: field(subtitle,0.72), date: field(date,date?.semantic||0),
      time: field(time,time?.semantic||0), location: field(location,location?.semantic||0),
      additionalInfo: { value: extra.map(x=>x.text).join(" · "), confidence: extra.length ? Math.round(extra.reduce((s,x)=>s+x.quality,0)/extra.length*100) : 0 }
    },
    lines,
    rejectedCount: Math.max(0, rawLines.length-lines.length),
    averageConfidence: lines.length ? Math.round(lines.reduce((s,x)=>s+x.quality,0)/lines.length*100) : 0
  };
}
