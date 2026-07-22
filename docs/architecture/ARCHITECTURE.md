# BMMS Architecture

BMMS is a modular local-first platform for live-production tools.

```text
Applications
├── BMMS Graphics
├── BMMS TB Tool
└── Future BMMS applications

Platform packages
├── Foundation
├── Overlay Runtime
├── Smart Engine
├── Shared
└── SDK

External adapters
├── vMix
├── OBS
├── ProPresenter
└── Browser Sources
```

Applications may consume platform packages. Platform packages must never depend
on applications. Integrations are isolated behind adapter boundaries.

The execution model uses a local HTTP runtime, browser-rendered overlays,
event-driven communication, persistent state, a provider-agnostic Smart Engine
and human approval before publishing AI-assisted output.
