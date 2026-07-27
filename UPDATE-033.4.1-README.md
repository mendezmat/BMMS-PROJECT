# BMMS Update 033.4.1 — Settings Scroll Hotfix

Corrige el desplazamiento independiente del panel de configuración introducido en Update 033.4.

## Cambios

- El panel de configuración de Scripture vuelve a tener scroll vertical propio.
- El Preview permanece fijo en la columna derecha.
- La página completa no se desplaza en escritorio.
- Se añadieron `min-height: 0` a los ancestros flex/grid para permitir que el panel reduzca su altura y active `overflow-y: auto`.
- La columna derecha deja de comportarse como contenedor de scroll.

## Versión

`1.10.5-beta.10`
