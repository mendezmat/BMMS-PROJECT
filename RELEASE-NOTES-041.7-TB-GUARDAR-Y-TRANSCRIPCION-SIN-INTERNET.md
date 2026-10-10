# BMMS — Incremental 041.7 TB Tool: guardar sesiones y transcripción sin internet

## Cambios

- **Transcripción sin internet (Whisper).** Motor nuevo, predeterminado: "Sin internet (Whisper)". Corre en el navegador (Chrome o Edge, Mac o Windows) con el modelo Whisper oficial guardado dentro de BMMS. No se conecta a internet en ningún momento. El motor anterior sigue disponible como "Navegador (requiere internet)".
- **Modelo:** "Preciso (small)" o "Rápido (base)". En automático, usa small cuando el equipo tiene GPU (WebGPU) y base cuando no la tiene.
- Cada canal corta su audio en frases según la detección de voz, así que cada frase queda asignada al canal exacto que habló. Mientras procesa, aparece "Transcribiendo…" en el color del canal, también en la ventana flotante.
- Se descartan frases de menos de 0,4 s y los textos que Whisper inventa con ruido ("Subtítulos realizados por…", "Gracias por ver", "[Música]", palabras repetidas).
- **Guardar:** el botón "Guardar" (o Cmd/Ctrl+S) guarda la transcripción como sesión con nombre, junto con los ajustes. El botón "Guardadas" lista las sesiones y permite abrirlas, exportarlas o borrarlas. Se guardan en `data/tb-sessions/` como `.json` y `.txt`.
- **Destello solo arriba:** la nueva opción "Dónde se ve" ofrece "Solo arriba" (predeterminado) o "Todo el borde".

## Rendimiento medido (MacBook Pro M1 Pro, frase de 4,3 s)

- small en GPU: 1,0 s por frase, texto exacto.
- base en CPU: 3,5 s por frase, con pequeños errores.
- small en CPU: 14 s por frase. Por eso en automático, sin GPU se usa base.

## Espacio en disco

- Modelos: `apps/graphics/public/vendor/models/` ocupa unos 650 MB (small 505 MB y base 150 MB).
- Motor transformers.js: `vendor/transformers/` ocupa 22 MB.
- Los modelos no van a git (`.gitignore`). Si copias la carpeta BMMS-PROJECT completa a otro equipo, los modelos van incluidos. Si clonas desde git, ejecuta una vez:

```
node scripts/download-tb-model.mjs whisper-small
node scripts/download-tb-model.mjs whisper-base
```

## Validación

- `node --test tests/tb-tool.test.js`: 16 pasan, 0 fallan.
- Frase en español generada con `say -v Paulina` y pasada por la página real (captura, detector de voz, segmentador y Whisper): texto correcto, sin peticiones a internet.
