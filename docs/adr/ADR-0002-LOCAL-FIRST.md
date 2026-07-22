# ADR-0002 — Local-first runtime

## Status

Accepted.

## Decision

BMMS runs locally by default and binds to `127.0.0.1`. Network deployment must
be implemented explicitly with appropriate security controls.

## Rationale

Live production requires predictable latency, offline resilience and minimal
dependency on internet connectivity.
