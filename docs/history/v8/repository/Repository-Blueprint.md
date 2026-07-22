# Repository Blueprint

BMMS-PROJECT/
├── apps/
│   ├── graphics/
│   ├── tb-tool/
│   └── future-apps/
├── foundation/
├── smart-engine/
├── sdk/
├── shared/
├── docs/
├── scripts/
├── tests/
└── packages/

Rules:
- Applications never depend directly on each other.
- Shared code belongs in foundation or shared.
- Smart Engine is reusable across applications.
