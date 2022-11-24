/**
 * Returns a value of an object property by path defined as array of strings, parent element comes first.
 * Example: getValueByPath({parent: {value: 1}}, ['parent', 'value']); // returns value 1
 * @param obj Object to get value from
 * @param paths An array of strings, parent element comes first
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getValueByPath = (obj: any, paths: string[]): any => {
	const path = paths[0];
	if (obj && obj[path] && paths.length > 1 && path) {
		return getValueByPath(obj[path] ? obj[path] : null, paths.slice(1));
	} else {
		return obj[path];
	}
};

type ValidValueType = object | string | number | boolean | null | undefined;

/**
 * Modifies object in place by setting a value for a property by path defined as array of strings, parent element comes first.
 * Example: setValueByPath({parent: {value: 1}}, ['parent', 'value'], 2); // returns object {parent: {value: 2}}
 * @param obj Object to set value in
 * @param paths An array of strings, parent element comes first
 * @param value Value to set
 * @return Modified object
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setValueByPath = (obj: any, paths: string[], value: ValidValueType) => {
	const path = paths[0];
	if (paths.length > 1) {
		obj[path] = setValueByPath(typeof obj[path] !== 'object' ? {} : obj[path], paths.slice(1), value);
	} else if (paths.length === 1) {
		obj[path] = value;
	}
	return obj;
};
