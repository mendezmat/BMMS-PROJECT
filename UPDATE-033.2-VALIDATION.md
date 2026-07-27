# Validación Update 033.2

- `npm run check`: OK.
- `node --check apps/graphics/public/app.js`: OK.
- `node --check apps/graphics/server.js`: OK.
- Suite: 99/102 pruebas aprobadas.
- Permanecen 3 pruebas históricas de Scripture que ya fallaban en la base recibida; esta actualización no modifica el render del overlay ni esas pruebas.

## Alcance validado

- Navegación superior de módulos.
- Configuración global de ProPresenter conservada en `Configuración`.
- Scripture inicia en el editor de ajustes.
- Panel de ajustes entre 390 y 480 px.
- Preview utiliza todo el espacio horizontal restante.
- Herramientas Foundation ocultas visualmente en modo operador y preservadas con `?developer=1`.
