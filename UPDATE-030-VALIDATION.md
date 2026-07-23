# BMMS Update 030 Validation

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
  duration_ms: 5.758469
  type: 'test'
  ...
# Subtest: editor animation playback uses requestAnimationFrame
ok 2 - editor animation playback uses requestAnimationFrame
  ---
  duration_ms: 2.705683
  type: 'test'
  ...
# Subtest: publishes a versioned event envelope
ok 3 - publishes a versioned event envelope
  ---
  duration_ms: 1.5522
  type: 'test'
  ...
# Subtest: registers and resolves a service
ok 4 - registers and resolves a service
  ---
  duration_ms: 0.94719
  type: 'test'
  ...
# Subtest: rejects duplicate registrations
ok 5 - rejects duplicate registrations
  ---
  duration_ms: 0.324303
  type: 'test'
  ...
# Subtest: normalizes an animation configuration
ok 6 - normalizes an animation configuration
  ---
  duration_ms: 1.039441
  type: 'test'
  ...
# Subtest: provides enter and exit animation defaults
ok 7 - provides enter and exit animation defaults
  ---
  duration_ms: 0.23418
  type: 'test'
  ...
# Subtest: creates slide keyframes
ok 8 - creates slide keyframes
  ---
  duration_ms: 0.505516
  type: 'test'
  ...
# Subtest: disabled animations produce no keyframes
ok 9 - disabled animations produce no keyframes
  ---
  duration_ms: 0.654287
  type: 'test'
  ...
# Subtest: lists built-in broadcast components
ok 10 - lists built-in broadcast components
  ---
  duration_ms: 1.023316
  type: 'test'
  ...
# Subtest: creates a Scripture component with shared component identity
ok 11 - creates a Scripture component with shared component identity
  ---
  duration_ms: 2.158305
  type: 'test'
  ...
# Subtest: creates a Lower Third component with live bindings
ok 12 - creates a Lower Third component with live bindings
  ---
  duration_ms: 0.397438
  type: 'test'
  ...
# Subtest: generic component factory rejects unknown components
ok 13 - generic component factory rejects unknown components
  ---
  duration_ms: 0.399536
  type: 'test'
  ...
# Subtest: gets nested values by path
ok 14 - gets nested values by path
  ---
  duration_ms: 0.76873
  type: 'test'
  ...
# Subtest: resolves single and double brace tokens
ok 15 - resolves single and double brace tokens
  ---
  duration_ms: 0.213099
  type: 'test'
  ...
# Subtest: resolves binding text elements without mutating source
ok 16 - resolves binding text elements without mutating source
  ---
  duration_ms: 0.176115
  type: 'test'
  ...
# Subtest: resolves documents and lists tokens
ok 17 - resolves documents and lists tokens
  ---
  duration_ms: 0.578201
  type: 'test'
  ...
# Subtest: creates normalized text elements
ok 18 - creates normalized text elements
  ---
  duration_ms: 3.012597
  type: 'test'
  ...
# Subtest: updates and removes elements immutably
ok 19 - updates and removes elements immutably
  ---
  duration_ms: 0.548937
  type: 'test'
  ...
# Subtest: reorders layers
ok 20 - reorders layers
  ---
  duration_ms: 0.879233
  type: 'test'
  ...
# Subtest: normalization preserves grouping metadata
ok 21 - normalization preserves grouping metadata
  ---
  duration_ms: 1.281187
  type: 'test'
  ...
# Subtest: undoes and redoes document commits
ok 22 - undoes and redoes document commits
  ---
  duration_ms: 0.995122
  type: 'test'
  ...
# Subtest: creates and categorizes templates
ok 23 - creates and categorizes templates
  ---
  duration_ms: 3.104505
  type: 'test'
  ...
# Subtest: duplicates templates with a new identity
ok 24 - duplicates templates with a new identity
  ---
  duration_ms: 0.357374
  type: 'test'
  ...
# Subtest: instantiates templates with new element and group ids
ok 25 - instantiates templates with new element and group ids
  ---
  duration_ms: 0.443473
  type: 'test'
  ...
# Subtest: updates metadata without replacing the stored document
ok 26 - updates metadata without replacing the stored document
  ---
  duration_ms: 0.237707
  type: 'test'
  ...
# Subtest: Scripture defaults to manual source
ok 27 - Scripture defaults to manual source
  ---
  duration_ms: 0.850604
  type: 'test'
  ...
