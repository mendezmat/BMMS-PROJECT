# Dataset Guide

## Purpose

The dataset supports Smart Engine development and benchmarking.

## Dataset structure

```text
dataset/
├── originals/
├── annotations/
├── expected-output/
├── splits/
│   ├── train.txt
│   ├── validation.txt
│   └── test.txt
└── metadata/
```

## Required annotation fields

```json
{
  "assetId": "uuid",
  "contentType": "eventFlyer",
  "language": "es",
  "entities": [],
  "qrRegions": [],
  "textBlocks": [],
  "expectedLayouts": [],
  "notes": ""
}
```

## Data rules

- Preserve original files.
- Do not alter benchmark test samples after evaluation begins.
- Record source and usage permission.
- Remove private personal information when required.
- Separate synthetic and real samples.
- Track difficult cases explicitly.

## Initial dataset categories

- Church services.
- Youth events.
- Marriage activities.
- Children's activities.
- Conferences.
- Special announcements.
- Speaker promotions.
- QR registration flyers.
