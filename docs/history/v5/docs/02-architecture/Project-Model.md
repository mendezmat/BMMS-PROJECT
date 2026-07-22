# Project Model

## Purpose

A BMMS project stores reusable production work without storing volatile runtime state.

## Project package

Recommended structure:

```text
project-name.bmms/
├── project.json
├── assets/
├── templates/
├── modules/
│   ├── scripture.json
│   ├── lower-third.json
│   ├── smart-flyer.json
│   └── countdown.json
└── metadata/
```

## Project lifecycle

```text
Create
→ Configure
→ Edit
→ Save
→ Reopen
→ Export
→ Archive
```

## Requirements

- Autosave with recovery.
- Explicit Save As.
- Portable export.
- Missing asset detection.
- Schema migration.
- Project-level backups.
- Read-only recovery mode for damaged projects.
