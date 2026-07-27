# Update 036.1.2 — Style Profiles Persistence Hotfix

## Problema corregido

Los perfiles de estilo se guardaban correctamente, pero cualquier cambio posterior en Scripture enviaba `styleProfiles: []` dentro de la cola de guardado diferido. El servidor interpretaba ese arreglo vacío como una instrucción válida y eliminaba todos los perfiles guardados.

## Corrección

`mergeScripturePatch()` ya no crea automáticamente un arreglo vacío para `styleProfiles` cuando el cambio no incluye esa propiedad. Los perfiles solo se modifican cuando una operación de guardar, actualizar o eliminar perfil los envía explícitamente.

## Validación

- Sintaxis JavaScript: OK
- Repository check: OK
- Suite existente: 99/102
- Fallos históricos sin cambios: 3
- Regresión corregida: guardar perfil → modificar diseño → perfil permanece disponible
