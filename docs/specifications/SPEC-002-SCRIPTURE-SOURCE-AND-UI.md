# SPEC-002 — Scripture source selection and interface reorganization

## Status

Approved for implementation.

## Source selector

Scripture must expose:

- Manual
- ProPresenter

### Manual mode

Show only manual content controls:

- reference;
- version;
- scripture text;
- pagination;
- Preview;
- Program.

### ProPresenter mode

Use the global ProPresenter integration and expose only module-specific
listening and mapping behavior.

## Interface sections

1. Content
2. Composition
3. Appearance
4. Animation
5. Output

## Control audit

Every existing control must be classified as:

- global;
- shared;
- module-specific;
- template-specific;
- duplicate;
- obsolete.

Duplicate and obsolete controls must be removed. Shared controls must be moved
to reusable UI components.

## Interaction model

The preferred model is:

`Select element → edit properties`

rather than showing all element settings simultaneously.
