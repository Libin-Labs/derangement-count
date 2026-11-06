function finite(value: number, min = -Number.MAX_VALUE, max = Number.MAX_VALUE): number {
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new TypeError('Expected finite number');
  if (value < min || value > max) throw new RangeError('Number outside supported bounds');
  return value;
}
function integer(value: number, min = 0, max = 1000000): number {
  if (!Number.isSafeInteger(value)) throw new RangeError('Expected safe integer');
  return finite(value, min, max);
}
export function derangements(n: number): bigint {
  integer(n, 0, 1000);
  let a = 1n,
    b = 0n;
  if (n === 0) return a;
  for (let i = 2; i <= n; i++) {
    const next = BigInt(i - 1) * (a + b);
    a = b;
    b = next;
  }
  return b;
}
