# Changelog

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
