# BMMS Hotfix 021 Validation

## repository_check
Exit code: 0

```text
BMMS repository check passed.

```

## tests
Exit code: 1

```text
TAP version 13
# Subtest: animation preview controls are connected
ok 1 - animation preview controls are connected
  ---
  duration_ms: 3.512598
  type: 'test'
  ...
# Subtest: editor animation playback uses requestAnimationFrame
ok 2 - editor animation playback uses requestAnimationFrame
  ---
  duration_ms: 1.103202
  type: 'test'
  ...
# Subtest: publishes a versioned event envelope
ok 3 - publishes a versioned event envelope
  ---
  duration_ms: 1.528685
  type: 'test'
  ...
# Subtest: registers and resolves a service
ok 4 - registers and resolves a service
  ---
  duration_ms: 0.592572
  type: 'test'
  ...
# Subtest: rejects duplicate registrations
ok 5 - rejects duplicate registrations
  ---
  duration_ms: 0.205356
  type: 'test'
  ...
# Subtest: normalizes an animation configuration
ok 6 - normalizes an animation configuration
  ---
  duration_ms: 2.052335
  type: 'test'
  ...
# Subtest: provides enter and exit animation defaults
ok 7 - provides enter and exit animation defaults
  ---
  duration_ms: 0.145016
  type: 'test'
  ...
# Subtest: creates slide keyframes
ok 8 - creates slide keyframes
  ---
  duration_ms: 0.301248
  type: 'test'
  ...
# Subtest: disabled animations produce no keyframes
ok 9 - disabled animations produce no keyframes
  ---
  duration_ms: 0.595156
  type: 'test'
  ...
# Subtest: lists built-in broadcast components
ok 10 - lists built-in broadcast components
  ---
  duration_ms: 1.019557
  type: 'test'
  ...
# Subtest: creates a Scripture component with shared component identity
ok 11 - creates a Scripture component with shared component identity
  ---
  duration_ms: 1.795602
  type: 'test'
  ...
# Subtest: creates a Lower Third component with live bindings
ok 12 - creates a Lower Third component with live bindings
  ---
  duration_ms: 0.347367
  type: 'test'
  ...
# Subtest: generic component factory rejects unknown components
ok 13 - generic component factory rejects unknown components
  ---
  duration_ms: 0.310232
  type: 'test'
  ...
# Subtest: gets nested values by path
ok 14 - gets nested values by path
  ---
  duration_ms: 0.715805
  type: 'test'
  ...
# Subtest: resolves single and double brace tokens
ok 15 - resolves single and double brace tokens
  ---
  duration_ms: 0.211555
  type: 'test'
  ...
# Subtest: resolves binding text elements without mutating source
ok 16 - resolves binding text elements without mutating source
  ---
  duration_ms: 0.193849
  type: 'test'
  ...
# Subtest: resolves documents and lists tokens
ok 17 - resolves documents and lists tokens
  ---
  duration_ms: 0.616177
  type: 'test'
  ...
# Subtest: creates normalized text elements
ok 18 - creates normalized text elements
  ---
  duration_ms: 1.970412
  type: 'test'
  ...
# Subtest: updates and removes elements immutably
ok 19 - updates and removes elements immutably
  ---
  duration_ms: 0.398783
  type: 'test'
  ...
# Subtest: reorders layers
ok 20 - reorders layers
  ---
  duration_ms: 0.610699
  type: 'test'
  ...
# Subtest: normalization preserves grouping metadata
ok 21 - normalization preserves grouping metadata
  ---
  duration_ms: 0.724168
  type: 'test'
  ...
# Subtest: undoes and redoes document commits
ok 22 - undoes and redoes document commits
  ---
  duration_ms: 0.674464
  type: 'test'
  ...
# Subtest: creates and categorizes templates
ok 23 - creates and categorizes templates
  ---
  duration_ms: 2.001699
  type: 'test'
  ...
# Subtest: duplicates templates with a new identity
ok 24 - duplicates templates with a new identity
  ---
  duration_ms: 0.285195
  type: 'test'
  ...
# Subtest: instantiates templates with new element and group ids
ok 25 - instantiates templates with new element and group ids
  ---
  duration_ms: 0.311824
  type: 'test'
  ...
# Subtest: updates metadata without replacing the stored document
ok 26 - updates metadata without replacing the stored document
  ---
  duration_ms: 0.225526
  type: 'test'
  ...
# Subtest: Scripture defaults to manual source
ok 27 - Scripture defaults to manual source
  ---
  duration_ms: 0.700182
  type: 'test'
  ...
# Subtest: ProPresenter settings are globally available
ok 28 - ProPresenter settings are globally available
  ---
  duration_ms: 0.110304
  type: 'test'
  ...
# Subtest: Smart Flyer defaults to assisted automation
ok 29 - Smart Flyer defaults to assisted automation
  ---
  duration_ms: 0.0879
  type: 'test'
  ...
# Subtest: builds manual scripture context
ok 30 - builds manual scripture context
  ---
  duration_ms: 0.75241
  type: 'test'
  ...
# Subtest: uses ProPresenter scripture when selected
ok 31 - uses ProPresenter scripture when selected
  ---
  duration_ms: 0.325384
  type: 'test'
  ...
# Subtest: reads the official status and presentation endpoints
ok 32 - reads the official status and presentation endpoints
  ---
  duration_ms: 2.617496
  type: 'test'
  ...
# Subtest: does not emit a duplicate verse
ok 33 - does not emit a duplicate verse
  ---
  duration_ms: 0.702205
  type: 'test'
  ...
# Subtest: starts disabled by default
ok 34 - starts disabled by default
  ---
  duration_ms: 0.833641
  type: 'test'
  ...
# Subtest: validates port range
ok 35 - validates port range
  ---
  duration_ms: 0.284764
  type: 'test'
  ...
# Subtest: publishes normalized ProPresenter media events
ok 36 - publishes normalized ProPresenter media events
  ---
  duration_ms: 0.547605
  type: 'test'
  ...
# {"timestamp":"2026-07-23T05:16:43.685Z","level":"INFO","scope":"test","message":"Connecting to ProPresenter","context":{"host":"127.0.0.1","port":1025,"protocol":"tcp"}}
# Subtest: tests the connection through the documented system-time endpoint
ok 37 - tests the connection through the documented system-time endpoint
  ---
  duration_ms: 0.905718
  type: 'test'
  ...
# Subtest: connects and subscribes configured streaming endpoints
ok 38 - connects and subscribes configured streaming endpoints
  ---
  duration_ms: 1.76666
  type: 'test'
  ...
# Subtest: normalizes a ProPresenter Scripture payload
ok 39 - normalizes a ProPresenter Scripture payload
  ---
  duration_ms: 1.380094
  type: 'test'
  ...
# Subtest: uses newline-delimited JSON for a real TCP request
ok 40 - uses newline-delimited JSON for a real TCP request
  ---
  duration_ms: 10.977799
  type: 'test'
  ...
# Subtest: receives chunked streaming messages
ok 41 - receives chunked streaming messages
  ---
  duration_ms: 43.572809
  type: 'test'
  ...
# Subtest: applies capped exponential backoff
ok 42 - applies capped exponential backoff
  ---
  duration_ms: 0.972358
  type: 'test'
  ...
# Subtest: normalizes a common current slide payload
ok 43 - normalizes a common current slide payload
  ---
  duration_ms: 1.858376
  type: 'test'
  ...
# Subtest: supports snake case response variants
ok 44 - supports snake case response variants
  ---
  duration_ms: 0.336891
  type: 'test'
  ...
# Subtest: balances text into visually similar lines
ok 45 - balances text into visually similar lines
  ---
  duration_ms: 0.948521
  type: 'test'
  ...
# Subtest: penalizes a one-word final line when a better partition exists
ok 46 - penalizes a one-word final line when a better partition exists
  ---
  duration_ms: 1.053488
  type: 'test'
  ...
# Subtest: reports overflow when minimum font still exceeds the box
ok 47 - reports overflow when minimum font still exceeds the box
  ---
  duration_ms: 0.202982
  type: 'test'
  ...
# Subtest: Scripture includes a default simple-mode design
ok 48 - Scripture includes a default simple-mode design
  ---
  duration_ms: 0.546984
  type: 'test'
  ...
# Subtest: Scripture broadcast state starts safely off air
ok 49 - Scripture broadcast state starts safely off air
  ---
  duration_ms: 0.17484
  type: 'test'
  ...
# Subtest: publishes verse and program events
ok 50 - publishes verse and program events
  ---
  duration_ms: 1.873188
  type: 'test'
  ...
# Subtest: does not mark identical normalized content as changed
ok 51 - does not mark identical normalized content as changed
  ---
  duration_ms: 1.10223
  type: 'test'
  ...
# Subtest: preview iframe is not hidden behind a ready-message race
ok 52 - preview iframe is not hidden behind a ready-message race
  ---
  duration_ms: 0.737788
  type: 'test'
  ...
# Subtest: lateral padding overrides every Scripture format
ok 53 - lateral padding overrides every Scripture format
  ---
  duration_ms: 0.470921
  type: 'test'
  ...
# Subtest: text fitting performs real rendered candidate measurements
ok 54 - text fitting performs real rendered candidate measurements
  ---
  duration_ms: 0.193428
  type: 'test'
  ...
# Subtest: preview initialization cannot abort the whole app
ok 55 - preview initialization cannot abort the whole app
  ---
  duration_ms: 1.465251
  type: 'test'
  ...
# Subtest: saved Scripture state is deeply hydrated
ok 56 - saved Scripture state is deeply hydrated
  ---
  duration_ms: 0.191825
  type: 'test'
  ...
# Subtest: restores original Scripture geometry
ok 57 - restores original Scripture geometry
  ---
  duration_ms: 0.559613
  type: 'test'
  ...
# Subtest: restores writing and contextual transitions
ok 58 - restores writing and contextual transitions
  ---
  duration_ms: 0.146197
  type: 'test'
  ...
# Subtest: restores gradient and typography
ok 59 - restores gradient and typography
  ---
  duration_ms: 0.108692
  type: 'test'
  ...
# Subtest: Scripture restores the original template and format defaults
ok 60 - Scripture restores the original template and format defaults
  ---
  duration_ms: 0.558261
  type: 'test'
  ...
# Subtest: Appearance and animation configuration have usable defaults
ok 61 - Appearance and animation configuration have usable defaults
  ---
  duration_ms: 0.216723
  type: 'test'
  ...
# Subtest: TV Broadcast CG is available in the advanced template library
ok 62 - TV Broadcast CG is available in the advanced template library
  ---
  duration_ms: 1.348027
  type: 'test'
  ...
# Subtest: Scripture output contains the robust fitting engine
ok 63 - Scripture output contains the robust fitting engine
  ---
  duration_ms: 0.284954
  type: 'test'
  ...
# Subtest: Preview uses one scaled 1920 by 1080 stage
ok 64 - Preview uses one scaled 1920 by 1080 stage
  ---
  duration_ms: 0.357532
  type: 'test'
  ...
# Subtest: preview iframe preserves a 1920 by 1080 viewport
ok 65 - preview iframe preserves a 1920 by 1080 viewport
  ---
  duration_ms: 1.57219
  type: 'test'
  ...
# Subtest: overlay no longer polls and rerenders every two seconds
ok 66 - overlay no longer polls and rerenders every two seconds
  ---
  duration_ms: 0.237884
  type: 'test'
  ...
# Subtest: signature excludes volatile ProPresenter timestamps
ok 67 - signature excludes volatile ProPresenter timestamps
  ---
  duration_ms: 0.18119
  type: 'test'
  ...
# Subtest: verse width follows configured lateral padding without a legacy cap
ok 68 - verse width follows configured lateral padding without a legacy cap
  ---
  duration_ms: 0.396881
  type: 'test'
  ...
# Subtest: text fitting has no horizontal compression floor
not ok 69 - text fitting has no horizontal compression floor
  ---
  duration_ms: 1.58523
  type: 'test'
  location: '/mnt/data/bmms-hotfix-021/BMMS-PROJECT/tests/scripture-core/scripture-update-019.test.js:36:1'
  failureType: 'testCodeFailure'
  error: |-
    The input did not match the regular expression /minimumSize = 8/. Input:
    
    'import { balanceLines } from "/scripture-layout.js";\n' +
      '\n' +
      'const $ = id => document.getElementById(id);\n' +
      'const bible = $("bibleBanner");\n' +
      'const verseEl = $("verse");\n' +
      'const referenceEl = $("reference");\n' +
      'const versionEl = $("version");\n' +
      'const statusEl = $("status");\n' +
      'const previewMode = new URLSearchParams(location.search).get("preview") === "1";\n' +
      'const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));\n' +
      '\n' +
      'let scripture = {};\n' +
      'let broadcast = {};\n' +
      'let currentBook = "";\n' +
      'let currentChapter = "";\n' +
      'let first = true;\n' +
      'let busy = false;\n' +
      'let pending = null;\n' +
      'let lastSignature = "";\n' +
      'let resizeTimer = null;\n' +
      '\n' +
      'if (previewMode) {\n' +
      '  document.body.classList.add("preview-output");\n' +
      '}\n' +
      '\n' +
      'async function api(path) {\n' +
      '  const response = await fetch(path, { cache: "no-store" });\n' +
      '  if (!response.ok) throw new Error(`BMMS ${response.status}`);\n' +
      '  return response.json();\n' +
      '}\n' +
      '\n' +
      'function parseReference(reference) {\n' +
      '  const clean = String(reference || "").trim().replace(/[–—]/g, "-");\n' +
      '  const match = clean.match(\n' +
      '    /^((?:[1-3]\\s*)?[A-Za-zÁÉÍÓÚÜÑáéíóúüñ. ]+?)\\s+(\\d{1,3})(?::(\\d{1,3})(?:-(\\d{1,3}))?)?$/\n' +
      '  );\n' +
      '\n' +
      '  return match\n' +
      '    ? {\n' +
      '        book: match[1].replace(/\\s+/g, " ").trim().toLowerCase(),\n' +
      '        chapter: match[2]\n' +
      '      }\n' +
      '    : { book: clean.toLowerCase(), chapter: "" };\n' +
      '}\n' +
      '\n' +
      'function rgb(hex) {\n' +
      '  const clean = String(hex || "#000000").replace("#", "");\n' +
      '  const normalized = clean.length === 3\n' +
      '    ? clean.split("").map(character => character + character).join("")\n' +
      '    : clean;\n' +
      '\n' +
      '  const value = Number.parseInt(normalized, 16);\n' +
      '  return `${(value >> 16) & 255},${(value >> 8) & 255},${value & 255}`;\n' +
      '}\n' +
      '\n' +
      'function updatePreviewScale() {\n' +
      '  // The parent application scales the 1920 × 1080 iframe.\n' +
      '  // The overlay viewport remains identical to the real Browser Output.\n' +
      '}\n' +
      '\n' +
      'function applyConfig(nextScripture) {\n' +
      '  scripture = nextScripture;\n' +
      '\n' +
      '  const root = document.documentElement.style;\n' +
      '  const composition = scripture.composition || {};\n' +
      '  const appearance = scripture.appearance || {};\n' +
      '  const gradient = scripture.gradient || {};\n' +
      '\n' +
      '  root.setProperty("--bottom", `${composition.bottom ?? 28}px`);\n' +
      '  root.setProperty("--width", `${composition.width ?? 1660}px`);\n' +
      '  root.setProperty("--padding-x", `${composition.horizontalPadding ?? 72}px`);\n' +
      '  root.setProperty("--title-font", `"${appearance.titleFont || "Montserrat"}",Arial,sans-serif`);\n' +
      '  root.setProperty("--body-font", `"${appearance.bodyFont || "Montserrat"}",Arial,sans-serif`);\n' +
      '  root.setProperty("--title-size", `${appearance.titleSize ?? 44}px`);\n' +
      '  root.setProperty("--body-size", `${appearance.bodySize ?? 36}px`);\n' +
      '  root.setProperty("--title-weight", appearance.titleWeight ?? 800);\n' +
      '  root.setProperty("--body-weight", appearance.bodyWeight ?? 500);\n' +
      '  root.setProperty("--line-height", appearance.lineHeight ?? 1.16);\n' +
      '  root.setProperty("--title-color", appearance.titleColor || "#ffffff");\n' +
      '  root.setProperty("--text-color", appearance.textColor || "#ffffff");\n' +
      '  root.setProperty("--line-color", appearance.lineColor || "rgba(255,255,255,.9)");\n' +
      '  root.setProperty("--gradient-strength", gradient.opacity ?? .96);\n' +
      '  root.setProperty("--gradient-color", rgb(gradient.color || "#000000"));\n' +
      '  root.setProperty("--gradient-height", `${gradient.height ?? 430}px`);\n' +
      '  root.setProperty("--gradient-softness", `${gradient.softness ?? 58}%`);\n' +
      '  root.setProperty(\n' +
      '    "--edge-fade",\n' +
      '    `${gradient.edgeFadeEnabled === false ? 0 : gradient.edgeFade ?? 150}px`\n' +
      '  );\n' +
      '\n' +
      '  for (const className of [\n' +
      '    "format-lower",\n' +
      '    "format-center-lower",\n' +
      '    "format-left-column",\n' +
      '    "format-right-column",\n' +
      '    "format-fullscreen",\n' +
      '    "format-minimal",\n' +
      '    "style-classic",\n' +
      '    "style-editorial",\n' +
      '    "style-worship",\n' +
      '    "style-broadcast",\n' +
      '    "style-glass",\n' +
      '    "style-kinetic",\n' +
      '    "style-tv"\n' +
      '  ]) {\n' +
      '    bible.classList.remove(className);\n' +
      '  }\n' +
      '\n' +
      '  bible.classList.add(\n' +
      '    `format-${scripture.format || "lower"}`,\n' +
      '    `style-${scripture.design || "classic"}`\n' +
      '  );\n' +
      '\n' +
      '  bible.classList.toggle("edge-fade", gradient.edgeFadeEnabled !== false);\n' +
      '  bible.style.textAlign = composition.alignment || "center";\n' +
      '}\n' +
      '\n' +
      'function getFontDescriptor(size) {\n' +
      '  const appearance = scripture.appearance || {};\n' +
      '  const family = appearance.bodyFont || "Montserrat";\n' +
      '  const weight = appearance.bodyWeight || 500;\n' +
      '  return `${weight} ${size}px "${family}", Arial, sans-serif`;\n' +
      '}\n' +
      '\n' +
      'function measureLine(context, text, size) {\n' +
      '  context.font = getFontDescriptor(size);\n' +
      '  return context.measureText(text).width;\n' +
      '}\n' +
      '\n' +
      'function partitionWords(words, lineCount, maxWidth, size, context) {\n' +
      '  const count = words.length;\n' +
      '  if (!count || lineCount < 1 || lineCount > count) return null;\n' +
      '\n' +
      '  const prefix = [0];\n' +
      '  const spaceWidth = measureLine(context, " ", size);\n' +
      '\n' +
      '  for (const word of words) {\n' +
      '    prefix.push(prefix[prefix.length - 1] + measureLine(context, word, size));\n' +
      '  }\n' +
      '\n' +
      '  const widthBetween = (start, end) =>\n' +
      '    prefix[end] - prefix[start] + Math.max(0, end - start - 1) * spaceWidth;\n' +
      '\n' +
      '  const dp = Array.from({ length: lineCount + 1 }, () =>\n' +
      '    Array(count + 1).fill(Number.POSITIVE_INFINITY)\n' +
      '  );\n' +
      '  const previous = Array.from({ length: lineCount + 1 }, () =>\n' +
      '    Array(count + 1).fill(-1)\n' +
      '  );\n' +
      '\n' +
      '  dp[0][0] = 0;\n' +
      '  const target = Math.min(maxWidth, widthBetween(0, count) / lineCount);\n' +
      '\n' +
      '  for (let line = 1; line <= lineCount; line += 1) {\n' +
      '    for (let end = line; end <= count; end += 1) {\n' +
      '      for (let start = line - 1; start < end; start += 1) {\n' +
      '        if (!Number.isFinite(dp[line - 1][start])) continue;\n' +
      '\n' +
      '        const width = widthBetween(start, end);\n' +
      '        if (width > maxWidth) continue;\n' +
      '\n' +
      '        const isLast = line === lineCount;\n' +
      '        const raggedness = isLast\n' +
      '          ? Math.pow(Math.max(0, target - width), 2) * 0.18\n' +
      '          : Math.pow(target - width, 2);\n' +
      '\n' +
      '        const score = dp[line - 1][start] + raggedness;\n' +
      '\n' +
      '        if (score < dp[line][end]) {\n' +
      '          dp[line][end] = score;\n' +
      '          previous[line][end] = start;\n' +
      '        }\n' +
      '      }\n' +
      '    }\n' +
      '  }\n' +
      '\n' +
      '  if (!Number.isFinite(dp[lineCount][count])) return null;\n' +
      '\n' +
      '  const lines = [];\n' +
      '  let end = count;\n' +
      '\n' +
      '  for (let line = lineCount; line > 0; line -= 1) {\n' +
      '    const start = previous[line][end];\n' +
      '    if (start < 0) return null;\n' +
      '    lines.unshift(words.slice(start, end).join(" "));\n' +
      '    end = start;\n' +
      '  }\n' +
      '\n' +
      '  return lines;\n' +
      '}\n' +
      '\n' +
      '\n' +
      'function getCandidateLines(text, lineCount, size, maxWidth, context) {\n' +
      '  const words = String(text || "").trim().split(/\\s+/).filter(Boolean);\n' +
      '  if (!words.length) return [""];\n' +
      '  return partitionWords(words, Math.min(lineCount, words.length), maxWidth, size, context);\n' +
      '}\n' +
      '\n' +
      'function renderLines(lines, size, animate = true) {\n' +
      '  const animation = scripture.animation || {};\n' +
      '  verseEl.innerHTML = "";\n' +
      '  verseEl.style.fontSize = `${size}px`;\n' +
      '  verseEl.style.transform = "";\n' +
      '  verseEl.style.width = "100%";\n' +
      '\n' +
      '  let wordIndex = 0;\n' +
      '  for (const lineText of lines) {\n' +
      '    const line = document.createElement("span");\n' +
      '    line.className = "verse-line";\n' +
      '\n' +
      '    for (const part of lineText.split(/(\\s+)/)) {\n' +
      '      if (!part) continue;\n' +
      '      const span = document.createElement("span");\n' +
      '\n' +
      '      if (/^\\s+$/.test(part)) {\n' +
      '        span.className = "word-space";\n' +
      '        span.textContent = part;\n' +
      '      } else if (animate && animation.wordCascade !== false) {\n' +
      '        span.className = "word";\n' +
      '        span.textContent = part;\n' +
      '        span.style.animationDelay =\n' +
      '          `${wordIndex * (animation.wordCascadeStepMs ?? 18)}ms`;\n' +
      '        wordIndex += 1;\n' +
      '      } else {\n' +
      '        span.textContent = part;\n' +
      '      }\n' +
      '\n' +
      '      line.appendChild(span);\n' +
      '    }\n' +
      '    verseEl.appendChild(line);\n' +
      '  }\n' +
      '}\n' +
      '\n' +
      'function getAvailableTextHeight() {\n' +
      '  // Kept as a compatibility hook for diagnostics. Scripture panels may grow\n' +
      '  // vertically; width is the strict fitting constraint.\n' +
      '  return Number.POSITIVE_INFINITY;\n' +
      '}\n' +
      '\n' +
      'function measureRenderedCandidate(lines, size) {\n' +
      '  renderLines(lines, size, false);\n' +
      '  const safeWidth = Math.max(1, verseEl.clientWidth - 2);\n' +
      '  const rendered = [...verseEl.querySelectorAll(".verse-line")];\n' +
      '  const fitsWidth = rendered.every(line => line.scrollWidth <= safeWidth + .5);\n' +
      '\n' +
      '  return {\n' +
      '    fitsWidth,\n' +
      '    fitsHeight: verseEl.scrollHeight <= getAvailableTextHeight(),\n' +
      '    safeWidth,\n' +
      '    scaleX: 1\n' +
      '  };\n' +
      '}\n' +
      '\n' +
      'function candidateFits(lines, size) {\n' +
      '  const measurement = measureRenderedCandidate(lines, size);\n' +
      '  return measurement.fitsWidth && measurement.fitsHeight;\n' +
      '}\n' +
      '\n' +
      'function findBestLayout(text) {\n' +
      '  const composition = scripture.composition || {};\n' +
      '  const appearance = scripture.appearance || {};\n' +
      '  const words = String(text || "").trim().split(/\\s+/).filter(Boolean);\n' +
      '\n' +
      '  const configuredMaxLines = Math.max(\n' +
      '    1,\n' +
      '    Number(composition.maxLines) || 4\n' +
      '  );\n' +
      '  const requestedSize = Math.max(\n' +
      '    24,\n' +
      '    Number(appearance.bodySize) || 36\n' +
      '  );\n' +
      '\n' +
      '  // Never collapse Scripture into an unreadable line. If the operator-selected\n' +
      '  // line count is too restrictive, BMMS may add lines before reducing below\n' +
      '  // the readable threshold.\n' +
      '  const readableMinimum = Math.min(\n' +
      '    requestedSize,\n' +
      '    Math.max(24, Math.round(requestedSize * 0.62))\n' +
      '  );\n' +
      '  const emergencyMinimum = 18;\n' +
      '  const adaptiveMaxLines = Math.min(\n' +
      '    Math.max(configuredMaxLines, 6),\n' +
      '    Math.max(1, words.length)\n' +
      '  );\n' +
      '\n' +
      '  // clientWidth can briefly be zero during initial iframe/layout activation.\n' +
      '  // Use the content box as a stable fallback instead of shrinking to 3 px.\n' +
      '  const contentWidth =\n' +
      '    bible.querySelector(".content")?.clientWidth ||\n' +
      '    Number(composition.width) ||\n' +
      '    1660;\n' +
      '  const horizontalPadding =\n' +
      '    Number(composition.horizontalPadding) || 72;\n' +
      '  const measuredWidth = verseEl.clientWidth;\n' +
      '  const maxWidth = Math.max(\n' +
      '    180,\n' +
      '    measuredWidth > 40\n' +
      '      ? measuredWidth - 2\n' +
      '      : contentWidth - horizontalPadding * 2\n' +
      '  );\n' +
      '\n' +
      '  const canvas = document.createElement("canvas");\n' +
      '  const context = canvas.getContext("2d");\n' +
      '\n' +
      '  // Pass 1: preserve the requested line limit while the result remains\n' +
      '  // comfortably readable.\n' +
      '  for (\n' +
      '    let size = requestedSize;\n' +
      '    size >= readableMinimum;\n' +
      '    size -= 1\n' +
      '  ) {\n' +
      '    for (\n' +
      '      let lineCount = 1;\n' +
      '      lineCount <= Math.min(\n' +
      '        configuredMaxLines,\n' +
      '        words.length || 1\n' +
      '      );\n' +
      ' '... 6967 more characters
    
  code: 'ERR_ASSERTION'
  name: 'AssertionError'
  expected:
  actual: |-
    import { balanceLines } from "/scripture-layout.js";
    
    const $ = id => document.getElementById(id);
    const bible = $("bibleBanner");
    const verseEl = $("verse");
    const referenceEl = $("reference");
    const versionEl = $("version");
    const statusEl = $("status");
    const previewMode = new URLSearchParams(location.search).get("preview") === "1";
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    
    let scripture = {};
    let broadcast = {};
    let currentBook = "";
    let currentChapter = "";
    let first = true;
    let busy = false;
    let pending = null;
    let lastSignature = "";
    let resizeTimer = null;
    
    if (previewMode) {
      document.body.classList.add("preview-output");
    }
    
    async function api(path) {
      const response = await fetch(path, { cache: "no-store" });
      if (!response.ok) throw new Error(`BMMS ${response.status}`);
      return response.json();
    }
    
    function parseReference(reference) {
      const clean = String(reference || "").trim().replace(/[–—]/g, "-");
      const match = clean.match(
        /^((?:[1-3]\s*)?[A-Za-zÁÉÍÓÚÜÑáéíóúüñ. ]+?)\s+(\d{1,3})(?::(\d{1,3})(?:-(\d{1,3}))?)?$/
      );
    
      return match
        ? {
            book: match[1].replace(/\s+/g, " ").trim().toLowerCase(),
            chapter: match[2]
          }
        : { book: clean.toLowerCase(), chapter: "" };
    }
    
    function rgb(hex) {
      const clean = String(hex || "#000000").replace("#", "");
      const normalized = clean.length === 3
        ? clean.split("").map(character => character + character).join("")
        : clean;
    
      const value = Number.parseInt(normalized, 16);
      return `${(value >> 16) & 255},${(value >> 8) & 255},${value & 255}`;
    }
    
    function updatePreviewScale() {
      // The parent application scales the 1920 × 1080 iframe.
      // The overlay viewport remains identical to the real Browser Output.
    }
    
    function applyConfig(nextScripture) {
      scripture = nextScripture;
    
      const root = document.documentElement.style;
      const composition = scripture.composition || {};
      const appearance = scripture.appearance || {};
      const gradient = scripture.gradient || {};
    
      root.setProperty("--bottom", `${composition.bottom ?? 28}px`);
      root.setProperty("--width", `${composition.width ?? 1660}px`);
      root.setProperty("--padding-x", `${composition.horizontalPadding ?? 72}px`);
      root.setProperty("--title-font", `"${appearance.titleFont || "Montserrat"}",Arial,sans-serif`);
      root.setProperty("--body-font", `"${appearance.bodyFont || "Montserrat"}",Arial,sans-serif`);
      root.setProperty("--title-size", `${appearance.titleSize ?? 44}px`);
      root.setProperty("--body-size", `${appearance.bodySize ?? 36}px`);
      root.setProperty("--title-weight", appearance.titleWeight ?? 800);
      root.setProperty("--body-weight", appearance.bodyWeight ?? 500);
      root.setProperty("--line-height", appearance.lineHeight ?? 1.16);
      root.setProperty("--title-color", appearance.titleColor || "#ffffff");
      root.setProperty("--text-color", appearance.textColor || "#ffffff");
      root.setProperty("--line-color", appearance.lineColor || "rgba(255,255,255,.9)");
      root.setProperty("--gradient-strength", gradient.opacity ?? .96);
      root.setProperty("--gradient-color", rgb(gradient.color || "#000000"));
      root.setProperty("--gradient-height", `${gradient.height ?? 430}px`);
      root.setProperty("--gradient-softness", `${gradient.softness ?? 58}%`);
      root.setProperty(
        "--edge-fade",
        `${gradient.edgeFadeEnabled === false ? 0 : gradient.edgeFade ?? 150}px`
      );
    
      for (const className of [
        "format-lower",
        "format-center-lower",
        "format-left-column",
        "format-right-column",
        "format-fullscreen",
        "format-minimal",
        "style-classic",
        "style-editorial",
        "style-worship",
        "style-broadcast",
        "style-glass",
        "style-kinetic",
        "style-tv"
      ]) {
        bible.classList.remove(className);
      }
    
      bible.classList.add(
        `format-${scripture.format || "lower"}`,
        `style-${scripture.design || "classic"}`
      );
    
      bible.classList.toggle("edge-fade", gradient.edgeFadeEnabled !== false);
      bible.style.textAlign = composition.alignment || "center";
    }
    
    function getFontDescriptor(size) {
      const appearance = scripture.appearance || {};
      const family = appearance.bodyFont || "Montserrat";
      const weight = appearance.bodyWeight || 500;
      return `${weight} ${size}px "${family}", Arial, sans-serif`;
    }
    
    function measureLine(context, text, size) {
      context.font = getFontDescriptor(size);
      return context.measureText(text).width;
    }
    
    function partitionWords(words, lineCount, maxWidth, size, context) {
      const count = words.length;
      if (!count || lineCount < 1 || lineCount > count) return null;
    
      const prefix = [0];
      const spaceWidth = measureLine(context, " ", size);
    
      for (const word of words) {
        prefix.push(prefix[prefix.length - 1] + measureLine(context, word, size));
      }
    
      const widthBetween = (start, end) =>
        prefix[end] - prefix[start] + Math.max(0, end - start - 1) * spaceWidth;
    
      const dp = Array.from({ length: lineCount + 1 }, () =>
        Array(count + 1).fill(Number.POSITIVE_INFINITY)
      );
      const previous = Array.from({ length: lineCount + 1 }, () =>
        Array(count + 1).fill(-1)
      );
    
      dp[0][0] = 0;
      const target = Math.min(maxWidth, widthBetween(0, count) / lineCount);
    
      for (let line = 1; line <= lineCount; line += 1) {
        for (let end = line; end <= count; end += 1) {
          for (let start = line - 1; start < end; start += 1) {
            if (!Number.isFinite(dp[line - 1][start])) continue;
    
            const width = widthBetween(start, end);
            if (width > maxWidth) continue;
    
            const isLast = line === lineCount;
            const raggedness = isLast
              ? Math.pow(Math.max(0, target - width), 2) * 0.18
              : Math.pow(target - width, 2);
    
            const score = dp[line - 1][start] + raggedness;
    
            if (score < dp[line][end]) {
              dp[line][end] = score;
              previous[line][end] = start;
            }
          }
        }
      }
    
      if (!Number.isFinite(dp[lineCount][count])) return null;
    
      const lines = [];
      let end = count;
    
      for (let line = lineCount; line > 0; line -= 1) {
        const start = previous[line][end];
        if (start < 0) return null;
        lines.unshift(words.slice(start, end).join(" "));
        end = start;
      }
    
      return lines;
    }
    
    
    function getCandidateLines(text, lineCount, size, maxWidth, context) {
      const words = String(text || "").trim().split(/\s+/).filter(Boolean);
      if (!words.length) return [""];
      return partitionWords(words, Math.min(lineCount, words.length), maxWidth, size, context);
    }
    
    function renderLines(lines, size, animate = true) {
      const animation = scripture.animation || {};
      verseEl.innerHTML = "";
      verseEl.style.fontSize = `${size}px`;
      verseEl.style.transform = "";
      verseEl.style.width = "100%";
    
      let wordIndex = 0;
      for (const lineText of lines) {
        const line = document.createElement("span");
        line.className = "verse-line";
    
        for (const part of lineText.split(/(\s+)/)) {
          if (!part) continue;
          const span = document.createElement("span");
    
          if (/^\s+$/.test(part)) {
            span.className = "word-space";
            span.textContent = part;
          } else if (animate && animation.wordCascade !== false) {
            span.className = "word";
            span.textContent = part;
            span.style.animationDelay =
              `${wordIndex * (animation.wordCascadeStepMs ?? 18)}ms`;
            wordIndex += 1;
          } else {
            span.textContent = part;
          }
    
          line.appendChild(span);
        }
        verseEl.appendChild(line);
      }
    }
    
    function getAvailableTextHeight() {
      // Kept as a compatibility hook for diagnostics. Scripture panels may grow
      // vertically; width is the strict fitting constraint.
      return Number.POSITIVE_INFINITY;
    }
    
    function measureRenderedCandidate(lines, size) {
      renderLines(lines, size, false);
      const safeWidth = Math.max(1, verseEl.clientWidth - 2);
      const rendered = [...verseEl.querySelectorAll(".verse-line")];
      const fitsWidth = rendered.every(line => line.scrollWidth <= safeWidth + .5);
    
      return {
        fitsWidth,
        fitsHeight: verseEl.scrollHeight <= getAvailableTextHeight(),
        safeWidth,
        scaleX: 1
      };
    }
    
    function candidateFits(lines, size) {
      const measurement = measureRenderedCandidate(lines, size);
      return measurement.fitsWidth && measurement.fitsHeight;
    }
    
    function findBestLayout(text) {
      const composition = scripture.composition || {};
      const appearance = scripture.appearance || {};
      const words = String(text || "").trim().split(/\s+/).filter(Boolean);
    
      const configuredMaxLines = Math.max(
        1,
        Number(composition.maxLines) || 4
      );
      const requestedSize = Math.max(
        24,
        Number(appearance.bodySize) || 36
      );
    
      // Never collapse Scripture into an unreadable line. If the operator-selected
      // line count is too restrictive, BMMS may add lines before reducing below
      // the readable threshold.
      const readableMinimum = Math.min(
        requestedSize,
        Math.max(24, Math.round(requestedSize * 0.62))
      );
      const emergencyMinimum = 18;
      const adaptiveMaxLines = Math.min(
        Math.max(configuredMaxLines, 6),
        Math.max(1, words.length)
      );
    
      // clientWidth can briefly be zero during initial iframe/layout activation.
      // Use the content box as a stable fallback instead of shrinking to 3 px.
      const contentWidth =
        bible.querySelector(".content")?.clientWidth ||
        Number(composition.width) ||
        1660;
      const horizontalPadding =
        Number(composition.horizontalPadding) || 72;
      const measuredWidth = verseEl.clientWidth;
      const maxWidth = Math.max(
        180,
        measuredWidth > 40
          ? measuredWidth - 2
          : contentWidth - horizontalPadding * 2
      );
    
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
    
      // Pass 1: preserve the requested line limit while the result remains
      // comfortably readable.
      for (
        let size = requestedSize;
        size >= readableMinimum;
        size -= 1
      ) {
        for (
          let lineCount = 1;
          lineCount <= Math.min(
            configuredMaxLines,
            words.length || 1
          );
          lineCount += 1
        ) {
          const lines = getCandidateLines(
            text,
            lineCount,
            size,
            maxWidth,
            context
          );
          if (lines && candidateFits(lines, size)) {
            return { lines, size };
          }
        }
      }
    
      // Pass 2: add lines automatically before making the verse tiny.
      for (
        let size = requestedSize;
        size >= readableMinimum;
        size -= 1
      ) {
        for (
          let lineCount = configuredMaxLines + 1;
          lineCount <= adaptiveMaxLines;
          lineCount += 1
        ) {
          const lines = getCandidateLines(
            text,
            lineCount,
            size,
            maxWidth,
            context
          );
          if (lines && candidateFits(lines, size)) {
            return { lines, size };
          }
        }
      }
    
      // Pass 3: controlled reduction, still bounded to a broadcast-readable size.
      for (
        let size = readableMinimum - 1;
        size >= emergencyMinimum;
        size -= 1
      ) {
        for (
          let lineCount = 1;
          lineCount <= adaptiveMaxLines;
          lineCount += 1
        ) {
          const lines = getCandidateLines(
            text,
            lineCount,
            size,
            maxWidth,
            context
          );
          if (lines && candidateFits(lines, size)) {
            return { lines, size };
          }
        }
      }
    
      // Last resort: preserve every word at 18 px and let the panel grow
      // vertically. Scripture is never intentionally rendered at 3–8 px.
      return {
        lines: balanceLines(
          String(text || ""),
          adaptiveMaxLines
        )
          .split("\n")
          .filter(Boolean),
        size: emergencyMinimum
      };
    }
    
    function fitAndRenderText(text, animate = true) {
      // Reset previous measurements before reading available width.
      verseEl.style.fontSize = `${scripture.appearance?.bodySize || 36}px`;
      verseEl.style.width = "100%";
      verseEl.style.transform = "";
      verseEl.innerHTML = "";
    
      const layout = findBestLayout(text);
      renderLines(layout.lines, layout.size, animate);
    
      // DOM verification after animated spans are present.
      let size = layout.size;
      const width = Math.max(1, verseEl.clientWidth - 2);
      let lines = [...verseEl.querySelectorAll(".verse-line")];
    
      while (
        size > 18 &&
        lines.some(line => line.scrollWidth > width + .5)
      ) {
        size -= 1;
        verseEl.style.fontSize = `${size}px`;
      }
    
      const gradient = scripture.gradient || {};
      if ((gradient.mode || "adaptive") === "adaptive") {
        const contentHeight = bible.querySelector(".content")?.scrollHeight || 250;
        const height = Math.max(
          260,
          Math.min(
            900,
            contentHeight + (Number(scripture.composition?.bottom) || 0) + 150
          )
        );
        document.documentElement.style.setProperty("--gradient-height", `${height}px`);
      }
    }
    
    function previewVerse() {
      const source = scripture.source === "propresenter"
        ? scripture.propresenter
        : scripture.manual;
    
      return source?.text ? source : scripture.manual;
    }
    
    async function renderVerse(verse, replay = false) {
      if (!verse?.text) {
        bible.classList.remove("visible");
        return;
      }
    
      if (busy) {
        pending = { verse, replay };
        return;
      }
    
      busy = true;
    
      const reference = String(verse.reference || "")
        .replace(/\s*-\s*/g, "–")
        .toUpperCase();
    
      const parsed = parseReference(reference);
      const animation = scripture.animation || {};
    
      let transitionKind = first
        ? "first"
        : parsed.book === currentBook && parsed.chapter === currentChapter
          ? "same"
          : parsed.book === currentBook
            ? "chapter"
            : "book";
    
      if (replay) transitionKind = "book";
    
      if (transitionKind === "same") {
        bible.classList.add("soft-out");
        await sleep(animation.sameChapterOutMs ?? 100);
      } else if (!first || replay) {
        bible.classList.add(
          transitionKind === "chapter" ? "chapter-out" : "book-out"
        );
        bible.classList.remove("visible");
    
        await sleep(
          transitionKind === "chapter"
            ? animation.chapterChangeMs ?? 320
            : animation.bookChangeMs ?? 420
        );
      }
    
      referenceEl.textContent = reference;
      versionEl.textContent = verse.version || "";
    
      // Wait one frame so the browser applies template and format geometry
      // before the fitting engine measures the available width.
      await new Promise(resolve => requestAnimationFrame(resolve));
      fitAndRenderText(verse.text, true);
    
      bible.classList.toggle("no-reference", !reference);
      bible.classList.toggle("no-version", !verse.version);
      bible.classList.remove("soft-out", "chapter-out", "book-out");
    
      void bible.offsetWidth;
      bible.classList.add("visible");
    
      currentBook = parsed.book;
      currentChapter = parsed.chapter;
      first = false;
      busy = false;
    
      if (pending) {
        const next = pending;
        pending = null;
        renderVerse(next.verse, next.replay);
      }
    }
    
    async function refresh({ replay = false } = {}) {
      try {
        const [state, nextBroadcast] = await Promise.all([
          api("/api/app-state"),
          api("/api/scripture/program")
        ]);
    
        scripture = state.scripture || {};
        broadcast = nextBroadcast || {};
        applyConfig(scripture);
    
        const verse = previewMode
          ? previewVerse()
          : broadcast.program || broadcast.preview;
    
        const visible = previewMode || Boolean(broadcast.visible && verse);
    
        const signature = JSON.stringify({
          reference: verse?.reference || "",
          text: verse?.text || "",
          version: verse?.version || "",
          design: scripture.design,
          format: scripture.format,
          composition: scripture.composition,
          appearance: scripture.appearance,
          gradient: scripture.gradient,
          animation: scripture.animation,
          visible
        });
    
        if (signature !== lastSignature || replay) {
          lastSignature = signature;
          await renderVerse(verse, replay);
        }
    
        bible.classList.toggle("visible", visible && Boolean(verse?.text));
        statusEl.textContent = previewMode ? "PREVIEW INTERNO" : "BROWSER OUTPUT";
      } catch (error) {
        statusEl.textContent = error.message;
        console.error("BMMS Scripture output error", error);
      }
    }
    
    const events = new EventSource("/api/app-events");
    
    for (const eventName of [
      "scripture-program",
      "scripture-updated",
      "scripture-config"
    ]) {
      events.addEventListener(eventName, () => refresh());
    }
    
    events.addEventListener("scripture-replay", () => refresh({ replay: true }));
    events.onerror = () => setTimeout(refresh, 350);
    
    window.addEventListener("message", event => {
      if (event.data?.type === "bmms-scripture-replay") {
        refresh({ replay: true });
      }
    });
    
    window.addEventListener("resize", () => {
      updatePreviewScale();
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const verse = previewMode ? previewVerse() : broadcast.program || broadcast.preview;
        if (verse?.text) fitAndRenderText(verse.text, false);
      }, 80);
    });
    
    updatePreviewScale();
    refresh();
    
    
    
    
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) refresh();
    });
    window.addEventListener("focus", refresh);
    
  operator: 'match'
  stack: |-
    TestContext.<anonymous> (file:///mnt/data/bmms-hotfix-021/BMMS-PROJECT/tests/scripture-core/scripture-update-019.test.js:40:10)
    Test.runInAsyncScope (node:async_hooks:214:14)
    Test.run (node:internal/test_runner/test:1047:25)
    Test.processPendingSubtests (node:internal/test_runner/test:744:18)
    Test.postRun (node:internal/test_runner/test:1173:19)
    Test.run (node:internal/test_runner/test:1101:12)
    async Test.processPendingSubtests (node:internal/test_runner/test:744:7)
  ...
# Subtest: normalizes a verse and creates a stable id
ok 70 - normalizes a verse and creates a stable id
  ---
  duration_ms: 1.022031
  type: 'test'
  ...
# Subtest: requires verse text
ok 71 - requires verse text
  ---
  duration_ms: 0.24233
  type: 'test'
  ...
# Subtest: stable id changes when content changes
ok 72 - stable id changes when content changes
  ---
  duration_ms: 0.1343
  type: 'test'
  ...
# Subtest: parses a Spanish Scripture reference
ok 73 - parses a Spanish Scripture reference
  ---
  duration_ms: 1.239696
  type: 'test'
  ...
# Subtest: extracts a reference from the first line
ok 74 - extracts a reference from the first line
  ---
  duration_ms: 0.455368
  type: 'test'
  ...
1..74
# tests 74
# suites 0
# pass 73
# fail 1
# cancelled 0
# skipped 0
# todo 0
# duration_ms 497.091841

```

