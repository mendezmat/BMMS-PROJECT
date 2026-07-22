# ADR-006 — Platform Adapter Boundary

## Status
Accepted.

## Decision

vMix, OBS, and ProPresenter integrations are implemented through adapters separated from module business logic.

## Consequences

- External API changes remain isolated.
- Modules remain testable without the external application.
- Manual fallback workflows remain possible.
