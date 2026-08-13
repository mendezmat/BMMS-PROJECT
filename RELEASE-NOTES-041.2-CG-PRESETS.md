# BMMS Graphics — Incremental 041.2 CG Presets

## Alcance

Este incremental agrega presets locales a los ocho banners Figma existentes. No modifica Scripture, el renderer, los diseños, las animaciones ni el módulo QR.

## Presets

- Guardar la composición actual con un nombre.
- Invocar un preset con un clic.
- Actualizar un preset guardándolo nuevamente con el mismo nombre.
- Eliminar presets con confirmación.
- Hasta 30 presets por navegador.
- Persistencia local aunque se cierre y vuelva a abrir BMMS.

Cada preset conserva:

- diseño Glass o Solid;
- tipo Speaker, Verse, Announcement o Welcome;
- texto principal y secundario;
- referencia o categoría;
- colores, opacidad, tipografías, tamaños, pesos y alineación;
- elementos visibles;
- estado y contenido del QR existente.

## Instalación

Con BMMS cerrado, combina la carpeta `BMMS-PROJECT` del ZIP con tu proyecto y acepta reemplazar. Después ejecuta:

```powershell
npm.cmd run check
npm.cmd start
```

Recarga BMMS con `Ctrl + Shift + R`.

## Nota

Los presets se guardan en el almacenamiento local del navegador utilizado en `localhost:4173`; no se sincronizan automáticamente entre navegadores o computadoras.
