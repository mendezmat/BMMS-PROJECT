# ADR-0012 — Scripture-first product direction

## Status

Accepted.

## Decision

The Graphics Editor enters maintenance mode while BMMS 1.1 prioritizes a
production-ready Scripture workflow connected to ProPresenter.

## Rationale

BMMS creates more immediate operational value by reducing live-service steps
than by expanding advanced editor functionality. Scripture and Smart Flyer are
the primary application modules; the editor supports template authoring.

## Consequences

- editor refactoring and advanced animation work are deferred;
- new infrastructure must be reusable by Smart Flyer;
- product acceptance tests are based on live operator workflows;
- the dedicated Scripture interface becomes the next primary UI.
