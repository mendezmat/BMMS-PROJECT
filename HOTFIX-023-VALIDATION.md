# BMMS Hotfix 023 Validation

## repository_check
Exit code: 0

```text
BMMS repository check passed.

```

## tests
Exit code: 1

```text
TAP version 13
# Subtest: animation preview controls are connected
ok 1 - animation preview controls are connected
  ---
  duration_ms: 3.424998
  type: 'test'
  ...
# Subtest: editor animation playback uses requestAnimationFrame
ok 2 - editor animation playback uses requestAnimationFrame
  ---
  duration_ms: 1.335187
  type: 'test'
  ...
# Subtest: publishes a versioned event envelope
ok 3 - publishes a versioned event envelope
  ---
  duration_ms: 1.626371
  type: 'test'
  ...
# Subtest: registers and resolves a service
ok 4 - registers and resolves a service
  ---
  duration_ms: 0.58454
  type: 'test'
  ...
# Subtest: rejects duplicate registrations
ok 5 - rejects duplicate registrations
  ---
  duration_ms: 0.260998
  type: 'test'
  ...
# Subtest: normalizes an animation configuration
ok 6 - normalizes an animation configuration
  ---
  duration_ms: 0.67853
  type: 'test'
  ...
# Subtest: provides enter and exit animation defaults
ok 7 - provides enter and exit animation defaults
  ---
  duration_ms: 0.133328
  type: 'test'
  ...
# Subtest: creates slide keyframes
ok 8 - creates slide keyframes
  ---
  duration_ms: 0.353817
  type: 'test'
  ...
# Subtest: disabled animations produce no keyframes
ok 9 - disabled animations produce no keyframes
  ---
  duration_ms: 0.451542
  type: 'test'
  ...
# Subtest: lists built-in broadcast components
ok 10 - lists built-in broadcast components
  ---
  duration_ms: 1.031755
  type: 'test'
  ...
# Subtest: creates a Scripture component with shared component identity
ok 11 - creates a Scripture component with shared component identity
  ---
  duration_ms: 1.641773
  type: 'test'
  ...
# Subtest: creates a Lower Third component with live bindings
ok 12 - creates a Lower Third component with live bindings
  ---
  duration_ms: 0.341048
  type: 'test'
  ...
# Subtest: generic component factory rejects unknown components
ok 13 - generic component factory rejects unknown components
  ---
  duration_ms: 0.307928
  type: 'test'
  ...
# Subtest: gets nested values by path
ok 14 - gets nested values by path
  ---
  duration_ms: 0.648445
  type: 'test'
  ...
# Subtest: resolves single and double brace tokens
ok 15 - resolves single and double brace tokens
  ---
  duration_ms: 0.208841
  type: 'test'
  ...
# Subtest: resolves binding text elements without mutating source
ok 16 - resolves binding text elements without mutating source
  ---
  duration_ms: 0.195481
  type: 'test'
  ...
# Subtest: resolves documents and lists tokens
ok 17 - resolves documents and lists tokens
  ---
  duration_ms: 0.634254
  type: 'test'
  ...
# Subtest: creates normalized text elements
ok 18 - creates normalized text elements
  ---
  duration_ms: 2.120827
  type: 'test'
  ...
# Subtest: updates and removes elements immutably
ok 19 - updates and removes elements immutably
  ---
  duration_ms: 0.408308
  type: 'test'
  ...
# Subtest: reorders layers
ok 20 - reorders layers
  ---
  duration_ms: 0.609197
  type: 'test'
  ...
# Subtest: normalization preserves grouping metadata
ok 21 - normalization preserves grouping metadata
  ---
  duration_ms: 0.710577
  type: 'test'
  ...
# Subtest: undoes and redoes document commits
ok 22 - undoes and redoes document commits
  ---
  duration_ms: 0.92731
  type: 'test'
  ...
# Subtest: creates and categorizes templates
ok 23 - creates and categorizes templates
  ---
  duration_ms: 2.064143
  type: 'test'
  ...
# Subtest: duplicates templates with a new identity
ok 24 - duplicates templates with a new identity
  ---
  duration_ms: 0.237163
  type: 'test'
  ...
# Subtest: instantiates templates with new element and group ids
ok 25 - instantiates templates with new element and group ids
  ---
  duration_ms: 0.326396
  type: 'test'
  ...
# Subtest: updates metadata without replacing the stored document
ok 26 - updates metadata without replacing the stored document
  ---
  duration_ms: 0.170594
  type: 'test'
  ...
# Subtest: Scripture defaults to manual source
ok 27 - Scripture defaults to manual source
  ---
  duration_ms: 0.560244
  type: 'test'
  ...
# Subtest: ProPresenter settings are globally available
ok 28 - ProPresenter settings are globally available
  ---
  duration_ms: 0.106278
  type: 'test'
  ...
# Subtest: Smart Flyer defaults to assisted automation
ok 29 - Smart Flyer defaults to assisted automation
  ---
  duration_ms: 0.135442
  type: 'test'
  ...
# Subtest: builds manual scripture context
ok 30 - builds manual scripture context
  ---
  duration_ms: 1.195108
  type: 'test'
  ...
# Subtest: uses ProPresenter scripture when selected
ok 31 - uses ProPresenter scripture when selected
  ---
  duration_ms: 0.484681
  type: 'test'
  ...
# Subtest: reads the official status and presentation endpoints
ok 32 - reads the official status and presentation endpoints
  ---
  duration_ms: 2.656314
  type: 'test'
  ...
# Subtest: does not emit a duplicate verse
ok 33 - does not emit a duplicate verse
  ---
  duration_ms: 0.69218
  type: 'test'
  ...
# Subtest: starts disabled by default
ok 34 - starts disabled by default
  ---
  duration_ms: 0.771709
  type: 'test'
  ...
# Subtest: validates port range
ok 35 - validates port range
  ---
  duration_ms: 0.272836
  type: 'test'
  ...
# Subtest: publishes normalized ProPresenter media events
ok 36 - publishes normalized ProPresenter media events
  ---
  duration_ms: 0.499043
  type: 'test'
  ...
# {"timestamp":"2026-07-23T05:33:35.022Z","level":"INFO","scope":"test","message":"Connecting to ProPresenter","context":{"host":"127.0.0.1","port":1025,"protocol":"tcp"}}
# Subtest: tests the connection through the documented system-time endpoint
ok 37 - tests the connection through the documented system-time endpoint
  ---
  duration_ms: 0.895443
  type: 'test'
  ...
# Subtest: connects and subscribes configured streaming endpoints
ok 38 - connects and subscribes configured streaming endpoints
  ---
  duration_ms: 1.891806
  type: 'test'
  ...
# Subtest: normalizes a ProPresenter Scripture payload
ok 39 - normalizes a ProPresenter Scripture payload
  ---
  duration_ms: 1.317641
  type: 'test'
  ...
# Subtest: uses newline-delimited JSON for a real TCP request
ok 40 - uses newline-delimited JSON for a real TCP request
  ---
  duration_ms: 12.379966
  type: 'test'
  ...
# Subtest: receives chunked streaming messages
ok 41 - receives chunked streaming messages
  ---
  duration_ms: 42.664502
  type: 'test'
  ...
# Subtest: applies capped exponential backoff
ok 42 - applies capped exponential backoff
  ---
  duration_ms: 0.986948
  type: 'test'
  ...
# Subtest: normalizes a common current slide payload
ok 43 - normalizes a common current slide payload
  ---
  duration_ms: 2.024183
  type: 'test'
  ...
# Subtest: supports snake case response variants
ok 44 - supports snake case response variants
  ---
  duration_ms: 0.384262
  type: 'test'
  ...
# Subtest: balances text into visually similar lines
ok 45 - balances text into visually similar lines
  ---
  duration_ms: 0.937706
  type: 'test'
  ...
# Subtest: penalizes a one-word final line when a better partition exists
ok 46 - penalizes a one-word final line when a better partition exists
  ---
  duration_ms: 1.408126
  type: 'test'
  ...
# Subtest: reports overflow when minimum font still exceeds the box
ok 47 - reports overflow when minimum font still exceeds the box
  ---
  duration_ms: 0.220288
  type: 'test'
  ...
# Subtest: Scripture includes a default simple-mode design
ok 48 - Scripture includes a default simple-mode design
  ---
  duration_ms: 0.577209
  type: 'test'
  ...
# Subtest: Scripture broadcast state starts safely off air
ok 49 - Scripture broadcast state starts safely off air
  ---
  duration_ms: 0.170944
  type: 'test'
  ...
# Subtest: publishes verse and program events
ok 50 - publishes verse and program events
  ---
  duration_ms: 1.859238
  type: 'test'
  ...
# Subtest: does not mark identical normalized content as changed
ok 51 - does not mark identical normalized content as changed
  ---
  duration_ms: 2.023617
  type: 'test'
  ...
# Subtest: preview iframe is not hidden behind a ready-message race
ok 52 - preview iframe is not hidden behind a ready-message race
  ---
  duration_ms: 0.77911
  type: 'test'
  ...
# Subtest: lateral padding overrides every Scripture format
ok 53 - lateral padding overrides every Scripture format
  ---
  duration_ms: 0.430541
  type: 'test'
  ...
# Subtest: text fitting performs real rendered candidate measurements
ok 54 - text fitting performs real rendered candidate measurements
  ---
  duration_ms: 0.189392
  type: 'test'
  ...
# Subtest: preview initialization cannot abort the whole app
ok 55 - preview initialization cannot abort the whole app
  ---
  duration_ms: 1.533392
  type: 'test'
  ...
# Subtest: saved Scripture state is deeply hydrated
ok 56 - saved Scripture state is deeply hydrated
  ---
  duration_ms: 0.210433
  type: 'test'
  ...
# Subtest: restores original Scripture geometry
ok 57 - restores original Scripture geometry
  ---
  duration_ms: 0.710848
  type: 'test'
  ...
# Subtest: restores writing and contextual transitions
ok 58 - restores writing and contextual transitions
  ---
  duration_ms: 0.162292
  type: 'test'
  ...
# Subtest: restores gradient and typography
not ok 59 - restores gradient and typography
  ---
  duration_ms: 0.921161
  type: 'test'
  location: '/mnt/data/bmms-hotfix-023/BMMS-PROJECT/tests/scripture-core/scripture-restoration.test.js:1:712'
  failureType: 'testCodeFailure'
  error: |-
    Expected values to be strictly equal:
    
    72 !== 36
    
  code: 'ERR_ASSERTION'
  name: 'AssertionError'
  expected: 36
  actual: 72
  operator: 'strictEqual'
  stack: |-
    TestContext.<anonymous> (file:///mnt/data/bmms-hotfix-023/BMMS-PROJECT/tests/scripture-core/scripture-restoration.test.js:1:903)
    Test.runInAsyncScope (node:async_hooks:214:14)
    Test.run (node:internal/test_runner/test:1047:25)
    Test.processPendingSubtests (node:internal/test_runner/test:744:18)
    Test.postRun (node:internal/test_runner/test:1173:19)
    Test.run (node:internal/test_runner/test:1101:12)
    async Test.processPendingSubtests (node:internal/test_runner/test:744:7)
  ...
# Subtest: Scripture restores the original template and format defaults
ok 60 - Scripture restores the original template and format defaults
  ---
  duration_ms: 0.539483
  type: 'test'
  ...
# Subtest: Appearance and animation configuration have usable defaults
ok 61 - Appearance and animation configuration have usable defaults
  ---
  duration_ms: 0.210012
  type: 'test'
  ...
# Subtest: TV Broadcast CG is available in the advanced template library
ok 62 - TV Broadcast CG is available in the advanced template library
  ---
  duration_ms: 1.605369
  type: 'test'
  ...
# Subtest: Scripture output contains the robust fitting engine
ok 63 - Scripture output contains the robust fitting engine
  ---
  duration_ms: 0.257202
  type: 'test'
  ...
# Subtest: Preview uses one scaled 1920 by 1080 stage
ok 64 - Preview uses one scaled 1920 by 1080 stage
  ---
  duration_ms: 0.298995
  type: 'test'
  ...
# Subtest: preview iframe preserves a 1920 by 1080 viewport
ok 65 - preview iframe preserves a 1920 by 1080 viewport
  ---
  duration_ms: 1.523648
  type: 'test'
  ...
# Subtest: overlay no longer polls and rerenders every two seconds
ok 66 - overlay no longer polls and rerenders every two seconds
  ---
  duration_ms: 0.234259
  type: 'test'
  ...
# Subtest: signature excludes volatile ProPresenter timestamps
ok 67 - signature excludes volatile ProPresenter timestamps
  ---
  duration_ms: 0.171215
  type: 'test'
  ...
# Subtest: verse width follows configured lateral padding without a legacy cap
ok 68 - verse width follows configured lateral padding without a legacy cap
  ---
  duration_ms: 0.326727
  type: 'test'
  ...
# Subtest: verse size is authoritative and is never silently reduced
ok 69 - verse size is authoritative and is never silently reduced
  ---
  duration_ms: 0.292736
  type: 'test'
  ...
# Subtest: normalizes a verse and creates a stable id
ok 70 - normalizes a verse and creates a stable id
  ---
  duration_ms: 1.216911
  type: 'test'
  ...
# Subtest: requires verse text
ok 71 - requires verse text
  ---
  duration_ms: 0.452654
  type: 'test'
  ...
# Subtest: stable id changes when content changes
ok 72 - stable id changes when content changes
  ---
  duration_ms: 0.14135
  type: 'test'
  ...
# Subtest: parses a Spanish Scripture reference
ok 73 - parses a Spanish Scripture reference
  ---
  duration_ms: 1.247597
  type: 'test'
  ...
# Subtest: extracts a reference from the first line
ok 74 - extracts a reference from the first line
  ---
  duration_ms: 0.454697
  type: 'test'
  ...
1..74
# tests 74
# suites 0
# pass 73
# fail 1
# cancelled 0
# skipped 0
# todo 0
# duration_ms 503.775549

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

## runtime_api_flows
Exit code: 0

```text
Configured bodySize: 104 px
Manual Preview: 200
ProPresenter simulator: 200
GET /scripture-overlay.js: 200 (17658 bytes)
GET /scripture-overlay.css: 200 (47271 bytes)
GET /overlay/scripture?preview=1: 200 (561 bytes)
```


# Final validation rerun

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
  duration_ms: 3.529353
  type: 'test'
  ...
# Subtest: editor animation playback uses requestAnimationFrame
ok 2 - editor animation playback uses requestAnimationFrame
  ---
  duration_ms: 1.188088
  type: 'test'
  ...
# Subtest: publishes a versioned event envelope
ok 3 - publishes a versioned event envelope
  ---
  duration_ms: 1.391691
  type: 'test'
  ...
# Subtest: registers and resolves a service
ok 4 - registers and resolves a service
  ---
  duration_ms: 0.594044
  type: 'test'
  ...
# Subtest: rejects duplicate registrations
ok 5 - rejects duplicate registrations
  ---
  duration_ms: 0.204795
  type: 'test'
  ...
# Subtest: normalizes an animation configuration
ok 6 - normalizes an animation configuration
  ---
  duration_ms: 0.676157
  type: 'test'
  ...
# Subtest: provides enter and exit animation defaults
ok 7 - provides enter and exit animation defaults
  ---
  duration_ms: 0.132978
  type: 'test'
  ...
# Subtest: creates slide keyframes
ok 8 - creates slide keyframes
  ---
  duration_ms: 0.290583
  type: 'test'
  ...
# Subtest: disabled animations produce no keyframes
ok 9 - disabled animations produce no keyframes
  ---
  duration_ms: 0.461758
  type: 'test'
  ...
# Subtest: lists built-in broadcast components
ok 10 - lists built-in broadcast components
  ---
  duration_ms: 1.057734
  type: 'test'
  ...
# Subtest: creates a Scripture component with shared component identity
ok 11 - creates a Scripture component with shared component identity
  ---
  duration_ms: 2.317349
  type: 'test'
  ...
# Subtest: creates a Lower Third component with live bindings
ok 12 - creates a Lower Third component with live bindings
  ---
  duration_ms: 0.347377
  type: 'test'
  ...
# Subtest: generic component factory rejects unknown components
ok 13 - generic component factory rejects unknown components
  ---
  duration_ms: 0.328228
  type: 'test'
  ...
# Subtest: gets nested values by path
ok 14 - gets nested values by path
  ---
  duration_ms: 0.705309
  type: 'test'
  ...
# Subtest: resolves single and double brace tokens
ok 15 - resolves single and double brace tokens
  ---
  duration_ms: 0.207539
  type: 'test'
  ...
# Subtest: resolves binding text elements without mutating source
ok 16 - resolves binding text elements without mutating source
  ---
  duration_ms: 0.196292
  type: 'test'
  ...
# Subtest: resolves documents and lists tokens
ok 17 - resolves documents and lists tokens
  ---
  duration_ms: 0.59173
  type: 'test'
  ...
# Subtest: creates normalized text elements
ok 18 - creates normalized text elements
  ---
  duration_ms: 2.039055
  type: 'test'
  ...
# Subtest: updates and removes elements immutably
ok 19 - updates and removes elements immutably
  ---
  duration_ms: 0.394747
  type: 'test'
  ...
# Subtest: reorders layers
ok 20 - reorders layers
  ---
  duration_ms: 0.591831
  type: 'test'
  ...
# Subtest: normalization preserves grouping metadata
ok 21 - normalization preserves grouping metadata
  ---
  duration_ms: 0.733031
  type: 'test'
  ...
# Subtest: undoes and redoes document commits
ok 22 - undoes and redoes document commits
  ---
  duration_ms: 0.810006
  type: 'test'
  ...
# Subtest: creates and categorizes templates
ok 23 - creates and categorizes templates
  ---
  duration_ms: 2.090371
  type: 'test'
  ...
# Subtest: duplicates templates with a new identity
ok 24 - duplicates templates with a new identity
  ---
  duration_ms: 0.23505
  type: 'test'
  ...
# Subtest: instantiates templates with new element and group ids
ok 25 - instantiates templates with new element and group ids
  ---
  duration_ms: 0.407917
  type: 'test'
  ...
# Subtest: updates metadata without replacing the stored document
ok 26 - updates metadata without replacing the stored document
  ---
  duration_ms: 0.188841
  type: 'test'
  ...
# Subtest: Scripture defaults to manual source
ok 27 - Scripture defaults to manual source
  ---
  duration_ms: 0.565842
  type: 'test'
  ...
# Subtest: ProPresenter settings are globally available
ok 28 - ProPresenter settings are globally available
  ---
  duration_ms: 0.124435
  type: 'test'
  ...
# Subtest: Smart Flyer defaults to assisted automation
ok 29 - Smart Flyer defaults to assisted automation
  ---
  duration_ms: 0.104706
  type: 'test'
  ...
# Subtest: builds manual scripture context
ok 30 - builds manual scripture context
  ---
  duration_ms: 0.709676
  type: 'test'
  ...
# Subtest: uses ProPresenter scripture when selected
ok 31 - uses ProPresenter scripture when selected
  ---
  duration_ms: 0.32297
  type: 'test'
  ...
# Subtest: reads the official status and presentation endpoints
ok 32 - reads the official status and presentation endpoints
  ---
  duration_ms: 3.024121
  type: 'test'
  ...
# Subtest: does not emit a duplicate verse
ok 33 - does not emit a duplicate verse
  ---
  duration_ms: 0.901692
  type: 'test'
  ...
# Subtest: starts disabled by default
ok 34 - starts disabled by default
  ---
  duration_ms: 0.791508
  type: 'test'
  ...
# Subtest: validates port range
ok 35 - validates port range
  ---
  duration_ms: 0.28187
  type: 'test'
  ...
# Subtest: publishes normalized ProPresenter media events
ok 36 - publishes normalized ProPresenter media events
  ---
  duration_ms: 0.510339
  type: 'test'
  ...
# {"timestamp":"2026-07-23T05:34:01.924Z","level":"INFO","scope":"test","message":"Connecting to ProPresenter","context":{"host":"127.0.0.1","port":1025,"protocol":"tcp"}}
# Subtest: tests the connection through the documented system-time endpoint
ok 37 - tests the connection through the documented system-time endpoint
  ---
  duration_ms: 0.90046
  type: 'test'
  ...
# Subtest: connects and subscribes configured streaming endpoints
ok 38 - connects and subscribes configured streaming endpoints
  ---
  duration_ms: 1.795773
  type: 'test'
  ...
# Subtest: normalizes a ProPresenter Scripture payload
ok 39 - normalizes a ProPresenter Scripture payload
  ---
  duration_ms: 1.665969
  type: 'test'
  ...
# Subtest: uses newline-delimited JSON for a real TCP request
ok 40 - uses newline-delimited JSON for a real TCP request
  ---
  duration_ms: 12.150074
  type: 'test'
  ...
# Subtest: receives chunked streaming messages
ok 41 - receives chunked streaming messages
  ---
  duration_ms: 44.845648
  type: 'test'
  ...
# Subtest: applies capped exponential backoff
ok 42 - applies capped exponential backoff
  ---
  duration_ms: 1.08132
  type: 'test'
  ...
# Subtest: normalizes a common current slide payload
ok 43 - normalizes a common current slide payload
  ---
  duration_ms: 1.9277
  type: 'test'
  ...
# Subtest: supports snake case response variants
ok 44 - supports snake case response variants
  ---
  duration_ms: 0.343151
  type: 'test'
  ...
# Subtest: balances text into visually similar lines
ok 45 - balances text into visually similar lines
  ---
  duration_ms: 0.946569
  type: 'test'
  ...
# Subtest: penalizes a one-word final line when a better partition exists
ok 46 - penalizes a one-word final line when a better partition exists
  ---
  duration_ms: 1.270821
  type: 'test'
  ...
# Subtest: reports overflow when minimum font still exceeds the box
ok 47 - reports overflow when minimum font still exceeds the box
  ---
  duration_ms: 0.219446
  type: 'test'
  ...
# Subtest: Scripture includes a default simple-mode design
ok 48 - Scripture includes a default simple-mode design
  ---
  duration_ms: 0.581706
  type: 'test'
  ...
# Subtest: Scripture broadcast state starts safely off air
ok 49 - Scripture broadcast state starts safely off air
  ---
  duration_ms: 0.176002
  type: 'test'
  ...
# Subtest: publishes verse and program events
ok 50 - publishes verse and program events
  ---
  duration_ms: 1.819097
  type: 'test'
  ...
# Subtest: does not mark identical normalized content as changed
ok 51 - does not mark identical normalized content as changed
  ---
  duration_ms: 1.129982
  type: 'test'
  ...
# Subtest: preview iframe is not hidden behind a ready-message race
ok 52 - preview iframe is not hidden behind a ready-message race
  ---
  duration_ms: 0.760291
  type: 'test'
  ...
# Subtest: lateral padding overrides every Scripture format
ok 53 - lateral padding overrides every Scripture format
  ---
  duration_ms: 0.467326
  type: 'test'
  ...
# Subtest: text fitting performs real rendered candidate measurements
ok 54 - text fitting performs real rendered candidate measurements
  ---
  duration_ms: 0.192878
  type: 'test'
  ...
# Subtest: preview initialization cannot abort the whole app
ok 55 - preview initialization cannot abort the whole app
  ---
  duration_ms: 1.489677
  type: 'test'
  ...
# Subtest: saved Scripture state is deeply hydrated
ok 56 - saved Scripture state is deeply hydrated
  ---
  duration_ms: 0.260388
  type: 'test'
  ...
# Subtest: restores original Scripture geometry
ok 57 - restores original Scripture geometry
  ---
  duration_ms: 0.605782
  type: 'test'
  ...
# Subtest: restores writing and contextual transitions
ok 58 - restores writing and contextual transitions
  ---
  duration_ms: 0.11442
  type: 'test'
  ...
# Subtest: restores gradient and typography
ok 59 - restores gradient and typography
  ---
  duration_ms: 0.096164
  type: 'test'
  ...
# Subtest: Scripture restores the original template and format defaults
ok 60 - Scripture restores the original template and format defaults
  ---
  duration_ms: 0.542027
  type: 'test'
  ...
# Subtest: Appearance and animation configuration have usable defaults
ok 61 - Appearance and animation configuration have usable defaults
  ---
  duration_ms: 0.216131
  type: 'test'
  ...
# Subtest: TV Broadcast CG is available in the advanced template library
ok 62 - TV Broadcast CG is available in the advanced template library
  ---
  duration_ms: 1.641744
  type: 'test'
  ...
# Subtest: Scripture output contains the robust fitting engine
ok 63 - Scripture output contains the robust fitting engine
  ---
  duration_ms: 0.277964
  type: 'test'
  ...
# Subtest: Preview uses one scaled 1920 by 1080 stage
ok 64 - Preview uses one scaled 1920 by 1080 stage
  ---
  duration_ms: 0.294889
  type: 'test'
  ...
# Subtest: preview iframe preserves a 1920 by 1080 viewport
ok 65 - preview iframe preserves a 1920 by 1080 viewport
  ---
  duration_ms: 1.653541
  type: 'test'
  ...
# Subtest: overlay no longer polls and rerenders every two seconds
ok 66 - overlay no longer polls and rerenders every two seconds
  ---
  duration_ms: 0.267648
  type: 'test'
  ...
# Subtest: signature excludes volatile ProPresenter timestamps
ok 67 - signature excludes volatile ProPresenter timestamps
  ---
  duration_ms: 0.219888
  type: 'test'
  ...
# Subtest: verse width follows configured lateral padding without a legacy cap
ok 68 - verse width follows configured lateral padding without a legacy cap
  ---
  duration_ms: 0.355069
  type: 'test'
  ...
# Subtest: verse size is authoritative and is never silently reduced
ok 69 - verse size is authoritative and is never silently reduced
  ---
  duration_ms: 0.31576
  type: 'test'
  ...
# Subtest: normalizes a verse and creates a stable id
ok 70 - normalizes a verse and creates a stable id
  ---
  duration_ms: 1.044835
  type: 'test'
  ...
# Subtest: requires verse text
ok 71 - requires verse text
  ---
  duration_ms: 0.275841
  type: 'test'
  ...
# Subtest: stable id changes when content changes
ok 72 - stable id changes when content changes
  ---
  duration_ms: 0.139317
  type: 'test'
  ...
# Subtest: parses a Spanish Scripture reference
ok 73 - parses a Spanish Scripture reference
  ---
  duration_ms: 1.275929
  type: 'test'
  ...
# Subtest: extracts a reference from the first line
ok 74 - extracts a reference from the first line
  ---
  duration_ms: 0.445392
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
# duration_ms 514.412821

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

