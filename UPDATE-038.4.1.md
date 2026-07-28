# BMMS Update 038.4.1 — Source Preview Fit

## Scope
This incremental update modifies only the Smart Flyer workspace sizing and source preview.

## Changes
- Smart Flyer now consumes the real height provided by the BMMS workspace instead of recalculating viewport height with a conflicting fixed subtraction.
- The source flyer is contained and centered as a 16:9 (1920×1080 logical) image.
- The flyer can no longer be clipped by the result panel or workspace padding.
- Side panels are wider on Full HD displays to use surplus horizontal space.
- The CG result area is reduced to 126 px so the source preview receives more vertical room.
- Region overlays continue to use the rendered image bounds.

## Files
- `apps/graphics/public/smart-flyer-v2.css`
- `apps/graphics/public/index.html`
- `VERSION`
- `package.json`
- `package-lock.json`