# Subtest: ProPresenter settings are globally available
ok 28 - ProPresenter settings are globally available
  ---
  duration_ms: 0.149645
  type: 'test'
  ...
# Subtest: Smart Flyer defaults to assisted automation
ok 29 - Smart Flyer defaults to assisted automation
  ---
  duration_ms: 0.146881
  type: 'test'
  ...
# Subtest: builds manual scripture context
ok 30 - builds manual scripture context
  ---
  duration_ms: 1.009933
  type: 'test'
  ...
# Subtest: uses ProPresenter scripture when selected
ok 31 - uses ProPresenter scripture when selected
  ---
  duration_ms: 0.457952
  type: 'test'
  ...
# Subtest: server migrates and synchronizes Scripture scenes
ok 32 - server migrates and synchronizes Scripture scenes
  ---
  duration_ms: 0.966631
  type: 'test'
  ...
# Subtest: server exposes Scene APIs and diagnostics
ok 33 - server exposes Scene APIs and diagnostics
  ---
  duration_ms: 1.224018
  type: 'test'
  ...
# Subtest: reads the official status and presentation endpoints
ok 34 - reads the official status and presentation endpoints
  ---
  duration_ms: 3.456004
  type: 'test'
  ...
# Subtest: does not emit a duplicate verse
ok 35 - does not emit a duplicate verse
  ---
  duration_ms: 0.740256
  type: 'test'
  ...
# Subtest: starts disabled by default
ok 36 - starts disabled by default
  ---
  duration_ms: 1.190013
  type: 'test'
  ...
# Subtest: validates port range
ok 37 - validates port range
  ---
  duration_ms: 1.328191
  type: 'test'
  ...
# Subtest: publishes normalized ProPresenter media events
ok 38 - publishes normalized ProPresenter media events
  ---
  duration_ms: 0.855723
  type: 'test'
  ...
# {"timestamp":"2026-07-23T16:06:05.248Z","level":"INFO","scope":"test","message":"Connecting to ProPresenter","context":{"host":"127.0.0.1","port":1025,"protocol":"tcp"}}
# Subtest: tests the connection through the documented system-time endpoint
ok 39 - tests the connection through the documented system-time endpoint
  ---
  duration_ms: 1.683301
  type: 'test'
  ...
# Subtest: connects and subscribes configured streaming endpoints
ok 40 - connects and subscribes configured streaming endpoints
  ---
  duration_ms: 2.631288
  type: 'test'
  ...
# Subtest: normalizes a ProPresenter Scripture payload
ok 41 - normalizes a ProPresenter Scripture payload
  ---
  duration_ms: 1.323053
  type: 'test'
  ...
# Subtest: uses newline-delimited JSON for a real TCP request
ok 42 - uses newline-delimited JSON for a real TCP request
  ---
  duration_ms: 16.116829
  type: 'test'
  ...
# Subtest: receives chunked streaming messages
ok 43 - receives chunked streaming messages
  ---
  duration_ms: 44.445898
  type: 'test'
  ...
# Subtest: applies capped exponential backoff
ok 44 - applies capped exponential backoff
  ---
  duration_ms: 1.536182
  type: 'test'
  ...
# Subtest: normalizes a common current slide payload
ok 45 - normalizes a common current slide payload
  ---
  duration_ms: 2.999016
  type: 'test'
  ...
# Subtest: supports snake case response variants
ok 46 - supports snake case response variants
  ---
  duration_ms: 0.557058
  type: 'test'
  ...
# Subtest: scene engine creates a versioned BMMS document
ok 47 - scene engine creates a versioned BMMS document
  ---
  duration_ms: 2.344179
  type: 'test'
  ...
# Subtest: scripture migrates into a reusable component tree
ok 48 - scripture migrates into a reusable component tree
  ---
  duration_ms: 0.942931
  type: 'test'
  ...
# Subtest: synchronization preserves identity and updates content
ok 49 - synchronization preserves identity and updates content
  ---
  duration_ms: 0.491897
  type: 'test'
  ...
# Subtest: scene duplication creates an independent document
ok 50 - scene duplication creates an independent document
  ---
  duration_ms: 1.458978
  type: 'test'
  ...
# Subtest: balances text into visually similar lines
ok 51 - balances text into visually similar lines
  ---
  duration_ms: 1.125135
  type: 'test'
  ...
