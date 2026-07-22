# BMMS 1.0.0 Alpha 1 — Animation System

Implemented:

- element-level enter and exit animations;
- fade, slide, scale and wipe;
- duration, delay, easing, direction and distance;
- selection preview;
- full-document enter/exit preview;
- animation persistence in templates and documents;
- browser-source animation API;
- automated animation tests.

## Browser source control

The overlay exposes:

```js
window.BMMSGraphics.playIn()
window.BMMSGraphics.playOut()
```

These calls prepare future vMix, OBS and automation integrations.
