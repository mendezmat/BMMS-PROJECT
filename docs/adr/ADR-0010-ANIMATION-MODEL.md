# ADR-0010 — Element-level enter and exit animations

## Status

Accepted.

## Decision

Every graphics element may persist an `animation` object with independent
`enter` and `exit` configurations.

The initial animation vocabulary is intentionally small:

- none
- fade
- slide
- scale
- wipe

Animation execution uses the Web Animations API. The editor and browser-source
renderer share the same persisted contract.

## Consequences

- templates automatically preserve animation configuration;
- animation preview does not mutate geometry;
- future timelines can orchestrate the same delay and duration properties;
- new animation types can be added without changing document identity.
