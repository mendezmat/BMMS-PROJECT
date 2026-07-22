# Developer Guide

## Requirements

- Node.js 20 or newer.
- Git.
- A modern Chromium-based browser.

## Start

```bash
npm install
npm start
```

Editor: `http://localhost:4173`

Overlay: `http://localhost:4173/overlay/lower-third`

## Validate

```bash
npm run check
npm test
```

Never create a new root repository for a feature. Add applications under
`apps/`, reusable packages under `packages/`, and documentation under `docs/`.
