# SPEC-001 — Global ProPresenter Integration

## Status

Approved for implementation.

## Objective

Move ProPresenter connection data out of hidden source code and expose it as a
global BMMS integration reusable by Scripture, Smart Flyer and future modules.

## Global configuration

Required fields:

- enabled;
- host or IP address;
- port;
- protocol selection;
- automatic connection;
- reconnection policy;
- monitored data types.

## Required interface

`Settings → Integrations → ProPresenter`

The interface must include:

- connection state;
- host/IP;
- port;
- protocol;
- automatic connection;
- test connection;
- save;
- last error;
- reconnect status.

## Event contract

The adapter publishes:

- `integration.propresenter.status.changed`
- `integration.propresenter.configuration.updated`
- `propresenter.slide.changed`
- `propresenter.text.changed`
- `propresenter.media.changed`
- `propresenter.presentation.changed`

## Security

Connection secrets, if introduced later, must not be committed to Git.
Network exposure remains local-first unless explicitly enabled.
