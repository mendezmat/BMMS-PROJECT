# BMMS Hotfix 022 Validation

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
  duration_ms: 3.448874
  type: 'test'
  ...
# Subtest: editor animation playback uses requestAnimationFrame
ok 2 - editor animation playback uses requestAnimationFrame
  ---
  duration_ms: 1.851215
  type: 'test'
  ...
# Subtest: publishes a versioned event envelope
ok 3 - publishes a versioned event envelope
  ---
  duration_ms: 1.47101
  type: 'test'
  ...
# Subtest: registers and resolves a service
ok 4 - registers and resolves a service
  ---
  duration_ms: 0.573444
  type: 'test'
  ...
# Subtest: rejects duplicate registrations
ok 5 - rejects duplicate registrations
  ---
  duration_ms: 0.27608
  type: 'test'
  ...
# Subtest: normalizes an animation configuration
ok 6 - normalizes an animation configuration
  ---
  duration_ms: 1.110172
  type: 'test'
  ...
# Subtest: provides enter and exit animation defaults
ok 7 - provides enter and exit animation defaults
  ---
  duration_ms: 0.137625
  type: 'test'
  ...
# Subtest: creates slide keyframes
ok 8 - creates slide keyframes
  ---
  duration_ms: 0.305445
  type: 'test'
  ...
# Subtest: disabled animations produce no keyframes
ok 9 - disabled animations produce no keyframes
  ---
  duration_ms: 0.460455
  type: 'test'
  ...
# Subtest: lists built-in broadcast components
ok 10 - lists built-in broadcast components
  ---
  duration_ms: 1.031625
  type: 'test'
  ...
# Subtest: creates a Scripture component with shared component identity
ok 11 - creates a Scripture component with shared component identity
  ---
  duration_ms: 1.676105
  type: 'test'
  ...
# Subtest: creates a Lower Third component with live bindings
ok 12 - creates a Lower Third component with live bindings
  ---
  duration_ms: 0.345625
  type: 'test'
  ...
# Subtest: generic component factory rejects unknown components
ok 13 - generic component factory rejects unknown components
  ---
  duration_ms: 0.309891
  type: 'test'
  ...
# Subtest: gets nested values by path
ok 14 - gets nested values by path
  ---
  duration_ms: 0.744318
  type: 'test'
  ...
# Subtest: resolves single and double brace tokens
ok 15 - resolves single and double brace tokens
  ---
  duration_ms: 0.215831
  type: 'test'
  ...
# Subtest: resolves binding text elements without mutating source
ok 16 - resolves binding text elements without mutating source
  ---
  duration_ms: 0.233237
  type: 'test'
  ...
# Subtest: resolves documents and lists tokens
ok 17 - resolves documents and lists tokens
  ---
  duration_ms: 0.664239
  type: 'test'
  ...
# Subtest: creates normalized text elements
ok 18 - creates normalized text elements
  ---
  duration_ms: 2.161497
  type: 'test'
  ...
# Subtest: updates and removes elements immutably
ok 19 - updates and removes elements immutably
  ---
  duration_ms: 0.466564
  type: 'test'
  ...
# Subtest: reorders layers
ok 20 - reorders layers
  ---
  duration_ms: 0.607684
  type: 'test'
  ...
# Subtest: normalization preserves grouping metadata
ok 21 - normalization preserves grouping metadata
  ---
  duration_ms: 0.716346
  type: 'test'
  ...
# Subtest: undoes and redoes document commits
ok 22 - undoes and redoes document commits
  ---
  duration_ms: 0.674044
  type: 'test'
  ...
# Subtest: creates and categorizes templates
ok 23 - creates and categorizes templates
  ---
  duration_ms: 1.911875
  type: 'test'
  ...
# Subtest: duplicates templates with a new identity
ok 24 - duplicates templates with a new identity
  ---
  duration_ms: 0.226798
  type: 'test'
  ...
# Subtest: instantiates templates with new element and group ids
ok 25 - instantiates templates with new element and group ids
  ---
  duration_ms: 0.371623
  type: 'test'
  ...
# Subtest: updates metadata without replacing the stored document
ok 26 - updates metadata without replacing the stored document
  ---
  duration_ms: 0.175912
  type: 'test'
  ...
# Subtest: Scripture defaults to manual source
ok 27 - Scripture defaults to manual source
  ---
  duration_ms: 0.551441
  type: 'test'
  ...
