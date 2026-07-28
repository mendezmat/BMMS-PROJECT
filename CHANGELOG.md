## 1.23.3-beta.37 — Update 038.3 Smart Flyer Hard Reset

- Rebuilt Smart Flyer sizing with a dedicated final override stylesheet.
- Kept the flyer viewport fully contained at 100% browser zoom.
- Replaced the CG monitor canvas with an intrinsic lower-third strip.
- Rebuilt Browser Output as a transparent broadcast lower third instead of a full-screen flyer.
- Simplified template and format behavior so all variants remain inside their bounds.

## 1.23.2-beta.36 — Update 038.2

- Restored a permanently visible intrinsic CG result beneath the flyer.
- Replaced large template and format card libraries with compact sidebar selectors.
- Template and format changes update the real CG preview immediately.
- Preserved the full flyer workspace without clipping.

# 1.23.1-beta.35 — Update 038.1

- El resultado del CG deja de simular una salida 16:9 dentro del operador y se muestra con su altura intrínseca de banner.
- El flyer utiliza todo el espacio vertical restante sin depender del zoom del navegador.
- Se eliminan las reglas conflictivas de altura y aspect-ratio acumuladas en Smart Flyer.
- Plantillas y formatos permanecen en la barra lateral y solo modifican la distribución interna del CG.
- El overlay de salida no fue modificado.

## 1.22.2-beta.33 — Update 037.8.2

- El preview del CG mantiene 16:9 completo y deja de recortarse.
- “Volver a analizar” usa primero las áreas ajustadas manualmente.
- OCR independiente por título, subtítulo, fecha, hora, lugar e información adicional.
- Los campos manuales ya no son sobrescritos por OCR global de baja confianza.
- Las variantes de formato permanecen contenidas dentro del canvas de salida.

## 1.22.0-beta.31 — Update 037.8

- Rebuilt Smart Flyer as a clean three-column Studio workspace.
- Fixed title selection so the full visible flyer width can be used.
- Enlarged the original flyer canvas and the CG result preview.
- Added assisted detected-block navigation and manual-first editing.
- Reworked templates and formats into compact functional libraries.
- Added adaptive CG distribution for date, time, location and QR presence.

## 1.21.0-beta.30 — Update 037.7
- Vision Assist permite seleccionar manualmente la región del título directamente sobre el flyer.
- El título seleccionado se recorta como recurso gráfico y conserva tipografía, color, textura y composición del flyer original.
- Modo “Usar título original del flyer” con texto manual como respaldo.
- El título gráfico se conserva en Preview, TAKE, PROGRAM y Browser Output.
- Selección automática inicial basada en el bloque OCR de mayor presencia visual, con corrección manual no destructiva.
- No se modificó Scripture ni la integración ProPresenter.

# Changelog

## 1.20.1-beta.29 — Update 037.6.1

- Fixed the missing `/smart-flyer-vision.js` static route.
- Restored application bootstrap and all global UI interactions.
- Scripture, Smart Flyer, Settings and navigation controls are clickable again.
- No changes to Vision Engine classification logic.

## 1.20.0-beta.28 — Update 037.6: Vision Engine 1.0

- Added deterministic OCR cleanup to reject symbol-heavy and low-confidence text.
- Added semantic classification for title, subtitle, date, time, location and additional information.
- Tesseract now uses sparse-text segmentation and preserves line confidence/bounding boxes.
- Restored nine visual templates and ten independent composition formats.
- Added OCR confidence and analysis reasons to the operator recommendation.
- Kept Scripture, ProPresenter and Smart Flyer output endpoints unchanged.

## 1.18.0-beta.26 — Update 037.4

- Added automatic template recommendation based on flyer orientation and content density.
- Added Smart Crop X/Y framing controls shared by Preview and Browser Output.
- Added optional title/action safe-area guides in Preview.
- Added a compact PROGRAM monitor that restores the current server scene on load.
- Preserved Smart Flyer overlay API and Scripture behavior.

## 1.17.1-beta.25 — Update 037.3.1

- Corrige la desaparición del preview causada por una fila faltante en la cuadrícula del panel Smart Flyer.
- El canvas 16:9 vuelve a ocupar el área flexible entre el selector de plantillas y la nota inferior.
- Sincroniza la versión visible de BMMS Graphics con la versión del paquete.

# Update 037.3 — Smart Flyer Operator Workspace

- Added collapsible Source and Inspector panels with persisted workspace preferences.
- Added a compact template switcher synchronized with proposal cards and the live renderer.
- Added operator shortcuts for templates (`1`, `2`, `3`) and TAKE (`Enter`).
- Expanded the 16:9 preview automatically when side panels are hidden.
- Preserved the Smart Flyer overlay contract and left Scripture unchanged.

