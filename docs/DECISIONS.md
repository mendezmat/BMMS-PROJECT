# Registro de decisiones de producto

## 2026-07-27 — Prioridad producto antes que editor avanzado

### Decisión

Terminar los módulos que resuelven necesidades inmediatas de operación antes de desarrollar el editor visual avanzado.

### Orden aprobado

Scripture → Smart Flyer → Lower Third → Countdown → Editor Visual.

### Motivo

El editor avanzado es valioso, pero no resuelve primero los problemas que aparecen cada semana durante una transmisión. El desarrollo inmediato debe concentrarse en estabilidad, rapidez y operación.

### Qué se pospone

- Capas avanzadas.
- Guías inteligentes.
- Edición directa tipo Figma/Canva.
- Marketplace.
- Plugins.
- Foundation expuesta en la interfaz de producción.

## 2026-07-27 — Workspace de producción

El Preview permanece fijo, cada módulo administra su propio scroll y el layout estable no debe reescribirse sin una regresión comprobada.

## Sprint 036.0

### Qué decidimos

Construir un motor de animaciones práctico dentro de Scripture y documentar la dirección oficial dentro del repositorio.

### Por qué

Las transiciones se utilizan en cada servicio y tienen impacto directo en la calidad de la transmisión.

### Próximo foco

Validar las animaciones en operación real y continuar con los pendientes de Scripture.

## Sprint 036.1

### Qué decidimos

- Los perfiles de Scripture contienen solo configuración visual y de animación.
- Los perfiles se persisten en el estado del servidor.

### Por qué

- El operador debe cambiar de identidad visual sin riesgo de reemplazar contenido o estado de emisión.

### Qué descartamos

- Guardar el versículo dentro del perfil.
- Guardar perfiles únicamente en localStorage.

### Próximo foco

- ProPresenter Live Link: velocidad, deduplicación y diagnóstico.


## Sprint 036.2

### Qué decidimos

- Mantener la deduplicación en el servicio antes de escribir estado.
- Exponer métricas locales mediante el estado Live Scripture.
- Mostrar diagnóstico plegable dentro de Scripture.

### Por qué

- Evita parpadeos y escrituras innecesarias.
- Permite diagnosticar la integración durante una transmisión.
- Mantiene el Preview como prioridad visual.

### Qué descartamos

- Telemetría remota.
- Procesamiento paralelo de solicitudes a ProPresenter.
- Rediseño general del workspace.

### Próximo foco

- Gestor avanzado de estilos.
