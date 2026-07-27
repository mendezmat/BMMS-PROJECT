# Problemas conocidos y regresiones evitadas

## Preview recortado

**Estado:** resuelto.  
**Regla:** el modo Ajustar calcula la escala con el mínimo entre ancho y alto disponibles, conserva 16:9 y centra el canvas.

## Scroll de Scripture

**Estado:** resuelto.  
**Regla:** el panel izquierdo administra su propio scroll; el Preview no se desplaza.

## Scroll de Configuración

**Estado:** resuelto.  
**Regla:** Configuración tiene scroll vertical independiente. No aplicar la corrección globalmente a Scripture.

## Riesgo actual: compatibilidad de animaciones

Los estados anteriores pueden no contener `preset`, `easing` o `smartTransitions`. El runtime debe conservar valores por defecto compatibles.