# Subtest: penalizes a one-word final line when a better partition exists
ok 52 - penalizes a one-word final line when a better partition exists
  ---
  duration_ms: 1.297029
  type: 'test'
  ...
# Subtest: reports overflow when minimum font still exceeds the box
ok 53 - reports overflow when minimum font still exceeds the box
  ---
  duration_ms: 0.268732
  type: 'test'
  ...
# Subtest: Scripture includes a default simple-mode design
ok 54 - Scripture includes a default simple-mode design
  ---
  duration_ms: 0.704432
  type: 'test'
  ...
# Subtest: Scripture broadcast state starts safely off air
ok 55 - Scripture broadcast state starts safely off air
  ---
  duration_ms: 0.297429
  type: 'test'
  ...
# Subtest: publishes verse and program events
ok 56 - publishes verse and program events
  ---
  duration_ms: 2.69721
  type: 'test'
  ...
# Subtest: does not mark identical normalized content as changed
ok 57 - does not mark identical normalized content as changed
  ---
  duration_ms: 1.813906
  type: 'test'
  ...
# Subtest: preview iframe is not hidden behind a ready-message race
ok 58 - preview iframe is not hidden behind a ready-message race
  ---
  duration_ms: 2.144813
  type: 'test'
  ...
# Subtest: lateral padding overrides every Scripture format
ok 59 - lateral padding overrides every Scripture format
  ---
  duration_ms: 0.774963
  type: 'test'
  ...
# Subtest: text fitting performs real rendered candidate measurements
ok 60 - text fitting performs real rendered candidate measurements
  ---
  duration_ms: 0.336704
  type: 'test'
  ...
# Subtest: preview initialization cannot abort the whole app
ok 61 - preview initialization cannot abort the whole app
  ---
  duration_ms: 1.727331
  type: 'test'
  ...
# Subtest: saved Scripture state is deeply hydrated
ok 62 - saved Scripture state is deeply hydrated
  ---
  duration_ms: 0.211606
  type: 'test'
  ...
# Subtest: restores original Scripture geometry
ok 63 - restores original Scripture geometry
  ---
  duration_ms: 0.546963
  type: 'test'
  ...
# Subtest: restores writing and contextual transitions
ok 64 - restores writing and contextual transitions
  ---
  duration_ms: 0.098784
  type: 'test'
  ...
# Subtest: restores gradient and typography
ok 65 - restores gradient and typography
  ---
  duration_ms: 0.087293
  type: 'test'
  ...
# Subtest: Scripture restores the original template and format defaults
ok 66 - Scripture restores the original template and format defaults
  ---
  duration_ms: 0.818245
  type: 'test'
  ...
# Subtest: Appearance and animation configuration have usable defaults
ok 67 - Appearance and animation configuration have usable defaults
  ---
  duration_ms: 0.364918
  type: 'test'
  ...
# Subtest: TV Broadcast CG is available in the advanced template library
ok 68 - TV Broadcast CG is available in the advanced template library
  ---
  duration_ms: 2.255567
  type: 'test'
  ...
# Subtest: Scripture output contains the robust fitting engine
ok 69 - Scripture output contains the robust fitting engine
  ---
  duration_ms: 0.533153
  type: 'test'
  ...
# Subtest: Preview uses one scaled 1920 by 1080 stage
ok 70 - Preview uses one scaled 1920 by 1080 stage
  ---
  duration_ms: 0.535506
  type: 'test'
  ...
# Subtest: preview iframe preserves a 1920 by 1080 viewport
ok 71 - preview iframe preserves a 1920 by 1080 viewport
  ---
  duration_ms: 1.961207
  type: 'test'
  ...
# Subtest: overlay no longer polls and rerenders every two seconds
ok 72 - overlay no longer polls and rerenders every two seconds
  ---
  duration_ms: 0.254387
  type: 'test'
  ...
# Subtest: signature excludes volatile ProPresenter timestamps
ok 73 - signature excludes volatile ProPresenter timestamps
  ---
  duration_ms: 0.172138
  type: 'test'
  ...
# Subtest: verse width follows configured lateral padding without a legacy cap
ok 74 - verse width follows configured lateral padding without a legacy cap
  ---
  duration_ms: 0.58226
  type: 'test'
  ...
# Subtest: verse size is authoritative and is never silently reduced
ok 75 - verse size is authoritative and is never silently reduced
  ---
  duration_ms: 0.445144
  type: 'test'
  ...
