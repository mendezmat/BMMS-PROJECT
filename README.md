# BMMS PROJECT

BMMS is a modular platform for live-production graphics, automation and
operator tools under the By MMS product family.

## Repository status

**Repository creation stage: complete.**

This is now the single canonical repository. Previous generated packages are
preserved under `archive/` and must be treated as historical references.

## Current executable prototype

The repository includes a working BMMS Graphics baseline with:

- local Foundation bootstrap;
- service container;
- Event Bus;
- structured logging;
- JSON configuration persistence;
- browser Overlay Runtime;
- real-time Lower Third editor;
- `TAKE IN` and `TAKE OUT`;
- an independent Browser Source URL.

## Requirements

- Node.js 20 or newer.

## Run

```bash
npm install
npm start
```

Open:

- Editor: `http://localhost:4173`
- Lower Third overlay: `http://localhost:4173/overlay/lower-third`

## Validate

```bash
npm run check
npm test
```

## Canonical structure

```text
apps/                 BMMS applications
packages/             reusable platform packages
tests/                automated tests
docs/                 current and historical documentation
archive/              immutable prior artifacts
scripts/              repository automation
.github/              issue templates and CI
```

## Next phase

The next stage is product implementation, not repository creation. Development
continues incrementally in this repository, starting with Foundation
stabilization and the Lower Third vertical slice.


## Broadcast components

The Visual Editor includes initial Scripture and Lower Third component presets.
Use **Alt + click** or **Alt + drag** to select and move a complete component.
