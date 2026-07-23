# Update 020 Validation

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
  duration_ms: 3.384567
  type: 'test'
  ...
# Subtest: editor animation playback uses requestAnimationFrame
ok 2 - editor animation playback uses requestAnimationFrame
  ---
  duration_ms: 1.884885
  type: 'test'
  ...
# Subtest: publishes a versioned event envelope
ok 3 - publishes a versioned event envelope
  ---
  duration_ms: 1.540323
  type: 'test'
  ...
# Subtest: registers and resolves a service
ok 4 - registers and resolves a service
  ---
  duration_ms: 0.736647
  type: 'test'
  ...
# Subtest: rejects duplicate registrations
ok 5 - rejects duplicate registrations
  ---
  duration_ms: 0.206047
  type: 'test'
  ...
# Subtest: normalizes an animation configuration
ok 6 - normalizes an animation configuration
  ---
  duration_ms: 0.734423
  type: 'test'
  ...
# Subtest: provides enter and exit animation defaults
ok 7 - provides enter and exit animation defaults
  ---
  duration_ms: 0.143553
  type: 'test'
  ...
# Subtest: creates slide keyframes
ok 8 - creates slide keyframes
  ---
  duration_ms: 0.301149
  type: 'test'
  ...
# Subtest: disabled animations produce no keyframes
ok 9 - disabled animations produce no keyframes
  ---
  duration_ms: 0.465263
  type: 'test'
  ...
# Subtest: lists built-in broadcast components
ok 10 - lists built-in broadcast components
  ---
  duration_ms: 1.005877
  type: 'test'
  ...
# Subtest: creates a Scripture component with shared component identity
ok 11 - creates a Scripture component with shared component identity
  ---
  duration_ms: 2.250039
  type: 'test'
  ...
# Subtest: creates a Lower Third component with live bindings
ok 12 - creates a Lower Third component with live bindings
  ---
  duration_ms: 0.388107
  type: 'test'
  ...
# Subtest: generic component factory rejects unknown components
ok 13 - generic component factory rejects unknown components
  ---
  duration_ms: 0.385474
  type: 'test'
  ...
# Subtest: gets nested values by path
ok 14 - gets nested values by path
  ---
  duration_ms: 0.723747
  type: 'test'
  ...
# Subtest: resolves single and double brace tokens
ok 15 - resolves single and double brace tokens
  ---
  duration_ms: 0.215261
  type: 'test'
  ...
# Subtest: resolves binding text elements without mutating source
ok 16 - resolves binding text elements without mutating source
  ---
  duration_ms: 0.190553
  type: 'test'
  ...
# Subtest: resolves documents and lists tokens
ok 17 - resolves documents and lists tokens
  ---
  duration_ms: 0.592271
  type: 'test'
  ...
# Subtest: creates normalized text elements
ok 18 - creates normalized text elements
  ---
  duration_ms: 1.983402
  type: 'test'
  ...
# Subtest: updates and removes elements immutably
ok 19 - updates and removes elements immutably
  ---
  duration_ms: 0.424301
  type: 'test'
  ...
# Subtest: reorders layers
ok 20 - reorders layers
  ---
  duration_ms: 0.608325
  type: 'test'
  ...
# Subtest: normalization preserves grouping metadata
ok 21 - normalization preserves grouping metadata
  ---
  duration_ms: 0.757698
  type: 'test'
  ...
# Subtest: undoes and redoes document commits
ok 22 - undoes and redoes document commits
  ---
  duration_ms: 0.682155
  type: 'test'
  ...
# Subtest: creates and categorizes templates
ok 23 - creates and categorizes templates
  ---
  duration_ms: 2.099224
  type: 'test'
  ...
# Subtest: duplicates templates with a new identity
ok 24 - duplicates templates with a new identity
  ---
  duration_ms: 0.243583
  type: 'test'
  ...
# Subtest: instantiates templates with new element and group ids
ok 25 - instantiates templates with new element and group ids
  ---
  duration_ms: 0.451262
  type: 'test'
  ...
# Subtest: updates metadata without replacing the stored document
ok 26 - updates metadata without replacing the stored document
  ---
  duration_ms: 0.222942
  type: 'test'
  ...
# Subtest: Scripture defaults to manual source
ok 27 - Scripture defaults to manual source
  ---
  duration_ms: 0.582877
  type: 'test'
  ...
# Subtest: ProPresenter settings are globally available
ok 28 - ProPresenter settings are globally available
  ---
  duration_ms: 0.11414
  type: 'test'
  ...
# Subtest: Smart Flyer defaults to assisted automation
ok 29 - Smart Flyer defaults to assisted automation
  ---
  duration_ms: 0.098647
  type: 'test'
  ...
# Subtest: builds manual scripture context
ok 30 - builds manual scripture context
  ---
  duration_ms: 0.78576
  type: 'test'
  ...
