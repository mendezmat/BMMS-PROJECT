import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const css = fs.readFileSync(new URL('../apps/graphics/public/styles.css', import.meta.url), 'utf8');

test('Smart Flyer operator result uses intrinsic CG height instead of a 16:9 monitor', () => {
  assert.match(css, /grid-template-rows:\s*minmax\(0,\s*1fr\)\s*auto\s*!important/);
  assert.match(css, /height:\s*clamp\(108px,\s*14vh,\s*154px\)\s*!important/);
  assert.match(css, /aspect-ratio:\s*auto\s*!important/);
});
