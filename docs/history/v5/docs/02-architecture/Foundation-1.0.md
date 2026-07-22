# Foundation 1.0 — Technical Design Document

## 1. Purpose

Foundation is the shared runtime and application infrastructure for every BMMS product. It must provide stable, reusable services without embedding business logic from Graphics, TB Tool, Smart Engine, or future applications.

## 2. Architectural role

Foundation sits below all BMMS applications.

```text
Applications
├── BMMS Graphics
├── BMMS TB Tool
└── Future BMMS applications
        │
        ▼
Foundation
├── Configuration
├── Storage
├── Event Bus
├── Overlay Runtime
├── Window and UI Services
├── Logging
├── Error Handling
└── Application Lifecycle
```

Foundation must never depend on application modules. Application modules may depend on Foundation.

## 3. Design principles

1. Shared services are implemented once.
2. Public contracts are versioned.
3. Modules communicate through contracts and events, not direct internal access.
4. Local operation remains possible without internet access.
5. Every critical operation produces structured logs.
6. Runtime failures in one module must not crash unrelated modules.
7. Configuration changes should propagate in real time where safe.

## 4. Core services

### 4.1 Application Lifecycle Service

Responsibilities:

- Initialize the BMMS runtime.
- Load environment and user configuration.
- Register services.
- Discover enabled modules.
- Start local HTTP services.
- Restore the last workspace.
- Handle graceful shutdown.

Lifecycle states:

```text
CREATED
  ↓
INITIALIZING
  ↓
READY
  ↓
RUNNING
  ↓
STOPPING
  ↓
STOPPED
```

Failure states:

- `INITIALIZATION_FAILED`
- `DEGRADED`
- `FATAL_ERROR`

### 4.2 Configuration Service

Configuration levels:

1. Platform defaults.
2. Installation configuration.
3. User configuration.
4. Workspace configuration.
5. Module configuration.
6. Session overrides.

Resolution order:

```text
Session
→ Module
→ Workspace
→ User
→ Installation
→ Defaults
```

Requirements:

- Schema validation.
- Safe fallback to defaults.
- Automatic migration between versions.
- Change notifications.
- Import and export.
- Human-readable storage format.

Recommended initial format: JSON.

### 4.3 Storage Service

Storage categories:

- Application configuration.
- User preferences.
- Workspaces.
- Projects.
- Templates.
- Assets.
- Logs.
- Cache.
- Benchmark results.

Storage must expose logical paths rather than allowing modules to write to arbitrary filesystem locations.

### 4.4 Event Bus

The Event Bus enables decoupled communication.

Event envelope:

```json
{
  "id": "uuid",
  "type": "graphics.overlay.updated",
  "version": 1,
  "timestamp": "ISO-8601",
  "source": "graphics.smart-flyer",
  "correlationId": "uuid",
  "payload": {}
}
```

Required capabilities:

- Publish and subscribe.
- Namespaced event types.
- Versioned payloads.
- Correlation IDs.
- Synchronous local delivery for UI events.
- Asynchronous delivery for heavy operations.
- Error isolation between subscribers.
- Event tracing in development mode.

### 4.5 Overlay Runtime

The Overlay Runtime publishes graphics through independent URLs consumable by vMix, OBS, browser sources, and future platforms.

Core concepts:

- Overlay instance.
- Overlay template.
- Overlay state.
- Renderer.
- Control channel.
- Public output URL.
- Preview URL.

Each active overlay receives a stable URL during the session.

Example:

```text
http://localhost:PORT/overlay/{overlayId}
http://localhost:PORT/preview/{overlayId}
```

The runtime must support:

- Transparent output.
- Responsive canvas.
- 16:9 default composition.
- Real-time state updates.
- In/out animation triggers.
- Preview without going live.
- Multiple simultaneous overlay instances.
- Platform-independent rendering.

### 4.6 Window and UI Service

Responsibilities:

- Main shell.
- Module navigation.
- Panels.
- Modals.
- Preview surfaces.
- Workspace layout.
- Persistent panel state.
- Responsive behavior.

UI state must be separated from project data.

### 4.7 Theme Service

Foundation provides design tokens:

- Colors.
- Typography.
- Spacing.
- Radius.
- Shadows.
- Motion timing.
- Z-index scale.
- Component states.

Applications may extend tokens but must not replace the global design language.

### 4.8 Logging Service

Minimum log fields:

- Timestamp.
- Severity.
- Application.
- Module.
- Operation.
- Correlation ID.
- Message.
- Structured context.
- Stack trace when available.

Severity levels:

- TRACE
- DEBUG
- INFO
- WARN
- ERROR
- FATAL

### 4.9 Error Service

Errors are classified as:

- User input errors.
- Validation errors.
- Recoverable service errors.
- Integration errors.
- Data corruption errors.
- Fatal runtime errors.

Every error shown to the operator must include:

- Clear message.
- Suggested action.
- Technical details accessible separately.
- Correlation ID for diagnostics.

## 5. Public service contracts

Initial service registry:

```text
Foundation.AppLifecycle
Foundation.Configuration
Foundation.Storage
Foundation.Events
Foundation.Overlays
Foundation.Theme
Foundation.Logging
Foundation.Errors
Foundation.Modules
Foundation.PlatformAdapters
```

## 6. Module contract

Every module must declare:

```json
{
  "id": "graphics.scripture",
  "name": "Scripture",
  "version": "0.1.0",
  "foundationApi": "^1.0.0",
  "entrypoint": "index",
  "capabilities": [
    "overlay.create",
    "storage.read",
    "storage.write",
    "events.publish"
  ]
}
```

## 7. Security and isolation

Initial local-first security requirements:

- Bind local services to localhost by default.
- Reject arbitrary filesystem paths.
- Validate all imported files.
- Sanitize user-provided HTML.
- Do not execute template code from untrusted files.
- Limit module capabilities.
- Hide secrets from logs.

## 8. Performance targets

Initial engineering targets:

- Shell ready for interaction in under 3 seconds on target hardware.
- UI changes visible in preview within 100 ms under normal conditions.
- Overlay state updates delivered within 50 ms locally.
- Configuration save operations must not block the UI.
- A failed module must not stop the overlay runtime.

These targets are provisional and must be benchmarked.

## 9. Versioning

Foundation follows semantic versioning.

- Major: contract-breaking changes.
- Minor: backward-compatible capabilities.
- Patch: fixes without contract changes.

## 10. Acceptance criteria for Foundation 1.0

Foundation 1.0 is ready when:

- A module can register and load.
- Configuration can be read, modified, validated, and persisted.
- Events can be exchanged between two modules.
- An overlay can be created and opened through a local URL.
- Overlay state can update without page reload.
- Logs and structured errors are generated.
- The application shuts down without corrupting state.
