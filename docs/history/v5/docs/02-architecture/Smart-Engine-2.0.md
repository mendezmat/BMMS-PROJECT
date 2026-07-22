# Smart Engine 2.0 — Technical Design Document

## 1. Purpose

Smart Engine is the reusable intelligence layer of BMMS. It transforms unstructured or partially structured content into editable, broadcast-ready structured output.

It is not exclusive to Smart Flyer. Scripture, Lower Third, future graphics modules, and other BMMS applications may consume selected capabilities.

## 2. Product principle

**The engine proposes; the operator decides.**

Smart Engine must never publish content automatically without explicit operator approval.

## 3. High-level pipeline

```text
Input
  ↓
Input Normalizer
  ↓
OCR Provider
  ↓
Content Classifier
  ↓
Semantic Analyzer
  ↓
Entity Extractor
  ↓
Rule Engine
  ↓
Layout Generator
  ↓
Constraint Validator
  ↓
Recommendation Engine
  ↓
Structured Output
```

## 4. Input types

Initial supported inputs:

- Raster images.
- Flyer screenshots.
- Uploaded PNG/JPG/WebP.
- Plain text.
- Structured form input.
- Future: PDF pages.
- Future: live camera capture.

## 5. Processing stages

### 5.1 Input Normalizer

Responsibilities:

- Validate file type.
- Normalize image orientation.
- Read dimensions and metadata.
- Generate working copies.
- Downscale excessively large files.
- Preserve the original asset.
- Assign a processing job ID.

Output:

```json
{
  "jobId": "uuid",
  "inputType": "image",
  "originalAssetId": "asset-id",
  "workingAssetId": "asset-id",
  "width": 1080,
  "height": 1350
}
```

### 5.2 OCR Provider Layer

OCR must be provider-agnostic.

Provider contract:

```text
recognize(input, options) → OCRDocument
```

OCRDocument includes:

- Full text.
- Text blocks.
- Bounding boxes.
- Confidence.
- Language.
- Reading order.
- Provider metadata.

The engine must support replacing OCR providers without changing downstream stages.

### 5.3 Content Classifier

Determines the probable content type.

Initial classes:

- Event flyer.
- Church announcement.
- Speaker lower third.
- Scripture content.
- Generic promotional graphic.
- Unknown.

Classifier output must include confidence and alternative candidates.

### 5.4 Semantic Analyzer

Responsibilities:

- Understand hierarchy.
- Identify likely title and subtitle.
- Detect date, time, location, slogan, speaker, contact, price, and auxiliary information.
- Distinguish decorative text from operational information.
- Detect duplicate or contradictory fields.
- Infer relationships between text blocks.

### 5.5 Entity Extractor

Canonical entity types:

```text
title
subtitle
slogan
date
time
dateTime
location
speaker
organization
price
registration
contact
social
url
qr
description
additionalInfo
```

Every entity includes:

```json
{
  "type": "date",
  "value": "2026-08-15",
  "sourceText": "15 de agosto",
  "confidence": 0.94,
  "sourceBlockIds": ["block-12"]
}
```

### 5.6 Rule Engine

Rules combine deterministic broadcast knowledge with extracted semantics.

Examples:

- A title should not exceed the configured line limit.
- Date and time should remain together when possible.
- QR codes must maintain a quiet zone.
- Low-confidence entities require operator confirmation.
- Location may be omitted from a compact lower third but preserved in metadata.
- A slogan must not replace the event title.

Rules are versioned and testable.

### 5.7 Layout Generator

The Layout Generator produces layout candidates rather than a single immutable result.

Candidate properties:

- Template family.
- Region assignment.
- Typography scale.
- Line breaks.
- Alignment.
- QR placement.
- Safe-area compliance.
- Animation compatibility.
- Estimated legibility.

### 5.8 Constraint Validator

Validates:

- Safe margins.
- Maximum line count.
- Minimum font size.
- Contrast.
- Element collisions.
- QR readability.
- Canvas overflow.
- Animation-safe bounds.
- Platform output dimensions.

Validation output:

- Pass.
- Warning.
- Error.
- Auto-fix available.
- Manual correction required.

### 5.9 Recommendation Engine

Recommendations are separate from required corrections.

Examples:

- Shorten a subtitle.
- Increase contrast.
- Remove redundant date text.
- Promote a speaker name.
- Use a compact layout.
- Replace a long URL with a QR code.

## 6. Output model

Smart Engine returns structured, editable output:

```json
{
  "jobId": "uuid",
  "contentType": "eventFlyer",
  "confidence": 0.91,
  "entities": [],
  "layoutCandidates": [],
  "warnings": [],
  "recommendations": [],
  "provenance": {
    "ocrProvider": "provider-name",
    "engineVersion": "2.0.0",
    "ruleSetVersion": "1.0.0"
  }
}
```

## 7. Human-in-the-loop workflow

```text
Upload
→ Analysis
→ Candidate preview
→ Operator review
→ Manual edits
→ Validation
→ Approval
→ Overlay publication
```

The operator must be able to:

- Correct extracted text.
- Reassign entity roles.
- Choose a layout candidate.
- Override recommendations.
- Lock fields.
- Re-run only selected stages.

## 8. Provider architecture

Provider categories:

- OCR.
- Language detection.
- Semantic analysis.
- Vision analysis.
- QR detection.
- Future generative assistance.

Provider selection may depend on:

- Local or cloud mode.
- Cost.
- Latency.
- Language support.
- Privacy requirements.
- Availability.

## 9. Caching

The engine should cache:

- Normalized assets.
- OCR results.
- Semantic results.
- Layout candidates.
- Validation results.

Cache keys must include provider and rule-set versions.

## 10. Failure handling

A job may end as:

- COMPLETED
- COMPLETED_WITH_WARNINGS
- NEEDS_REVIEW
- PARTIAL
- FAILED
- CANCELLED

A provider failure must not erase previous successful stages.

## 11. Observability

Each job records stage duration, provider used, confidence metrics, warnings, and operator overrides.

This data supports future benchmarking without storing sensitive content unless explicitly enabled.

## 12. Benchmark requirements

Smart Engine cannot be considered complete without a benchmark.

Minimum benchmark dimensions:

- OCR accuracy.
- Entity extraction accuracy.
- Title identification accuracy.
- Date/time normalization accuracy.
- Layout validity.
- QR preservation.
- Processing latency.
- Operator correction time.

## 13. Extensibility

New stages may be added through a pipeline interface as long as they preserve the job envelope and stage contracts.

## 14. Acceptance criteria for Smart Engine 2.0

Smart Engine 2.0 is ready when:

- A flyer image can be processed end-to-end.
- OCR provider can be replaced without changing downstream modules.
- Title, slogan, date, time, location, QR, and additional information can be represented.
- At least two valid layout candidates are produced for supported flyers.
- Operator corrections persist.
- Low-confidence fields are visibly flagged.
- Benchmark results can be generated and stored.
- No output is published without approval.
