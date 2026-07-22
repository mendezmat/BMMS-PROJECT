# Platform Adapters

## Purpose

Platform adapters isolate external software integrations from BMMS domain logic.

## Initial adapters

- vMix.
- OBS.
- ProPresenter.

## vMix adapter responsibilities

- Provide browser overlay URLs.
- Optionally expose shortcut or API trigger integration.
- Map BMMS overlay actions to vMix inputs or overlays.
- Report connection health when API integration is enabled.

## OBS adapter responsibilities

- Provide browser source URLs.
- Support transparent backgrounds.
- Optionally integrate with OBS WebSocket.
- Map show/hide/update actions where configured.

## ProPresenter adapter responsibilities

- Receive current scripture or slide content.
- Observe content changes.
- Translate source data into BMMS Scripture events.
- Preserve the current BMMS output if ProPresenter disconnects.

## Adapter rules

- Adapters must not contain editor UI logic.
- Adapters must not own project data.
- Failures must be isolated.
- Adapter contracts must be versioned.
- Manual workflows must remain available when an adapter is unavailable.
