# BMMS Graphics — Incremental 041.3 Figma QR Announcement V2

## Alcance

Actualiza exclusivamente el estado con QR de `Glass · Announcement` utilizando el frame Figma `thin-glass-qr-announcement V2` (`46:2`).

## Comportamiento

- Sin QR: conserva exactamente el banner actual `thin-glass-announcement`.
- Con QR: activa la composición V2 de Figma.
- Barra principal en `94, 940`, de `1519 × 80 px`.
- Módulo QR sobresaliente en `1665, 830`, de `160 × 190 px`.
- QR visible de `100 × 100 px`, con lienzo útil de `84 × 84 px`.
- Mantiene colores, tipografías, visibilidad y contenido configurables.
- Animación V2 adaptada a una sola reproducción; no utiliza loop.
- No modifica los otros siete diseños ni Scripture.

## Instalación

Combina la carpeta `BMMS-PROJECT` del ZIP con el proyecto local y acepta reemplazar. Luego ejecuta:

```powershell
npm.cmd run check
npm.cmd start
```

Recarga BMMS y el output con `Ctrl + Shift + R`.
