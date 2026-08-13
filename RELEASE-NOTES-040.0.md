# BMMS Update 040.0 — Professional Broadcast CG

Versión: `1.24.18-beta.56`.

## Rediseño

- Sustitución completa de la capa visual anterior de Visual CG.
- Nueve opciones en la galería y ocho familias gráficas reales:
  - Essential.
  - Sanctuary Glass.
  - Message Editorial.
  - Youth Motion.
  - Live Signal.
  - Flyer CG Original.
  - Flyer CG Premium.
  - Flyer CG Banner.
- Cada familia posee estructura, proporciones y jerarquía propias.
- Se elimina el patrón de bloque grande reutilizado para todos los estilos.
- Los CG ocupan menos pantalla y respetan la zona segura de 1920 × 1080.

## Correcciones profesionales

- QR integrado como elemento secundario compacto.
- El QR ya no crea una columna blanca dominante.
- Ajuste de títulos cortos, medianos y largos hasta dos líneas.
- Metadatos con jerarquía y distribución específicas por diseño.
- Superficies Clara, Oscura, Cristal y Automática aplicadas realmente.
- Imagen o logo integrados sin invadir el título.
- Las nueve posiciones siguen funcionando con todas las familias.
- Preview, PROGRAM y Browser Output usan exactamente el mismo renderer.
- Scripture no fue modificado.

## Instalación

Fusiona la carpeta `BMMS-PROJECT` de la actualización con tu proyecto y acepta reemplazar.

```powershell
npm.cmd run check
npm.cmd start
```

Recarga BMMS Graphics y el Browser Output con `Ctrl + Shift + R`.

## Git

```powershell
git status
git add .
git commit -m "feat(visual-cg): rebuild professional broadcast designs"
git tag -a v1.24.18-beta.56 -m "BMMS Update 040.0 - Professional Broadcast CG"
git push origin main
git push origin v1.24.18-beta.56
```
