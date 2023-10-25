/**
 * Key filter function
 */
export type KeysFilter = (key: string, value: unknown) => boolean;

/**
 * Filter options
 */
export type FilterOptions = {
	filter: KeysFilter | Array<KeysFilter>;
};

export type IndexSignatureObject = {
	[key: string]: unknown;
};

/**
 * Filter keys from an object
 * @return obj: Partial<T> - object with filtered keys
 * @param obj - object to filter
 * @param options - filter options
 * @example
 * filterKeys({ a: 1, b: 2, c: 3 }, { filter: (key, value) => value === 2 })
 * // returns { b: 2 }
 * filterKeys({ a: 1, b: 2, c: 3 }, { filter: (key, value) => key === 'a' })
 * // returns { a: 2 }
 */
export const filterKeys = <T extends IndexSignatureObject>(obj: T, options: FilterOptions): Partial<T> => {
	const { filter } = options;

	// using spread to create a new object (to avoid modification of the original object)
	const o = { ...obj };

	if (!filter || typeof obj !== 'object' || obj === null) {
		return obj;
	}

	const filters = Array.isArray(filter) ? filter : [filter];

	Object.keys(o).forEach((key) => {
		if (!filters.some((filter) => filter(key, obj[key]))) {
			delete o[key];
		}
	});

	return o;
};
