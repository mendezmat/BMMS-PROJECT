# Update 036.2 Validation

- Version: `1.14.3-beta.14`
- Repository check: OK
- JavaScript syntax: OK
- Test suite: 99/102
- New regressions detected: 0

## Historical failures

The same three pre-existing Scripture tests remain failing. They are unrelated to ProPresenter Live Link diagnostics and were already present in the previous baseline.

## Manual validation checklist

1. Start BMMS and open Scripture.
2. Configure and connect ProPresenter.
3. Start Live.
4. Open `Diagnóstico`.
5. Advance to a new verse and verify `Procesados` increases.
6. Keep the same verse active and verify `Duplicados ignorados` increases.
7. Advance inside the same chapter and verify the transition classification.
8. Confirm the saved Scripture style profiles remain available after content changes.
