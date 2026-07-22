# ADR-0008 — Set-based editor selection model

## Status

Accepted.

## Decision

The editor stores selection as a set of element IDs. Single selection is a
special case of multi-selection, not a separate state model.

## Consequences

- dragging, deleting, copying and alignment share one selection contract;
- grouped and component elements can be selected as ordinary elements;
- selection does not alter the graphics document;
- editor-only interaction state remains outside persisted output data.