# Subtest: uses ProPresenter scripture when selected
ok 31 - uses ProPresenter scripture when selected
  ---
  duration_ms: 0.296462
  type: 'test'
  ...
# Subtest: reads the official status and presentation endpoints
ok 32 - reads the official status and presentation endpoints
  ---
  duration_ms: 2.615013
  type: 'test'
  ...
# Subtest: does not emit a duplicate verse
ok 33 - does not emit a duplicate verse
  ---
  duration_ms: 0.800521
  type: 'test'
  ...
# Subtest: starts disabled by default
ok 34 - starts disabled by default
  ---
  duration_ms: 0.818167
  type: 'test'
  ...
# Subtest: validates port range
ok 35 - validates port range
  ---
  duration_ms: 0.277944
  type: 'test'
  ...
# Subtest: publishes normalized ProPresenter media events
ok 36 - publishes normalized ProPresenter media events
  ---
  duration_ms: 0.513955
  type: 'test'
  ...
# {"timestamp":"2026-07-23T04:46:09.365Z","level":"INFO","scope":"test","message":"Connecting to ProPresenter","context":{"host":"127.0.0.1","port":1025,"protocol":"tcp"}}
# Subtest: tests the connection through the documented system-time endpoint
ok 37 - tests the connection through the documented system-time endpoint
  ---
  duration_ms: 0.886669
  type: 'test'
  ...
# Subtest: connects and subscribes configured streaming endpoints
ok 38 - connects and subscribes configured streaming endpoints
  ---
  duration_ms: 1.814411
  type: 'test'
  ...
# Subtest: normalizes a ProPresenter Scripture payload
ok 39 - normalizes a ProPresenter Scripture payload
  ---
  duration_ms: 1.33043
  type: 'test'
  ...
# Subtest: uses newline-delimited JSON for a real TCP request
ok 40 - uses newline-delimited JSON for a real TCP request
  ---
  duration_ms: 11.349662
  type: 'test'
  ...
# Subtest: receives chunked streaming messages
ok 41 - receives chunked streaming messages
  ---
  duration_ms: 43.431083
  type: 'test'
  ...
# Subtest: applies capped exponential backoff
ok 42 - applies capped exponential backoff
  ---
  duration_ms: 1.008772
  type: 'test'
  ...
# Subtest: normalizes a common current slide payload
ok 43 - normalizes a common current slide payload
  ---
  duration_ms: 1.992886
  type: 'test'
  ...
# Subtest: supports snake case response variants
ok 44 - supports snake case response variants
  ---
  duration_ms: 0.362369
  type: 'test'
  ...
# Subtest: balances text into visually similar lines
ok 45 - balances text into visually similar lines
  ---
  duration_ms: 0.963865
  type: 'test'
  ...
# Subtest: penalizes a one-word final line when a better partition exists
ok 46 - penalizes a one-word final line when a better partition exists
  ---
  duration_ms: 1.355197
  type: 'test'
  ...
# Subtest: reports overflow when minimum font still exceeds the box
ok 47 - reports overflow when minimum font still exceeds the box
  ---
  duration_ms: 0.249421
  type: 'test'
  ...
# Subtest: Scripture includes a default simple-mode design
ok 48 - Scripture includes a default simple-mode design
  ---
  duration_ms: 0.582287
  type: 'test'
  ...
# Subtest: Scripture broadcast state starts safely off air
ok 49 - Scripture broadcast state starts safely off air
  ---
  duration_ms: 0.16843
  type: 'test'
  ...
# Subtest: publishes verse and program events
ok 50 - publishes verse and program events
  ---
  duration_ms: 2.833748
  type: 'test'
  ...
# Subtest: does not mark identical normalized content as changed
ok 51 - does not mark identical normalized content as changed
  ---
  duration_ms: 0.307107
  type: 'test'
  ...
# Subtest: preview iframe is not hidden behind a ready-message race
ok 52 - preview iframe is not hidden behind a ready-message race
  ---
  duration_ms: 0.876114
  type: 'test'
  ...
# Subtest: lateral padding overrides every Scripture format
ok 53 - lateral padding overrides every Scripture format
  ---
  duration_ms: 0.491041
  type: 'test'
  ...
# Subtest: text fitting performs real rendered candidate measurements
ok 54 - text fitting performs real rendered candidate measurements
  ---
  duration_ms: 0.253357
  type: 'test'
  ...
# Subtest: preview initialization cannot abort the whole app
ok 55 - preview initialization cannot abort the whole app
  ---
  duration_ms: 1.351001
  type: 'test'
  ...
# Subtest: saved Scripture state is deeply hydrated
ok 56 - saved Scripture state is deeply hydrated
  ---
  duration_ms: 0.190684
  type: 'test'
  ...
# Subtest: restores original Scripture geometry
ok 57 - restores original Scripture geometry
  ---
  duration_ms: 0.565912
  type: 'test'
  ...
# Subtest: restores writing and contextual transitions
ok 58 - restores writing and contextual transitions
  ---
  duration_ms: 0.104896
  type: 'test'
  ...
