# BMMS Update 037.1.1 — Validation

- Target: Smart Flyer responsive workspace
- Reference viewport: 1920×1080 at browser zoom 100%
- Package version: 1.15.2-beta.20
- Full replacement folder included: BMMS-PROJECT

## Acceptance checks

- Smart Flyer view is bounded to the application viewport.
- Source, preview, and inspector columns can scroll independently.
- Broadcast proposals remain inside the visible application shell.
- Short-height viewports fall back to a reliable page scroller.
- Scripture files and behavior are unchanged by this hotfix.

## Automated validation

- Repository check: PASS
- Tests: 103/106 PASS
- New responsive layout tests: 2/2 PASS
- Existing historical Scripture failures: 3
- New regressions detected: 0
