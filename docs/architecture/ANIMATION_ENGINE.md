# Animation Engine — Scripture 036.0

El estado vive en `scripture.animation` y conserva compatibilidad con los tiempos históricos.

Campos principales:

- `preset`
- `in`
- `out`
- `durationMs`
- `easing`
- `smartTransitions`
- `wordCascade`
- `wordCascadeStepMs`

El overlay traduce la configuración a variables CSS y atributos `data-animation-in` / `data-animation-out`. Las transiciones dentro del mismo capítulo pueden animar solo el contenido sin retirar el banner completo.
