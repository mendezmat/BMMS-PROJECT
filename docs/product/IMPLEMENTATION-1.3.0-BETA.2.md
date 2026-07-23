# BMMS Graphics 1.3.0 Beta 2

## Scripture is now integrated

Scripture is no longer operated from a separate page. The complete workflow is
available from the Scripture module inside the main BMMS Graphics interface.

## Simple mode

Simple mode only exposes the design library:

- Broadcast Classic
- Clean Light
- Minimal Transparent

Selecting a design updates the shared output configuration immediately. The
ProPresenter connection and live synchronization continue operating in the
background.

## Advanced mode

Advanced mode exposes:

- Manual and ProPresenter sources
- Incoming content
- Program and Preview buses
- Take
- Clear
- Auto Take
- Smart Balance controls
- Typography and color controls
- Animation controls
- ProPresenter Connect
- Live synchronization start/stop
- Browser Output URL
- Live diagnostics

## Output

```text
http://localhost:4173/overlay/scripture
```

The output now loads both the broadcast bus and the persisted Scripture
configuration. It also performs periodic recovery polling, so it is not
dependent exclusively on Server-Sent Events.
