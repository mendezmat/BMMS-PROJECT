export function balanceText({
  text,
  measure,
  maxWidth,
  maxHeight,
  minFontSize = 28,
  maxFontSize = 76,
  lineHeight = 1.08,
  maxLines = 5
}) {
  const words = String(text || "").trim().split(/\s+/).filter(Boolean);
  if (!words.length) {
    return { lines: [], fontSize: maxFontSize, lineHeight, overflow: false, score: 0 };
  }

  for (let fontSize = maxFontSize; fontSize >= minFontSize; fontSize -= 2) {
    const result = findBestWrap({
      words,
      measure: value => measure(value, fontSize),
      maxWidth,
      maxLines
    });

    const height = result.lines.length * fontSize * lineHeight;
    if (result.lines.length && height <= maxHeight) {
      return {
        ...result,
        fontSize,
        lineHeight,
        overflow: false
      };
    }
  }

  const fallback = findBestWrap({
    words,
    measure: value => measure(value, minFontSize),
    maxWidth,
    maxLines: Math.max(maxLines, 8)
  });

  return {
    ...fallback,
    fontSize: minFontSize,
    lineHeight,
    overflow: true
  };
}

export function findBestWrap({ words, measure, maxWidth, maxLines }) {
  const candidates = [];
  const minimumLines = Math.max(1, Math.ceil(measure(words.join(" ")) / maxWidth));

  for (let lineCount = minimumLines; lineCount <= Math.min(maxLines, words.length); lineCount += 1) {
    const partitions = partitionWords(words, lineCount);
    for (const lines of partitions) {
      const widths = lines.map(measure);
      if (widths.some(width => width > maxWidth)) continue;
      candidates.push({
        lines,
        score: scoreLayout(widths, maxWidth, lines)
      });
    }
  }

  if (!candidates.length) {
    return greedyWrap(words, measure, maxWidth);
  }

  candidates.sort((a, b) => a.score - b.score);
  return candidates[0];
}

function partitionWords(words, lineCount) {
  const results = [];
  const current = [];

  function walk(start, remainingLines) {
    if (remainingLines === 1) {
      current.push(words.slice(start).join(" "));
      results.push([...current]);
      current.pop();
      return;
    }

    const maximumEnd = words.length - remainingLines + 1;
    for (let end = start + 1; end <= maximumEnd; end += 1) {
      current.push(words.slice(start, end).join(" "));
      walk(end, remainingLines - 1);
      current.pop();
    }
  }

  walk(0, lineCount);
  return results;
}

function scoreLayout(widths, maxWidth, lines) {
  const average = widths.reduce((sum, width) => sum + width, 0) / widths.length;
  const variance = widths.reduce((sum, width) => sum + ((width - average) ** 2), 0) / widths.length;
  const lastRatio = widths.at(-1) / Math.max(average, 1);
  const utilization = average / maxWidth;

  let score = variance / (maxWidth ** 2);
  score += Math.abs(0.78 - utilization) * 0.45;
  score += lastRatio < 0.48 ? (0.48 - lastRatio) * 1.5 : 0;
  score += lines.length * 0.018;

  const lastWords = lines.at(-1).split(/\s+/);
  if (lastWords.length === 1) score += 0.4;
  if (/^[,.;:!?]/.test(lastWords[0] || "")) score += 0.25;

  return Number(score.toFixed(6));
}

function greedyWrap(words, measure, maxWidth) {
  const lines = [];
  let line = "";

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (line && measure(candidate) > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }

  if (line) lines.push(line);
  return { lines, score: 999 };
}
