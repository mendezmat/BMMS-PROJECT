# BMMS Hotfix 021 — Verse Readability

This build is based directly on the functional Recovery build.

It changes only the Scripture text fitting algorithm:
- readable minimum target: 24 px;
- absolute emergency floor: 18 px;
- automatic extra lines before aggressive size reduction;
- stable width fallback during initial Browser Output layout.

ProPresenter, Manual, Preview, Program, Take, Clear and Auto were not
refactored or replaced.
