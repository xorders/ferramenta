import { circularObject, simpleNestedObject } from './data/testObjects';
import { hasCircularReference } from '../src';

/**
 * Tests that circular objects are detected (false-negative).
 */
test('circular_object', () => {
	expect(hasCircularReference(circularObject())).toBe(true);
});

/**
 * Tests that non-circular objects are not detected (false-positive).
 */
test('non_circular_object', () => {
	expect(hasCircularReference(simpleNestedObject)).toBe(false);
});

/**
 * Tests that undefined value do not throw an error.
 */
test('undefined_object', () => {
	expect(hasCircularReference(undefined)).toBe(false);
});
