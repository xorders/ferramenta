/**
 * Shallow compare two objects
 * @param object1 Object to compare
 * @param object2 Object to compare
 * @returns `true` if objects are equal
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const shallowEqual = (object1: any, object2: any) => {
	if (!object1 || !object2) return false;

	if (typeof object1 !== 'object' && typeof object2 !== 'object') return object1 === object2;
	if (typeof object1 !== typeof object2) return false;
	if (typeof object1 !== 'object' || typeof object2 !== 'object') return false;

	const keys1 = Object.keys(object1);
	const keys2 = Object.keys(object2);

	if (keys1.length !== keys2.length) {
		return false;
	}
	for (const key of keys1) {
		if (object1[key] !== object2[key]) {
			return false;
		}
	}
	return true;
};
