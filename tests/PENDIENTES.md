# Pruebas pendientes (Graphics / Smart Flyer)

`npm test` omite estas pruebas antiguas porque describen funciones de BMMS Graphics que hoy no
están implementadas o cambiaron (no afectan a TB Tool ni a BMMS Central). Se retoman al trabajar
en BMMS Graphics. Para verlas fallar: `npm run test:legacy`.

- Smart Flyer: la consola ya no incluye `smart-flyer-app.js` en `index.html` (Smart Flyer no es
  accesible desde la interfaz) y faltan controles de recorte, área segura, programa, Vision Assist
  multibloque, galería de formatos y panel de inspector.
- Browser Output: lectura de una instantánea atómica, recorte seleccionado y salida sin el flyer fuente.
- Scripture: `ScriptureStateStore` (estado con revisiones) no existe en `packages/scripture-core`
  (`tests/scripture-core/scripture-state-store.pending.js`).
- Base de plantillas por regiones de Smart Flyer (`tests/smart-flyer-region-template-foundation.pending.cjs`).
