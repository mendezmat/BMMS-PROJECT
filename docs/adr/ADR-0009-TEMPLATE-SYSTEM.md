# ADR-0009 — Templates store complete graphics documents

## Status

Accepted.

## Decision

A template is a persisted snapshot of a complete graphics document plus
metadata such as name, category and favorite status.

Opening a template creates a new document and regenerates element, group and
component identities.

## Consequences

- editing an opened template does not mutate the saved template;
- templates remain compatible with the generic renderer;
- categories are metadata rather than separate document formats;
- future thumbnails, import/export and marketplace features can use the same contract.
