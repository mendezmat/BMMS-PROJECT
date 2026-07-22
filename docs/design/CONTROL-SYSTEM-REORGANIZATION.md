# Scripture and Smart Flyer control reorganization

## Shared control components

Planned reusable controls:

- TypographyControl
- AlignmentControl
- SpacingControl
- BackgroundControl
- BorderControl
- AnimationControl
- OverlayOutputControl
- ElementSelector
- ConnectionStatus

## Scripture

```text
Content
├── Source: Manual / ProPresenter
├── Reference
├── Version
├── Text
└── Pagination

Composition
├── Layout mode
├── Columns
├── Balance
├── Alignment
└── Internal spacing

Appearance
├── Selected element
├── Typography
├── Colors
└── Background

Animation
├── In
├── Out
└── Duration

Output
├── Preview
├── Program
└── Overlay URL
```

## Smart Flyer

```text
Source
├── Upload
├── ProPresenter
└── Future live capture

Detection
├── Detected fields
├── Confidence
└── Enable/disable field

Review
├── Text corrections
├── Image crop
└── QR preservation

Composition
├── Template
├── Hierarchy
└── Layout

Appearance
└── Shared property controls

Output
├── Preview
└── Program
```
