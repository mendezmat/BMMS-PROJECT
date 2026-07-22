# ADR-0006 — Data binding belongs to the graphics engine

## Status

Accepted.

## Decision

Text elements may use either manual content or a binding template. Bindings are
resolved against a provider-agnostic data context immediately before rendering.

Example:

```text
{scripture.reference}
{scripture.text}
{lowerThird.title}
```

Modules expose data. They do not own layout or rendering.

## Consequences

- Scripture becomes a data provider.
- The same text element can consume manual or live data.
- Editor preview and output use the same binding contract.
- New providers can be added without changing the renderer.
