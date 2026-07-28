# 037.0 — Smart Flyer Foundation

- Activado Smart Flyer.
- Añadido análisis local de imagen y propuestas base.
- Añadida arquitectura OCR por proveedores.

## 1.14.3-beta.14 — Update 036.2

- Optimized ProPresenter Live Scripture diagnostics.
- Added duplicate, processed-event and synchronization metrics.
- Added intelligent transition classification.
- Added compact operator diagnostics in Scripture.


## 1.14.1-beta.12 — Update 036.1.1

- Corregida la carga de perfiles guardados de Scripture.
- Las cargas inmediatas ya no pueden ser sobrescritas por guardados pendientes.
- El botón Aplicar ahora espera persistencia confirmada por el servidor.

## 036.1 — Scripture Style Manager

- Se añadieron perfiles persistentes de estilo para Scripture.
- Aplicar un perfil ya no altera el texto, referencia, fuente ni estado al aire.
- Se incorporó guardado, actualización y eliminación desde el workspace.

## 036.3 — Live Engine Stability

- Fixed the blank-slide deduplication lock that prevented the same verse from returning.
- Added automatic reconnection, progressive backoff and throttled error logging.
- Replaced the diagnostics toggle with a native disclosure panel.
- Added manual connection restart and additional recovery metrics.


## 1.14.5-beta.16 — Update 036.3.1

- Fixed the ProPresenter diagnostics panel being clipped by the fixed Scripture grid.
- Added a bounded, scrollable native disclosure region.
- Added a local rolling log of recent ProPresenter events.
- Preserved the stable Live Engine from Update 036.3.

## 036.4 — Performance Engine

- Se añadió polling adaptativo para ProPresenter.
- Se descartaron respuestas idénticas mediante hash antes del procesamiento completo.
- Se redujeron eventos de telemetría y actualizaciones del DOM.
- Los duplicados del diagnóstico ahora se agrupan.

## 1.15.1-beta.19 — Update 037.1

- Fixed Smart Flyer scrolling and sticky preview behavior.
- Added editable content extraction model and reactive preview.
- Added native local OCR/QR provider adapters with transparent fallbacks.
