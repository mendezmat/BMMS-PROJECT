# Update 036.3 Validation

- Repository check: OK
- JavaScript syntax: OK
- Test suite: 99/102
- New regressions detected: 0
- Known historical failures retained: 3 Scripture state/output tests

## Regression focus

- Blank slide resets deduplication identity.
- Returning to the same verse after a blank is processed again.
- Three consecutive request failures trigger automatic reconnection.
- Polling uses progressive backoff during failures.
- Diagnostics use native HTML disclosure and remain operable independently of the live loop.