## server_syntax
Exit code: 0

```text

```

## app_syntax
Exit code: 0

```text

```

## overlay_syntax
Exit code: 0

```text

```

## runtime_flows
Exit code: 0

```text
GET /: 200 (26584 bytes)
GET /scripture-overlay.js: 200 (16990 bytes)
GET /overlay/scripture?preview=1: 200 (561 bytes)
GET /api/app-state: 200 (5271 bytes)
GET /api/integrations/propresenter/status: 200 (169 bytes)
Manual Preview: 200
ProPresenter simulator: 200
```


# Final validation rerun

## repository_check
Exit code: 0

```text
BMMS repository check passed.

```

## tests
Exit code: 0

```text
TAP version 13
# Subtest: animation preview controls are connected
ok 1 - animation preview controls are connected
  ---
  duration_ms: 3.465999
  type: 'test'
  ...
# Subtest: editor animation playback uses requestAnimationFrame
ok 2 - editor animation playback uses requestAnimationFrame
  ---
  duration_ms: 1.37111
  type: 'test'
  ...
# Subtest: publishes a versioned event envelope
ok 3 - publishes a versioned event envelope
  ---
  duration_ms: 1.689054
  type: 'test'
  ...
# Subtest: registers and resolves a service
ok 4 - registers and resolves a service
  ---
  duration_ms: 0.57106
  type: 'test'
  ...
# Subtest: rejects duplicate registrations
ok 5 - rejects duplicate registrations
  ---
  duration_ms: 0.211625
  type: 'test'
  ...
# Subtest: normalizes an animation configuration
ok 6 - normalizes an animation configuration
  ---
  duration_ms: 0.682916
  type: 'test'
  ...
# Subtest: provides enter and exit animation defaults
ok 7 - provides enter and exit animation defaults
  ---
  duration_ms: 0.131887
  type: 'test'
  ...
# Subtest: creates slide keyframes
ok 8 - creates slide keyframes
  ---
  duration_ms: 0.296431
  type: 'test'
  ...
# Subtest: disabled animations produce no keyframes
ok 9 - disabled animations produce no keyframes
  ---
  duration_ms: 0.516629
  type: 'test'
  ...
# Subtest: lists built-in broadcast components
ok 10 - lists built-in broadcast components
  ---
  duration_ms: 1.0012
  type: 'test'
  ...
# Subtest: creates a Scripture component with shared component identity
ok 11 - creates a Scripture component with shared component identity
  ---
  duration_ms: 1.79378
  type: 'test'
  ...
# Subtest: creates a Lower Third component with live bindings
ok 12 - creates a Lower Third component with live bindings
  ---
  duration_ms: 0.343461
  type: 'test'
  ...
# Subtest: generic component factory rejects unknown components
ok 13 - generic component factory rejects unknown components
  ---
  duration_ms: 0.343631
  type: 'test'
  ...
# Subtest: gets nested values by path
ok 14 - gets nested values by path
  ---
  duration_ms: 0.633573
  type: 'test'
  ...
# Subtest: resolves single and double brace tokens
ok 15 - resolves single and double brace tokens
  ---
  duration_ms: 0.213077
  type: 'test'
  ...
# Subtest: resolves binding text elements without mutating source
ok 16 - resolves binding text elements without mutating source
  ---
  duration_ms: 0.18809
  type: 'test'
  ...
# Subtest: resolves documents and lists tokens
ok 17 - resolves documents and lists tokens
  ---
  duration_ms: 0.610879
  type: 'test'
  ...
# Subtest: creates normalized text elements
ok 18 - creates normalized text elements
  ---
  duration_ms: 2.065364
  type: 'test'
  ...
# Subtest: updates and removes elements immutably
ok 19 - updates and removes elements immutably
  ---
  duration_ms: 0.427035
  type: 'test'
  ...
# Subtest: reorders layers
ok 20 - reorders layers
  ---
  duration_ms: 0.63835
  type: 'test'
  ...
# Subtest: normalization preserves grouping metadata
ok 21 - normalization preserves grouping metadata
  ---
  duration_ms: 0.883335
  type: 'test'
  ...
# Subtest: undoes and redoes document commits
ok 22 - undoes and redoes document commits
  ---
  duration_ms: 0.745149
  type: 'test'
  ...
# Subtest: creates and categorizes templates
ok 23 - creates and categorizes templates
  ---
  duration_ms: 2.199634
  type: 'test'
  ...
# Subtest: duplicates templates with a new identity
ok 24 - duplicates templates with a new identity
  ---
  duration_ms: 0.237123
  type: 'test'
  ...
# Subtest: instantiates templates with new element and group ids
ok 25 - instantiates templates with new element and group ids
  ---
  duration_ms: 0.308069
  type: 'test'
  ...
# Subtest: updates metadata without replacing the stored document
ok 26 - updates metadata without replacing the stored document
  ---
  duration_ms: 0.16791
  type: 'test'
  ...
# Subtest: Scripture defaults to manual source
ok 27 - Scripture defaults to manual source
  ---
  duration_ms: 0.562587
  type: 'test'
  ...
# Subtest: ProPresenter settings are globally available
ok 28 - ProPresenter settings are globally available
  ---
  duration_ms: 0.105898
  type: 'test'
  ...
# Subtest: Smart Flyer defaults to assisted automation
ok 29 - Smart Flyer defaults to assisted automation
  ---
  duration_ms: 0.088832
  type: 'test'
  ...
# Subtest: builds manual scripture context
ok 30 - builds manual scripture context
  ---
  duration_ms: 1.047759
  type: 'test'
  ...
# Subtest: uses ProPresenter scripture when selected
ok 31 - uses ProPresenter scripture when selected
  ---
  duration_ms: 0.339255
  type: 'test'
  ...
# Subtest: reads the official status and presentation endpoints
ok 32 - reads the official status and presentation endpoints
  ---
  duration_ms: 3.543565
  type: 'test'
  ...
# Subtest: does not emit a duplicate verse
ok 33 - does not emit a duplicate verse
  ---
  duration_ms: 0.821963
  type: 'test'
  ...
# Subtest: starts disabled by default
ok 34 - starts disabled by default
  ---
  duration_ms: 0.793241
  type: 'test'
  ...
# Subtest: validates port range
ok 35 - validates port range
  ---
  duration_ms: 0.275741
  type: 'test'
  ...
# Subtest: publishes normalized ProPresenter media events
ok 36 - publishes normalized ProPresenter media events
  ---
  duration_ms: 0.571561
  type: 'test'
  ...
# {"timestamp":"2026-07-23T05:17:16.869Z","level":"INFO","scope":"test","message":"Connecting to ProPresenter","context":{"host":"127.0.0.1","port":1025,"protocol":"tcp"}}
# Subtest: tests the connection through the documented system-time endpoint
ok 37 - tests the connection through the documented system-time endpoint
  ---
  duration_ms: 0.891517
  type: 'test'
  ...
# Subtest: connects and subscribes configured streaming endpoints
ok 38 - connects and subscribes configured streaming endpoints
  ---
  duration_ms: 1.770175
  type: 'test'
  ...
# Subtest: normalizes a ProPresenter Scripture payload
ok 39 - normalizes a ProPresenter Scripture payload
  ---
  duration_ms: 1.399153
  type: 'test'
  ...
# Subtest: uses newline-delimited JSON for a real TCP request
ok 40 - uses newline-delimited JSON for a real TCP request
  ---
  duration_ms: 11.549841
  type: 'test'
  ...
# Subtest: receives chunked streaming messages
ok 41 - receives chunked streaming messages
  ---
  duration_ms: 43.497682
  type: 'test'
  ...
# Subtest: applies capped exponential backoff
ok 42 - applies capped exponential backoff
  ---
  duration_ms: 1.241207
  type: 'test'
  ...
# Subtest: normalizes a common current slide payload
ok 43 - normalizes a common current slide payload
  ---
  duration_ms: 1.926347
  type: 'test'
  ...
# Subtest: supports snake case response variants
ok 44 - supports snake case response variants
  ---
  duration_ms: 0.337292
  type: 'test'
  ...
# Subtest: balances text into visually similar lines
ok 45 - balances text into visually similar lines
  ---
  duration_ms: 1.868511
  type: 'test'
  ...
# Subtest: penalizes a one-word final line when a better partition exists
ok 46 - penalizes a one-word final line when a better partition exists
  ---
  duration_ms: 1.223591
  type: 'test'
  ...
# Subtest: reports overflow when minimum font still exceeds the box
ok 47 - reports overflow when minimum font still exceeds the box
  ---
  duration_ms: 0.210423
  type: 'test'
  ...
# Subtest: Scripture includes a default simple-mode design
ok 48 - Scripture includes a default simple-mode design
  ---
  duration_ms: 0.559323
  type: 'test'
  ...
# Subtest: Scripture broadcast state starts safely off air
ok 49 - Scripture broadcast state starts safely off air
  ---
  duration_ms: 0.231785
  type: 'test'
  ...
# Subtest: publishes verse and program events
ok 50 - publishes verse and program events
  ---
  duration_ms: 1.957283
  type: 'test'
  ...
# Subtest: does not mark identical normalized content as changed
ok 51 - does not mark identical normalized content as changed
  ---
  duration_ms: 0.349651
  type: 'test'
  ...
# Subtest: preview iframe is not hidden behind a ready-message race
ok 52 - preview iframe is not hidden behind a ready-message race
  ---
  duration_ms: 0.761513
  type: 'test'
  ...
# Subtest: lateral padding overrides every Scripture format
ok 53 - lateral padding overrides every Scripture format
  ---
  duration_ms: 0.523839
  type: 'test'
  ...
# Subtest: text fitting performs real rendered candidate measurements
ok 54 - text fitting performs real rendered candidate measurements
  ---
  duration_ms: 0.203092
  type: 'test'
  ...
# Subtest: preview initialization cannot abort the whole app
ok 55 - preview initialization cannot abort the whole app
  ---
  duration_ms: 1.545441
  type: 'test'
  ...
# Subtest: saved Scripture state is deeply hydrated
ok 56 - saved Scripture state is deeply hydrated
  ---
  duration_ms: 0.221239
  type: 'test'
  ...
# Subtest: restores original Scripture geometry
ok 57 - restores original Scripture geometry
  ---
  duration_ms: 0.555317
  type: 'test'
  ...
# Subtest: restores writing and contextual transitions
ok 58 - restores writing and contextual transitions
  ---
  duration_ms: 0.103685
  type: 'test'
  ...
# Subtest: restores gradient and typography
ok 59 - restores gradient and typography
  ---
  duration_ms: 0.177644
  type: 'test'
  ...
# Subtest: Scripture restores the original template and format defaults
ok 60 - Scripture restores the original template and format defaults
  ---
  duration_ms: 0.535287
  type: 'test'
  ...
# Subtest: Appearance and animation configuration have usable defaults
ok 61 - Appearance and animation configuration have usable defaults
  ---
  duration_ms: 0.214589
  type: 'test'
  ...
# Subtest: TV Broadcast CG is available in the advanced template library
ok 62 - TV Broadcast CG is available in the advanced template library
  ---
  duration_ms: 1.77423
  type: 'test'
  ...
# Subtest: Scripture output contains the robust fitting engine
ok 63 - Scripture output contains the robust fitting engine
  ---
  duration_ms: 0.332665
  type: 'test'
  ...
# Subtest: Preview uses one scaled 1920 by 1080 stage
ok 64 - Preview uses one scaled 1920 by 1080 stage
  ---
  duration_ms: 0.294147
  type: 'test'
  ...
# Subtest: preview iframe preserves a 1920 by 1080 viewport
ok 65 - preview iframe preserves a 1920 by 1080 viewport
  ---
  duration_ms: 1.513663
  type: 'test'
  ...
# Subtest: overlay no longer polls and rerenders every two seconds
ok 66 - overlay no longer polls and rerenders every two seconds
  ---
  duration_ms: 0.273978
  type: 'test'
  ...
# Subtest: signature excludes volatile ProPresenter timestamps
ok 67 - signature excludes volatile ProPresenter timestamps
  ---
  duration_ms: 0.178175
  type: 'test'
  ...
# Subtest: verse width follows configured lateral padding without a legacy cap
ok 68 - verse width follows configured lateral padding without a legacy cap
  ---
  duration_ms: 0.329721
  type: 'test'
  ...
# Subtest: text fitting stays readable without horizontal compression
ok 69 - text fitting stays readable without horizontal compression
  ---
  duration_ms: 0.298434
  type: 'test'
  ...
# Subtest: normalizes a verse and creates a stable id
ok 70 - normalizes a verse and creates a stable id
  ---
  duration_ms: 1.141419
  type: 'test'
  ...
# Subtest: requires verse text
ok 71 - requires verse text
  ---
  duration_ms: 0.234529
  type: 'test'
  ...
# Subtest: stable id changes when content changes
ok 72 - stable id changes when content changes
  ---
  duration_ms: 0.135602
  type: 'test'
  ...
# Subtest: parses a Spanish Scripture reference
ok 73 - parses a Spanish Scripture reference
  ---
  duration_ms: 1.251413
  type: 'test'
  ...
# Subtest: extracts a reference from the first line
ok 74 - extracts a reference from the first line
  ---
  duration_ms: 0.454807
  type: 'test'
  ...
1..74
# tests 74
# suites 0
# pass 74
# fail 0
# cancelled 0
# skipped 0
# todo 0
# duration_ms 496.101542

```

## server_syntax
Exit code: 0

```text

```

## app_syntax
Exit code: 0

```text

```

## overlay_syntax
Exit code: 0

```text

```

