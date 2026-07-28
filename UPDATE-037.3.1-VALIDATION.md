# BMMS Update 037.3.1 — Smart Flyer Preview Recovery

## Corrección

La Update 037.3 agregó el selector rápido de plantillas como un nuevo hijo del panel Preview, pero la cuadrícula del panel conservó solo tres filas. El selector ocupó por error la fila flexible central y desplazó el canvas 16:9 hacia una fila implícita sin espacio visible.

Se corrige la estructura a cuatro filas:

1. Encabezado
2. Selector rápido
3. Canvas 16:9 flexible
4. Nota de estado

También se sincroniza la versión visible de la interfaz con la versión real del paquete.

## Alcance

- Smart Flyer Preview recuperado.
- Modern, TV y Glass continúan usando el mismo renderer.
- Sin cambios en Scripture, ProPresenter, API ni overlays.
