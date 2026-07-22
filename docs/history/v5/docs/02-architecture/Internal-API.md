# Internal API

## Purpose

The Internal API defines how BMMS modules consume Foundation and Smart Engine capabilities.

## API styles

- In-process service calls for local synchronous operations.
- Event Bus for decoupled state changes.
- Local HTTP/WebSocket channels for overlays.
- Job API for long-running Smart Engine operations.

## Service naming

```text
foundation.configuration
foundation.storage
foundation.events
foundation.overlays
foundation.logging
smartEngine.jobs
smartEngine.providers
smartEngine.benchmark
```

## Example service call

```javascript
const overlay = await services.overlays.create({
  moduleId: "graphics.lower-third",
  templateId: "modern-default",
  state: {
    title: "Nombre",
    subtitle: "Cargo"
  }
});
```

## Example job flow

```javascript
const job = await services.smartEngine.jobs.create({
  inputAssetId: "asset-id",
  pipeline: "smart-flyer"
});

services.events.subscribe(
  `smart-engine.job.${job.id}.updated`,
  handleJobUpdate
);
```

## Compatibility policy

- Public internal contracts are versioned.
- Breaking changes require a major version.
- Deprecated fields remain available for at least one minor release when practical.
