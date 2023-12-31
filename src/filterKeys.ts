/**
 * Key filter function
 */
export type KeysFilter = (key: string, value: unknown) => boolean;

/**
 * Represents a collection of filter presets for a set of keys.
 */
export type KeysFilterPresets = 'no-falsy' | 'no-empty' | 'no-null' | 'no-undefined';

/**
 * Filter options
 */
export type FilterOptions = {
	/** Filter function */
	filter?: KeysFilter | Array<KeysFilter>;
	/** Filter preset */
	preset?: KeysFilterPresets;
};

export type IndexSignatureObject = {
	[key: string | symbol]: unknown;
};

/**
 * Filters the keys of an object based on provided options.
 * Supports presets:
 *
 * @template T - The type of the object.
 * @param {T} obj - The object to filter.
 * @param {FilterOptions} options - The options for filtering.
 * Available presets: `no-falsy`, `no-empty`, `no-null`, `no-undefined`
 *
 * @returns {Partial<T>} - The filtered object.
 *
 * @example
 * filterKeys({ a: 1, b: 2, c: 3 }, { filter: (key, value) => value === 2 })
 * // returns { b: 2 }
 * filterKeys({ a: 1, b: 2, c: 3 }, { filter: (key, value) => key === 'a' })
 * // returns { a: 2 }
 * filterKeys({ a: 1, b: 2, c: null }, { preset: 'no-null' })
 * // returns { a: 2, b: 2 }
 */
export const filterKeys = <T extends IndexSignatureObject>(obj: T, options: FilterOptions): Partial<T> => {
	const { filter, preset } = options;

	// using spread to create a new object (to avoid modification of the original object)
	const o = { ...obj };

	if ((!filter && !preset) || typeof obj !== 'object' || obj === null) {
		return obj;
	}

	const filters: Array<KeysFilter> = [];

	if (Array.isArray(filter)) {
		filters.concat(filter);
	} else {
		filter && filters.push(filter);
	}

	switch (preset) {
		case 'no-falsy':
			filters.push((key, value) => !!value);
			break;
		case 'no-empty':
			filters.push((key, value) => value !== '');
			break;
		case 'no-null':
			filters.push((key, value) => value !== null);
			break;
		case 'no-undefined':
			filters.push((key, value) => value !== undefined);
			break;
		default:
			break;
	}

	Object.keys(o).forEach((key) => {
		if (!filters.some((filter) => filter(key, obj[key]))) {
			delete o[key];
		}
	});

	return o;
};
