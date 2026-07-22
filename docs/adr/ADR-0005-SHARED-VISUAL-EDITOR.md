# ADR-0005 — Shared visual editor as the core of BMMS Graphics

## Status

Accepted.

## Decision

Scripture, Smart Flyer, Lower Third and Countdown will use one shared graphics
document model and one visual editing engine.

## Consequences

- modules provide data and specialized workflows;
- the editor owns layout, layers, geometry, typography and appearance;
- duplicated property controls are progressively removed;
- templates become reusable graphics documents;
- output renderers consume the same document contract.
