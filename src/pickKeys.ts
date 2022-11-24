import { TypeNestedKeyOf } from './types/NestedKeysOf';
import { getValueByPath, setValueByPath } from './jsonValueByPath';

const DEFAULT_SEPARATOR = '.';

/**
 * Picks selected properties from the object by dot separated path, i.e. 'a.b.c'
 * @param obj Original object
 * @param path Property path as dot separated string, or array of paths. Example: 'a.b.c' or ['a.b.c', 'a.b.d']
 * @return obj Object with picked properties
 * @example
 * pickKeys({ a: { b: { c: 1, d: 2 } } }, 'a.b.c')
 * // returns { a: { b: { c: 1 } } }
 * pickKeys({ a: { b: { c: 1, d: 2, e: 3 } } }, ['a.b.c', 'a.b.d'])
 * // returns { a: { b: { c: 1, d: 2 } } }
 */
export const pickKeys = <T extends object>(obj: T, path: TypeNestedKeyOf<T>[] | TypeNestedKeyOf<T>) => {
	const accumulator = {};

	(Array.isArray(path) ? path : [String(path)]).forEach((propPath: string) => {
		const pathArray = propPath.split(DEFAULT_SEPARATOR);

		const value = getValueByPath(obj, pathArray);

		if (value !== undefined) {
			setValueByPath(accumulator, pathArray, value);
		}
	});

	return accumulator;
};
