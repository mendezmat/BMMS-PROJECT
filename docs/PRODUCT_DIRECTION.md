# BMMS Graphics — Dirección oficial de producto

**Estado:** vigente y vinculante para las próximas decisiones de desarrollo.  
**Actualizado:** 2026-07-27

## Propósito

BMMS Graphics es una herramienta de operación de gráficos broadcast en tiempo real. No busca convertirse todavía en un editor de diseño general. Su objetivo es eliminar fricción, reducir errores y acelerar el trabajo del operador durante una transmisión.

> BMMS no se desarrolla agregando funciones. Se desarrolla eliminando fricción del operador.

## Prioridad oficial

1. Terminar **Scripture** hasta que sea confiable para uso semanal en producción.
2. Terminar **Smart Flyer**.
3. Construir **Lower Third** reutilizando la infraestructura existente.
4. Construir **Countdown**.
5. Solo después desarrollar el **Editor Visual avanzado** (capas, guías, edición directa, marketplace y plugins).

## Regla de foco

No iniciar una fase posterior mientras el módulo activo tenga problemas de producción aprobados y pendientes. Las ideas futuras se documentan en backlog; no reemplazan el foco actual.

## Criterio para aprobar funciones

Toda función debe responder de forma concreta:

- ¿Qué problema real del operador resuelve?
- ¿Con qué frecuencia se utilizará en una transmisión?
- ¿Reduce tiempo, clics o errores?
- ¿Puede reutilizarse en otros módulos?

Si no existe una respuesta clara, la función se pospone.

## Decisiones de interfaz ya congeladas

- El Preview permanece visible mientras se editan controles.
- Scripture mantiene scroll independiente en su panel de configuración.
- Configuración mantiene su propio scroll.
- El modo Ajustar del Preview conserva 16:9 y nunca recorta el output.
- Browser Output vive en Configuración y no ocupa espacio permanente en el workspace.
- No modificar el layout estable salvo para corregir una regresión demostrable.
