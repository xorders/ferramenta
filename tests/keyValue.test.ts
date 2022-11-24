import { keyValue } from '../src';
import { simpleNestedObject } from './data/testObjects';

/**
 *
 */
test('simple', () => {
	expect(keyValue(simpleNestedObject)).toBe('n=1, b=true, o=(s=2, n=3, b=false)');
});

/**
 *
 */
test('with_separator', () => {
	expect(keyValue(simpleNestedObject, [], { separator: ';' })).toBe('n=1;b=true;o=(s=2;n=3;b=false)');
});

/**
 *
 */
test('with_max', () => {
	expect(keyValue(simpleNestedObject, [], { maxKeys: 2 })).toBe('n=1, b=true, ...more[1]');
});

/**
 *
 */
test('with_levels', () => {
	expect(keyValue(simpleNestedObject, [], { maxDepth: 1 })).toBe('n=1, b=true, o=(MAX_RECURSIVE_LEVELS_REACHED)');
});

/**
 *
 */
test('empty_object', () => {
	expect(keyValue({})).toBe('');
});

/**
 *
 */
test('empty_object_with_replacement', () => {
	expect(keyValue({}, [], { emptyValue: 'none' })).toBe('none');
});

/**
 *
 */
test('undefined_object', () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	expect(keyValue(<any>undefined)).toBe('');
});

/**
 *
 */
test('undefined_object_with_replacement', () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	expect(keyValue(<any>undefined, [], { emptyValue: 'none' })).toBe('none');
});
