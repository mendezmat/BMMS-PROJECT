# ADR-002 — Foundation Dependency Direction

## Status
Accepted.

## Decision
Applications and modules may depend on Foundation. Foundation must not depend on application-specific modules.

## Consequence
Shared services remain reusable and application logic stays isolated.
