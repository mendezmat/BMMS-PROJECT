# BMMS Graphics — Incremental 041.1 CG Controls

## Cambios

- Las animaciones conservan la entrada original de Figma de 1.5 segundos, pero se reproducen una sola vez.
- Cada TAKE incluye un identificador nuevo para que PROGRAM y Browser Output reproduzcan nuevamente la entrada.
- El QR es opcional y comienza oculto.
- Crear o cargar un QR lo activa automáticamente.
- Cada uno de los ocho CG mantiene su configuración visual independiente.
- Controles de fondo, opacidad, borde, acento, texto principal y texto secundario.
- Fuentes, pesos, tamaños y alineación configurables.
- Controles para ocultar EN VIVO, acento, borde, texto secundario, categoría/referencia y texto del QR.
- Botón para restablecer solamente el diseño seleccionado.
- Preview, PROGRAM y Browser Output comparten todos los ajustes.
- Scripture no fue modificado.

## Inicio

```powershell
Set-Location "$env:USERPROFILE\Documents\BMMS-PROJECT"
npm.cmd run check
npm.cmd start
```
