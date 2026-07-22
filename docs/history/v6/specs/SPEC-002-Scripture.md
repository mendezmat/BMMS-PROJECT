# SPEC-002 — Scripture

## 1. Purpose

Scripture is the BMMS Graphics module for creating and controlling Bible verse graphics in live production environments.

Its primary goal is to reduce the time required to prepare, balance, preview, and publish scripture overlays while preserving full operator control.

## 2. Core use cases

- Receive scripture content from ProPresenter.
- Enter scripture manually.
- Edit text before publication.
- Automatically balance long verses across lines or slides.
- Preview the graphic in real time.
- Publish through an independent browser overlay URL.
- Reuse visual templates.

## 3. Functional requirements

### 3.1 Input

The module must support:

- Manual text entry.
- Book, chapter, and verse reference entry.
- ProPresenter integration.
- Pasted text.
- Future Bible-provider integration through adapters.

### 3.2 Content model

A scripture item contains:

```json
{
  "id": "uuid",
  "reference": {
    "book": "Juan",
    "chapter": 3,
    "startVerse": 16,
    "endVerse": 16,
    "display": "Juan 3:16"
  },
  "translation": "RVR1960",
  "text": "Porque de tal manera amó Dios al mundo...",
  "segments": [],
  "notes": {},
  "createdAt": "ISO-8601",
  "updatedAt": "ISO-8601"
}
```

### 3.3 Intelligent text balancing

The balancing engine must:

- Respect maximum line count.
- Respect minimum font size.
- Avoid orphaned short words when possible.
- Preserve punctuation.
- Prefer semantic phrase boundaries.
- Allow manual line-break locking.
- Support one-page and multi-page output.
- Recalculate immediately after editing.

### 3.4 Visual editor

The editor must provide:

- Live preview.
- Typography controls.
- Alignment controls.
- Reference placement.
- Background and accent controls.
- Safe-area visualization.
- Template selection.
- Animation configuration.
- Reset to template defaults.

### 3.5 Live workflow

```text
Receive or enter scripture
→ Review
→ Balance
→ Preview
→ Take live
→ Advance
→ Clear
```

### 3.6 Overlay control

Required actions:

- Show.
- Hide.
- Update while hidden.
- Update while live with operator confirmation.
- Advance to next segment.
- Return to previous segment.
- Clear immediately.
- Preview separately from program output.

## 4. ProPresenter integration

The integration layer must remain separate from Scripture business logic.

Possible responsibilities:

- Detect active scripture content.
- Receive current slide text.
- Receive reference metadata when available.
- Translate ProPresenter changes into BMMS events.
- Allow connection status monitoring.
- Fail safely if ProPresenter is unavailable.

## 5. Non-functional requirements

- Preview updates under 100 ms in normal conditions.
- A ProPresenter disconnect must not remove the current live graphic.
- Manual edits must never be overwritten without warning.
- All content must remain usable offline after it is received.
- The operator must be able to disable automatic balancing.

## 6. Acceptance criteria

Scripture is ready for initial production use when:

- Manual scripture entry works.
- ProPresenter content can be received through an adapter.
- Long passages can be divided into readable segments.
- Manual line breaks can be locked.
- Preview and live output are independent.
- Overlay URLs work in vMix and OBS browser sources.
