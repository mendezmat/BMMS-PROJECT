# Update 037.6.1 — Validation

## Root cause

`app.js` imports `/smart-flyer-vision.js`, but the HTTP server did not expose that file. The browser received HTTP 404, so the ES module graph aborted before UI event handlers were registered.

## Fix

Added an explicit static route in `apps/graphics/server.js` for `/smart-flyer-vision.js`.

## Expected result

- Main application loads without module 404 errors.
- Scripture navigation works.
- Smart Flyer navigation works.
- Settings opens.
- Existing Smart Flyer preview and OCR workflow remain available.
