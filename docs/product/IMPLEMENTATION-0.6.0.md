# BMMS 0.6.0 — Graphics Engine and Data Binding

Implemented:

- provider-agnostic data binding engine;
- nested token resolution;
- manual and bound text modes;
- binding controls and presets in the visual editor;
- live binding preview;
- graphics data context;
- resolved document output API;
- independent `/overlay/graphics` browser source;
- SSE refresh when document or provider data changes;
- automated data-binding and context tests.

This milestone establishes the separation:

```text
Data provider → Data context → Binding engine → Graphics document → Renderer
```
