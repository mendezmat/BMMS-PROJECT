# BMMS Update 026 Validation

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
  duration_ms: 6.339926
  type: 'test'
  ...
# Subtest: editor animation playback uses requestAnimationFrame
ok 2 - editor animation playback uses requestAnimationFrame
  ---
  duration_ms: 2.287611
  type: 'test'
  ...
# Subtest: publishes a versioned event envelope
ok 3 - publishes a versioned event envelope
  ---
  duration_ms: 2.37116
  type: 'test'
  ...
# Subtest: registers and resolves a service
ok 4 - registers and resolves a service
  ---
  duration_ms: 0.897949
  type: 'test'
  ...
# Subtest: rejects duplicate registrations
ok 5 - rejects duplicate registrations
  ---
  duration_ms: 0.298292
  type: 'test'
  ...
# Subtest: normalizes an animation configuration
ok 6 - normalizes an animation configuration
  ---
  duration_ms: 0.681921
  type: 'test'
  ...
# Subtest: provides enter and exit animation defaults
ok 7 - provides enter and exit animation defaults
  ---
  duration_ms: 0.138057
  type: 'test'
  ...
# Subtest: creates slide keyframes
ok 8 - creates slide keyframes
  ---
  duration_ms: 0.290146
  type: 'test'
  ...
# Subtest: disabled animations produce no keyframes
ok 9 - disabled animations produce no keyframes
  ---
  duration_ms: 0.515514
  type: 'test'
  ...
# Subtest: lists built-in broadcast components
ok 10 - lists built-in broadcast components
  ---
  duration_ms: 1.728232
  type: 'test'
  ...
# Subtest: creates a Scripture component with shared component identity
ok 11 - creates a Scripture component with shared component identity
  ---
  duration_ms: 2.720738
  type: 'test'
  ...
# Subtest: creates a Lower Third component with live bindings
ok 12 - creates a Lower Third component with live bindings
  ---
  duration_ms: 0.89642
  type: 'test'
  ...
# Subtest: generic component factory rejects unknown components
ok 13 - generic component factory rejects unknown components
  ---
  duration_ms: 0.521699
  type: 'test'
  ...
# Subtest: gets nested values by path
ok 14 - gets nested values by path
  ---
  duration_ms: 0.823519
  type: 'test'
  ...
# Subtest: resolves single and double brace tokens
ok 15 - resolves single and double brace tokens
  ---
  duration_ms: 0.293321
  type: 'test'
  ...
# Subtest: resolves binding text elements without mutating source
ok 16 - resolves binding text elements without mutating source
  ---
  duration_ms: 0.303498
  type: 'test'
  ...
# Subtest: resolves documents and lists tokens
ok 17 - resolves documents and lists tokens
  ---
  duration_ms: 1.193491
  type: 'test'
  ...
# Subtest: creates normalized text elements
ok 18 - creates normalized text elements
  ---
  duration_ms: 4.817595
  type: 'test'
  ...
# Subtest: updates and removes elements immutably
ok 19 - updates and removes elements immutably
  ---
  duration_ms: 0.760142
  type: 'test'
  ...
# Subtest: reorders layers
ok 20 - reorders layers
  ---
  duration_ms: 1.328282
  type: 'test'
  ...
# Subtest: normalization preserves grouping metadata
ok 21 - normalization preserves grouping metadata
  ---
  duration_ms: 1.156141
  type: 'test'
  ...
# Subtest: undoes and redoes document commits
ok 22 - undoes and redoes document commits
  ---
  duration_ms: 0.877558
  type: 'test'
  ...
# Subtest: creates and categorizes templates
ok 23 - creates and categorizes templates
  ---
  duration_ms: 2.986469
  type: 'test'
  ...
# Subtest: duplicates templates with a new identity
ok 24 - duplicates templates with a new identity
  ---
  duration_ms: 0.386026
  type: 'test'
  ...
# Subtest: instantiates templates with new element and group ids
ok 25 - instantiates templates with new element and group ids
  ---
  duration_ms: 0.437336
  type: 'test'
  ...
# Subtest: updates metadata without replacing the stored document
ok 26 - updates metadata without replacing the stored document
  ---
  duration_ms: 0.213787
  type: 'test'
  ...
# Subtest: Scripture defaults to manual source
ok 27 - Scripture defaults to manual source
  ---
  duration_ms: 1.178709
  type: 'test'
  ...
# Subtest: ProPresenter settings are globally available
ok 28 - ProPresenter settings are globally available
  ---
  duration_ms: 0.237501
  type: 'test'
  ...
# Subtest: Smart Flyer defaults to assisted automation
ok 29 - Smart Flyer defaults to assisted automation
  ---
  duration_ms: 0.1842
  type: 'test'
  ...
# Subtest: builds manual scripture context
ok 30 - builds manual scripture context
  ---
  duration_ms: 0.880928
  type: 'test'
  ...
# Subtest: uses ProPresenter scripture when selected
ok 31 - uses ProPresenter scripture when selected
  ---
  duration_ms: 0.300393
  type: 'test'
  ...
# Subtest: reads the official status and presentation endpoints
ok 32 - reads the official status and presentation endpoints
  ---
  duration_ms: 4.721107
  type: 'test'
  ...
# Subtest: does not emit a duplicate verse
ok 33 - does not emit a duplicate verse
  ---
  duration_ms: 1.205572
  type: 'test'
  ...
# Subtest: starts disabled by default
ok 34 - starts disabled by default
  ---
  duration_ms: 0.795884
  type: 'test'
  ...
# Subtest: validates port range
ok 35 - validates port range
  ---
  duration_ms: 0.399998
  type: 'test'
  ...
# Subtest: publishes normalized ProPresenter media events
ok 36 - publishes normalized ProPresenter media events
  ---
  duration_ms: 0.609935
  type: 'test'
  ...
# {"timestamp":"2026-07-23T15:10:24.615Z","level":"INFO","scope":"test","message":"Connecting to ProPresenter","context":{"host":"127.0.0.1","port":1025,"protocol":"tcp"}}
# Subtest: tests the connection through the documented system-time endpoint
ok 37 - tests the connection through the documented system-time endpoint
  ---
  duration_ms: 1.085585
  type: 'test'
  ...
# Subtest: connects and subscribes configured streaming endpoints
ok 38 - connects and subscribes configured streaming endpoints
  ---
  duration_ms: 1.820803
  type: 'test'
  ...
# Subtest: normalizes a ProPresenter Scripture payload
ok 39 - normalizes a ProPresenter Scripture payload
  ---
  duration_ms: 1.869622
  type: 'test'
  ...
# Subtest: uses newline-delimited JSON for a real TCP request
ok 40 - uses newline-delimited JSON for a real TCP request
  ---
  duration_ms: 20.124702
  type: 'test'
  ...
# Subtest: receives chunked streaming messages
ok 41 - receives chunked streaming messages
  ---
  duration_ms: 44.37174
  type: 'test'
  ...
# Subtest: applies capped exponential backoff
ok 42 - applies capped exponential backoff
  ---
  duration_ms: 1.361511
  type: 'test'
  ...
# Subtest: normalizes a common current slide payload
ok 43 - normalizes a common current slide payload
  ---
  duration_ms: 2.149069
  type: 'test'
  ...
# Subtest: supports snake case response variants
ok 44 - supports snake case response variants
  ---
  duration_ms: 0.443825
  type: 'test'
  ...
# Subtest: balances text into visually similar lines
ok 45 - balances text into visually similar lines
  ---
  duration_ms: 1.008007
  type: 'test'
  ...
# Subtest: penalizes a one-word final line when a better partition exists
ok 46 - penalizes a one-word final line when a better partition exists
  ---
  duration_ms: 1.327551
  type: 'test'
  ...
# Subtest: reports overflow when minimum font still exceeds the box
ok 47 - reports overflow when minimum font still exceeds the box
  ---
  duration_ms: 0.216099
  type: 'test'
  ...
# Subtest: Scripture includes a default simple-mode design
ok 48 - Scripture includes a default simple-mode design
  ---
  duration_ms: 0.862357
  type: 'test'
  ...
# Subtest: Scripture broadcast state starts safely off air
ok 49 - Scripture broadcast state starts safely off air
  ---
  duration_ms: 0.274565
  type: 'test'
  ...
# Subtest: publishes verse and program events
ok 50 - publishes verse and program events
  ---
  duration_ms: 1.920697
  type: 'test'
  ...
# Subtest: does not mark identical normalized content as changed
ok 51 - does not mark identical normalized content as changed
  ---
  duration_ms: 2.568766
  type: 'test'
  ...
# Subtest: preview iframe is not hidden behind a ready-message race
ok 52 - preview iframe is not hidden behind a ready-message race
  ---
  duration_ms: 0.839018
  type: 'test'
  ...
# Subtest: lateral padding overrides every Scripture format
ok 53 - lateral padding overrides every Scripture format
  ---
  duration_ms: 0.72538
  type: 'test'
  ...
# Subtest: text fitting performs real rendered candidate measurements
ok 54 - text fitting performs real rendered candidate measurements
  ---
  duration_ms: 0.239175
  type: 'test'
  ...
# Subtest: preview initialization cannot abort the whole app
ok 55 - preview initialization cannot abort the whole app
  ---
  duration_ms: 2.632074
  type: 'test'
  ...
# Subtest: saved Scripture state is deeply hydrated
ok 56 - saved Scripture state is deeply hydrated
  ---
  duration_ms: 0.328893
  type: 'test'
  ...
# Subtest: restores original Scripture geometry
ok 57 - restores original Scripture geometry
  ---
  duration_ms: 0.873696
  type: 'test'
  ...
# Subtest: restores writing and contextual transitions
ok 58 - restores writing and contextual transitions
  ---
  duration_ms: 0.17108
  type: 'test'
  ...
# Subtest: restores gradient and typography
ok 59 - restores gradient and typography
  ---
  duration_ms: 0.141785
  type: 'test'
  ...
# Subtest: Scripture restores the original template and format defaults
ok 60 - Scripture restores the original template and format defaults
  ---
  duration_ms: 0.937005
  type: 'test'
  ...
# Subtest: Appearance and animation configuration have usable defaults
ok 61 - Appearance and animation configuration have usable defaults
  ---
  duration_ms: 0.351199
  type: 'test'
  ...
# Subtest: TV Broadcast CG is available in the advanced template library
ok 62 - TV Broadcast CG is available in the advanced template library
  ---
  duration_ms: 2.375974
  type: 'test'
  ...
# Subtest: Scripture output contains the robust fitting engine
ok 63 - Scripture output contains the robust fitting engine
  ---
  duration_ms: 0.451372
  type: 'test'
  ...
# Subtest: Preview uses one scaled 1920 by 1080 stage
ok 64 - Preview uses one scaled 1920 by 1080 stage
  ---
  duration_ms: 0.492896
  type: 'test'
  ...
# Subtest: preview iframe preserves a 1920 by 1080 viewport
ok 65 - preview iframe preserves a 1920 by 1080 viewport
  ---
  duration_ms: 1.642298
  type: 'test'
  ...
# Subtest: overlay no longer polls and rerenders every two seconds
ok 66 - overlay no longer polls and rerenders every two seconds
  ---
  duration_ms: 0.265224
  type: 'test'
  ...
# Subtest: signature excludes volatile ProPresenter timestamps
ok 67 - signature excludes volatile ProPresenter timestamps
  ---
  duration_ms: 0.156434
  type: 'test'
  ...
# Subtest: verse width follows configured lateral padding without a legacy cap
ok 68 - verse width follows configured lateral padding without a legacy cap
  ---
  duration_ms: 0.530429
  type: 'test'
  ...
# Subtest: verse size is authoritative and is never silently reduced
ok 69 - verse size is authoritative and is never silently reduced
  ---
  duration_ms: 0.313752
  type: 'test'
  ...
# Subtest: composition supports independent X and Y scale
ok 70 - composition supports independent X and Y scale
  ---
  duration_ms: 3.334406
  type: 'test'
  ...
# Subtest: broadcast action labels are in Spanish
ok 71 - broadcast action labels are in Spanish
  ---
  duration_ms: 1.092111
  type: 'test'
  ...
# Subtest: composition scaling changes geometry without transform scaling text
ok 72 - composition scaling changes geometry without transform scaling text
  ---
  duration_ms: 1.798084
  type: 'test'
  ...
# Subtest: composition controls use clear Spanish labels
ok 73 - composition controls use clear Spanish labels
  ---
  duration_ms: 0.479556
  type: 'test'
  ...
