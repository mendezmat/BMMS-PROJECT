import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const server = fs.readFileSync(new URL('../apps/graphics/server.js', import.meta.url), 'utf8');

test('server exposes Smart Flyer Vision Engine browser module', () => {
  assert.match(server, /url\.pathname === "\/smart-flyer-vision\.js"/);
  assert.match(server, /serveFile\(response, "smart-flyer-vision\.js", "text\/javascript; charset=utf-8"\)/);
});