# Subtest: restores gradient and typography
ok 59 - restores gradient and typography
  ---
  duration_ms: 0.09433
  type: 'test'
  ...
# Subtest: Scripture restores the original template and format defaults
ok 60 - Scripture restores the original template and format defaults
  ---
  duration_ms: 0.565401
  type: 'test'
  ...
# Subtest: Appearance and animation configuration have usable defaults
ok 61 - Appearance and animation configuration have usable defaults
  ---
  duration_ms: 0.213778
  type: 'test'
  ...
# Subtest: ScriptureStateStore serializes concurrent changes
ok 62 - ScriptureStateStore serializes concurrent changes
  ---
  duration_ms: 10.25261
  type: 'test'
  ...
# Subtest: Preview and Program share the same persisted state
ok 63 - Preview and Program share the same persisted state
  ---
  duration_ms: 0.956333
  type: 'test'
  ...
# Subtest: mergeScripturePatch preserves unrelated nested fields
ok 64 - mergeScripturePatch preserves unrelated nested fields
  ---
  duration_ms: 0.174399
  type: 'test'
  ...
# Subtest: TV Broadcast CG is available in the advanced template library
ok 65 - TV Broadcast CG is available in the advanced template library
  ---
  duration_ms: 1.580983
  type: 'test'
  ...
# Subtest: Scripture output contains the robust fitting engine
ok 66 - Scripture output contains the robust fitting engine
  ---
  duration_ms: 0.249421
  type: 'test'
  ...
# Subtest: Preview uses one scaled 1920 by 1080 stage
ok 67 - Preview uses one scaled 1920 by 1080 stage
  ---
  duration_ms: 0.337883
  type: 'test'
  ...
# Subtest: preview iframe preserves a 1920 by 1080 viewport
ok 68 - preview iframe preserves a 1920 by 1080 viewport
  ---
  duration_ms: 1.894064
  type: 'test'
  ...
# Subtest: overlay no longer polls and rerenders every two seconds
ok 69 - overlay no longer polls and rerenders every two seconds
  ---
  duration_ms: 0.326366
  type: 'test'
  ...
# Subtest: signature excludes volatile ProPresenter timestamps
ok 70 - signature excludes volatile ProPresenter timestamps
  ---
  duration_ms: 0.182762
  type: 'test'
  ...
# Subtest: verse width follows configured lateral padding without a legacy cap
ok 71 - verse width follows configured lateral padding without a legacy cap
  ---
  duration_ms: 0.409049
  type: 'test'
  ...
# Subtest: text fitting has no horizontal compression floor
ok 72 - text fitting has no horizontal compression floor
  ---
  duration_ms: 0.318233
  type: 'test'
  ...
# Subtest: Scripture menu is named Plantillas
ok 73 - Scripture menu is named Plantillas
  ---
  duration_ms: 1.647993
  type: 'test'
  ...
# Subtest: editor uses revisioned Scripture state
ok 74 - editor uses revisioned Scripture state
  ---
  duration_ms: 0.287739
  type: 'test'
  ...
# Subtest: Browser Output reads one atomic snapshot
ok 75 - Browser Output reads one atomic snapshot
  ---
  duration_ms: 0.166989
  type: 'test'
  ...
# Subtest: normalizes a verse and creates a stable id
ok 76 - normalizes a verse and creates a stable id
  ---
  duration_ms: 1.09525
  type: 'test'
  ...
# Subtest: requires verse text
ok 77 - requires verse text
  ---
  duration_ms: 0.204184
  type: 'test'
  ...
# Subtest: stable id changes when content changes
ok 78 - stable id changes when content changes
  ---
  duration_ms: 0.139478
  type: 'test'
  ...
# Subtest: parses a Spanish Scripture reference
ok 79 - parses a Spanish Scripture reference
  ---
  duration_ms: 1.388537
  type: 'test'
  ...
# Subtest: extracts a reference from the first line
ok 80 - extracts a reference from the first line
  ---
  duration_ms: 1.285523
  type: 'test'
  ...
1..80
# tests 80
# suites 0
# pass 80
# fail 0
# cancelled 0
# skipped 0
# todo 0
# duration_ms 535.316044

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

## store_syntax
Exit code: 0

```text

```

## runtime_http_and_state
Exit code: 0

```text
200 http://127.0.0.1:4173/ (26595 bytes)
200 http://127.0.0.1:4173/app.js (25024 bytes)
200 http://127.0.0.1:4173/overlay/scripture?preview=1 (561 bytes)
200 http://127.0.0.1:4173/api/app-state (4685 bytes)
200 http://127.0.0.1:4173/api/scripture/program (64 bytes)
200 http://127.0.0.1:4173/api/scripture/snapshot (1363 bytes)
200 http://127.0.0.1:4173/api/scripture/diagnostics (317 bytes)
MUTATION revision=1 design=tv padding=133
READBACK revision=1 design=tv padding=133
```

