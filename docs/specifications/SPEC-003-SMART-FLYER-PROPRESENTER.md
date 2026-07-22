# SPEC-003 — Smart Flyer with ProPresenter real-time source

## Status

Approved, blocked by Smart Engine completion.

## Sources

Smart Flyer must support:

- uploaded file;
- ProPresenter;
- future live capture.

## ProPresenter workflow

1. ProPresenter changes the projected static media.
2. The global adapter publishes `propresenter.media.changed`.
3. Smart Flyer checks filtering and deduplication rules.
4. Smart Engine analyzes the media.
5. A CG proposal is generated.
6. The operator reviews it.
7. The operator sends it to Preview or Program.

## Default automation mode

`assisted`

The system may analyze automatically, but it must not publish to Program without
operator approval.

## Detection fields

- title;
- slogan;
- date;
- time;
- place;
- additional information;
- QR;
- principal image.

The QR must be preserved from the original media whenever possible.

## Filters

- static media only;
- ignore video;
- ignore backgrounds when classified as such;
- ignore repeated media;
- content fingerprint;
- configurable cooldown;
- optional playlist/source filtering.