# Update 036.0 — Scripture Animation Engine

- Added reusable Scripture animation presets and independent entry/exit controls.
- Added smart same-chapter content transitions.
- Added authoritative product-direction documentation.

## 1.10.4-beta.10 — Update 033.4

- Oculta las tarjetas PROGRAM y PREVIEW sin eliminar sus hooks internos.
- Mantiene el Preview del output visible mientras se desplaza el panel de configuración.
- Limita el scroll principal al panel lateral de ajustes en escritorio.
- Mantiene fija la barra ENVIAR / LIMPIAR / AUTO.
- Compacta el header y recupera espacio vertical para el monitor.

# Changelog

## [1.6.7-beta.10] - 2026-07-22

### Geometry-only composition scaling

- Horizontal control now changes composition width, lateral spacing and solids.
- Vertical control now changes panel height, vertical padding and background solids.
- Verse, reference and version typography are never transformed or distorted.
- Renamed controls to `Ancho de la composición` and `Altura de la composición`.
- Preserved the working ProPresenter and Manual flows from Update 024.


## [1.6.3-beta.10] - 2026-07-22

### Scripture readability hotfix

- Prevented verse text from collapsing to 3–8 px.
- Added a readable 24 px fitting target and an 18 px emergency floor.
- BMMS now adds lines automatically before reducing the verse excessively.
- Added a stable width fallback during iframe and Browser Output initialization.
- No changes to ProPresenter, Manual, Preview, Program, Take, Clear or Auto.


## [1.6.1-beta.10] - 2026-07-22

### Fixed

- A preview initialization error can no longer stop the entire BMMS interface.
- Added a fallback when `ResizeObserver` is unavailable.
- Missing preview elements are now handled safely.
- Missing optional Scripture controls no longer abort all application scripts.
- Existing saved state is deeply merged with the current Scripture defaults.
- Older or incomplete `app-state.json` files no longer remove newer controls.


## [1.6.0-beta.9] - 2026-07-22

### Fixed

- Embedded preview now uses a real 1920 × 1080 iframe viewport, matching vMix/OBS.
- Removed internal overlay scaling that caused preview-only font differences.
- Removed the two-second polling loop that repeatedly replayed/re-rendered preview content.
- Preview signatures no longer include volatile ProPresenter metadata.
- Text fitting no longer uses horizontal compression and continues reducing font size until content fits.
- Removed the legacy 1500 px verse-width cap.
- `Espacio lateral` now directly defines the text content box in every format.

### Audited

- Preview, Program, Take, Clear, Auto, manual preview and ProPresenter controls.
- Browser Output asset routes and Scripture state synchronization.
- Template, format, gradient, typography and animation state bindings.
- LAN Browser Output compatibility.

### Added

- `/api/scripture/diagnostics` endpoint for fast runtime checks.


## [1.5.1-beta.8] - 2026-07-22

### Fixed

- Embedded Browser Output preview no longer remains black because of a message/load race.
- Preview is always visible and uses the iframe load event for refresh feedback.
- Scripture fitting now validates candidates against real rendered DOM dimensions.
- Final words are protected from clipping with a last-resort horizontal fit.
- Lower-third formats may grow vertically instead of incorrectly failing a fixed-height test.
- `Espacio lateral` now controls all templates and all spatial formats.
- Removed a stray CSS closing brace in the Scripture output stylesheet.


## [1.5.0-beta.7] - 2026-07-22

### Fixed

- Scripture text no longer overflows or gets cut at the right edge.
- Text fitting now uses real browser font measurements.
- Every font-size attempt recalculates the balanced line distribution.
- Added a 40–48 px internal safety margin.
- Embedded preview now scales one real 1920 × 1080 output stage exactly once.
- Preview reload and live configuration synchronization improved.

### Added

- TV Broadcast CG, matching the final television-style lower-third design.
- Dynamic-programming line partitioning for balanced, width-safe verse layouts.
- Final browser-metric verification after rendering.


## [1.4.1-beta.6] - 2026-07-22

### Fixed

- Browser Output no longer stays blank.
- Added the missing HTTP route for `/scripture-layout.js`.
- The Scripture overlay can now load its original line-balancing module.
- Embedded preview and LAN Browser Output use the same repaired asset route.


## [1.4.0-beta.5] - 2026-07-22

### Restored

