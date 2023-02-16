import { arrIdentical } from '../src';

const arrayA = [1, 2, 3];
const arrayLikeA = [1, 2, 3];
const arrayB = [1, 2, '3'];
const arrayC = [1, 2, 3, 4];
const arrayD = [1, 2, 4];

test('compare identical arrays', () => {
	expect(arrIdentical(arrayA, arrayLikeA)).toBe(true);
});

test('compare different arrays', () => {
	expect(arrIdentical(arrayA, arrayB)).toBe(false);
	expect(arrIdentical(arrayA, arrayC)).toBe(false);
	expect(arrIdentical(arrayA, arrayD)).toBe(false);
});
