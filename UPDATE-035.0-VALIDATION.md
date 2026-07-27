# BMMS Update 035.0 — Broadcast Workspace

## Scope

- Browser Output settings moved from the permanent Scripture workspace to Configuration.
- Preview status condensed into one line.
- Scripture transport reduced to a compact broadcast bar.
- Preview stage receives the recovered vertical space.
- Scripture, ProPresenter and Foundation behavior remain unchanged.

## Validation

- `npm run check`: passed.
- `node --check apps/graphics/public/app.js`: passed.
- `npm test`: 99/102 passed.
- The same three historical Scripture assertions remain failing; this update introduced no additional test failures.
