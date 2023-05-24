import { shallowEqual } from './shallowEqual';

/**
 * Compare two arrays for shallow equality
 * @param array1 Array to compare
 * @param array2 Array to compare
 * @returns `true` if arrays are equal
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function arrIdentical(array1: any[], array2: any[]) {
	let i = array1.length;
	if (i !== array2.length) return false;
	while (i--) {
		if (!shallowEqual(array1[i], array2[i])) return false;
	}
	return true;
}
