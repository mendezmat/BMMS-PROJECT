# Smart Engine Benchmark

## Objective

Measure whether Smart Engine improves extraction quality and operator workflow compared with manual preparation.

## Test categories

### OCR

- Character accuracy.
- Word accuracy.
- Bounding-box accuracy.
- Stylized-font performance.
- Spanish-language performance.

### Semantic extraction

- Correct title.
- Correct slogan.
- Correct date.
- Correct time.
- Correct location.
- Correct speaker.
- Correct QR detection.
- Correct additional-information retention.

### Layout

- Safe-area compliance.
- Minimum font size.
- Collision count.
- Maximum line count.
- QR readability.
- Operator-rated legibility.

### Workflow

- Total processing time.
- Time to first usable candidate.
- Operator correction time.
- Number of manual corrections.
- Number of rejected candidates.

## Benchmark statuses

- PASS.
- PASS WITH WARNINGS.
- FAIL.
- NOT APPLICABLE.

## Initial benchmark target

A beta release should demonstrate:

- Reliable extraction of the main event title.
- Reliable date and time extraction on supported flyers.
- Preservation of QR codes.
- At least one valid layout candidate.
- Lower median preparation time than fully manual recreation.
