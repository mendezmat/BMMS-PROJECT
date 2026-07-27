# BMMS Update 033.4 — Workspace UX

Version: `1.10.4-beta.10`

## Alcance

- PROGRAM y PREVIEW se ocultan en la interfaz de producción.
- El Preview del output permanece anclado en la columna derecha.
- El panel de configuración usa desplazamiento independiente.
- ENVIAR, LIMPIAR y AUTO permanecen accesibles.
- No se elimina ningún hook DOM utilizado por la lógica existente.

## Compatibilidad

Los elementos de PROGRAM/PREVIEW permanecen en el DOM y solo se ocultan mediante CSS para no romper referencias históricas de JavaScript.
