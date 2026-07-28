# Update 038.3 validation

- Dedicated Smart Flyer reset stylesheet loaded after legacy styles.
- Original flyer viewport uses contain sizing and cannot be displaced by the CG result.
- CG result uses intrinsic strip height, not 1920x1080 preview proportions.
- Browser Output is transparent and only renders the CG strip.
- Template and format variants do not use fixed off-canvas coordinates.
