# Common Data Model

## Purpose

The Common Data Model defines shared entities used across BMMS applications.

## Core entities

### Workspace

Represents the operator's current working environment.

```json
{
  "id": "workspace-id",
  "name": "Sunday Service",
  "activeProjectId": "project-id",
  "openPanels": [],
  "createdAt": "ISO-8601",
  "updatedAt": "ISO-8601"
}
```

### Project

```json
{
  "id": "project-id",
  "type": "graphics",
  "name": "Sunday Service",
  "schemaVersion": 1,
  "modules": {},
  "assets": [],
  "settings": {},
  "createdAt": "ISO-8601",
  "updatedAt": "ISO-8601"
}
```

### Asset

```json
{
  "id": "asset-id",
  "type": "image",
  "filename": "flyer.png",
  "mimeType": "image/png",
  "storagePath": "assets/flyer.png",
  "checksum": "sha256",
  "metadata": {}
}
```

### Overlay

```json
{
  "id": "overlay-id",
  "moduleId": "graphics.smart-flyer",
  "templateId": "template-id",
  "state": {},
  "output": {
    "width": 1920,
    "height": 1080,
    "transparent": true
  }
}
```

### Template

```json
{
  "id": "template-id",
  "name": "Modern Event Lower Third",
  "moduleId": "graphics.smart-flyer",
  "version": "1.0.0",
  "schemaVersion": 1,
  "designTokens": {},
  "regions": [],
  "animations": {}
}
```

### Processing Job

```json
{
  "id": "job-id",
  "engine": "smart-engine",
  "status": "NEEDS_REVIEW",
  "inputAssetIds": [],
  "stages": [],
  "result": {},
  "createdAt": "ISO-8601",
  "updatedAt": "ISO-8601"
}
```

## Shared rules

- All IDs use UUIDs.
- All timestamps use ISO-8601.
- Every persisted object includes a schema version.
- Migrations must preserve user data.
- Module-specific data remains namespaced.
