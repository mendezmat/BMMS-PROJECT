# Contributing to BMMS

## Branches

- `main`: stable, reviewable state.
- `develop`: integration branch when team development begins.
- `feature/<name>`: isolated functionality.
- `fix/<name>`: corrections.
- `docs/<name>`: documentation-only work.

## Workflow

1. Create or reference a specification.
2. Implement the smallest coherent vertical slice.
3. Add or update tests.
4. Run `npm test`.
5. Update documentation and `CHANGELOG.md`.
6. Submit the change for review.

Use Conventional Commits: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`,
`build:` and `chore:`. Permanent architecture decisions require an ADR.
