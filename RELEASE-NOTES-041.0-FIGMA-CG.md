# BMMS Graphics — Actualización 041.0 Figma CG

## Resultado

El sistema Visual CG activo fue sustituido por las ocho composiciones originales del archivo Figma. Las familias experimentales anteriores dejaron de cargarse en la aplicación y en el Browser Output.

## Composiciones activas

- Thin Glass · Speaker (`15:136`)
- Thin Glass · Verse (`15:148`)
- Thin Glass · Announcement (`15:163`)
- Thin Glass · Welcome (`15:178`)
- Thin Solid · Speaker (`15:192`)
- Thin Solid · Verse (`15:205`)
- Thin Solid · Announcement (`15:221`)
- Thin Solid · Welcome (`15:237`)

## Fidelidad Figma

- Geometría original de 1920 × 1080.
- Lower thirds Glass en `x:40`, `y:940`, `1840 × 80`.
- Lower thirds Solid en `x:0`, `y:1000`, `1920 × 80`.
- Tipografías locales Instrument Sans y Outfit.
- Colores, bordes, blur, espaciado y jerarquías tomados de los nodos originales.
- Animaciones originales de 1.5 segundos en loop.
- Assets originales para pulso LIVE, separador y QR de referencia.

## Integración BMMS

- Un solo renderer para Preview, PROGRAM y Browser Output.
- Colección moderna con mini previews de las ocho composiciones.
- Editor de contenido adaptado a Speaker, Verse, Announcement y Welcome.
- QR generado desde texto/URL o cargado como imagen en Verse y Announcement.
- TAKE conserva la API existente de Visual CG.
- Scripture no fue modificado.

## Verificación

- `npm.cmd run check`: OK.
- JavaScript syntax: OK.
- Tests específicos de Figma CG: 6/6 OK.
- Rutas del editor, output, CSS, JS, fuentes y SVG: HTTP 200.
- Publicación y lectura de PROGRAM probadas con las ocho composiciones.

## Inicio

```powershell
Set-Location "$env:USERPROFILE\Documents\BMMS-PROJECT"
npm.cmd run check
npm.cmd start
```
