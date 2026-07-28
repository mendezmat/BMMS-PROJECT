# Update 038.1 — Validación

## Objetivo
Estabilizar el viewport de Smart Flyer y mostrar el resultado con dimensiones intrínsecas de CG, no como monitor 16:9.

## Verificaciones
- Flyer central: `object-fit: contain`, sin recorte.
- Resultado CG: alto limitado entre 108 y 154 px.
- Workspace: panel central con filas `1fr auto`.
- Plantillas y formatos: barra lateral.
- Overlay de salida: sin cambios.
