# SPEC-003 — Smart Flyer

## 1. Purpose

Smart Flyer converts an activity flyer into an editable broadcast graphic, especially a lower third or announcement graphic.

The source flyer may include:

- Title.
- Slogan.
- Date.
- Time.
- Location.
- Speaker.
- QR code.
- Registration information.
- Additional details.

## 2. Operator workflow

```text
Import flyer
→ Analyze
→ Review extracted fields
→ Correct or confirm
→ Choose generated layout
→ Fine-tune
→ Preview
→ Publish
```

## 3. Import requirements

Supported initial formats:

- PNG.
- JPG/JPEG.
- WebP.

Future formats:

- PDF.
- Clipboard image.
- Camera capture.

The original asset must be preserved unchanged.

## 4. Analysis requirements

Smart Flyer uses Smart Engine to produce:

- OCR blocks.
- Detected entities.
- Confidence values.
- QR candidates.
- Layout candidates.
- Warnings.
- Recommendations.

## 5. Editable field model

```json
{
  "title": "",
  "subtitle": "",
  "slogan": "",
  "date": "",
  "time": "",
  "location": "",
  "speaker": "",
  "registration": "",
  "contact": "",
  "url": "",
  "qrAssetId": "",
  "additionalInfo": []
}
```

Every field must show:

- Extracted value.
- Confidence.
- Source location.
- Confirmation state.
- Manual override state.

## 6. Layout modes

Initial layout families:

- Compact lower third.
- Expanded lower third.
- Side panel announcement.
- Full-width announcement bar.
- QR-focused announcement.
- Speaker/event hybrid.

## 7. QR handling

The module must:

- Detect QR regions.
- Preserve the original QR asset when possible.
- Avoid rescaling below readable size.
- Maintain quiet zone.
- Warn when contrast or resolution is insufficient.
- Allow replacing the QR manually.
- Allow omitting the QR from compact layouts.

## 8. Editing

The operator must be able to:

- Correct extracted text.
- Reassign semantic roles.
- Remove fields.
- Add fields.
- Lock fields.
- Select a layout.
- Adjust typography and spacing.
- Reposition QR.
- Override warnings.
- Save as reusable template.

## 9. Safety rules

- No automatic publication.
- Low-confidence fields require visible review.
- Dates and times must not be silently normalized when ambiguous.
- Contact or price information must not be discarded automatically.
- Manual edits take priority over re-analysis.

## 10. Acceptance criteria

Smart Flyer is ready for beta when:

- A church event flyer can be processed end-to-end.
- Title, slogan, date, time, location, QR, and extra information can be represented.
- At least two layout candidates are generated.
- Manual corrections persist.
- QR validation is present.
- Final output can be published as an overlay.
