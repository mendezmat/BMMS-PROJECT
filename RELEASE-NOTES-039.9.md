# BMMS Update 039.9 — Visual CG Studio

Versión de aplicación: `1.24.17-beta.55`.

## Resultado

- Visual CG se convierte en un editor de composición completo.
- Se recupera el lenguaje visual de las primeras versiones `BMMS_Flyer_to_CG` y `BMMS_Graphics_Biblia_FlyerCG` mediante tres presets reconstruidos:
  - Flyer CG Original.
  - Flyer CG Premium.
  - Flyer CG Banner.
- La colección aumenta a nueve variantes seleccionables, incluida la recomendación automática.
- Posición automática o manual en nueve zonas de pantalla.
- Autoajuste de contenido para títulos, metadatos, QR e imagen.
- Generación local de QR desde texto o URL, sin depender de internet.
- Carga de QR existente y carga opcional de imagen o logo.
- Tipografías, peso, escala, alineación, superficie y color de acento configurables.
- Animaciones Suave, Ascenso, Deslizamiento, Revelado, Escala y Sin animación.
- Preview y Browser Output continúan usando el mismo renderer y la misma escena de PROGRAM.
- La previsualización del flyer permanece compacta porque solo se usa como referencia visual.
- Scripture no fue modificado.

## Instalación

Detén el servidor. Extrae el ZIP y fusiona la carpeta `BMMS-PROJECT` con tu carpeta existente, aceptando reemplazar los archivos.

```powershell
npm.cmd run check
npm.cmd start
```

Después recarga BMMS Graphics y el Browser Output con `Ctrl + Shift + R`.

## Git

```powershell
git status
git add .
git commit -m "feat(visual-cg): add configurable broadcast studio and legacy Flyer CG presets"
git tag -a v1.24.17-beta.55 -m "BMMS Update 039.9 - Visual CG Studio"
git push origin main
git push origin v1.24.17-beta.55
```

## Validación

- Repository check: OK.
- JavaScript syntax: OK.
- Visual CG tests: 6/6.
- Editor, QR local, posición, TAKE y Browser Output verificados en navegador.
- Errores de consola: ninguno.
