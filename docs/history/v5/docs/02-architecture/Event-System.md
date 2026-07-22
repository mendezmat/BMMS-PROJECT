# Event System

## Event naming convention

```text
domain.entity.action
```

Examples:

- `graphics.overlay.created`
- `graphics.overlay.updated`
- `graphics.overlay.take`
- `smart-engine.job.started`
- `smart-engine.job.completed`
- `foundation.configuration.changed`
- `tb-tool.activity.detected`

## Delivery classes

### UI events
Low-latency, local, transient.

### Domain events
Represent meaningful state changes.

### Job events
Report progress and stage completion.

### Diagnostic events
Used for tracing and development.

## Rules

- Event payloads are immutable.
- Subscribers must not throw into the publisher.
- Events must include source and timestamp.
- Domain events are versioned.
- Sensitive data is excluded by default.
