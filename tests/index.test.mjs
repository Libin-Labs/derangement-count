import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('reference prefix', () => {
  assert.deepEqual(
    Array.from({ length: 8 }, (_, i) => api.derangements(i)),
    [1n, 0n, 1n, 2n, 9n, 44n, 265n, 1854n],
  );
});
test('zero index', () => {
  assert.equal(api.derangements(0), 1n);
});
test('recurrence or independent count', () => {
  function brute(n) {
    let total = 0;
    function visit(p, used) {
      if (p === n) {
        total++;
        return;
      }
      for (let j = 0; j < n; j++)
        if (j !== p && !used.has(j)) {
          used.add(j);
          visit(p + 1, used);
          used.delete(j);
        }
    }
    visit(0, new Set());
    return total;
  }
  for (let n = 0; n <= 7; n++) assert.equal(api.derangements(n), BigInt(brute(n)));
});
test('upper bound', () => {
  assert.equal(typeof api.derangements(1000), 'bigint');
});
test('invalid ranges', () => {
  assert.throws(() => api.derangements(-1));
  assert.throws(() => api.derangements(1001));
  assert.throws(() => api.derangements(1.5));
});
test('type contract', () => {
  assert.throws(() => api.derangements('2'));
});
