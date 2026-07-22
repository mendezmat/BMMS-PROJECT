# BMMS 1.1.0 Alpha 1 — ProPresenter Live Link

## Delivered

- real TCP/IP socket transport;
- CRLF-delimited JSON request and response handling;
- standard and chunked API requests;
- connection test using `v1/timer/system_time`;
- exponential reconnect policy;
- live status events and timestamps;
- configurable streaming subscriptions;
- server endpoints for test, connect, disconnect and diagnostics;
- automated TCP integration tests.

## Important boundary

Renewed Vision publishes the generic TCP/IP protocol publicly, but the complete
endpoint catalogue is exposed from ProPresenter itself through:

```text
Settings → Network → API Documentation
```

BMMS therefore does not guess the active-slide endpoint. Alpha 1 establishes
and validates the transport. The next increment will capture the exact
slide/presentation endpoint contract from the user's installed ProPresenter
version and map it into Scripture.

## Diagnostic endpoints

```text
GET  /api/integrations/propresenter/status
POST /api/integrations/propresenter/test
POST /api/integrations/propresenter/connect
POST /api/integrations/propresenter/disconnect
```

## ProPresenter setup

1. Open ProPresenter Settings.
2. Open Network.
3. Enable Network.
4. Copy the displayed IP address and port.
5. Use a wired local network where practical.
