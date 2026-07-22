# BMMS 1.2.0 Beta 1 — Scripture Broadcast

## Delivered

- separate Preview and Program buses;
- manual Take and Clear;
- persistent Auto Take;
- transparent browser-source output;
- entry and exit animation;
- Smart Balance 2.0 using real browser font measurement;
- automatic font scaling;
- dedicated broadcast-style operator interface;
- persistent Program state after browser-source reload.

## Operator routes

```text
Control: http://localhost:4173/scripture
Output:  http://localhost:4173/overlay/scripture
```

## Preview / Program policy

A ProPresenter change always updates Preview.

- Auto disabled: Program remains unchanged until Take.
- Auto enabled: Preview is copied to Program and placed on air.
- Clear hides Program without deleting the last content.
- Reloading the browser source restores the current Program state.

## Smart Balance

The output measures text through Canvas and evaluates multiple legal
word-boundary partitions. It penalizes:

- unequal line widths;
- weak box utilization;
- very short final lines;
- isolated final words;
- unnecessary line count.

It then lowers the font size until the selected wrap fits the configured box.
