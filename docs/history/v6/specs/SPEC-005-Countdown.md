# SPEC-005 — Countdown

## Purpose

Countdown provides reusable timers for pre-service, breaks, event starts, and production cues.

## Timer modes

- Countdown to duration.
- Countdown to specific clock time.
- Count-up.
- Paused timer.
- Manual time adjustment.

## Functional requirements

- Start.
- Pause.
- Resume.
- Reset.
- Add or subtract time.
- Custom end message.
- Template selection.
- Real-time preview.
- Browser overlay output.
- Optional audio or visual cue at defined thresholds.
- Presets.

## Reliability requirements

- Timer must use monotonic time where possible.
- UI lag must not alter actual timer accuracy.
- Reload recovery must restore the correct remaining time.
- Live output must not reset during editor changes.

## Acceptance criteria

- Timer remains accurate across normal UI operations.
- A running timer survives preview refresh.
- Presets can be saved.
- Overlay can be consumed by vMix and OBS.
