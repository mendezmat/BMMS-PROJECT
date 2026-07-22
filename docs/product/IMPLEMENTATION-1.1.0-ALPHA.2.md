# BMMS 1.1.0 Alpha 2 — Live Scripture Engine

## Source contract

This increment uses the endpoints listed in the ProPresenter API document
provided from the installed ProPresenter instance:

- `GET /version`
- `GET /v1/status/slide`
- `GET /v1/presentation/active`
- `GET /v1/presentation/slide_index`

The uploaded API describes `/v1/status/slide` as the endpoint that returns
current and next slide text and image UUIDs. It also exposes active presentation
details and the current slide index.

## Delivered

- continuous Live Scripture synchronization;
- normalized current slide text;
- active presentation and slide index metadata;
- duplicate-change suppression;
- raw payload snapshot for diagnostics;
- dedicated `/scripture` operator page;
- manual sync and start/stop controls;
- server events for live status and verse changes.

## Why Alpha 2 uses polling

The API document lists `POST /v1/status/updates` as an aggregate streaming
endpoint, but the provided two-page export does not include the request body
schema. BMMS therefore uses a short, configurable polling interval instead of
guessing that contract.

This is local network traffic and defaults to 350 ms. The service can be moved
to aggregate streaming once an example request body from the interactive API
documentation is captured.

## Routes

```text
GET  /scripture
GET  /api/scripture/current
GET  /api/scripture/live/status
GET  /api/scripture/live/snapshot
POST /api/scripture/live/start
POST /api/scripture/live/stop
POST /api/scripture/live/sync
```