# Subtest: ProPresenter settings are globally available
ok 28 - ProPresenter settings are globally available
  ---
  duration_ms: 0.10085
  type: 'test'
  ...
# Subtest: Smart Flyer defaults to assisted automation
ok 29 - Smart Flyer defaults to assisted automation
  ---
  duration_ms: 0.087179
  type: 'test'
  ...
# Subtest: builds manual scripture context
ok 30 - builds manual scripture context
  ---
  duration_ms: 0.737227
  type: 'test'
  ...
# Subtest: uses ProPresenter scripture when selected
ok 31 - uses ProPresenter scripture when selected
  ---
  duration_ms: 0.297422
  type: 'test'
  ...
# Subtest: reads the official status and presentation endpoints
ok 32 - reads the official status and presentation endpoints
  ---
  duration_ms: 2.623645
  type: 'test'
  ...
# Subtest: does not emit a duplicate verse
ok 33 - does not emit a duplicate verse
  ---
  duration_ms: 0.693572
  type: 'test'
  ...
# Subtest: starts disabled by default
ok 34 - starts disabled by default
  ---
  duration_ms: 0.769585
  type: 'test'
  ...
# Subtest: validates port range
ok 35 - validates port range
  ---
  duration_ms: 0.273667
  type: 'test'
  ...
# Subtest: publishes normalized ProPresenter media events
ok 36 - publishes normalized ProPresenter media events
  ---
  duration_ms: 0.734724
  type: 'test'
  ...
# {"timestamp":"2026-07-23T05:22:44.088Z","level":"INFO","scope":"test","message":"Connecting to ProPresenter","context":{"host":"127.0.0.1","port":1025,"protocol":"tcp"}}
# Subtest: tests the connection through the documented system-time endpoint
ok 37 - tests the connection through the documented system-time endpoint
  ---
  duration_ms: 0.894261
  type: 'test'
  ...
# Subtest: connects and subscribes configured streaming endpoints
ok 38 - connects and subscribes configured streaming endpoints
  ---
  duration_ms: 1.812828
  type: 'test'
  ...
# Subtest: normalizes a ProPresenter Scripture payload
ok 39 - normalizes a ProPresenter Scripture payload
  ---
  duration_ms: 1.32999
  type: 'test'
  ...
# Subtest: uses newline-delimited JSON for a real TCP request
ok 40 - uses newline-delimited JSON for a real TCP request
  ---
  duration_ms: 11.131077
  type: 'test'
  ...
# Subtest: receives chunked streaming messages
ok 41 - receives chunked streaming messages
  ---
  duration_ms: 47.681519
  type: 'test'
  ...
# Subtest: applies capped exponential backoff
ok 42 - applies capped exponential backoff
  ---
  duration_ms: 1.085235
  type: 'test'
  ...
# Subtest: normalizes a common current slide payload
ok 43 - normalizes a common current slide payload
  ---
  duration_ms: 1.911485
  type: 'test'
  ...
# Subtest: supports snake case response variants
ok 44 - supports snake case response variants
  ---
  duration_ms: 0.36911
  type: 'test'
  ...
# Subtest: balances text into visually similar lines
ok 45 - balances text into visually similar lines
  ---
  duration_ms: 1.011766
  type: 'test'
  ...
# Subtest: penalizes a one-word final line when a better partition exists
ok 46 - penalizes a one-word final line when a better partition exists
  ---
  duration_ms: 1.263491
  type: 'test'
  ...
# Subtest: reports overflow when minimum font still exceeds the box
ok 47 - reports overflow when minimum font still exceeds the box
  ---
  duration_ms: 0.210553
  type: 'test'
  ...
# Subtest: Scripture includes a default simple-mode design
ok 48 - Scripture includes a default simple-mode design
  ---
  duration_ms: 0.538392
  type: 'test'
  ...
# Subtest: Scripture broadcast state starts safely off air
ok 49 - Scripture broadcast state starts safely off air
  ---
  duration_ms: 0.166858
  type: 'test'
  ...
# Subtest: publishes verse and program events
ok 50 - publishes verse and program events
  ---
  duration_ms: 1.836674
  type: 'test'
  ...
# Subtest: does not mark identical normalized content as changed
ok 51 - does not mark identical normalized content as changed
  ---
  duration_ms: 0.297392
  type: 'test'
  ...
# Subtest: preview iframe is not hidden behind a ready-message race
ok 52 - preview iframe is not hidden behind a ready-message race
  ---
  duration_ms: 0.92704
  type: 'test'
  ...