# Subtest: gradient geometry provides complete bottom control
not ok 74 - gradient geometry provides complete bottom control
  ---
  duration_ms: 2.929288
  type: 'test'
  location: '/mnt/data/bmms-update-026/BMMS-PROJECT/tests/scripture-core/scripture-update-026.test.js:8:1'
  failureType: 'testCodeFailure'
  error: |-
    The input did not match the regular expression /1080px - var\(--gradient-top-offset\)/. Input:
    
    ':root{\n' +
      '  --bottom:28px;--width:1660px;--padding-x:72px;--geometry-scale-x:1;--geometry-scale-y:1;\n' +
      '  --title-font:"Montserrat",Arial,sans-serif;--body-font:"Montserrat",Arial,sans-serif;\n' +
      '  --title-size:44px;--body-size:36px;--title-weight:800;--body-weight:500;\n' +
      '  --line-height:1.16;--title-color:#fff;--text-color:#fff;\n' +
      '  --line-color:rgba(255,255,255,.9);--gradient-strength:.96;--gradient-color:0,0,0;--gradient-height:430px;--gradient-top-offset:0px;--gradient-bottom-extension:0px;--gradient-extend-to-bottom:1;--gradient-softness:58%;--edge-fade:150px;\n' +
      '}\n' +
      '*{box-sizing:border-box}\n' +
      'html,body{width:100%;height:100%;margin:0;overflow:hidden;background:transparent}\n' +
      '#stage{position:relative;width:1920px;height:1080px;background:transparent}\n' +
      '#status{position:absolute;left:18px;top:16px;color:#fff8;font:14px Arial;display:none}\n' +
      'body.debug #status{display:block}\n' +
      '.graphic{display:none}\n' +
      '.graphic.active{display:block}\n' +
      '\n' +
      '/* Biblia */\n' +
      '#bibleBanner{position:absolute;left:50%;bottom:var(--bottom);width:calc(var(--width) * var(--geometry-scale-x));min-height:calc(250px * var(--geometry-scale-y));transform:translate(-50%,18px);opacity:0;pointer-events:none}\n' +
      '#bibleBanner.visible{opacity:1;transform:translate(-50%,0);transition:opacity .36s ease,transform .36s cubic-bezier(.22,.8,.28,1)}\n' +
      '#bibleBanner.soft-out{opacity:.78;transform:translate(-50%,4px)}\n' +
      '#bibleBanner.chapter-out{opacity:0;transform:translate(-50%,20px);transition:.22s ease}\n' +
      '#bibleBanner.book-out{opacity:0;transform:translate(-50%,28px) scale(.985);transition:.26s ease}\n' +
      '.gradient{position:absolute;left:calc(-1 * var(--edge-fade));right:calc(-1 * var(--edge-fade));bottom:calc(-1 * var(--bottom));height:calc(var(--gradient-height) * var(--geometry-scale-y));background:linear-gradient(to bottom,rgba(var(--gradient-color),0) 0%,rgba(var(--gradient-color),.08) calc(var(--gradient-softness) * .30),rgba(var(--gradient-color),.48) var(--gradient-softness),rgba(var(--gradient-color),var(--gradient-strength)) 100%);opacity:0;transform:translateY(12px);pointer-events:none}\n' +
      '#bibleBanner.visible .gradient{opacity:1;transform:translateY(0);transition:.34s ease}\n' +
      '.content{position:relative;z-index:2;width:100%;padding:calc(26px * var(--geometry-scale-y)) calc(var(--padding-x) * var(--geometry-scale-x)) calc(34px * var(--geometry-scale-y));text-align:center;text-shadow:0 2px 10px #000b}\n' +
      '#reference{margin:0 auto 13px;color:var(--title-color);font-family:var(--title-font);font-size:var(--title-size);font-weight:var(--title-weight);line-height:1;letter-spacing:.035em;text-transform:uppercase}\n' +
      '.divider{width:min(650px,58%);height:2px;margin:0 auto 16px;background:var(--line-color)}\n' +
      '#verse{max-width:1500px;margin:0 auto;color:var(--text-color);font-family:var(--body-font);font-size:var(--body-size);font-weight:var(--body-weight);line-height:var(--line-height);letter-spacing:-.01em;overflow:visible}.verse-line{display:block;white-space:nowrap}.bible-graphic:not(.edge-fade) .gradient{left:calc((var(--width) - 1920px)/2);right:calc((var(--width) - 1920px)/2)}\n' +
      '.bible-graphic.edge-fade .gradient{-webkit-mask-image:linear-gradient(90deg,transparent 0,#000 var(--edge-fade),#000 calc(100% - var(--edge-fade)),transparent 100%);mask-image:linear-gradient(90deg,transparent 0,#000 var(--edge-fade),#000 calc(100% - var(--edge-fade)),transparent 100%)}\n' +
      '#bibleBanner.no-reference #reference,#bibleBanner.no-reference .divider{display:none}\n' +
      '\n' +
      '/* Flyer → CG */\n' +
      '.flyer-graphic{--flyer-primary:#7c3aed;--flyer-accent:#f59e0b;position:absolute;inset:0;overflow:hidden;color:#fff;opacity:0;transform:translateY(18px)}\n' +
      '.flyer-graphic.visible{opacity:1;transform:none;transition:opacity .36s ease,transform .36s cubic-bezier(.22,.8,.28,1)}\n' +
      '.flyer-bg{position:absolute;inset:-25px;background-position:center;background-repeat:no-repeat;background-size:var(--flyer-bg-fit,cover);filter:blur(var(--flyer-bg-blur,14px)) saturate(1.15);opacity:var(--flyer-bg-opacity,.38);will-change:background-image,filter,opacity}\n' +
      '.flyer-shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(4,5,10,var(--flyer-shade-strong,.98)),rgba(4,5,10,var(--flyer-shade-mid,.62)) 52%,rgba(4,5,10,var(--flyer-shade-light,.18)))}\n' +
      '.flyer-accent{position:absolute;left:118px;bottom:140px;width:var(--flyer-accent-width,8px);height:470px;border-radius:99px;background:linear-gradient(var(--flyer-primary),var(--flyer-accent))}\n' +
      '.flyer-content{position:absolute;left:158px;bottom:140px;width:1180px;text-shadow:0 3px 18px #000b}\n' +
      '.flyer-eyebrow{color:var(--flyer-accent);font:800 20px Montserrat,Arial;letter-spacing:.18em;margin-bottom:24px}\n' +
      '#flyerTitleOut{font:900 82px/.94 Montserrat,Arial;letter-spacing:-.045em;max-width:1100px}\n' +
      '#flyerSloganOut{font:500 29px/1.25 Montserrat,Arial;color:#d8dbe3;margin-top:20px;max-width:920px}\n' +
      '.flyer-meta{display:flex;gap:16px;margin-top:30px;font:800 24px Montserrat,Arial}.flyer-dot{color:var(--flyer-accent)}\n' +
      '#flyerPlaceOut{margin-top:13px;font:600 20px Montserrat,Arial;color:#c5cad4}#flyerExtraOut{margin-top:15px;font:500 16px Montserrat,Arial;color:#999fac}\n' +
      '#flyerMedia{position:absolute;right:118px;top:110px;width:440px;height:620px;border-radius:24px;overflow:hidden;background:#1116;border:1px solid #ffffff26;box-shadow:0 24px 70px #0009;display:none}\n' +
      '#flyerMedia.visible{display:block}\n' +
      '#flyerMedia.asset-landscape{width:560px;height:315px;top:145px}\n' +
      '#flyerMedia.asset-square{width:500px;height:500px;top:125px}\n' +
      '#flyerMedia.asset-portrait{width:440px;height:620px}\n' +
      '#flyerMedia.asset-error{display:none!important}\n' +
      '#flyerMedia img{width:100%;height:100%;object-fit:var(--flyer-image-fit,cover);display:block}\n' +
      '#flyerQrCard{position:absolute;right:118px;bottom:140px;width:235px;background:#fff;border-radius:18px;padding:14px;color:#111;display:none;flex-direction:column;align-items:center;box-shadow:0 20px 55px #0008}\n' +
      '#flyerQrCard.visible{display:flex}\n' +
      '#flyerQrCard.asset-error{display:none!important}\n' +
      '#flyerQrCard img{width:100%;aspect-ratio:1;object-fit:contain;display:block;background:#fff}#flyerQrCard span{font:900 11px Montserrat,Arial;letter-spacing:.14em;margin-top:9px}\n' +
      '.flyer-graphic.clean{color:#111827}.flyer-graphic.clean .flyer-shade{background:linear-gradient(90deg,rgba(248,249,252,var(--flyer-shade-strong,.98)),rgba(248,249,252,var(--flyer-shade-mid,.91)) 58%,rgba(248,249,252,var(--flyer-shade-light,.25)))}.flyer-graphic.clean #flyerSloganOut,.flyer-graphic.clean #flyerPlaceOut{color:#374151}.flyer-graphic.clean #flyerExtraOut{color:#6b7280}.flyer-graphic.clean .flyer-eyebrow{color:var(--flyer-primary)}\n' +
      '.flyer-graphic.premium .flyer-shade{inset:80px;border:1px solid #ffffff2b;border-radius:28px;background:linear-gradient(115deg,rgba(8,10,18,var(--flyer-shade-strong,.9)),rgba(15,18,30,var(--flyer-shade-mid,.56)));backdrop-filter:blur(18px)}.flyer-graphic.premium .flyer-content{left:210px;bottom:180px}.flyer-graphic.premium .flyer-accent{left:170px;bottom:180px}.flyer-graphic.premium #flyerQrCard{right:170px;bottom:180px}\n' +
      '.flyer-graphic.compact .flyer-content{bottom:95px}.flyer-graphic.compact #flyerSloganOut,.flyer-graphic.compact #flyerPlaceOut,.flyer-graphic.compact #flyerExtraOut{display:none}.flyer-graphic.compact .flyer-accent{bottom:95px;height:300px}.flyer-graphic.compact #flyerQrCard{bottom:95px;width:190px}.flyer-graphic.compact #flyerTitleOut{font-size:68px;max-width:1250px}\n' +
      '.flyer-graphic.full .flyer-shade{background:linear-gradient(0deg,rgba(3,4,9,var(--flyer-shade-strong,.97)),rgba(3,4,9,var(--flyer-shade-light,.18)) 74%)}.flyer-graphic.full .flyer-content{left:145px;bottom:90px;width:1320px}.flyer-graphic.full .flyer-accent{left:110px;bottom:90px;height:430px}.flyer-graphic.full #flyerQrCard{right:90px;bottom:90px}\n' +
      '.flyer-graphic.banner .flyer-bg{}.flyer-graphic.banner .flyer-shade{top:auto;height:360px;background:rgba(5,7,13,var(--flyer-shade-strong,.95));border-top:3px solid var(--flyer-primary)}.flyer-graphic.banner .flyer-content{left:135px;bottom:55px;width:1400px}.flyer-graphic.banner #flyerTitleOut{font-size:58px;max-width:1250px}.flyer-graphic.banner #flyerSloganOut,.flyer-graphic.banner #flyerPlaceOut,.flyer-graphic.banner #flyerExtraOut{display:none}.flyer-graphic.banner .flyer-accent{display:none}.flyer-graphic.banner #flyerQrCard{right:95px;bottom:45px;width:175px}.flyer-graphic.banner .flyer-eyebrow{margin-bottom:12px}\n' +
      '\n' +
      '.word{display:inline-block;opacity:0;transform:translateY(5px);animation:wordIn .19s ease forwards}\n' +
      '.word-space{white-space:pre}\n' +
      '@keyframes wordIn{to{opacity:1;transform:none}}\n' +
      '\n' +
      '.flyer-graphic.no-accent .flyer-accent{display:none}\n' +
      '.flyer-graphic.no-accent .flyer-content{left:118px}\n' +
      '\n' +
      '.flyer-graphic.compact #flyerMedia{right:92px;top:120px;max-width:420px;max-height:470px}\n' +
      '.flyer-graphic.full #flyerMedia{right:90px;top:80px;max-width:620px;max-height:720px}\n' +
      '.flyer-graphic.banner #flyerMedia{right:95px;top:60px;max-width:420px;max-height:240px}\n' +
      '.flyer-graphic.premium #flyerMedia{right:150px;top:120px;max-width:520px;max-height:570px}\n' +
      '.flyer-graphic.no-media .flyer-content{width:1450px}\n' +
      '\n' +
      '/* Smart Flyer S5: graphic elements and corrected compositions */\n' +
      '.flyer-panel{display:none;position:absolute;left:105px;bottom:105px;width:1260px;height:610px;border-radius:30px;background:linear-gradient(135deg,#0b0e18cc,#141a2a88);border:1px solid #ffffff1e;box-shadow:0 28px 90px #0008;backdrop-filter:blur(18px)}\n' +
      '.flyer-graphic.show-panel .flyer-panel{display:block}\n' +
      '.flyer-line{display:none;position:absolute;left:158px;bottom:118px;width:560px;height:3px;border-radius:3px;background:linear-gradient(90deg,var(--flyer-primary),var(--flyer-accent),transparent)}\n' +
      '.flyer-graphic.show-line .flyer-line{display:block}\n' +
      '.flyer-corner{display:none;position:absolute;right:72px;top:72px;width:118px;height:118px;border-top:8px solid var(--flyer-accent);border-right:8px solid var(--flyer-primary);border-radius:0 20px 0 0}\n' +
      '.flyer-graphic.show-corner .flyer-corner{display:block}\n' +
      '.flyer-badge{display:none;width:max-content;margin-bottom:16px;padding:8px 14px;border-radius:999px;background:var(--flyer-primary);color:#'... 39570 more characters
    
  code: 'ERR_ASSERTION'
  name: 'AssertionError'
  expected:
  actual: |-
    :root{
      --bottom:28px;--width:1660px;--padding-x:72px;--geometry-scale-x:1;--geometry-scale-y:1;
      --title-font:"Montserrat",Arial,sans-serif;--body-font:"Montserrat",Arial,sans-serif;
      --title-size:44px;--body-size:36px;--title-weight:800;--body-weight:500;
      --line-height:1.16;--title-color:#fff;--text-color:#fff;
      --line-color:rgba(255,255,255,.9);--gradient-strength:.96;--gradient-color:0,0,0;--gradient-height:430px;--gradient-top-offset:0px;--gradient-bottom-extension:0px;--gradient-extend-to-bottom:1;--gradient-softness:58%;--edge-fade:150px;
    }
    *{box-sizing:border-box}
    html,body{width:100%;height:100%;margin:0;overflow:hidden;background:transparent}
    #stage{position:relative;width:1920px;height:1080px;background:transparent}
    #status{position:absolute;left:18px;top:16px;color:#fff8;font:14px Arial;display:none}
    body.debug #status{display:block}
    .graphic{display:none}
    .graphic.active{display:block}
    
    /* Biblia */
    #bibleBanner{position:absolute;left:50%;bottom:var(--bottom);width:calc(var(--width) * var(--geometry-scale-x));min-height:calc(250px * var(--geometry-scale-y));transform:translate(-50%,18px);opacity:0;pointer-events:none}
    #bibleBanner.visible{opacity:1;transform:translate(-50%,0);transition:opacity .36s ease,transform .36s cubic-bezier(.22,.8,.28,1)}
    #bibleBanner.soft-out{opacity:.78;transform:translate(-50%,4px)}
    #bibleBanner.chapter-out{opacity:0;transform:translate(-50%,20px);transition:.22s ease}
    #bibleBanner.book-out{opacity:0;transform:translate(-50%,28px) scale(.985);transition:.26s ease}
    .gradient{position:absolute;left:calc(-1 * var(--edge-fade));right:calc(-1 * var(--edge-fade));bottom:calc(-1 * var(--bottom));height:calc(var(--gradient-height) * var(--geometry-scale-y));background:linear-gradient(to bottom,rgba(var(--gradient-color),0) 0%,rgba(var(--gradient-color),.08) calc(var(--gradient-softness) * .30),rgba(var(--gradient-color),.48) var(--gradient-softness),rgba(var(--gradient-color),var(--gradient-strength)) 100%);opacity:0;transform:translateY(12px);pointer-events:none}
    #bibleBanner.visible .gradient{opacity:1;transform:translateY(0);transition:.34s ease}
    .content{position:relative;z-index:2;width:100%;padding:calc(26px * var(--geometry-scale-y)) calc(var(--padding-x) * var(--geometry-scale-x)) calc(34px * var(--geometry-scale-y));text-align:center;text-shadow:0 2px 10px #000b}
    #reference{margin:0 auto 13px;color:var(--title-color);font-family:var(--title-font);font-size:var(--title-size);font-weight:var(--title-weight);line-height:1;letter-spacing:.035em;text-transform:uppercase}
    .divider{width:min(650px,58%);height:2px;margin:0 auto 16px;background:var(--line-color)}
    #verse{max-width:1500px;margin:0 auto;color:var(--text-color);font-family:var(--body-font);font-size:var(--body-size);font-weight:var(--body-weight);line-height:var(--line-height);letter-spacing:-.01em;overflow:visible}.verse-line{display:block;white-space:nowrap}.bible-graphic:not(.edge-fade) .gradient{left:calc((var(--width) - 1920px)/2);right:calc((var(--width) - 1920px)/2)}
    .bible-graphic.edge-fade .gradient{-webkit-mask-image:linear-gradient(90deg,transparent 0,#000 var(--edge-fade),#000 calc(100% - var(--edge-fade)),transparent 100%);mask-image:linear-gradient(90deg,transparent 0,#000 var(--edge-fade),#000 calc(100% - var(--edge-fade)),transparent 100%)}
    #bibleBanner.no-reference #reference,#bibleBanner.no-reference .divider{display:none}
    
    /* Flyer → CG */
    .flyer-graphic{--flyer-primary:#7c3aed;--flyer-accent:#f59e0b;position:absolute;inset:0;overflow:hidden;color:#fff;opacity:0;transform:translateY(18px)}
    .flyer-graphic.visible{opacity:1;transform:none;transition:opacity .36s ease,transform .36s cubic-bezier(.22,.8,.28,1)}
    .flyer-bg{position:absolute;inset:-25px;background-position:center;background-repeat:no-repeat;background-size:var(--flyer-bg-fit,cover);filter:blur(var(--flyer-bg-blur,14px)) saturate(1.15);opacity:var(--flyer-bg-opacity,.38);will-change:background-image,filter,opacity}
    .flyer-shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(4,5,10,var(--flyer-shade-strong,.98)),rgba(4,5,10,var(--flyer-shade-mid,.62)) 52%,rgba(4,5,10,var(--flyer-shade-light,.18)))}
    .flyer-accent{position:absolute;left:118px;bottom:140px;width:var(--flyer-accent-width,8px);height:470px;border-radius:99px;background:linear-gradient(var(--flyer-primary),var(--flyer-accent))}
    .flyer-content{position:absolute;left:158px;bottom:140px;width:1180px;text-shadow:0 3px 18px #000b}
    .flyer-eyebrow{color:var(--flyer-accent);font:800 20px Montserrat,Arial;letter-spacing:.18em;margin-bottom:24px}
    #flyerTitleOut{font:900 82px/.94 Montserrat,Arial;letter-spacing:-.045em;max-width:1100px}
    #flyerSloganOut{font:500 29px/1.25 Montserrat,Arial;color:#d8dbe3;margin-top:20px;max-width:920px}
    .flyer-meta{display:flex;gap:16px;margin-top:30px;font:800 24px Montserrat,Arial}.flyer-dot{color:var(--flyer-accent)}
    #flyerPlaceOut{margin-top:13px;font:600 20px Montserrat,Arial;color:#c5cad4}#flyerExtraOut{margin-top:15px;font:500 16px Montserrat,Arial;color:#999fac}
    #flyerMedia{position:absolute;right:118px;top:110px;width:440px;height:620px;border-radius:24px;overflow:hidden;background:#1116;border:1px solid #ffffff26;box-shadow:0 24px 70px #0009;display:none}
    #flyerMedia.visible{display:block}
    #flyerMedia.asset-landscape{width:560px;height:315px;top:145px}
    #flyerMedia.asset-square{width:500px;height:500px;top:125px}
    #flyerMedia.asset-portrait{width:440px;height:620px}
    #flyerMedia.asset-error{display:none!important}
    #flyerMedia img{width:100%;height:100%;object-fit:var(--flyer-image-fit,cover);display:block}
    #flyerQrCard{position:absolute;right:118px;bottom:140px;width:235px;background:#fff;border-radius:18px;padding:14px;color:#111;display:none;flex-direction:column;align-items:center;box-shadow:0 20px 55px #0008}
    #flyerQrCard.visible{display:flex}
    #flyerQrCard.asset-error{display:none!important}
    #flyerQrCard img{width:100%;aspect-ratio:1;object-fit:contain;display:block;background:#fff}#flyerQrCard span{font:900 11px Montserrat,Arial;letter-spacing:.14em;margin-top:9px}
    .flyer-graphic.clean{color:#111827}.flyer-graphic.clean .flyer-shade{background:linear-gradient(90deg,rgba(248,249,252,var(--flyer-shade-strong,.98)),rgba(248,249,252,var(--flyer-shade-mid,.91)) 58%,rgba(248,249,252,var(--flyer-shade-light,.25)))}.flyer-graphic.clean #flyerSloganOut,.flyer-graphic.clean #flyerPlaceOut{color:#374151}.flyer-graphic.clean #flyerExtraOut{color:#6b7280}.flyer-graphic.clean .flyer-eyebrow{color:var(--flyer-primary)}
    .flyer-graphic.premium .flyer-shade{inset:80px;border:1px solid #ffffff2b;border-radius:28px;background:linear-gradient(115deg,rgba(8,10,18,var(--flyer-shade-strong,.9)),rgba(15,18,30,var(--flyer-shade-mid,.56)));backdrop-filter:blur(18px)}.flyer-graphic.premium .flyer-content{left:210px;bottom:180px}.flyer-graphic.premium .flyer-accent{left:170px;bottom:180px}.flyer-graphic.premium #flyerQrCard{right:170px;bottom:180px}
    .flyer-graphic.compact .flyer-content{bottom:95px}.flyer-graphic.compact #flyerSloganOut,.flyer-graphic.compact #flyerPlaceOut,.flyer-graphic.compact #flyerExtraOut{display:none}.flyer-graphic.compact .flyer-accent{bottom:95px;height:300px}.flyer-graphic.compact #flyerQrCard{bottom:95px;width:190px}.flyer-graphic.compact #flyerTitleOut{font-size:68px;max-width:1250px}
    .flyer-graphic.full .flyer-shade{background:linear-gradient(0deg,rgba(3,4,9,var(--flyer-shade-strong,.97)),rgba(3,4,9,var(--flyer-shade-light,.18)) 74%)}.flyer-graphic.full .flyer-content{left:145px;bottom:90px;width:1320px}.flyer-graphic.full .flyer-accent{left:110px;bottom:90px;height:430px}.flyer-graphic.full #flyerQrCard{right:90px;bottom:90px}
    .flyer-graphic.banner .flyer-bg{}.flyer-graphic.banner .flyer-shade{top:auto;height:360px;background:rgba(5,7,13,var(--flyer-shade-strong,.95));border-top:3px solid var(--flyer-primary)}.flyer-graphic.banner .flyer-content{left:135px;bottom:55px;width:1400px}.flyer-graphic.banner #flyerTitleOut{font-size:58px;max-width:1250px}.flyer-graphic.banner #flyerSloganOut,.flyer-graphic.banner #flyerPlaceOut,.flyer-graphic.banner #flyerExtraOut{display:none}.flyer-graphic.banner .flyer-accent{display:none}.flyer-graphic.banner #flyerQrCard{right:95px;bottom:45px;width:175px}.flyer-graphic.banner .flyer-eyebrow{margin-bottom:12px}
    
    .word{display:inline-block;opacity:0;transform:translateY(5px);animation:wordIn .19s ease forwards}
    .word-space{white-space:pre}
    @keyframes wordIn{to{opacity:1;transform:none}}
    
    .flyer-graphic.no-accent .flyer-accent{display:none}
    .flyer-graphic.no-accent .flyer-content{left:118px}
    
    .flyer-graphic.compact #flyerMedia{right:92px;top:120px;max-width:420px;max-height:470px}
    .flyer-graphic.full #flyerMedia{right:90px;top:80px;max-width:620px;max-height:720px}
    .flyer-graphic.banner #flyerMedia{right:95px;top:60px;max-width:420px;max-height:240px}
    .flyer-graphic.premium #flyerMedia{right:150px;top:120px;max-width:520px;max-height:570px}
    .flyer-graphic.no-media .flyer-content{width:1450px}
    
    /* Smart Flyer S5: graphic elements and corrected compositions */
    .flyer-panel{display:none;position:absolute;left:105px;bottom:105px;width:1260px;height:610px;border-radius:30px;background:linear-gradient(135deg,#0b0e18cc,#141a2a88);border:1px solid #ffffff1e;box-shadow:0 28px 90px #0008;backdrop-filter:blur(18px)}
    .flyer-graphic.show-panel .flyer-panel{display:block}
    .flyer-line{display:none;position:absolute;left:158px;bottom:118px;width:560px;height:3px;border-radius:3px;background:linear-gradient(90deg,var(--flyer-primary),var(--flyer-accent),transparent)}
    .flyer-graphic.show-line .flyer-line{display:block}
    .flyer-corner{display:none;position:absolute;right:72px;top:72px;width:118px;height:118px;border-top:8px solid var(--flyer-accent);border-right:8px solid var(--flyer-primary);border-radius:0 20px 0 0}
    .flyer-graphic.show-corner .flyer-corner{display:block}
    .flyer-badge{display:none;width:max-content;margin-bottom:16px;padding:8px 14px;border-radius:999px;background:var(--flyer-primary);color:#fff;font:800 13px Montserrat,Arial;letter-spacing:.13em;box-shadow:0 8px 26px #0005}
    .flyer-graphic.show-badge .flyer-badge{display:block}
    .flyer-graphic.accent-right .flyer-accent{left:auto;right:118px}
    .flyer-graphic.accent-right .flyer-content{left:118px}
    .flyer-graphic.accent-right.no-media .flyer-content{width:1500px}
    /* Stable layouts: formats own geometry, templates own visual language. */
    .flyer-graphic.medium .flyer-content{left:158px;bottom:135px;width:1010px}
    .flyer-graphic.medium #flyerTitleOut{max-width:980px;font-size:76px}
    .flyer-graphic.medium #flyerMedia{right:105px;top:105px}
    .flyer-graphic.medium #flyerQrCard{right:105px;bottom:105px}
    .flyer-graphic.compact .flyer-content{left:145px;bottom:86px;width:1230px}
    .flyer-graphic.compact .flyer-meta{margin-top:20px}
    .flyer-graphic.compact #flyerMedia{right:86px;top:105px}
    .flyer-graphic.full .flyer-content{left:135px;bottom:82px;width:1320px}
    .flyer-graphic.full #flyerTitleOut{max-width:1280px;font-size:78px}
    .flyer-graphic.full #flyerMedia{right:88px;top:72px}
    .flyer-graphic.banner .flyer-content{left:120px;bottom:42px;width:1390px}
    .flyer-graphic.banner .flyer-meta{margin-top:15px}
    .flyer-graphic.banner #flyerMedia{right:78px;top:auto;bottom:42px}
    .flyer-graphic.banner #flyerQrCard{right:78px;bottom:40px}
    .flyer-graphic.banner.show-line .flyer-line{left:120px;bottom:28px;width:680px}
    .flyer-graphic.full.show-line .flyer-line{left:135px;bottom:55px;width:760px}
    .flyer-graphic.premium.show-panel .flyer-panel{left:80px;bottom:80px;width:1760px;height:920px}
    .flyer-graphic.clean .flyer-panel{background:#f8faf0e8;border-color:#11182718;box-shadow:0 24px 80px #11182722}
    .flyer-graphic.clean .flyer-badge{color:#fff}
    
    /* Smart Flyer S6 — unified responsive composition system */
    .flyer-graphic{
      --layout-left:158px;--layout-bottom:135px;--layout-width:1010px;
      --title-size:76px;--title-lines:3;--content-gap:38px;
      --qr-right:105px;--qr-bottom:105px;--qr-size:220px;
      --media-right:105px;--media-top:105px;
    }
    .flyer-content{left:var(--layout-left)!important;bottom:var(--layout-bottom)!important;width:var(--layout-width)!important;max-width:calc(1920px - var(--layout-left) - 90px);z-index:5}
    #flyerTitleOut{font-size:var(--title-size)!important;max-width:100%!important;overflow:hidden;overflow-wrap:anywhere}
    #flyerQrCard{right:var(--qr-right)!important;bottom:var(--qr-bottom)!important;z-index:7}
    #flyerMedia{right:var(--media-right)!important;top:var(--media-top)!important;z-index:4}
    .flyer-accent,.flyer-line,.flyer-panel,.flyer-corner{z-index:3}
    
    /* Formats own every spatial decision. */
    .flyer-graphic.medium{--layout-left:158px;--layout-bottom:135px;--layout-width:1010px;--title-size:76px;--qr-right:105px;--qr-bottom:105px;--media-right:105px;--media-top:105px}
    .flyer-graphic.medium.no-media{--layout-width:1400px}
    .flyer-graphic.medium.no-media:has(#flyerQrCard.visible){--layout-width:1250px}
    .flyer-graphic.compact{--layout-left:145px;--layout-bottom:86px;--layout-width:1210px;--title-size:66px;--qr-right:86px;--qr-bottom:86px;--media-right:86px;--media-top:105px}
    .flyer-graphic.compact:has(#flyerQrCard.visible){--layout-width:1080px}
    .flyer-graphic.full{--layout-left:135px;--layout-bottom:82px;--layout-width:1320px;--title-size:78px;--qr-right:88px;--qr-bottom:82px;--media-right:88px;--media-top:72px}
    .flyer-graphic.full:has(#flyerQrCard.visible){--layout-width:1220px}
    .flyer-graphic.banner{--layout-left:120px;--layout-bottom:45px;--layout-width:1390px;--title-size:56px;--qr-right:78px;--qr-bottom:40px;--media-right:78px;--media-top:auto}
    .flyer-graphic.banner:has(#flyerQrCard.visible){--layout-width:1120px}
    .flyer-graphic.banner .flyer-content{height:270px;display:flex;flex-direction:column;justify-content:flex-end}
    .flyer-graphic.banner .flyer-eyebrow{margin-bottom:10px}
    .flyer-graphic.banner .flyer-meta{margin-top:12px}
    .flyer-graphic.banner #flyerTitleOut{line-height:.92}
    .flyer-graphic.banner #flyerMedia{top:auto!important;bottom:42px!important;width:330px!important;height:230px!important}
    
    /* Right-side rails reserve space instead of colliding with QR/media. */
    .flyer-graphic.accent-right{--qr-right:155px;--media-right:155px}
    .flyer-graphic.accent-right.graphic-rail .flyer-accent,
    .flyer-graphic.accent-right.graphic-split .flyer-accent{left:auto!important;right:78px!important}
    .flyer-graphic:not(.accent-right).graphic-rail .flyer-accent,
    .flyer-graphic:not(.accent-right).graphic-split .flyer-accent{left:78px!important;right:auto!important}
    .flyer-graphic:not(.accent-right).graphic-rail,
    .flyer-graphic:not(.accent-right).graphic-split{--layout-left:138px}
    
    /* Single selectable graphic element. */
    .flyer-graphic .flyer-accent,.flyer-graphic .flyer-line,.flyer-graphic .flyer-panel,.flyer-graphic .flyer-corner,.flyer-graphic .flyer-badge{display:none}
    .flyer-graphic.graphic-rail .flyer-accent{display:block;bottom:var(--layout-bottom);height:min(470px,calc(1080px - var(--layout-bottom) - 150px));width:var(--flyer-accent-width);border-radius:99px}
    .flyer-graphic.graphic-split .flyer-accent{display:block;bottom:var(--layout-bottom);height:390px;width:calc(var(--flyer-accent-width) * .72);border-radius:99px;box-shadow:18px -32px 0 -2px var(--flyer-primary)}
    .flyer-graphic.graphic-underline .flyer-line{display:block;left:var(--layout-left)!important;bottom:calc(var(--layout-bottom) - 24px)!important;width:min(720px,var(--layout-width))!important;height:4px}
    .flyer-graphic.graphic-corner .flyer-corner{display:block;right:72px;top:72px}
    .flyer-graphic.graphic-frame .flyer-panel{display:block;left:calc(var(--layout-left) - 34px)!important;bottom:calc(var(--layout-bottom) - 34px)!important;width:calc(var(--layout-width) + 68px)!important;height:calc(100% - var(--layout-bottom) - 120px)!important;max-height:690px}
    .flyer-graphic.graphic-pill .flyer-badge{display:block}
    .flyer-graphic.graphic-none .flyer-accent,.flyer-graphic.graphic-none .flyer-line,.flyer-graphic.graphic-none .flyer-panel,.flyer-graphic.graphic-none .flyer-corner,.flyer-graphic.graphic-none .flyer-badge{display:none}
    .flyer-graphic.banner.graphic-frame .flyer-panel{height:310px!important;max-height:310px;bottom:25px!important}
    .flyer-graphic.banner.graphic-rail .flyer-accent,.flyer-graphic.banner.graphic-split .flyer-accent{height:250px;bottom:45px}
    
    /* Added contemporary templates. */
    .flyer-graphic.worship .flyer-shade{background:linear-gradient(105deg,rgba(5,7,12,var(--flyer-shade-strong,.92)) 0%,rgba(10,12,18,var(--flyer-shade-mid,.62)) 48%,rgba(5,7,12,var(--flyer-shade-light,.16)) 100%)}
    .flyer-graphic.worship .flyer-eyebrow{font-size:18px;letter-spacing:.28em;color:#fff;text-transform:uppercase;opacity:.88}
    .flyer-graphic.worship #flyerTitleOut{font-weight:700;letter-spacing:-.055em;text-transform:none}
    .flyer-graphic.worship #flyerSloganOut{font-weight:400;color:#f3f4f6;max-width:820px}
    .flyer-graphic.worship .flyer-meta{font-weight:600;letter-spacing:.02em}
    .flyer-graphic.worship .flyer-panel{background:linear-gradient(135deg,#ffffff16,#ffffff08);border-color:#ffffff24}
    .flyer-graphic.worship .flyer-badge{background:#fff;color:#111;box-shadow:none}
    
    .flyer-graphic.kinetic .flyer-shade{background:linear-gradient(115deg,rgba(3,4,8,var(--flyer-shade-strong,.98)) 0 44%,rgba(3,4,8,var(--flyer-shade-mid,.72)) 66%,rgba(3,4,8,var(--flyer-shade-light,.18)) 100%)}
    .flyer-graphic.kinetic #flyerTitleOut{text-transform:uppercase;font-weight:900;letter-spacing:-.065em}
    .flyer-graphic.kinetic .flyer-eyebrow{display:inline-block;width:max-content;background:var(--flyer-primary);color:#fff;padding:8px 13px;margin-bottom:18px;letter-spacing:.12em;transform:skew(-7deg)}
    .flyer-graphic.kinetic .flyer-meta{width:max-content;background:#fff;color:#111;padding:9px 14px;border-radius:4px;gap:11px}
    .flyer-graphic.kinetic .flyer-dot{color:var(--flyer-primary)}
    .flyer-graphic.kinetic .flyer-panel{border-radius:8px;background:linear-gradient(120deg,var(--flyer-primary),transparent 38%),#080a10d9}
    
    /* Template/format compatibility fixes. */
    .flyer-graphic.premium .flyer-shade{inset:80px}
    .flyer-graphic.premium.banner .flyer-shade{inset:auto 80px 25px 80px;height:330px;border-radius:24px;border-top:1px solid #ffffff2b}
    .flyer-graphic.premium.banner{--layout-left:150px;--layout-bottom:52px;--layout-width:1320px;--qr-right:105px;--qr-bottom:52px}
    .flyer-graphic.premium.banner:has(#flyerQrCard.visible){--layout-width:1080px}
    .flyer-graphic.premium.compact{--layout-left:150px;--layout-bottom:105px;--layout-width:1180px}
    .flyer-graphic.premium.full{--layout-left:150px;--layout-bottom:105px;--layout-width:1260px}
    .flyer-graphic.clean.banner .flyer-shade{background:rgba(248,249,252,var(--flyer-shade-strong,.96));border-top-color:var(--flyer-primary)}
    .flyer-graphic.clean.banner #flyerTitleOut{color:#111827}
    .flyer-graphic.worship.banner .flyer-shade{background:linear-gradient(90deg,#080a10f2,#111827df)}
    .flyer-graphic.kinetic.banner .flyer-shade{background:#05070df4;border-top:7px solid var(--flyer-primary)}
    
    
    /* S7: adjustable banner systems */
    .flyer-graphic.banner{
      --banner-height:300px;
      --banner-pad-y:clamp(24px,calc(var(--banner-height) * .14),58px);
      --banner-title-size:clamp(32px,calc(var(--banner-height) * .19),74px);
      --banner-meta-size:clamp(17px,calc(var(--banner-height) * .075),28px);
    }
    .flyer-graphic.banner .flyer-shade{height:var(--banner-height)!important}
    .flyer-graphic.banner .flyer-content{
      bottom:calc((var(--banner-height) - 270px)/2 + 45px)!important;
      height:calc(var(--banner-height) - (var(--banner-pad-y) * 2))!important;
      justify-content:center!important;
    }
    .flyer-graphic.banner #flyerTitleOut{font-size:var(--banner-title-size);max-height:calc(var(--banner-height) * .48);overflow:hidden}
    .flyer-graphic.banner .flyer-meta{font-size:var(--banner-meta-size)}
    .flyer-graphic.banner #flyerQrCard{
      width:clamp(120px,calc(var(--banner-height) * .53),210px)!important;
      height:clamp(120px,calc(var(--banner-height) * .53),210px)!important;
      bottom:calc((var(--banner-height) - clamp(120px,calc(var(--banner-height) * .53),210px))/2)!important;
    }
    .flyer-graphic.banner #flyerMedia{
      width:clamp(190px,calc(var(--banner-height) * 1.15),420px)!important;
      height:clamp(100px,calc(var(--banner-height) * .7),250px)!important;
      bottom:calc((var(--banner-height) - clamp(100px,calc(var(--banner-height) * .7),250px))/2)!important;
    }
    .flyer-graphic.banner.graphic-frame .flyer-panel{height:calc(var(--banner-height) - 20px)!important;max-height:none!important;bottom:10px!important}
    .flyer-graphic.banner.graphic-rail .flyer-accent,.flyer-graphic.banner.graphic-split .flyer-accent{height:calc(var(--banner-height) - 70px)!important;bottom:35px!important}
    .flyer-graphic.premium.banner .flyer-shade{height:var(--banner-height)!important;bottom:25px!important}
    
    /* Compact TV-style CG inspired by broadcast promo banners. */
    .flyer-graphic.ticker{
      --banner-height:210px;
      --layout-left:370px;
      --layout-bottom:55px;
      --layout-width:1120px;
      --qr-right:88px;
      --qr-bottom:55px;
      --media-right:auto;
      --media-top:auto;
    }
    .flyer-graphic.ticker .flyer-bg{display:none}
    .flyer-graphic.ticker .flyer-shade{
      inset:auto 150px 42px 210px;
      height:var(--banner-height);
      border-radius:18px;
      background:linear-gradient(105deg,rgba(7,10,18,.98),rgba(12,18,34,.95) 42%,rgba(6,8,14,.98));
      border:1px solid #ffffff20;
      box-shadow:0 16px 45px #0008;
    }
    .flyer-graphic.ticker .flyer-content{
      left:430px;
      bottom:calc(42px + (var(--banner-height) * .20));
      width:930px;
      height:calc(var(--banner-height) * .62);
      display:flex;
      flex-direction:column;
      justify-content:center;
      text-align:center;
      text-shadow:0 2px 16px #000d;
    }
    .flyer-graphic.ticker .flyer-eyebrow{display:none}
    .flyer-graphic.ticker #flyerTitleOut{
      font-size:clamp(28px,calc(var(--banner-height) * .20),58px);
      line-height:1.05;
      letter-spacing:-.025em;
      max-width:930px;
      text-transform:uppercase;
    }
    .flyer-graphic.ticker #flyerSloganOut{
      display:block;
      font-size:clamp(17px,calc(var(--banner-height) * .09),26px);
      margin-top:9px;
      max-width:900px;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
    }
    .flyer-graphic.ticker .flyer-meta{justify-content:center;margin-top:10px;font-size:clamp(16px,calc(var(--banner-height) * .08),24px)}
    .flyer-graphic.ticker #flyerPlaceOut,.flyer-graphic.ticker #flyerExtraOut{display:none}
    .flyer-graphic.ticker #flyerMedia{
      display:none;
      left:230px!important;
      right:auto!important;
      top:auto!important;
      bottom:calc(42px + (var(--banner-height) * .12))!important;
      width:190px!important;
      height:calc(var(--banner-height) * .76)!important;
      max-width:190px!important;
      max-height:none!important;
      border:0!important;
      border-radius:0!important;
      box-shadow:none!important;
      background:transparent!important;
    }
    .flyer-graphic.ticker #flyerMedia.visible{display:block}
    .flyer-graphic.ticker #flyerMedia img{object-fit:contain!important}
    .flyer-graphic.ticker #flyerQrCard{
      right:180px!important;
      bottom:calc(42px + (var(--banner-height) * .07))!important;
      width:calc(var(--banner-height) * .86)!important;
      height:calc(var(--banner-height) * .86)!important;
      max-width:210px;max-height:210px;
    }
    .flyer-graphic.ticker.graphic-rail .flyer-accent,.flyer-graphic.ticker.graphic-split .flyer-accent{
      left:210px!important;right:auto!important;bottom:42px!important;height:var(--banner-height)!important;border-radius:18px 0 0 18px;width:10px;
    }
    .flyer-graphic.ticker.graphic-underline .flyer-line{left:430px!important;bottom:62px!important;width:600px!important}
    .flyer-graphic.ticker.graphic-frame .flyer-panel{left:210px!important;bottom:42px!important;width:1560px!important;height:var(--banner-height)!important;max-height:none!important;border-radius:18px}
    .flyer-graphic.ticker.graphic-corner .flyer-corner{right:162px;top:auto;bottom:calc(42px + var(--banner-height) - 70px)}
    .flyer-graphic.ticker.graphic-pill .flyer-badge{left:430px;top:auto;bottom:calc(42px + var(--banner-height) - 32px)}
    .flyer-graphic.ticker.premium .flyer-shade,.flyer-graphic.ticker.clean .flyer-shade,.flyer-graphic.ticker.worship .flyer-shade,.flyer-graphic.ticker.kinetic .flyer-shade{inset:auto 150px 42px 210px;height:var(--banner-height)}
    .flyer-graphic.ticker.clean .flyer-shade{background:linear-gradient(90deg,#f8fafcf4,#e5e7ebf2);border-color:#11182722}
    .flyer-graphic.ticker.clean #flyerTitleOut,.flyer-graphic.ticker.clean #flyerSloganOut,.flyer-graphic.ticker.clean .flyer-meta{color:#111827;text-shadow:none}
    .flyer-graphic.ticker.worship .flyer-shade{background:linear-gradient(105deg,#090b12fa,#172033f3)}
    .flyer-graphic.ticker.kinetic .flyer-shade{background:linear-gradient(100deg,#06070b 0 20%,var(--flyer-primary) 20% 22%,#0b0d14 22%)}
    
    /* S8: definitive responsive geometry for adjustable banners.
       These rules intentionally override the legacy fixed-position declarations. */
    .flyer-graphic.banner .flyer-shade{
      inset:auto 0 var(--responsive-bottom,0) 0!important;
      height:var(--banner-height)!important;
    }
    .flyer-graphic.premium.banner .flyer-shade{
      left:80px!important;right:80px!important;bottom:var(--responsive-bottom,25px)!important;
    }
    .flyer-graphic.banner .flyer-content{
      left:var(--responsive-content-left)!important;
      right:auto!important;
      bottom:calc(var(--responsive-bottom,0px) + var(--responsive-pad-y,20px))!important;
      width:var(--responsive-content-width)!important;
      height:calc(var(--banner-height) - (var(--responsive-pad-y,20px) * 2))!important;
      min-height:0!important;
      display:flex!important;
      flex-direction:column!important;
      justify-content:center!important;
      overflow:hidden!important;
    }
    .flyer-graphic.banner .flyer-eyebrow{margin:0 0 clamp(4px,calc(var(--banner-height)*.025),10px)!important;line-height:1!important}
    .flyer-graphic.banner #flyerTitleOut{max-width:100%!important;max-height:none!important;line-height:.94!important;overflow:visible!important}
    .flyer-graphic.banner .flyer-meta{margin-top:clamp(4px,calc(var(--banner-height)*.035),12px)!important;line-height:1!important;flex-shrink:0}
    .flyer-graphic.banner #flyerQrCard{
      right:var(--responsive-asset-right)!important;
      bottom:calc(var(--responsive-bottom,0px) + ((var(--banner-height) - var(--responsive-qr-size,0px))/2))!important;
      width:var(--responsive-qr-size)!important;
      height:var(--responsive-qr-size)!important;
      padding:clamp(5px,calc(var(--banner-height)*.035),14px)!important;
    }
    .flyer-graphic.banner #flyerQrCard span{font-size:clamp(7px,calc(var(--banner-height)*.035),11px)!important;margin-top:clamp(2px,calc(var(--banner-height)*.018),8px)!important}
    .flyer-graphic.banner #flyerMedia{
      left:auto!important;
      right:var(--responsive-media-right,var(--responsive-asset-right))!important;
      top:auto!important;
      bottom:calc(var(--responsive-bottom,0px) + ((var(--banner-height) - var(--responsive-media-height,0px))/2))!important;
      width:var(--responsive-media-width)!important;
      height:var(--responsive-media-height)!important;
      max-width:none!important;max-height:none!important;
    }
    .flyer-graphic.banner.graphic-frame .flyer-panel{
      left:calc(var(--responsive-content-left) - 30px)!important;
      bottom:calc(var(--responsive-bottom,0px) + 10px)!important;
      width:calc(var(--responsive-content-width) + 60px)!important;
      height:calc(var(--banner-height) - 20px)!important;
    }
    .flyer-graphic.banner.graphic-rail .flyer-accent,.flyer-graphic.banner.graphic-split .flyer-accent{
      bottom:calc(var(--responsive-bottom,0px) + 12px)!important;
      height:calc(var(--banner-height) - 24px)!important;
    }
    
    .flyer-graphic.ticker .flyer-shade{
      inset:auto 150px var(--responsive-bottom,42px) 210px!important;
      height:var(--banner-height)!important;
    }
    .flyer-graphic.ticker .flyer-content{
      left:var(--responsive-content-left)!important;
      right:auto!important;
      bottom:calc(var(--responsive-bottom,42px) + 12px)!important;
      width:var(--responsive-content-width)!important;
      height:calc(var(--banner-height) - 24px)!important;
      min-height:0!important;
      display:flex!important;flex-direction:column!important;justify-content:center!important;
      overflow:hidden!important;
    }
    .flyer-graphic.ticker #flyerTitleOut{max-width:100%!important;max-height:none!important;overflow:visible!important;line-height:1!important}
    .flyer-graphic.ticker #flyerSloganOut{max-width:100%!important;margin-top:clamp(3px,calc(var(--banner-height)*.025),9px)!important;line-height:1.1!important}
    .flyer-graphic.ticker .flyer-meta{margin-top:clamp(3px,calc(var(--banner-height)*.025),10px)!important;line-height:1!important}
    .flyer-graphic.ticker #flyerMedia{
      left:var(--responsive-media-left)!important;right:auto!important;top:auto!important;
      bottom:calc(var(--responsive-bottom,42px) + ((var(--banner-height) - var(--responsive-media-height,0px))/2))!important;
      width:var(--responsive-media-width)!important;height:var(--responsive-media-height)!important;
      max-width:none!important;max-height:none!important;
    }
    .flyer-graphic.ticker #flyerQrCard{
      right:var(--responsive-qr-right)!important;
      bottom:calc(var(--responsive-bottom,42px) + ((var(--banner-height) - var(--responsive-qr-size,0px))/2))!important;
      width:var(--responsive-qr-size)!important;height:var(--responsive-qr-size)!important;
      padding:clamp(5px,calc(var(--banner-height)*.035),14px)!important;
    }
    .flyer-graphic.ticker #flyerQrCard span{font-size:clamp(7px,calc(var(--banner-height)*.035),11px)!important;margin-top:clamp(2px,calc(var(--banner-height)*.018),8px)!important}
    .flyer-graphic.ticker.graphic-rail .flyer-accent,.flyer-graphic.ticker.graphic-split .flyer-accent{
      bottom:var(--responsive-bottom,42px)!important;height:var(--banner-height)!important;
    }
    .flyer-graphic.ticker.graphic-frame .flyer-panel{
      bottom:var(--responsive-bottom,42px)!important;height:var(--banner-height)!important;
    }
    
    
    /* S9: palette-driven banners and protected supporting typography */
    .flyer-graphic{--flyer-surface:#0b0e16;--flyer-text:#fff;--flyer-muted:#e5e7eb}
    .flyer-graphic.banner .flyer-shade,.flyer-graphic.ticker .flyer-shade{background:linear-gradient(105deg,color-mix(in srgb,var(--flyer-surface) 96%,var(--flyer-primary) 4%),var(--flyer-surface) 58%,color-mix(in srgb,var(--flyer-surface) 90%,var(--flyer-accent) 10%))!important;border-color:color-mix(in srgb,var(--flyer-primary) 28%,transparent)!important}
    .flyer-graphic.banner #flyerTitleOut,.flyer-graphic.ticker #flyerTitleOut{color:var(--flyer-text)!important}
    .flyer-graphic.banner #flyerSloganOut,.flyer-graphic.ticker #flyerSloganOut,.flyer-graphic.banner .flyer-meta,.flyer-graphic.ticker .flyer-meta{color:var(--flyer-muted)!important;text-shadow:0 2px 13px color-mix(in srgb,var(--flyer-surface) 88%,transparent)!important}
    .flyer-graphic.banner .flyer-eyebrow,.flyer-graphic.ticker .flyer-eyebrow{color:var(--flyer-accent)!important}
    .flyer-graphic.banner .flyer-content,.flyer-graphic.ticker .flyer-content{gap:0!important}
    .flyer-graphic.banner #flyerSloganOut{margin-top:clamp(4px,calc(var(--banner-height)*.024),10px)!important;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex-shrink:0}
    .flyer-graphic.banner .flyer-meta,.flyer-graphic.ticker .flyer-meta{font-weight:700!important;letter-spacing:-.01em!important;white-space:nowrap;flex-shrink:0}
    .flyer-graphic.ticker #flyerSloganOut{font-weight:500!important}
    .flyer-graphic.ticker .flyer-dot{color:var(--flyer-accent)!important}
    .flyer-graphic.banner.graphic-frame .flyer-panel,.flyer-graphic.ticker.graphic-frame .flyer-panel{background:color-mix(in srgb,var(--flyer-surface) 82%,transparent)!important;border-color:color-mix(in srgb,var(--flyer-primary) 35%,transparent)!important}
    
    
    /* S10: optional slogan, readable supporting copy and CG surface transparency */
    .flyer-graphic.banner .flyer-shade,.flyer-graphic.ticker .flyer-shade{
      opacity:var(--flyer-cg-opacity,.96)!important;
    }
    .flyer-graphic.banner.no-slogan #flyerSloganOut,.flyer-graphic.ticker.no-slogan #flyerSloganOut{display:none!important}
    .flyer-graphic.banner.no-slogan .flyer-meta,.flyer-graphic.ticker.no-slogan .flyer-meta{margin-top:clamp(5px,calc(var(--banner-height)*.035),12px)!important}
    .flyer-graphic.banner #flyerSloganOut,.flyer-graphic.ticker #flyerSloganOut{
      min-font-size:17px;
      opacity:1!important;
    }
    .flyer-graphic.banner .flyer-meta,.flyer-graphic.ticker .flyer-meta{opacity:1!important}
    
    
    /* Scripture S11: composiciones de overlay */
    #bibleBanner.format-center-lower{width:min(calc(var(--width) * var(--geometry-scale-x)),calc(1320px * var(--geometry-scale-x)));min-height:calc(300px * var(--geometry-scale-y))}
    #bibleBanner.format-center-lower .content{padding-left:calc(58px * var(--geometry-scale-x));padding-right:calc(58px * var(--geometry-scale-x))}
    #bibleBanner.format-center-lower #verse{max-width:calc(1160px * var(--geometry-scale-x))}
    
    #bibleBanner.format-left-column,#bibleBanner.format-right-column{bottom:90px;width:min(calc(var(--width) * var(--geometry-scale-x)),calc(820px * var(--geometry-scale-x)));height:calc(760px * var(--geometry-scale-y));min-height:0;display:flex;align-items:flex-end}
    #bibleBanner.format-left-column{left:80px;transform:translateY(18px)}
    #bibleBanner.format-right-column{left:auto;right:80px;transform:translateY(18px)}
    #bibleBanner.format-left-column.visible,#bibleBanner.format-right-column.visible{transform:none}
    #bibleBanner.format-left-column.soft-out,#bibleBanner.format-right-column.soft-out{transform:translateY(4px)}
    #bibleBanner.format-left-column.chapter-out,#bibleBanner.format-right-column.chapter-out{transform:translateY(20px)}
    #bibleBanner.format-left-column.book-out,#bibleBanner.format-right-column.book-out{transform:translateY(28px) scale(.985)}
    #bibleBanner.format-left-column .content,#bibleBanner.format-right-column .content{text-align:left;padding:calc(44px * var(--geometry-scale-y)) calc(52px * var(--geometry-scale-x)) calc(48px * var(--geometry-scale-y))}
    #bibleBanner.format-left-column #reference,#bibleBanner.format-right-column #reference{margin-left:0;margin-right:0}
    #bibleBanner.format-left-column .divider,#bibleBanner.format-right-column .divider{margin-left:0;width:72%}
    #bibleBanner.format-left-column #verse,#bibleBanner.format-right-column #verse{margin-left:0;max-width:calc(710px * var(--geometry-scale-x))}
    #bibleBanner.format-left-column .gradient,#bibleBanner.format-right-column .gradient{inset:auto -40px -90px -40px;height:calc(720px * var(--geometry-scale-y));background:linear-gradient(to top,rgba(var(--gradient-color),var(--gradient-strength)) 0%,rgba(var(--gradient-color),.76) 38%,rgba(var(--gradient-color),.15) 78%,rgba(var(--gradient-color),0) 100%)}
    #bibleBanner.format-left-column.edge-fade .gradient,#bibleBanner.format-right-column.edge-fade .gradient{-webkit-mask-image:none;mask-image:none}
    
    #bibleBanner.format-fullscreen{left:calc(150px / var(--geometry-scale-x));right:calc(150px / var(--geometry-scale-x));bottom:150px;width:auto;height:calc(780px * var(--geometry-scale-y));min-height:0;transform:translateY(18px);display:flex;align-items:center}
    #bibleBanner.format-fullscreen.visible{transform:none}
    #bibleBanner.format-fullscreen.soft-out{transform:translateY(4px)}
    #bibleBanner.format-fullscreen.chapter-out{transform:translateY(20px)}
    #bibleBanner.format-fullscreen.book-out{transform:translateY(28px) scale(.985)}
    #bibleBanner.format-fullscreen .content{padding:calc(90px * var(--geometry-scale-y)) calc(130px * var(--geometry-scale-x));text-align:center}
    #bibleBanner.format-fullscreen #reference{font-size:calc(var(--title-size) * 1.15)}
    #bibleBanner.format-fullscreen #verse{max-width:1420px;font-size:calc(var(--body-size) * 1.12)}
    #bibleBanner.format-fullscreen .gradient{inset:-80px -150px -150px;height:auto;background:radial-gradient(ellipse at center,rgba(var(--gradient-color),calc(var(--gradient-strength) * .86)) 0%,rgba(var(--gradient-color),calc(var(--gradient-strength) * .62)) 48%,rgba(var(--gradient-color),0) 82%)}
    #bibleBanner.format-fullscreen.edge-fade .gradient{-webkit-mask-image:none;mask-image:none}
    
    #bibleBanner.format-minimal{min-height:calc(210px * var(--geometry-scale-y))}
    #bibleBanner.format-minimal .divider{display:none}
    #bibleBanner.format-minimal #reference{font-size:calc(var(--title-size) * .72);margin-bottom:10px;letter-spacing:.08em}
    #bibleBanner.format-minimal .content{padding-top:calc(18px * var(--geometry-scale-y));padding-bottom:calc(24px * var(--geometry-scale-y));text-shadow:0 3px 18px #000e}
    #bibleBanner.format-minimal .gradient{height:min(var(--gradient-height),330px);background:linear-gradient(to bottom,rgba(var(--gradient-color),0),rgba(var(--gradient-color),calc(var(--gradient-strength) * .72)) 100%)}
    
    
    /* BMMS Scripture S12 — true visual styles, independent from spatial formats */
    #bibleBanner{--scripture-accent:var(--line-color);--scripture-panel:rgba(5,7,12,.86);--scripture-panel-soft:rgba(13,16,25,.62)}
    #bibleBanner .content{transition:padding .22s ease,background .22s ease,border .22s ease,border-radius .22s ease,box-shadow .22s ease,backdrop-filter .22s ease}
    #bibleBanner #reference,#bibleBanner #verse,#bibleBanner .divider{transition:all .22s ease}
    
    /* Classic Gradient — preserves the stable production look. */
    #bibleBanner.style-classic .content{background:transparent;border:0;box-shadow:none;backdrop-filter:none}
    
    /* Editorial Frame — structured, magazine-like hierarchy. */
    #bibleBanner.style-editorial .content{
      background:linear-gradient(115deg,rgba(8,10,16,.94),rgba(17,20,30,.84));
      border:1px solid rgba(255,255,255,.18);border-left:calc(6px * var(--geometry-scale-x)) solid var(--line-color);
      border-radius:calc(18px * var(--geometry-scale-y));padding-top:calc(34px * var(--geometry-scale-y));padding-bottom:calc(38px * var(--geometry-scale-y));
      box-shadow:0 24px 70px rgba(0,0,0,.42);text-align:left;text-shadow:none
    }
    #bibleBanner.style-editorial #reference{display:inline-flex;width:max-content;margin:0 0 18px;padding:9px 14px;border-radius:999px;background:var(--line-color);color:#0b0d12;font-size:calc(var(--title-size)*.62);letter-spacing:.12em}
    #bibleBanner.style-editorial .divider{width:100%;height:1px;margin:0 0 20px;background:linear-gradient(90deg,var(--line-color),transparent)}
    #bibleBanner.style-editorial #verse{max-width:none;margin:0;text-align:left;font-weight:600}
    #bibleBanner.style-editorial .gradient{opacity:.58}
    
    /* Worship Glow — soft light, generous air, contemplative tone. */
    #bibleBanner.style-worship .content{padding-top:calc(42px * var(--geometry-scale-y));padding-bottom:calc(46px * var(--geometry-scale-y));text-shadow:0 3px 24px rgba(0,0,0,.86)}
    #bibleBanner.style-worship .gradient{background:radial-gradient(ellipse at 50% 100%,rgba(var(--gradient-color),var(--gradient-strength)) 0%,rgba(var(--gradient-color),.62) 42%,rgba(var(--gradient-color),.16) 72%,rgba(var(--gradient-color),0) 100%)}
    #bibleBanner.style-worship #reference{font-size:calc(var(--title-size)*.72);font-weight:600;letter-spacing:.22em;opacity:.92}
    #bibleBanner.style-worship .divider{width:86px;height:3px;border-radius:999px;background:linear-gradient(90deg,transparent,var(--line-color),transparent)}
    #bibleBanner.style-worship #verse{font-weight:500;letter-spacing:.005em;max-width:1380px}
    
    /* Broadcast Clean — compact TV-safe panel and crisp information hierarchy. */
    #bibleBanner.style-broadcast .content{
      background:rgba(7,10,16,.94);border-top:calc(3px * var(--geometry-scale-y)) solid var(--line-color);border-radius:calc(12px * var(--geometry-scale-y));
      padding-top:calc(24px * var(--geometry-scale-y));padding-bottom:calc(28px * var(--geometry-scale-y));box-shadow:0 18px 48px rgba(0,0,0,.48);text-align:left;text-shadow:none
    }
    #bibleBanner.style-broadcast #reference{margin:0 0 10px;font-size:calc(var(--title-size)*.68);letter-spacing:.08em}
    #bibleBanner.style-broadcast .divider{width:100%;height:1px;margin:0 0 14px;background:rgba(255,255,255,.24)}
    #bibleBanner.style-broadcast #verse{max-width:none;margin:0;text-align:left;font-size:calc(var(--body-size)*.92);font-weight:600}
    #bibleBanner.style-broadcast .gradient{display:none}
    
    /* Glass Scripture — true frosted card, not merely a relocated gradient. */
    #bibleBanner.style-glass .content{
      background:linear-gradient(135deg,rgba(18,22,34,.72),rgba(8,11,18,.54));
      border:1px solid rgba(255,255,255,.22);border-radius:calc(28px * var(--geometry-scale-y));
      box-shadow:0 28px 90px rgba(0,0,0,.48),inset 0 1px rgba(255,255,255,.12);
      backdrop-filter:blur(22px) saturate(1.15);padding-top:calc(38px * var(--geometry-scale-y));padding-bottom:calc(42px * var(--geometry-scale-y))
    }
    #bibleBanner.style-glass #reference{font-size:calc(var(--title-size)*.82);letter-spacing:.12em}
    #bibleBanner.style-glass .divider{height:1px;width:min(760px,68%);background:linear-gradient(90deg,transparent,var(--line-color),transparent)}
    #bibleBanner.style-glass #verse{max-width:1420px}
    #bibleBanner.style-glass .gradient{opacity:.35}
    
    /* Kinetic Accent — angular, youthful and intentionally high-impact. */
    #bibleBanner.style-kinetic .content{
      background:linear-gradient(110deg,rgba(5,7,12,.96) 0 62%,rgba(14,18,28,.82));
      border-radius:calc(8px * var(--geometry-scale-y));padding-top:calc(30px * var(--geometry-scale-y));padding-bottom:calc(34px * var(--geometry-scale-y));padding-left:calc((var(--padding-x) + 32px) * var(--geometry-scale-x));
      box-shadow:0 22px 64px rgba(0,0,0,.5);text-align:left;text-shadow:none;overflow:hidden
    }
    #bibleBanner.style-kinetic .content:before{content:"";position:absolute;left:0;top:0;bottom:0;width:calc(18px * var(--geometry-scale-x));background:linear-gradient(180deg,var(--line-color),rgba(255,255,255,.15));transform:skewX(-8deg);transform-origin:top}
    #bibleBanner.style-kinetic #reference{display:inline-block;margin:0 0 16px;padding:8px 13px;background:var(--line-color);color:#080a0f;font-size:calc(var(--title-size)*.64);letter-spacing:.1em;transform:skewX(-6deg)}
    #bibleBanner.style-kinetic .divider{display:none}
    #bibleBanner.style-kinetic #verse{max-width:none;margin:0;text-align:left;font-weight:700;letter-spacing:-.025em}
    #bibleBanner.style-kinetic .gradient{opacity:.38}
    
    /* Style/format compatibility: each visual language follows every geometry. */
    #bibleBanner.format-left-column.style-editorial .content,#bibleBanner.format-right-column.style-editorial .content,
    #bibleBanner.format-left-column.style-broadcast .content,#bibleBanner.format-right-column.style-broadcast .content,
    #bibleBanner.format-left-column.style-kinetic .content,#bibleBanner.format-right-column.style-kinetic .content{padding:42px 46px 48px}
    #bibleBanner.format-fullscreen.style-editorial .content,#bibleBanner.format-fullscreen.style-broadcast .content,#bibleBanner.format-fullscreen.style-kinetic .content{text-align:center}
    #bibleBanner.format-fullscreen.style-editorial #reference,#bibleBanner.format-fullscreen.style-broadcast #reference,#bibleBanner.format-fullscreen.style-kinetic #reference{margin-left:auto;margin-right:auto}
    #bibleBanner.format-fullscreen.style-editorial #verse,#bibleBanner.format-fullscreen.style-broadcast #verse,#bibleBanner.format-fullscreen.style-kinetic #verse{text-align:center}
    #bibleBanner.format-minimal.style-editorial .content,#bibleBanner.format-minimal.style-broadcast .content,#bibleBanner.format-minimal.style-glass .content,#bibleBanner.format-minimal.style-kinetic .content{padding-top:24px;padding-bottom:28px}
    
    #version{margin-top:12px;color:var(--text-color);font-family:var(--body-font);font-size:18px;font-weight:600;opacity:.62}#bibleBanner.no-version #version{display:none}
    
    
    /* Scripture TV Broadcast CG — final television-style design. */
    #bibleBanner.style-tv {
      --tv-panel-height: calc(188px * var(--geometry-scale-y));
      min-height: var(--tv-panel-height);
    }
    #bibleBanner.style-tv .gradient {
      display: none;
    }
    #bibleBanner.style-tv .content {
      position: relative;
      min-height: var(--tv-panel-height);
      padding: calc(25px * var(--geometry-scale-y)) calc(56px * var(--geometry-scale-x)) calc(24px * var(--geometry-scale-y)) calc(122px * var(--geometry-scale-x));
      overflow: visible;
      border: 1px solid rgba(255,255,255,.16);
      border-radius: 10px;
      background:
        linear-gradient(105deg, rgba(5,8,14,.99), rgba(19,23,33,.97) 44%, rgba(40,44,54,.96));
      box-shadow: 0 22px 58px rgba(0,0,0,.46);
      text-align: left;
      text-shadow: none;
    }
    #bibleBanner.style-tv .content::before {
      content: "";
      position: absolute;
      z-index: 1;
      left: 0;
      top: 0;
      width: 72px;
      height: 100%;
      background: linear-gradient(168deg, #ffffff 0 34%, #dfe3e8 35% 41%, #080b11 42% 100%);
      clip-path: polygon(0 0,100% 0,58% 100%,0 100%);
    }
    #bibleBanner.style-tv .content::after {
      content: "";
      position: absolute;
      z-index: 0;
      left: 55px;
      top: 0;
      bottom: 0;
      width: 110px;
      background: linear-gradient(90deg, rgba(255,255,255,.12), transparent);
      transform: skewX(-10deg);
    }
    #bibleBanner.style-tv #reference,
    #bibleBanner.style-tv #verse,
    #bibleBanner.style-tv #version,
    #bibleBanner.style-tv .divider {
      position: relative;
      z-index: 2;
    }
    #bibleBanner.style-tv #reference {
      display: inline-flex;
      width: max-content;
      max-width: calc(100% - 20px);
      margin: 0 0 12px;
      padding: 7px 15px 6px;
      background: #ffffff;
      color: #05080e;
      font-size: calc(var(--title-size) * .68);
      font-style: italic;
      font-weight: 900;
      letter-spacing: .085em;
      line-height: 1;
      transform: skewX(-6deg);
    }
    #bibleBanner.style-tv .divider {
      display: none;
    }
    #bibleBanner.style-tv #verse {
      width: 100%;
      max-width: none;
      margin: 0;
      font-weight: 700;
      line-height: 1.08;
      letter-spacing: -.025em;
      text-align: left;
    }
    #bibleBanner.style-tv #version {
      position: absolute;
      right: 24px;
      bottom: 12px;
      margin: 0;
      font-size: 14px;
      opacity: .5;
    }
    #bibleBanner.format-left-column.style-tv .content,
    #bibleBanner.format-right-column.style-tv .content {
      min-height: 300px;
      padding: 52px 44px 44px 92px;
    }
    #bibleBanner.format-fullscreen.style-tv .content {
      min-height: 320px;
      padding: 56px 92px 52px 150px;
    }
    #bibleBanner.format-minimal.style-tv .content {
      min-height: 150px;
    }
    
    /* Exact embedded preview: one real 1920x1080 stage, scaled once. */
    body.preview-output {
      position: relative;
      background: transparent;
    }
    body.preview-output #stage {
      position: absolute;
      left: var(--preview-offset-x, 0px);
      top: var(--preview-offset-y, 0px);
      width: 1920px;
      height: 1080px;
      transform: scale(var(--preview-scale, 1));
      transform-origin: top left;
    }
    
    
    /* Update 018.1 — the lateral-space control is authoritative everywhere. */
    #bibleBanner .content {
      padding-left: var(--padding-x);
      padding-right: var(--padding-x);
    }
    
    #bibleBanner.format-center-lower .content {
      padding-left: var(--padding-x);
      padding-right: var(--padding-x);
    }
    
    #bibleBanner.format-left-column .content,
    #bibleBanner.format-right-column .content {
      padding-left: var(--padding-x);
      padding-right: var(--padding-x);
    }
    
    #bibleBanner.format-fullscreen .content {
      padding-left: var(--padding-x);
      padding-right: var(--padding-x);
    }
    
    #bibleBanner.style-kinetic .content {
      padding-left: calc(var(--padding-x) + 32px);
      padding-right: var(--padding-x);
    }
    
    #bibleBanner.style-tv .content {
      padding-left: calc(var(--padding-x) + 50px);
      padding-right: var(--padding-x);
    }
    
    #bibleBanner.format-left-column.style-tv .content,
    #bibleBanner.format-right-column.style-tv .content {
      padding-left: calc(var(--padding-x) + 34px);
      padding-right: var(--padding-x);
    }
    
    #bibleBanner.format-fullscreen.style-tv .content {
      padding-left: calc(var(--padding-x) + 62px);
      padding-right: var(--padding-x);
    }
    
    /* Never clip the verse itself. The fitting engine remains responsible for
       fitting it inside the available panel width. */
    #verse {
      overflow: visible;
      min-width: 0;
    }
    
    .verse-line {
      max-width: 100%;
    }
    
    
    /* Update 019: preview and output use the identical 1920 × 1080 document. */
    body.preview-output #stage {
      position: relative;
      left: 0;
      top: 0;
      width: 1920px;
      height: 1080px;
      transform: none;
    }
    
    /* The content box—not a legacy 1500px cap—defines available verse width. */
    #verse,
    #bibleBanner.style-tv #verse,
    #bibleBanner.style-broadcast #verse,
    #bibleBanner.style-editorial #verse,
    #bibleBanner.style-worship #verse,
    #bibleBanner.style-glass #verse,
    #bibleBanner.style-kinetic #verse {
      width: 100%;
      max-width: none;
      min-width: 0;
      overflow: visible;
    }
    
    /* "Espacio lateral" is the final authority after all legacy template rules. */
    #bibleBanner .content,
    #bibleBanner.format-lower .content,
    #bibleBanner.format-center-lower .content,
    #bibleBanner.format-left-column .content,
    #bibleBanner.format-right-column .content,
    #bibleBanner.format-fullscreen .content,
    #bibleBanner.format-minimal .content {
      padding-left: var(--padding-x);
      padding-right: var(--padding-x);
    }
    
    #bibleBanner.style-tv .content {
      padding-left: calc(var(--padding-x) + 50px);
      padding-right: var(--padding-x);
    }
    #bibleBanner.style-kinetic .content {
      padding-left: calc(var(--padding-x) + 32px);
      padding-right: var(--padding-x);
    }
    
    .verse-line {
      display: block;
      width: 100%;
      max-width: 100%;
      white-space: nowrap;
    }
    
    
    /* Hotfix 023 — authoritative verse size. */
    #bibleBanner #verse {
      font-size: var(--body-size);
      overflow: visible;
    }
    #bibleBanner.style-tv {
      height: auto;
    }
    #bibleBanner.style-tv .content {
      height: auto;
      max-height: none;
    }
    #bibleBanner.style-tv #verse {
      max-height: none;
      overflow: visible;
    }
    
    
    
    
    
    /* Update 025 — geometry-only composition scaling.
       Text is never transformed or proportionally distorted. */
    #bibleBanner #reference,
    #bibleBanner #verse,
    #bibleBanner #version {
      transform: none;
    }
    #bibleBanner .verse-line {
      transform: none;
    }
    
  operator: 'match'
  stack: |-
    TestContext.<anonymous> (file:///mnt/data/bmms-update-026/BMMS-PROJECT/tests/scripture-core/scripture-update-026.test.js:27:10)
    Test.runInAsyncScope (node:async_hooks:214:14)
    Test.run (node:internal/test_runner/test:1047:25)
    Test.start (node:internal/test_runner/test:944:17)
    startSubtestAfterBootstrap (node:internal/test_runner/harness:296:17)
  ...
# Subtest: preview supports zoom, large view and fullscreen
ok 75 - preview supports zoom, large view and fullscreen
  ---
  duration_ms: 0.529487
  type: 'test'
  ...
# Subtest: ProPresenter connection has global persistent storage
ok 76 - ProPresenter connection has global persistent storage
  ---
  duration_ms: 0.173902
  type: 'test'
  ...
# Subtest: normalizes a verse and creates a stable id
ok 77 - normalizes a verse and creates a stable id
  ---
  duration_ms: 1.645608
  type: 'test'
  ...
# Subtest: requires verse text
ok 78 - requires verse text
  ---
  duration_ms: 0.35443
  type: 'test'
  ...
# Subtest: stable id changes when content changes
ok 79 - stable id changes when content changes
  ---
  duration_ms: 0.232093
  type: 'test'
  ...
# Subtest: parses a Spanish Scripture reference
ok 80 - parses a Spanish Scripture reference
  ---
  duration_ms: 1.339685
  type: 'test'
  ...
# Subtest: extracts a reference from the first line
ok 81 - extracts a reference from the first line
  ---
  duration_ms: 0.78762
  type: 'test'
  ...
1..81
# tests 81
# suites 0
# pass 80
# fail 1
# cancelled 0
# skipped 0
# todo 0
# duration_ms 744.07356

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
Scripture geometry persistence: OK
Manual Preview: OK
ProPresenter global persistence: OK
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
  duration_ms: 3.943552
  type: 'test'
  ...
# Subtest: editor animation playback uses requestAnimationFrame
ok 2 - editor animation playback uses requestAnimationFrame
  ---
  duration_ms: 2.984116
  type: 'test'
  ...
# Subtest: publishes a versioned event envelope
ok 3 - publishes a versioned event envelope
  ---
  duration_ms: 1.700511
  type: 'test'
  ...
# Subtest: registers and resolves a service
ok 4 - registers and resolves a service
  ---
  duration_ms: 0.689512
  type: 'test'
  ...
# Subtest: rejects duplicate registrations
ok 5 - rejects duplicate registrations
  ---
  duration_ms: 0.327215
  type: 'test'
  ...
# Subtest: normalizes an animation configuration
ok 6 - normalizes an animation configuration
  ---
  duration_ms: 1.030732
  type: 'test'
  ...
# Subtest: provides enter and exit animation defaults
ok 7 - provides enter and exit animation defaults
  ---
  duration_ms: 0.286384
  type: 'test'
  ...
# Subtest: creates slide keyframes
ok 8 - creates slide keyframes
  ---
  duration_ms: 0.489924
  type: 'test'
  ...
# Subtest: disabled animations produce no keyframes
ok 9 - disabled animations produce no keyframes
  ---
  duration_ms: 0.80617
  type: 'test'
  ...
# Subtest: lists built-in broadcast components
ok 10 - lists built-in broadcast components
  ---
  duration_ms: 1.558582
  type: 'test'
  ...
# Subtest: creates a Scripture component with shared component identity
ok 11 - creates a Scripture component with shared component identity
  ---
  duration_ms: 2.822603
  type: 'test'
  ...
# Subtest: creates a Lower Third component with live bindings
ok 12 - creates a Lower Third component with live bindings
  ---
  duration_ms: 0.562143
  type: 'test'
  ...
# Subtest: generic component factory rejects unknown components
ok 13 - generic component factory rejects unknown components
  ---
  duration_ms: 0.440515
  type: 'test'
  ...
# Subtest: gets nested values by path
ok 14 - gets nested values by path
  ---
  duration_ms: 0.823131
  type: 'test'
  ...
# Subtest: resolves single and double brace tokens
ok 15 - resolves single and double brace tokens
  ---
  duration_ms: 0.216915
  type: 'test'
  ...
# Subtest: resolves binding text elements without mutating source
ok 16 - resolves binding text elements without mutating source
  ---
  duration_ms: 0.312049
  type: 'test'
  ...
# Subtest: resolves documents and lists tokens
ok 17 - resolves documents and lists tokens
  ---
  duration_ms: 0.660134
  type: 'test'
  ...
# Subtest: creates normalized text elements
ok 18 - creates normalized text elements
  ---
  duration_ms: 3.07454
  type: 'test'
  ...
# Subtest: updates and removes elements immutably
ok 19 - updates and removes elements immutably
  ---
  duration_ms: 1.165762
  type: 'test'
  ...
# Subtest: reorders layers
ok 20 - reorders layers
  ---
  duration_ms: 1.038438
  type: 'test'
  ...
# Subtest: normalization preserves grouping metadata
ok 21 - normalization preserves grouping metadata
  ---
  duration_ms: 1.180071
  type: 'test'
  ...
# Subtest: undoes and redoes document commits
ok 22 - undoes and redoes document commits
  ---
  duration_ms: 1.277729
  type: 'test'
  ...
# Subtest: creates and categorizes templates
ok 23 - creates and categorizes templates
  ---
  duration_ms: 2.977136
  type: 'test'
  ...
# Subtest: duplicates templates with a new identity
ok 24 - duplicates templates with a new identity
  ---
  duration_ms: 0.380895
  type: 'test'
  ...
# Subtest: instantiates templates with new element and group ids
ok 25 - instantiates templates with new element and group ids
  ---
  duration_ms: 0.489541
  type: 'test'
  ...
# Subtest: updates metadata without replacing the stored document
ok 26 - updates metadata without replacing the stored document
  ---
  duration_ms: 0.291504
  type: 'test'
  ...
# Subtest: Scripture defaults to manual source
ok 27 - Scripture defaults to manual source
  ---
  duration_ms: 0.700298
  type: 'test'
  ...
# Subtest: ProPresenter settings are globally available
ok 28 - ProPresenter settings are globally available
  ---
  duration_ms: 0.101472
  type: 'test'
  ...
# Subtest: Smart Flyer defaults to assisted automation
ok 29 - Smart Flyer defaults to assisted automation
  ---
  duration_ms: 0.079172
  type: 'test'
  ...
# Subtest: builds manual scripture context
ok 30 - builds manual scripture context
  ---
  duration_ms: 1.745822
  type: 'test'
  ...
# Subtest: uses ProPresenter scripture when selected
ok 31 - uses ProPresenter scripture when selected
  ---
  duration_ms: 0.444493
  type: 'test'
  ...
# Subtest: reads the official status and presentation endpoints
ok 32 - reads the official status and presentation endpoints
  ---
  duration_ms: 2.836013
  type: 'test'
  ...
# Subtest: does not emit a duplicate verse
ok 33 - does not emit a duplicate verse
  ---
  duration_ms: 1.227573
  type: 'test'
  ...
# Subtest: starts disabled by default
ok 34 - starts disabled by default
  ---
  duration_ms: 0.738516
  type: 'test'
  ...
# Subtest: validates port range
ok 35 - validates port range
  ---
  duration_ms: 0.386112
  type: 'test'
  ...
# Subtest: publishes normalized ProPresenter media events
ok 36 - publishes normalized ProPresenter media events
  ---
  duration_ms: 0.546669
  type: 'test'
  ...
# {"timestamp":"2026-07-23T15:11:27.171Z","level":"INFO","scope":"test","message":"Connecting to ProPresenter","context":{"host":"127.0.0.1","port":1025,"protocol":"tcp"}}
# Subtest: tests the connection through the documented system-time endpoint
ok 37 - tests the connection through the documented system-time endpoint
  ---
  duration_ms: 0.911331
  type: 'test'
  ...
# Subtest: connects and subscribes configured streaming endpoints
ok 38 - connects and subscribes configured streaming endpoints
  ---
  duration_ms: 1.816376
  type: 'test'
  ...
# Subtest: normalizes a ProPresenter Scripture payload
ok 39 - normalizes a ProPresenter Scripture payload
  ---
  duration_ms: 1.81526
  type: 'test'
  ...
# Subtest: uses newline-delimited JSON for a real TCP request
ok 40 - uses newline-delimited JSON for a real TCP request
  ---
  duration_ms: 11.519511
  type: 'test'
  ...
# Subtest: receives chunked streaming messages
ok 41 - receives chunked streaming messages
  ---
  duration_ms: 47.241636
  type: 'test'
  ...
# Subtest: applies capped exponential backoff
ok 42 - applies capped exponential backoff
  ---
  duration_ms: 1.151482
  type: 'test'
  ...
# Subtest: normalizes a common current slide payload
ok 43 - normalizes a common current slide payload
  ---
  duration_ms: 2.003279
  type: 'test'
  ...
# Subtest: supports snake case response variants
ok 44 - supports snake case response variants
  ---
  duration_ms: 0.372383
  type: 'test'
  ...
# Subtest: balances text into visually similar lines
ok 45 - balances text into visually similar lines
  ---
  duration_ms: 1.177895
  type: 'test'
  ...
# Subtest: penalizes a one-word final line when a better partition exists
ok 46 - penalizes a one-word final line when a better partition exists
  ---
  duration_ms: 1.522389
  type: 'test'
  ...
# Subtest: reports overflow when minimum font still exceeds the box
ok 47 - reports overflow when minimum font still exceeds the box
  ---
  duration_ms: 0.297547
  type: 'test'
  ...
# Subtest: Scripture includes a default simple-mode design
ok 48 - Scripture includes a default simple-mode design
  ---
  duration_ms: 0.750369
  type: 'test'
  ...
# Subtest: Scripture broadcast state starts safely off air
ok 49 - Scripture broadcast state starts safely off air
  ---
  duration_ms: 0.215522
  type: 'test'
  ...
# Subtest: publishes verse and program events
ok 50 - publishes verse and program events
  ---
  duration_ms: 2.431145
  type: 'test'
  ...
# Subtest: does not mark identical normalized content as changed
ok 51 - does not mark identical normalized content as changed
  ---
  duration_ms: 1.500109
  type: 'test'
  ...
# Subtest: preview iframe is not hidden behind a ready-message race
ok 52 - preview iframe is not hidden behind a ready-message race
  ---
  duration_ms: 1.103738
  type: 'test'
  ...
# Subtest: lateral padding overrides every Scripture format
ok 53 - lateral padding overrides every Scripture format
  ---
  duration_ms: 0.534619
  type: 'test'
  ...
# Subtest: text fitting performs real rendered candidate measurements
ok 54 - text fitting performs real rendered candidate measurements
  ---
  duration_ms: 0.230439
  type: 'test'
  ...
# Subtest: preview initialization cannot abort the whole app
ok 55 - preview initialization cannot abort the whole app
  ---
  duration_ms: 2.454945
  type: 'test'
  ...
# Subtest: saved Scripture state is deeply hydrated
ok 56 - saved Scripture state is deeply hydrated
  ---
  duration_ms: 0.293725
  type: 'test'
  ...
# Subtest: restores original Scripture geometry
ok 57 - restores original Scripture geometry
  ---
  duration_ms: 0.585603
  type: 'test'
  ...
# Subtest: restores writing and contextual transitions
ok 58 - restores writing and contextual transitions
  ---
  duration_ms: 0.129462
  type: 'test'
  ...
# Subtest: restores gradient and typography
ok 59 - restores gradient and typography
  ---
  duration_ms: 0.174714
  type: 'test'
  ...
# Subtest: Scripture restores the original template and format defaults
ok 60 - Scripture restores the original template and format defaults
  ---
  duration_ms: 0.815135
  type: 'test'
  ...
# Subtest: Appearance and animation configuration have usable defaults
ok 61 - Appearance and animation configuration have usable defaults
  ---
  duration_ms: 0.30891
  type: 'test'
  ...
# Subtest: TV Broadcast CG is available in the advanced template library
ok 62 - TV Broadcast CG is available in the advanced template library
  ---
  duration_ms: 2.039124
  type: 'test'
  ...
# Subtest: Scripture output contains the robust fitting engine
ok 63 - Scripture output contains the robust fitting engine
  ---
  duration_ms: 0.44013
  type: 'test'
  ...
# Subtest: Preview uses one scaled 1920 by 1080 stage
ok 64 - Preview uses one scaled 1920 by 1080 stage
  ---
  duration_ms: 0.469343
  type: 'test'
  ...
# Subtest: preview iframe preserves a 1920 by 1080 viewport
ok 65 - preview iframe preserves a 1920 by 1080 viewport
  ---
  duration_ms: 1.592505
  type: 'test'
  ...
# Subtest: overlay no longer polls and rerenders every two seconds
ok 66 - overlay no longer polls and rerenders every two seconds
  ---
  duration_ms: 0.252765
  type: 'test'
  ...
# Subtest: signature excludes volatile ProPresenter timestamps
ok 67 - signature excludes volatile ProPresenter timestamps
  ---
  duration_ms: 0.155167
  type: 'test'
  ...
# Subtest: verse width follows configured lateral padding without a legacy cap
ok 68 - verse width follows configured lateral padding without a legacy cap
  ---
  duration_ms: 0.517088
  type: 'test'
  ...
# Subtest: verse size is authoritative and is never silently reduced
ok 69 - verse size is authoritative and is never silently reduced
  ---
  duration_ms: 0.322308
  type: 'test'
  ...
# Subtest: composition supports independent X and Y scale
ok 70 - composition supports independent X and Y scale
  ---
  duration_ms: 2.00606
  type: 'test'
  ...
# Subtest: broadcast action labels are in Spanish
ok 71 - broadcast action labels are in Spanish
  ---
  duration_ms: 0.914197
  type: 'test'
  ...
# Subtest: composition scaling changes geometry without transform scaling text
ok 72 - composition scaling changes geometry without transform scaling text
  ---
  duration_ms: 1.834424
  type: 'test'
  ...
# Subtest: composition controls use clear Spanish labels
ok 73 - composition controls use clear Spanish labels
  ---
  duration_ms: 0.536484
  type: 'test'
  ...
# Subtest: gradient geometry provides complete bottom control
ok 74 - gradient geometry provides complete bottom control
  ---
  duration_ms: 2.409218
  type: 'test'
  ...
# Subtest: preview supports zoom, large view and fullscreen
ok 75 - preview supports zoom, large view and fullscreen
  ---
  duration_ms: 0.78502
  type: 'test'
  ...
# Subtest: ProPresenter connection has global persistent storage
ok 76 - ProPresenter connection has global persistent storage
  ---
  duration_ms: 0.279433
  type: 'test'
  ...
# Subtest: normalizes a verse and creates a stable id
ok 77 - normalizes a verse and creates a stable id
  ---
  duration_ms: 1.625468
  type: 'test'
  ...
# Subtest: requires verse text
ok 78 - requires verse text
  ---
  duration_ms: 0.388147
  type: 'test'
  ...
# Subtest: stable id changes when content changes
ok 79 - stable id changes when content changes
  ---
  duration_ms: 0.232445
  type: 'test'
  ...
# Subtest: parses a Spanish Scripture reference
ok 80 - parses a Spanish Scripture reference
  ---
  duration_ms: 1.369374
  type: 'test'
  ...
# Subtest: extracts a reference from the first line
ok 81 - extracts a reference from the first line
  ---
  duration_ms: 0.600657
  type: 'test'
  ...
1..81
# tests 81
# suites 0
# pass 81
# fail 0
# cancelled 0
# skipped 0
# todo 0
# duration_ms 642.745334

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

