import { filterKeys } from '../src';
import { simpleNestedObject } from './data/testObjects';

/**
 * Simple test to check that the function works.
 */
test('one_element-root_level-value', () => {
	expect(filterKeys(simpleNestedObject, { filter: (_, v) => v === 1 })).toStrictEqual({
		n: simpleNestedObject.n,
	});
});

/**
 * Simple test to check that the function works.
 */
test('one_element-root_level-key', () => {
	expect(filterKeys(simpleNestedObject, { filter: (k) => k === 'n' })).toStrictEqual({
		n: simpleNestedObject.n,
	});
});

/**
 *
 */
test('one_element-root_level-type-number', () => {
	expect(filterKeys(simpleNestedObject, { filter: (_, v) => typeof v === 'number' })).toStrictEqual({
		n: simpleNestedObject.n,
	});
});

/**
 *
 */
test('one_element-root_level-type-boolean', () => {
	expect(
		filterKeys(simpleNestedObject, {
			filter: (_, v) => typeof v === 'boolean',
		}),
	).toStrictEqual({
		b: simpleNestedObject.b,
	});
});

/**
 *
 */
test('one_element-root_level-type-string', () => {
	expect(
		filterKeys(simpleNestedObject.o, {
			filter: (_, v) => typeof v === 'string',
		}),
	).toStrictEqual({
		s: simpleNestedObject.o.s,
	});
});
