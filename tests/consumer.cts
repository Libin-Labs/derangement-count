import { derangements } from '@lp-labs/derangement-count';
if (derangements(7) !== 1854n) throw new Error('Sequence');
// @ts-expect-error invalid argument must be rejected by declarations
derangements('2');
