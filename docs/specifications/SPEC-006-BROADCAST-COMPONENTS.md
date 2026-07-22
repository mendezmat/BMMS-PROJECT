# SPEC-006 — Broadcast Components

## 0.7.0 scope

The editor includes an initial component library:

- Verse / Scripture
- Lower Third

Each component:

- creates editable standard elements;
- shares a component identity;
- includes default live-data bindings;
- can be selected as a group using `Alt + click`;
- can be moved as a group using `Alt + drag`;
- remains compatible with the generic graphics output renderer.

## Transparent output

Documents may enable `outputTransparent`, allowing the browser source to remain
transparent while the editor retains its chosen working background.