# Subtest: lateral padding overrides every Scripture format
ok 53 - lateral padding overrides every Scripture format
  ---
  duration_ms: 0.442168
  type: 'test'
  ...
# Subtest: text fitting performs real rendered candidate measurements
ok 54 - text fitting performs real rendered candidate measurements
  ---
  duration_ms: 0.197745
  type: 'test'
  ...
# Subtest: preview initialization cannot abort the whole app
ok 55 - preview initialization cannot abort the whole app
  ---
  duration_ms: 1.582665
  type: 'test'
  ...
# Subtest: saved Scripture state is deeply hydrated
ok 56 - saved Scripture state is deeply hydrated
  ---
  duration_ms: 0.193759
  type: 'test'
  ...
# Subtest: restores original Scripture geometry
ok 57 - restores original Scripture geometry
  ---
  duration_ms: 0.5711
  type: 'test'
  ...
# Subtest: restores writing and contextual transitions
ok 58 - restores writing and contextual transitions
  ---
  duration_ms: 0.104225
  type: 'test'
  ...
# Subtest: restores gradient and typography
ok 59 - restores gradient and typography
  ---
  duration_ms: 0.092908
  type: 'test'
  ...
# Subtest: Scripture restores the original template and format defaults
ok 60 - Scripture restores the original template and format defaults
  ---
  duration_ms: 0.579813
  type: 'test'
  ...
# Subtest: Appearance and animation configuration have usable defaults
ok 61 - Appearance and animation configuration have usable defaults
  ---
  duration_ms: 0.22114
  type: 'test'
  ...
# Subtest: TV Broadcast CG is available in the advanced template library
ok 62 - TV Broadcast CG is available in the advanced template library
  ---
  duration_ms: 1.778757
  type: 'test'
  ...
# Subtest: Scripture output contains the robust fitting engine
ok 63 - Scripture output contains the robust fitting engine
  ---
  duration_ms: 0.265325
  type: 'test'
  ...
# Subtest: Preview uses one scaled 1920 by 1080 stage
ok 64 - Preview uses one scaled 1920 by 1080 stage
  ---
  duration_ms: 0.330151
  type: 'test'
  ...
# Subtest: preview iframe preserves a 1920 by 1080 viewport
ok 65 - preview iframe preserves a 1920 by 1080 viewport
  ---
  duration_ms: 1.642484
  type: 'test'
  ...
# Subtest: overlay no longer polls and rerenders every two seconds
ok 66 - overlay no longer polls and rerenders every two seconds
  ---
  duration_ms: 0.240018
  type: 'test'
  ...
# Subtest: signature excludes volatile ProPresenter timestamps
ok 67 - signature excludes volatile ProPresenter timestamps
  ---
  duration_ms: 0.230874
  type: 'test'
  ...
# Subtest: verse width follows configured lateral padding without a legacy cap
ok 68 - verse width follows configured lateral padding without a legacy cap
  ---
  duration_ms: 0.334067
  type: 'test'
  ...
# Subtest: text fitting stays readable without horizontal compression
ok 69 - text fitting stays readable without horizontal compression
  ---
  duration_ms: 0.271494
  type: 'test'
  ...
# Subtest: normalizes a verse and creates a stable id
ok 70 - normalizes a verse and creates a stable id
  ---
  duration_ms: 1.052657
  type: 'test'
  ...
# Subtest: requires verse text
ok 71 - requires verse text
  ---
  duration_ms: 0.331614
  type: 'test'
  ...
# Subtest: stable id changes when content changes
ok 72 - stable id changes when content changes
  ---
  duration_ms: 0.169782
  type: 'test'
  ...
# Subtest: parses a Spanish Scripture reference
ok 73 - parses a Spanish Scripture reference
  ---
  duration_ms: 1.182029
  type: 'test'
  ...
# Subtest: extracts a reference from the first line
ok 74 - extracts a reference from the first line
  ---
  duration_ms: 0.457782
  type: 'test'
  ...
1..74
# tests 74
# suites 0
# pass 74
# fail 0
# cancelled 0
# skipped 0
# todo 0
# duration_ms 496.556248

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

## runtime_flows
Exit code: 0

```text
GET /: 200 (26593 bytes)
GET /scripture-overlay.js: 200 (17658 bytes)
GET /overlay/scripture?preview=1: 200 (561 bytes)
GET /api/integrations/propresenter/status: 200 (169 bytes)
Manual Preview: 200
ProPresenter simulator: 200
```

