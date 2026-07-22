# ADR-0007 — Broadcast components are element collections

## Status

Accepted.

## Decision

A broadcast component is stored as normal graphics elements sharing:

- `componentId`
- `componentType`
- `componentRole`

The renderer remains unaware of component semantics. Components are editor-side
factories that generate standard shapes and text elements with data bindings.

## Consequences

- Components remain editable after insertion.
- The output renderer requires no special Scripture or Lower Third code.
- A component can be moved as a group using `Alt + drag`.
- New component factories can be added without changing the document model.
