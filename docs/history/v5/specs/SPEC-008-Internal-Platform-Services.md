# SPEC-008 — Internal Platform Services

## Scope

Defines the minimum services required before application modules are considered production-ready.

## Required services

- Configuration.
- Storage.
- Event Bus.
- Overlay Runtime.
- Logging.
- Error handling.
- Module registry.

## Acceptance criteria

- Services are discoverable through a stable registry.
- Invalid configuration is rejected safely.
- Modules cannot write outside approved storage locations.
- Overlay URLs remain stable for the active session.
- Events are traceable using correlation IDs.
