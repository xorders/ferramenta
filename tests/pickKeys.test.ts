import { pickKeys } from '../src';
import { circularObject, simpleNestedObject } from './data/testObjects';

/**
 *
 */
test('one_element-root_level', () => {
	expect(pickKeys(simpleNestedObject, 'n')).toEqual({
		n: simpleNestedObject.n,
	});
});

/**
 *
 */
test('multi_elements-root_level', () => {
	expect(pickKeys(simpleNestedObject, ['n', 'b'])).toEqual({
		n: simpleNestedObject.n,
		b: simpleNestedObject.b,
	});
});

/**
 *
 */
test('multi_elements-multi_levels', () => {
	expect(pickKeys(simpleNestedObject, ['n', 'b', 'o.s', 'o.n', 'o.b'])).toEqual({
		n: simpleNestedObject.n,
		b: simpleNestedObject.b,
		o: {
			s: simpleNestedObject.o.s,
			n: simpleNestedObject.o.n,
			b: simpleNestedObject.o.b,
		},
	});
});

/**
 * Tests that the function does not throw an error when a circular object is passed.
 */
test('circular_object', () => {
	expect(pickKeys(circularObject(), 'child')).toEqual({ child: circularObject().child });
});
