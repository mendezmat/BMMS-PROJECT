# Update 019 Validation

## repository_check
Exit code: 0

```text
BMMS repository check passed.

```

## tests
Exit code: 0

```text
TAP version 13
# Subtest: animation preview controls are connected
ok 1 - animation preview controls are connected
  ---
  duration_ms: 3.28486
  type: 'test'
  ...
# Subtest: editor animation playback uses requestAnimationFrame
ok 2 - editor animation playback uses requestAnimationFrame
  ---
  duration_ms: 1.937734
  type: 'test'
  ...
# Subtest: publishes a versioned event envelope
ok 3 - publishes a versioned event envelope
  ---
  duration_ms: 1.459933
  type: 'test'
  ...
# Subtest: registers and resolves a service
ok 4 - registers and resolves a service
  ---
  duration_ms: 0.574235
  type: 'test'
  ...
# Subtest: rejects duplicate registrations
ok 5 - rejects duplicate registrations
  ---
  duration_ms: 0.20197
  type: 'test'
  ...
# Subtest: normalizes an animation configuration
ok 6 - normalizes an animation configuration
  ---
  duration_ms: 0.673963
  type: 'test'
  ...
# Subtest: provides enter and exit animation defaults
ok 7 - provides enter and exit animation defaults
  ---
  duration_ms: 0.12793
  type: 'test'
  ...
# Subtest: creates slide keyframes
ok 8 - creates slide keyframes
  ---
  duration_ms: 0.389369
  type: 'test'
  ...
# Subtest: disabled animations produce no keyframes
ok 9 - disabled animations produce no keyframes
  ---
  duration_ms: 0.479033
  type: 'test'
  ...
# Subtest: lists built-in broadcast components
ok 10 - lists built-in broadcast components
  ---
  duration_ms: 1.137573
  type: 'test'
  ...
# Subtest: creates a Scripture component with shared component identity
ok 11 - creates a Scripture component with shared component identity
  ---
  duration_ms: 1.687902
  type: 'test'
  ...
# Subtest: creates a Lower Third component with live bindings
ok 12 - creates a Lower Third component with live bindings
  ---
  duration_ms: 0.339606
  type: 'test'
  ...
# Subtest: generic component factory rejects unknown components
ok 13 - generic component factory rejects unknown components
  ---
  duration_ms: 0.319215
  type: 'test'
  ...
# Subtest: gets nested values by path
ok 14 - gets nested values by path
  ---
  duration_ms: 0.643258
  type: 'test'
  ...
# Subtest: resolves single and double brace tokens
ok 15 - resolves single and double brace tokens
  ---
  duration_ms: 0.200488
  type: 'test'
  ...
# Subtest: resolves binding text elements without mutating source
ok 16 - resolves binding text elements without mutating source
  ---
  duration_ms: 0.245815
  type: 'test'
  ...
# Subtest: resolves documents and lists tokens
ok 17 - resolves documents and lists tokens
  ---
  duration_ms: 0.569547
  type: 'test'
  ...
# Subtest: creates normalized text elements
ok 18 - creates normalized text elements
  ---
  duration_ms: 1.996342
  type: 'test'
  ...
# Subtest: updates and removes elements immutably
ok 19 - updates and removes elements immutably
  ---
  duration_ms: 0.396661
  type: 'test'
  ...
# Subtest: reorders layers
ok 20 - reorders layers
  ---
  duration_ms: 0.587595
  type: 'test'
  ...
# Subtest: normalization preserves grouping metadata
ok 21 - normalization preserves grouping metadata
  ---
  duration_ms: 0.728624
  type: 'test'
  ...
# Subtest: undoes and redoes document commits
ok 22 - undoes and redoes document commits
  ---
  duration_ms: 0.646512
  type: 'test'
  ...
# Subtest: creates and categorizes templates
ok 23 - creates and categorizes templates
  ---
  duration_ms: 2.03603
  type: 'test'
  ...
# Subtest: duplicates templates with a new identity
ok 24 - duplicates templates with a new identity
  ---
  duration_ms: 0.231164
  type: 'test'
  ...
# Subtest: instantiates templates with new element and group ids
ok 25 - instantiates templates with new element and group ids
  ---
  duration_ms: 0.304603
  type: 'test'
  ...
# Subtest: updates metadata without replacing the stored document
ok 26 - updates metadata without replacing the stored document
  ---
  duration_ms: 0.168291
  type: 'test'
  ...
# Subtest: Scripture defaults to manual source
ok 27 - Scripture defaults to manual source
  ---
  duration_ms: 0.561827
  type: 'test'
  ...
# Subtest: ProPresenter settings are globally available
ok 28 - ProPresenter settings are globally available
  ---
  duration_ms: 0.139829
  type: 'test'
  ...
# Subtest: Smart Flyer defaults to assisted automation
ok 29 - Smart Flyer defaults to assisted automation
  ---
  duration_ms: 0.092918
  type: 'test'
  ...
# Subtest: builds manual scripture context
ok 30 - builds manual scripture context
  ---
  duration_ms: 0.696948
  type: 'test'
  ...
# Subtest: uses ProPresenter scripture when selected
ok 31 - uses ProPresenter scripture when selected
  ---
  duration_ms: 0.285405
  type: 'test'
  ...
# Subtest: reads the official status and presentation endpoints
ok 32 - reads the official status and presentation endpoints
  ---
  duration_ms: 3.085523
  type: 'test'
  ...
# Subtest: does not emit a duplicate verse
ok 33 - does not emit a duplicate verse
  ---
  duration_ms: 1.036623
  type: 'test'
  ...
# Subtest: starts disabled by default
ok 34 - starts disabled by default
  ---
  duration_ms: 0.753281
  type: 'test'
  ...
# Subtest: validates port range
ok 35 - validates port range
  ---
  duration_ms: 0.267318
  type: 'test'
  ...
# Subtest: publishes normalized ProPresenter media events
ok 36 - publishes normalized ProPresenter media events
  ---
  duration_ms: 0.480976
  type: 'test'
  ...
# {"timestamp":"2026-07-23T04:08:42.729Z","level":"INFO","scope":"test","message":"Connecting to ProPresenter","context":{"host":"127.0.0.1","port":1025,"protocol":"tcp"}}
# Subtest: tests the connection through the documented system-time endpoint
ok 37 - tests the connection through the documented system-time endpoint
  ---
  duration_ms: 0.884557
  type: 'test'
  ...
# Subtest: connects and subscribes configured streaming endpoints
ok 38 - connects and subscribes configured streaming endpoints
  ---
  duration_ms: 1.872708
  type: 'test'
  ...
# Subtest: normalizes a ProPresenter Scripture payload
ok 39 - normalizes a ProPresenter Scripture payload
  ---
  duration_ms: 1.243061
  type: 'test'
  ...
# Subtest: uses newline-delimited JSON for a real TCP request
ok 40 - uses newline-delimited JSON for a real TCP request
  ---
  duration_ms: 10.800315
  type: 'test'
  ...
# Subtest: receives chunked streaming messages
ok 41 - receives chunked streaming messages
  ---
  duration_ms: 43.246538
  type: 'test'
  ...
# Subtest: applies capped exponential backoff
ok 42 - applies capped exponential backoff
  ---
  duration_ms: 0.992007
  type: 'test'
  ...
# Subtest: normalizes a common current slide payload
ok 43 - normalizes a common current slide payload
  ---
  duration_ms: 1.885527
  type: 'test'
  ...
# Subtest: supports snake case response variants
ok 44 - supports snake case response variants
  ---
  duration_ms: 0.327237
  type: 'test'
  ...
# Subtest: balances text into visually similar lines
ok 45 - balances text into visually similar lines
  ---
  duration_ms: 0.870956
  type: 'test'
  ...
# Subtest: penalizes a one-word final line when a better partition exists
ok 46 - penalizes a one-word final line when a better partition exists
  ---
  duration_ms: 1.08173
  type: 'test'
  ...
# Subtest: reports overflow when minimum font still exceeds the box
ok 47 - reports overflow when minimum font still exceeds the box
  ---
  duration_ms: 0.205446
  type: 'test'
  ...
# Subtest: Scripture includes a default simple-mode design
ok 48 - Scripture includes a default simple-mode design
  ---
  duration_ms: 0.537049
  type: 'test'
  ...
# Subtest: Scripture broadcast state starts safely off air
ok 49 - Scripture broadcast state starts safely off air
  ---
  duration_ms: 0.169512
  type: 'test'
  ...
# Subtest: publishes verse and program events
ok 50 - publishes verse and program events
  ---
  duration_ms: 1.775553
  type: 'test'
  ...
# Subtest: does not mark identical normalized content as changed
ok 51 - does not mark identical normalized content as changed
  ---
  duration_ms: 1.160898
  type: 'test'
  ...
# Subtest: preview iframe is not hidden behind a ready-message race
ok 52 - preview iframe is not hidden behind a ready-message race
  ---
  duration_ms: 0.722566
  type: 'test'
  ...
# Subtest: lateral padding overrides every Scripture format
ok 53 - lateral padding overrides every Scripture format
  ---
  duration_ms: 0.441668
  type: 'test'
  ...
# Subtest: text fitting performs real rendered candidate measurements
ok 54 - text fitting performs real rendered candidate measurements
  ---
  duration_ms: 0.211635
  type: 'test'
  ...
# Subtest: restores original Scripture geometry
ok 55 - restores original Scripture geometry
  ---
  duration_ms: 0.548126
  type: 'test'
  ...
# Subtest: restores writing and contextual transitions
ok 56 - restores writing and contextual transitions
  ---
  duration_ms: 0.104336
  type: 'test'
  ...
# Subtest: restores gradient and typography
ok 57 - restores gradient and typography
  ---
  duration_ms: 0.092948
  type: 'test'
  ...
# Subtest: Scripture restores the original template and format defaults
ok 58 - Scripture restores the original template and format defaults
  ---
  duration_ms: 0.683177
  type: 'test'
  ...
# Subtest: Appearance and animation configuration have usable defaults
ok 59 - Appearance and animation configuration have usable defaults
  ---
  duration_ms: 0.22214
  type: 'test'
  ...
# Subtest: TV Broadcast CG is available in the advanced template library
ok 60 - TV Broadcast CG is available in the advanced template library
  ---
  duration_ms: 1.532231
  type: 'test'
  ...
# Subtest: Scripture output contains the robust fitting engine
ok 61 - Scripture output contains the robust fitting engine
  ---
  duration_ms: 0.244664
  type: 'test'
  ...
# Subtest: Preview uses one scaled 1920 by 1080 stage
ok 62 - Preview uses one scaled 1920 by 1080 stage
  ---
  duration_ms: 0.292645
  type: 'test'
  ...
# Subtest: preview iframe preserves a 1920 by 1080 viewport
ok 63 - preview iframe preserves a 1920 by 1080 viewport
  ---
  duration_ms: 1.328367
  type: 'test'
  ...
# Subtest: overlay no longer polls and rerenders every two seconds
ok 64 - overlay no longer polls and rerenders every two seconds
  ---
  duration_ms: 0.226767
  type: 'test'
  ...
# Subtest: signature excludes volatile ProPresenter timestamps
ok 65 - signature excludes volatile ProPresenter timestamps
  ---
  duration_ms: 0.172336
  type: 'test'
  ...
# Subtest: verse width follows configured lateral padding without a legacy cap
ok 66 - verse width follows configured lateral padding without a legacy cap
  ---
  duration_ms: 0.325094
  type: 'test'
  ...
# Subtest: text fitting has no horizontal compression floor
ok 67 - text fitting has no horizontal compression floor
  ---
  duration_ms: 0.238575
  type: 'test'
  ...
# Subtest: normalizes a verse and creates a stable id
ok 68 - normalizes a verse and creates a stable id
  ---
  duration_ms: 1.161098
  type: 'test'
  ...
# Subtest: requires verse text
ok 69 - requires verse text
  ---
  duration_ms: 0.239897
  type: 'test'
  ...
# Subtest: stable id changes when content changes
ok 70 - stable id changes when content changes
  ---
  duration_ms: 0.170704
  type: 'test'
  ...
# Subtest: parses a Spanish Scripture reference
ok 71 - parses a Spanish Scripture reference
  ---
  duration_ms: 1.311572
  type: 'test'
  ...
# Subtest: extracts a reference from the first line
ok 72 - extracts a reference from the first line
  ---
  duration_ms: 0.55076
  type: 'test'
  ...
1..72
# tests 72
# suites 0
# pass 72
# fail 0
# cancelled 0
# skipped 0
# todo 0
# duration_ms 461.249899

```

## server_syntax
Exit code: 0

```text

```

## app_syntax
Exit code: 0

```text

```

## overlay_syntax
Exit code: 0

```text

```

## runtime_http
Exit code: 0

```text
200 http://127.0.0.1:4173/ (26616 bytes)
200 http://127.0.0.1:4173/overlay/scripture (561 bytes)
200 http://127.0.0.1:4173/overlay/scripture?preview=1 (561 bytes)
200 http://127.0.0.1:4173/scripture-overlay.js (15210 bytes)
200 http://127.0.0.1:4173/scripture-overlay.css (47271 bytes)
200 http://127.0.0.1:4173/scripture-layout.js (2596 bytes)
200 http://127.0.0.1:4173/api/scripture/diagnostics (215 bytes)
```

