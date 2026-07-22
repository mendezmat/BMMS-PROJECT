# ADR-0001 — Canonical BMMS Repository

## Status

Accepted.

## Decision

`BMMS-PROJECT` is the single canonical repository. All future changes must be
applied here using version control. Previous ZIP files are historical artifacts.

## Consequences

- no more parallel repository versions;
- changes become incremental and reviewable;
- releases are generated from tagged commits;
- historical prototypes do not define current architecture.