# Subtest: composition supports independent X and Y scale
ok 76 - composition supports independent X and Y scale
  ---
  duration_ms: 2.926106
  type: 'test'
  ...
# Subtest: broadcast action labels are in Spanish
ok 77 - broadcast action labels are in Spanish
  ---
  duration_ms: 0.848508
  type: 'test'
  ...
# Subtest: composition scaling changes geometry without transform scaling text
ok 78 - composition scaling changes geometry without transform scaling text
  ---
  duration_ms: 2.291944
  type: 'test'
  ...
# Subtest: composition controls use clear Spanish labels
ok 79 - composition controls use clear Spanish labels
  ---
  duration_ms: 0.631688
  type: 'test'
  ...
# Subtest: gradient geometry provides complete bottom control
ok 80 - gradient geometry provides complete bottom control
  ---
  duration_ms: 2.187882
  type: 'test'
  ...
# Subtest: preview supports zoom, large view and fullscreen
ok 81 - preview supports zoom, large view and fullscreen
  ---
  duration_ms: 0.728277
  type: 'test'
  ...
# Subtest: ProPresenter connection has global persistent storage
ok 82 - ProPresenter connection has global persistent storage
  ---
  duration_ms: 0.190139
  type: 'test'
  ...
# Subtest: Preview tools are arranged in a horizontal toolbar
ok 83 - Preview tools are arranged in a horizontal toolbar
  ---
  duration_ms: 2.355328
  type: 'test'
  ...
# Subtest: simple visual editor supports drag, resize, snapping and history
ok 84 - simple visual editor supports drag, resize, snapping and history
  ---
  duration_ms: 0.779827
  type: 'test'
  ...
# Subtest: geometry adds horizontal offset without transforming typography
ok 85 - geometry adds horizontal offset without transforming typography
  ---
  duration_ms: 1.960608
  type: 'test'
  ...
# Subtest: panel styles suppress the classic gradient
ok 86 - panel styles suppress the classic gradient
  ---
  duration_ms: 2.135534
  type: 'test'
  ...
# Subtest: classic and worship retain intentional gradient rendering
ok 87 - classic and worship retain intentional gradient rendering
  ---
  duration_ms: 0.418174
  type: 'test'
  ...
# Subtest: panel styles receive composition shadows across formats
ok 88 - panel styles receive composition shadows across formats
  ---
  duration_ms: 0.375483
  type: 'test'
  ...
# Subtest: renderer identifies gradient and panel-shadow modes
ok 89 - renderer identifies gradient and panel-shadow modes
  ---
  duration_ms: 0.230465
  type: 'test'
  ...
# Subtest: normalizes a verse and creates a stable id
ok 90 - normalizes a verse and creates a stable id
  ---
  duration_ms: 1.184597
  type: 'test'
  ...
# Subtest: requires verse text
ok 91 - requires verse text
  ---
  duration_ms: 0.266602
  type: 'test'
  ...
# Subtest: stable id changes when content changes
ok 92 - stable id changes when content changes
  ---
  duration_ms: 0.136887
  type: 'test'
  ...
# Subtest: parses a Spanish Scripture reference
ok 93 - parses a Spanish Scripture reference
  ---
  duration_ms: 1.318299
  type: 'test'
  ...
# Subtest: extracts a reference from the first line
ok 94 - extracts a reference from the first line
  ---
  duration_ms: 0.586343
  type: 'test'
  ...
# Subtest: panel styles suppress the classic gradient
ok 95 - panel styles suppress the classic gradient
  ---
  duration_ms: 2.010844
  type: 'test'
  ...
# Subtest: classic and worship retain intentional gradient rendering
ok 96 - classic and worship retain intentional gradient rendering
  ---
  duration_ms: 0.441502
  type: 'test'
  ...
# Subtest: panel styles receive composition shadows across formats
ok 97 - panel styles receive composition shadows across formats
  ---
  duration_ms: 0.46862
  type: 'test'
  ...
# Subtest: renderer identifies gradient and panel-shadow modes
ok 98 - renderer identifies gradient and panel-shadow modes
  ---
  duration_ms: 0.324384
  type: 'test'
  ...
1..98
# tests 98
# suites 0
# pass 98
# fail 0
# cancelled 0
# skipped 0
# todo 0
# duration_ms 798.047852

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

## scene_engine_syntax
Exit code: 0

```text

```

