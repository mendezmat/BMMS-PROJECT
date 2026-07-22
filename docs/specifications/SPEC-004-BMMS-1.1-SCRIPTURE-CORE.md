# SPEC-004 — BMMS 1.1 Scripture Core

## Status

Approved for implementation.

## Product objective

BMMS Scripture must turn the current Scripture content in ProPresenter into a
broadcast-ready browser overlay with no copying, pasting or routine interaction
inside BMMS during a service.

The preferred operational path is:

```text
ProPresenter
    → ProPresenter Adapter
    → Scripture Normalizer
    → Scripture Controller
    → Smart Balance
    → Overlay Runtime
    → vMix / OBS
```

The Graphics Editor remains available for template creation, but it is not the
primary application surface for Scripture operation.

## Success criteria

A first-time operator must be able to:

1. enable ProPresenter networking;
2. enter or confirm its IP address and port in BMMS;
3. select a Scripture template;
4. add one browser source to vMix or OBS;
5. see the active Scripture update automatically.

Normal Sunday operation must not require switching from ProPresenter to BMMS.

## Scope for BMMS 1.1

### Included

- global ProPresenter connection;
- normalized Scripture data model;
- current-verse detection;
- manual and ProPresenter sources;
- auto reconnect;
- manual Take In and Take Out;
- optional Auto Take;
- browser-source output;
- measured text balancing;
- clear connection and program states;
- logs useful for troubleshooting.

### Deferred

- full visual editor refactor;
- advanced animation timeline;
- scene graph;
- AI-based Scripture recognition;
- cloud synchronization;
- Planning Center integration;
- licensing and marketplace features.

## ProPresenter transport

BMMS uses ProPresenter's local network API.

The transport implementation must support:

- HTTP requests for discovery and current-state synchronization;
- TCP/IP streaming subscriptions when supported by the installed
  ProPresenter version;
- newline-delimited JSON requests and responses for TCP/IP;
- an automatic mode that selects the best available transport;
- fallback polling when a streaming endpoint is unavailable.

The connection is local-first and does not require internet access.

## Default connection configuration

```json
{
  "enabled": false,
  "host": "127.0.0.1",
  "port": 1025,
  "protocol": "auto",
  "autoConnect": true,
  "reconnect": {
    "enabled": true,
    "initialDelayMs": 1000,
    "maxDelayMs": 30000,
    "multiplier": 1.8
  }
}
```

The port must remain configurable because the actual value is defined in the
ProPresenter Network settings.

## Normalized verse contract

Every source must produce the same object:

```json
{
  "id": "verse-87c2fa31",
  "reference": "Juan 3:16",
  "text": "Porque de tal manera amó Dios al mundo...",
  "version": "RVR1960",
  "source": "propresenter",
  "book": "Juan",
  "chapter": 3,
  "verseStart": 16,
  "verseEnd": 16,
  "presentationId": "optional-id",
  "slideIndex": 4,
  "receivedAt": "2026-07-22T12:00:00.000Z"
}
```

Rules:

- `text` is mandatory;
- `reference` and `version` may be empty if ProPresenter does not expose them;
- whitespace is normalized;
- identical content creates a stable verse ID;
- source-specific fields never leak into the overlay contract.

## Internal events

### Integration

- `integration.propresenter.status.changed`
- `integration.propresenter.configuration.updated`
- `propresenter.slide.changed`
- `propresenter.text.changed`
- `propresenter.presentation.changed`
- `propresenter.transport.error`

### Scripture

- `scripture.verse.changed`
- `scripture.balance.completed`
- `scripture.program.changed`
- `scripture.auto-take.changed`
- `scripture.template.changed`
- `scripture.output.connected`

## Scripture state machine

```text
IDLE
  └─ receives verse → READY

READY
  ├─ Take In → PROGRAM
  ├─ new verse → READY
  └─ source unavailable → STALE

PROGRAM
  ├─ new verse → PROGRAM_UPDATED
  ├─ Take Out → READY
  └─ source unavailable → PROGRAM_STALE

PROGRAM_UPDATED
  └─ render completed → PROGRAM
```

A disconnected ProPresenter session must not immediately clear the active
graphic. BMMS keeps the last valid verse visible and marks the source as stale.

## Auto Take policy

When Auto Take is enabled:

1. receive a new normalized verse;
2. debounce rapid slide changes;
3. wait the configured delay, default `400 ms`;
4. complete layout measurement;
5. update the browser source;
6. take the overlay in.

The delay is canceled and restarted whenever another verse arrives.

Auto Take must never trigger for identical normalized content.

## Smart Balance 2.0

Smart Balance uses actual font measurement rather than character counts.

For each candidate line count:

1. measure word widths with the target font;
2. calculate legal word-boundary wraps;
3. reject candidates that exceed width or height;
4. score the remaining layouts;
5. select the lowest score.

The score should penalize:

- large differences between line widths;
- a very short final line;
- excessive line count;
- font sizes below the template minimum;
- orphaned punctuation;
- splitting a reference from its verse range.

The algorithm returns:

```json
{
  "lines": ["Porque de tal manera", "amó Dios al mundo..."],
  "fontSize": 68,
  "lineHeight": 1.05,
  "lineCount": 2,
  "score": 0.14,
  "overflow": false
}
```

## Operator interface

The Scripture application is a focused control surface.

Required visible states:

- ProPresenter connection;
- current source;
- current reference;
- current verse preview;
- Program visible/hidden;
- Auto Take enabled/disabled;
- last synchronization time;
- actionable error message.

Primary controls:

- `TAKE IN`
- `TAKE OUT`
- `AUTO`
- `SETTINGS`

No element inspector, timeline or layer tree appears on this screen.

## Browser output

The browser source exposes:

```text
http://localhost:4173/scripture/output
```

The control interface exposes:

```text
http://localhost:4173/scripture
```

The output receives state through a local real-time channel and must recover its
complete current state after reload.

Required output commands:

```text
scripture.set
scripture.takeIn
scripture.takeOut
scripture.clear
scripture.sync
```

## Template contract

A Scripture template consumes only:

- `scripture.reference`
- `scripture.text`
- `scripture.version`
- `scripture.lines`
- `scripture.visible`
- `scripture.sourceState`

Templates must not depend on ProPresenter-specific response objects.

## Reliability requirements

- reconnection uses exponential backoff;
- repeated connection errors are rate-limited in logs;
- malformed source data is rejected without crashing;
- the last valid verse remains available after source failure;
- browser output reload restores state;
- operator commands are idempotent;
- all source and program transitions are testable without ProPresenter.

## Smart Flyer reuse

Smart Flyer will reuse:

- the ProPresenter connection service;
- event bus;
- status and reconnection UI;
- output transport;
- template loading;
- program Take In/Take Out semantics.

It will not reuse the Scripture parser or Scripture balance algorithm.

## Implementation stages

### S1 — Domain foundation

- normalized verse model;
- parser;
- Scripture controller;
- event contracts;
- tests.

### S2 — Real ProPresenter transport

- HTTP health/discovery;
- TCP/IP client;
- streaming subscription;
- reconnect and fallback polling;
- raw payload fixtures.

### S3 — Scripture operator application

- dedicated route;
- current verse preview;
- connection settings;
- Take In/Out;
- Auto Take.

### S4 — Smart Balance and browser output

- measured wrapping;
- template bindings;
- persistent output state;
- vMix and OBS validation.

### S5 — Production hardening

- diagnostics;
- connection wizard;
- packaging;
- startup behavior;
- church-service soak testing.
