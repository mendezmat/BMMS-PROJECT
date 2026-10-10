# BMMS Graphics — Incremental 041.4 OCR en español y sin internet

## Alcance

Mejora exclusivamente el OCR de Smart Flyer. No modifica Scripture, Visual CG ni los overlays.

## Cambios

- El OCR lee en español (`spa`) en todas las pasadas: análisis completo, título y reanálisis por área. Antes la pasada rápida y la del título usaban inglés y perdían tildes y ñ.
- Tesseract.js 5.1.1 y el modelo de español se incluyen en `apps/graphics/public/vendor/tesseract/` (9,8 MB). El OCR funciona sin conexión a internet.
- Si esa carpeta no existe, BMMS usa el CDN como antes.
- El motor se precarga al cargar el flyer y se reutiliza entre análisis, así el modelo se descarga una sola vez.
- Si TextDetector no devuelve texto, se intenta con Tesseract.
- El servidor sirve `/vendor/` solo para archivos `.js`, `.wasm` y `.gz` dentro de `public/vendor`.

## Validación

- Prueba en Chromium con internet bloqueado: un flyer de ejemplo devolvió título, fecha ("Sábado 15 de noviembre"), hora y lugar en 1,3 s. Con el código anterior, sin internet, no devolvía nada.
- `npm test`: 149 pasan y 27 fallan. Esas 27 fallas ya existían antes de este cambio (pruebas antiguas de Smart Flyer y Scripture).

## Nota

Desde la 041.0, la pestaña Smart Flyer muestra el Visual CG y `smart-flyer-app.js` no se carga en `index.html`. El OCR mejorado queda listo para cuando Smart Flyer vuelva a activarse.
