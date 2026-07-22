# SPEC-005 — Graphics Data Binding

## 0.6.0 scope

- nested data-path resolution;
- single or double brace templates;
- manual/bound text mode;
- binding presets in the inspector;
- live resolved preview in the editor;
- shared graphics output endpoint;
- independent browser-source output;
- live refresh through SSE;
- Scripture and Lower Third data contexts.

## Browser source

```text
http://localhost:4173/overlay/graphics
```

## Current tokens

```text
{scripture.reference}
{scripture.version}
{scripture.text}
{scripture.presentation}
{scripture.slideIndex}
{lowerThird.title}
{lowerThird.subtitle}
```
