# BMMS Hotfix 022 — Smart Balance Auto-Enlarge

Root cause:
Scripture used 36 px as both the configured size and the maximum fitting
size. On a 1920x1080 canvas this is visually too small.

Fix:
- Smart Balance now enlarges short and medium passages.
- 1–10 words: target 88 px.
- 11–18 words: target 78 px.
- 19–28 words: target 68 px.
- 29–42 words: target 58 px.
- 43–60 words: target 50 px.
- Longer passages: target 44 px before fitting.
- The configured body size remains a floor when Smart Balance is active.
- When Smart Balance is disabled, the configured size is respected
  literally.

No server, ProPresenter, Manual, Preview, Program, Take, Clear or Auto
routes were changed.