- Exact Scripture S12 templates and formats.
- Original gradient, geometry and typography controls.
- Progressive word-writing animation with speed.
- Same chapter, new chapter and new book transitions.
- Embedded live Browser Output preview in Advanced mode.


## [1.3.2-beta.4] - 2026-07-22

### Added

- BMMS Graphics now listens on the local network by default.
- Automatic detection of the server PC IPv4 address.
- LAN Browser Output URL displayed inside Scripture.
- Copy URL and Open Output controls.

### Changed

- Default server host changed from `127.0.0.1` to `0.0.0.0`.
- No distributed-server architecture or additional networking layer was added.


## [1.3.1-beta.3] - 2026-07-22

### Fixed

- Reduced ProPresenter Scripture polling from a three-request critical loop to one fast slide request.
- Metadata requests are now throttled to prevent intermittent ProPresenter stalls.
- Scripture UI no longer sends one blocking request and re-renders the entire module for every input event.
- Corrected inconsistent `scripture-updated` payloads that replaced the complete Scripture state with broadcast-only data.
- Appearance controls now update font, size, weight, line height, text color, background and alignment in the output.
- Entry and exit animation selection and duration now affect the Browser Output.
- Added an explicit animation replay control.

### Restored

- Classic Gradient
- Editorial Frame
- Worship Glow
- Broadcast Clean
- Glass Scripture
- Kinetic Accent
- Six original Scripture spatial formats


## [1.3.0-beta.2] - 2026-07-22

### Added

- Scripture integrated directly into BMMS Graphics.
- Simple mode focused exclusively on design selection.
- Advanced mode with source, Preview, Program, Take, Clear and Auto.
- Manual content loading into Preview.
- Integrated ProPresenter connection and Live controls.
- Three initial Scripture designs: Broadcast Classic, Clean Light and Minimal Transparent.
- Browser Output diagnostics and direct access.

### Fixed

- Scripture Browser Output now refreshes from both persisted application state and broadcast state.
- Output retries after SSE interruptions and periodically resynchronizes.
- Existing on-air Scripture state is recovered after restarting BMMS.


## [1.2.0-beta.1] - 2026-07-22

### Added

- Scripture Preview and Program workflow.
- Manual Take, Clear and persistent Auto Take.
- Transparent Scripture browser source.
- Smart Balance 2.0 with measured text and automatic font scaling.
- Broadcast-focused Scripture operator interface.
- Persistent output recovery after browser-source reload.


## [1.1.0-alpha.2] - 2026-07-22

### Added

- Live Scripture synchronization using official ProPresenter endpoints.
- Current slide, active presentation and slide-index normalization.
- Dedicated Scripture operator page at `/scripture`.
- Raw API snapshot and live synchronization diagnostics.
- Manual synchronization and Live start/stop API controls.
- Duplicate verse event suppression.


## [1.1.0-alpha.1] - 2026-07-22

### Added

- Real ProPresenter TCP/IP transport with CRLF-delimited JSON.
- Standard and chunked request support.
- Connection health test using the documented system-time endpoint.
- Exponential reconnect policy and connection diagnostics.
- Integration API endpoints for status, test, connect and disconnect.
- Automated TCP socket and reconnect tests.


## [1.1.0-alpha.0] - 2026-07-22

### Added

- BMMS 1.1 Scripture Core product specification.
- Normalized Scripture verse model and stable identifiers.
- Scripture reference and slide text parser.
- Scripture controller with Take In, Take Out and Auto Take state.
- ProPresenter-to-Scripture normalization boundary.
- Scripture-first architecture decision.
- Automated domain and integration tests.


## [1.0.0-alpha.2] - 2026-07-22

### Fixed

- Connected all animation inspector and preview controls.
- Replaced editor preview playback with a requestAnimationFrame composition loop.
- Fixed Fade, Slide, Scale and Wipe playback.
- Restores element geometry and opacity after previews.
- Added regression tests for animation control wiring.


## [1.0.0-alpha.1] - 2026-07-22

### Added

- Element enter and exit animation settings.
- Fade, slide, scale and wipe animations.
- Duration, delay, easing, direction and distance controls.
- Editor animation preview.
- Browser-source animation control API.
- Automated animation tests.

## [0.9.1] - 2026-07-22

### Fixed

- Fixed template preview rendering after saving.
- Removed the `document` variable shadowing that caused `Error del editor`.
- Automatically switches the library filter to the saved template category.
- Replaced free-form category entry with controlled numbered choices.
- Restores the editor status after successful template loading.


## [0.9.0] - 2026-07-22

### Added

- Persistent template library.
- Save, open, duplicate and delete template workflows.
- Template categories, favorites, search and filtering.
- Lightweight template previews.
- Template API and automated tests.

