# BMMS Update 038.4 — Smart Flyer Clean Rewrite

Smart Flyer was rewritten as an isolated module instead of continuing the accumulated layout patches.

## Scope
- New three-column workspace with a fixed, bounded center.
- Flyer stage uses intrinsic `object-fit: contain` dimensions.
- CG result is an intrinsic broadcast strip, not a 1920×1080 monitor.
- Manual multi-region selection, move, delete and region OCR.
- Full-image OCR only writes fields above the confidence threshold.
- QR detection and manual QR region extraction.
- Four functional visual templates and four functional layouts.
- Transparent Browser Output that renders only the CG strip.

## Validation targets
- No dependency on browser zoom at 1920×1080.
- Flyer and CG result remain visible simultaneously.
- No full flyer image is rendered in Browser Output.
- Scripture files and ProPresenter integration remain untouched.
