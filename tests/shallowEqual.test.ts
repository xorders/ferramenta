import { shallowEqual } from '../src';

const objectA = { a: 1, b: 2, c: 3 };
const objectLikeA = { a: 1, b: 2, c: 3 };
const objectB = { a: 1, b: 2, c: 4 };
const objectC = { a: 1, b: 2, c: 3, d: 4 };
const objectD = { a: 1, b: 2, c: '3' };

test('compare identical objects', () => {
	expect(shallowEqual(objectA, objectLikeA)).toBe(true);
});

test('compare different objects', () => {
	expect(shallowEqual(objectA, objectB)).toBe(false);
	expect(shallowEqual(objectA, objectC)).toBe(false);
	expect(shallowEqual(objectA, objectD)).toBe(false);
});