## [0.8.0] - 2026-07-22

### Added

- Multi-selection and marquee selection.
- Copy, paste and duplicate.
- Group and ungroup.
- Alignment and distribution tools.
- Keyboard nudging and select all.
- Layer visibility, locking and inline renaming.
- Drag-and-drop layer ordering.
- Multi-selection property panel.

## [0.7.4] - 2026-07-22

### Fixed

- Removed the invalid `#fitStage` control reference that stopped editor initialization.
- Connected the existing zoom selector to fit and fixed zoom levels.
- Restored all left toolbar, layers and properties-panel interactions.
- Added visible runtime error reporting in the editor header.


## [0.7.3] - 2026-07-22

### Fixed

- Positioned the canvas at the top-center of the workspace.
- Recalculated fit zoom using the real available viewport.
- Reset workspace scroll after fitting.
- Preserved the transparency checker while editing transparent documents.
- Added an explicit canvas label.


## [0.7.2] - 2026-07-22

### Fixed

- Corrected the editor canvas scaling model.
- Restored a visible 1920×1080 canvas frame.
- Added an explicit canvas outline and workspace contrast.
- Prevented the scaler footprint from being transformed twice.


## [0.7.1] - 2026-07-22

### Fixed

- Restored the missing Components toolbar button.
- Prevented editor startup failure when optional controls are unavailable.
- Restored the workspace stage, safe-area overlays and smart-guide layers.
- Corrected resize handle CSS class names.


## [0.7.0] - 2026-07-22

### Added

- Broadcast component library.
- Editable Scripture component.
- Editable Lower Third component.
- Component grouping metadata and group movement.
- Transparent output setting.
- Broadcast component API and automated tests.

## [0.6.0] - 2026-07-22

### Added

- Provider-agnostic graphics data-binding engine.
- Manual and bound text content modes.
- Scripture and Lower Third data context.
- Binding presets and live editor preview.
- Independent graphics browser-source output.
- SSE refresh for graphics output.
- Data-binding automated tests.

## [0.5.0] - 2026-07-22

### Added

- Visual Editor 2 interaction system.
- Eight resize handles and rotation control.
- Smart center guides and snapping.
- Zoom presets, safe areas and grid controls.
- Layer visibility and locking controls.


## [0.4.0] - 2026-07-22

### Added

- Shared graphics document model.
- BMMS Visual Editor route and interface.
- Text and shape tools.
- Direct element dragging and resizing.
- Layer selection and ordering.
- Contextual property inspector.
- Undo/redo and persistent document storage.
- Graphics engine automated tests.

## [0.3.0] - 2026-07-22

### Added

- Visible global ProPresenter settings interface.
- Scripture Manual/ProPresenter source selector.
- Organized Scripture Content, Composition, Appearance and Animation controls.
- Scripture composition preview.
- Persistent BMMS application state.
- ProPresenter Scripture simulator.
- Application Server-Sent Events.
- Integration tests for default application state.

## [0.2.0] - 2026-07-22

### Added

- ProPresenter integration architecture and adapter scaffold.
- Global ProPresenter configuration schema.
- Scripture Manual/ProPresenter source specification.
- Scripture and Smart Flyer control reorganization specification.
- Smart Flyer real-time ProPresenter workflow specification.
- Shared control architecture.
- Initial ProPresenter adapter tests.

## [0.1.0] - 2026-07-22

### Added

- Finalized BMMS canonical repository.
- Local BMMS Graphics prototype.
- Foundation service container.
- Event Bus.
- Configuration persistence.
- Structured logger.
- Overlay Runtime using Server-Sent Events.
- Functional Lower Third vertical slice.
- Repository governance, testing and release documentation.
- Historical documentation archive.
- Consolidated archive of previous BMMS artifacts.

## 1.19.0-beta.27 — Update 037.5
- Eliminados los selectores superiores redundantes de plantillas.
- OCR reforzado: TextDetector cuando está disponible y Tesseract.js como respaldo en español/inglés.
- Recuperados seis formatos de composición: Banner, Barra izquierda, Barra derecha, Compacto TV, Pantalla completa y Minimal.
- El formato seleccionado se conserva en Preview, TAKE y Browser Output.

## 1.22.1-beta.32 — Update 037.8.1
- Recuperada la interacción completa de Vision Assist para múltiples bloques.
- Corregido el recorte del preview mediante un canvas 16:9 contenido.
- Activadas las herramientas Seleccionar, Mover y Ajustar.
- Plantillas y formatos ahora producen cambios visuales y estructurales diferenciados.
