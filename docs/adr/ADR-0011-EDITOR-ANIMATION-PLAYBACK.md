
# ADR-0011 — Editor preview uses a composition loop

## Status

Accepted.

## Context

Animation configuration was persisted correctly, but the controls were not
connected because an initialization guard incorrectly concluded that the
listeners already existed.

## Decision

The editor preview uses `requestAnimationFrame` to interpolate composition
properties directly:

- opacity;
- translation;
- scale;
- clipping.

The persisted animation contract remains unchanged.

## Consequences

- playback no longer depends on the Web Animations API;
- preview state is restored after every animation;
- the same interpolation model can support a future timeline;
- control wiring is covered by regression tests.
