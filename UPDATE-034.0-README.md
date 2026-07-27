# BMMS Update 034.0 — Workspace Rewrite

Versión: `1.11.0-beta.10`

## Objetivo

Reconstruir el layout de Scripture para que el panel de configuración tenga desplazamiento vertical independiente y el Preview permanezca visible.

## Cambios

- El workspace de escritorio usa una estructura de altura explícita basada en Grid.
- Scripture se divide en título, barra de conexión y editor con altura acotada.
- Solo `.settings-stack` controla el scroll vertical.
- El Preview y la barra de transporte permanecen en la columna derecha.
- En pantallas de 900 px o menos vuelve el scroll normal de página.
- No se modificó la lógica de Scripture, ProPresenter ni Foundation.
