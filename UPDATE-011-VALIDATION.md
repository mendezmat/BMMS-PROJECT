# BMMS 1.1.0 Alpha 1 Validation

Repository check: 0

```text
BMMS repository check passed.

```

Tests: 0

```text
TAP version 13
# Subtest: animation preview controls are connected
ok 1 - animation preview controls are connected
  ---
  duration_ms: 11.58016
  type: 'test'
  ...
# Subtest: editor animation playback uses requestAnimationFrame
ok 2 - editor animation playback uses requestAnimationFrame
  ---
  duration_ms: 11.181155
  type: 'test'
  ...
# Subtest: publishes a versioned event envelope
ok 3 - publishes a versioned event envelope
  ---
  duration_ms: 2.062259
  type: 'test'
  ...
# Subtest: registers and resolves a service
ok 4 - registers and resolves a service
  ---
  duration_ms: 0.664101
  type: 'test'
  ...
# Subtest: rejects duplicate registrations
ok 5 - rejects duplicate registrations
  ---
  duration_ms: 0.202573
  type: 'test'
  ...
# Subtest: normalizes an animation configuration
ok 6 - normalizes an animation configuration
  ---
  duration_ms: 0.700826
  type: 'test'
  ...
# Subtest: provides enter and exit animation defaults
ok 7 - provides enter and exit animation defaults
  ---
  duration_ms: 0.144308
  type: 'test'
  ...
# Subtest: creates slide keyframes
ok 8 - creates slide keyframes
  ---
  duration_ms: 0.294981
  type: 'test'
  ...
# Subtest: disabled animations produce no keyframes
ok 9 - disabled animations produce no keyframes
  ---
  duration_ms: 0.462609
  type: 'test'
  ...
# Subtest: lists built-in broadcast components
ok 10 - lists built-in broadcast components
  ---
  duration_ms: 0.985286
  type: 'test'
  ...
# Subtest: creates a Scripture component with shared component identity
ok 11 - creates a Scripture component with shared component identity
  ---
  duration_ms: 1.721381
  type: 'test'
  ...
# Subtest: creates a Lower Third component with live bindings
ok 12 - creates a Lower Third component with live bindings
  ---
  duration_ms: 0.327998
  type: 'test'
  ...
# Subtest: generic component factory rejects unknown components
ok 13 - generic component factory rejects unknown components
  ---
  duration_ms: 0.30456
  type: 'test'
  ...
# Subtest: gets nested values by path
ok 14 - gets nested values by path
  ---
  duration_ms: 0.961471
  type: 'test'
  ...
# Subtest: resolves single and double brace tokens
ok 15 - resolves single and double brace tokens
  ---
  duration_ms: 0.322127
  type: 'test'
  ...
# Subtest: resolves binding text elements without mutating source
ok 16 - resolves binding text elements without mutating source
  ---
  duration_ms: 0.287702
  type: 'test'
  ...
# Subtest: resolves documents and lists tokens
ok 17 - resolves documents and lists tokens
  ---
  duration_ms: 0.930237
  type: 'test'
  ...
# Subtest: creates normalized text elements
ok 18 - creates normalized text elements
  ---
  duration_ms: 20.870089
  type: 'test'
  ...
# Subtest: updates and removes elements immutably
ok 19 - updates and removes elements immutably
  ---
  duration_ms: 1.89338
  type: 'test'
  ...
# Subtest: reorders layers
ok 20 - reorders layers
  ---
  duration_ms: 0.914437
  type: 'test'
  ...
# Subtest: normalization preserves grouping metadata
ok 21 - normalization preserves grouping metadata
  ---
  duration_ms: 1.077676
  type: 'test'
  ...
# Subtest: undoes and redoes document commits
ok 22 - undoes and redoes document commits
  ---
  duration_ms: 0.92901
  type: 'test'
  ...
# Subtest: creates and categorizes templates
ok 23 - creates and categorizes templates
  ---
  duration_ms: 1.997854
  type: 'test'
  ...
# Subtest: duplicates templates with a new identity
ok 24 - duplicates templates with a new identity
  ---
  duration_ms: 0.218204
  type: 'test'
  ...
# Subtest: instantiates templates with new element and group ids
ok 25 - instantiates templates with new element and group ids
  ---
  duration_ms: 0.290512
  type: 'test'
  ...
# Subtest: updates metadata without replacing the stored document
ok 26 - updates metadata without replacing the stored document
  ---
  duration_ms: 0.175985
  type: 'test'
  ...
# Subtest: Scripture defaults to manual source
ok 27 - Scripture defaults to manual source
  ---
  duration_ms: 0.538659
  type: 'test'
  ...
# Subtest: ProPresenter settings are globally available
ok 28 - ProPresenter settings are globally available
  ---
  duration_ms: 0.096875
  type: 'test'
  ...
# Subtest: Smart Flyer defaults to assisted automation
ok 29 - Smart Flyer defaults to assisted automation
  ---
  duration_ms: 0.081081
  type: 'test'
  ...
# Subtest: builds manual scripture context
ok 30 - builds manual scripture context
  ---
  duration_ms: 1.149247
  type: 'test'
  ...
# Subtest: uses ProPresenter scripture when selected
ok 31 - uses ProPresenter scripture when selected
  ---
  duration_ms: 0.486083
  type: 'test'
  ...
# Subtest: starts disabled by default
ok 32 - starts disabled by default
  ---
  duration_ms: 0.752915
  type: 'test'
  ...
# Subtest: validates port range
ok 33 - validates port range
  ---
  duration_ms: 0.261903
  type: 'test'
  ...
# Subtest: publishes normalized ProPresenter media events
ok 34 - publishes normalized ProPresenter media events
  ---
  duration_ms: 0.631546
  type: 'test'
  ...
# {"timestamp":"2026-07-22T20:21:47.080Z","level":"INFO","scope":"test","message":"Connecting to ProPresenter","context":{"host":"127.0.0.1","port":1025,"protocol":"tcp"}}
# Subtest: tests the connection through the documented system-time endpoint
ok 35 - tests the connection through the documented system-time endpoint
  ---
  duration_ms: 1.128597
  type: 'test'
  ...
# Subtest: connects and subscribes configured streaming endpoints
ok 36 - connects and subscribes configured streaming endpoints
  ---
  duration_ms: 1.972638
  type: 'test'
  ...
# Subtest: normalizes a ProPresenter Scripture payload
ok 37 - normalizes a ProPresenter Scripture payload
  ---
  duration_ms: 1.819249
  type: 'test'
  ...
# Subtest: uses newline-delimited JSON for a real TCP request
ok 38 - uses newline-delimited JSON for a real TCP request
  ---
  duration_ms: 11.301388
  type: 'test'
  ...
# Subtest: receives chunked streaming messages
ok 39 - receives chunked streaming messages
  ---
  duration_ms: 42.185561
  type: 'test'
  ...
# Subtest: applies capped exponential backoff
ok 40 - applies capped exponential backoff
  ---
  duration_ms: 1.524865
  type: 'test'
  ...
# Subtest: publishes verse and program events
ok 41 - publishes verse and program events
  ---
  duration_ms: 2.490662
  type: 'test'
  ...
# Subtest: does not mark identical normalized content as changed
ok 42 - does not mark identical normalized content as changed
  ---
  duration_ms: 1.492272
  type: 'test'
  ...
# Subtest: normalizes a verse and creates a stable id
ok 43 - normalizes a verse and creates a stable id
  ---
  duration_ms: 1.122654
  type: 'test'
  ...
# Subtest: requires verse text
ok 44 - requires verse text
  ---
  duration_ms: 0.234432
  type: 'test'
  ...
# Subtest: stable id changes when content changes
ok 45 - stable id changes when content changes
  ---
  duration_ms: 0.190794
  type: 'test'
  ...
# Subtest: parses a Spanish Scripture reference
ok 46 - parses a Spanish Scripture reference
  ---
  duration_ms: 13.545611
  type: 'test'
  ...
# Subtest: extracts a reference from the first line
ok 47 - extracts a reference from the first line
  ---
  duration_ms: 0.490887
  type: 'test'
  ...
1..47
# tests 47
# suites 0
# pass 47
# fail 0
# cancelled 0
# skipped 0
# todo 0
# duration_ms 570.606129

```

Server syntax: 0

```text

```
