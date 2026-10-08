const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

// Tests run against the BUILD OUTPUT (dist/), i.e. the artifact from workflow 1.
const dist = path.join(__dirname, '..', 'dist');

test('dist contains build info', () => {
  const info = JSON.parse(fs.readFileSync(path.join(dist, 'build-info.json'), 'utf8'));
  assert.ok(info.version);
  assert.ok(info.commit);
});

test('greet() default', () => {
  const { greet } = require(path.join(dist, 'greeter.js'));
  assert.strictEqual(greet(), 'Hello, world!');
});

test('greet() with name', () => {
  const { greet } = require(path.join(dist, 'greeter.js'));
  assert.strictEqual(greet('CI'), 'Hello, CI!');
});
