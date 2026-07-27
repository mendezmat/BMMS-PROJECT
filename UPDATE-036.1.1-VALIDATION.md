# Update 036.1.1 — Style Profile Load Hotfix

## Problema corregido

Los perfiles de Scripture podían guardarse, pero una operación inmediata de carga podía competir con cambios todavía pendientes en la cola de guardado. El guardado anterior podía sobrescribir el estilo recién aplicado.

## Corrección

- Las operaciones inmediatas ahora vacían y fusionan la cola pendiente antes de persistir.
- `Aplicar` espera la confirmación real del servidor antes de informar éxito.
- El selector conserva el perfil elegido después de cargarlo.
- Se muestran errores de carga en la propia interfaz.
- La sincronización SSE sigue repoblando el selector al recibir el estado persistido.

## Validación

- Sintaxis JavaScript: OK.
- `npm run check`: ejecutado.
- Suite: 99/102, sin regresiones nuevas; permanecen las tres pruebas históricas conocidas.
- Integridad ZIP: validada.
