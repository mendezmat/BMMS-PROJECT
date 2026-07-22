# SPEC-007 — BMMS TB Tool

## 1. Purpose

BMMS TB Tool provides a visual alert when activity is detected on a selected talkback microphone or audio input.

The primary use case is a live sound engineer who is not wearing headphones continuously and needs a clear visual indication that another operator is speaking through talkback.

## 2. Core workflow

```text
Select audio input
→ Calibrate noise floor
→ Set sensitivity
→ Monitor
→ Detect talkback activity
→ Display visual alert
```

## 3. Functional requirements

### 3.1 Input selection

- Select available system audio input.
- Display input availability.
- Recover from device disconnect.
- Allow channel selection when the device exposes multiple channels.

### 3.2 Detection

Detection may use:

- RMS level.
- Peak level.
- Gate threshold.
- Hold time.
- Attack and release.
- Optional voice activity detection in future versions.

### 3.3 Visual alert

Initial alert concept:

- Red edge glow or gradient around the screen.
- Adjustable opacity.
- Adjustable thickness.
- Optional full-screen pulse.
- Optional compact floating indicator.
- Test button.
- Enable/disable toggle.

### 3.4 Calibration

The module must provide:

- Noise-floor measurement.
- Recommended threshold.
- Manual threshold adjustment.
- Visual input meter.
- False-trigger reduction.
- Hold time configuration.

## 4. Non-functional requirements

- Detection latency should feel immediate.
- Monitoring must use minimal CPU.
- Alert must remain visible above normal workflow windows where supported.
- Device loss must be clearly reported.
- The tool must function independently from BMMS Graphics.

## 5. Acceptance criteria

- The operator can choose a microphone input.
- Normal room noise does not constantly trigger the alert after calibration.
- Speaking into talkback visibly activates the configured alert.
- Attack, release, threshold, and hold controls are adjustable.
- The tool continues running while other BMMS applications are open.
