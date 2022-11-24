type ValidTypes = number | boolean | object | string | null | undefined;
type TypeOfValidTypes = string | undefined;

export const ValidTypesArray = ['number', 'boolean', 'object', 'string', 'null', 'delete', 'undefined'];
export const isValidType = (type: string): boolean => ValidTypesArray.includes(type);

export const stringToValidTypeString = (type: string): string => {
	switch (type) {
		case 'number':
			return 'number';
		case 'boolean':
			return 'boolean';
		case 'object':
			return 'object';
		case 'string':
			return 'string';
		case 'null':
			return 'null';
		case 'delete':
		case 'undefined':
			return 'undefined';
		default:
			return 'string';
	}
};

/**
 * Casts value to type
 * @param value String value to cast
 * @param type Type to cast to as string of 'number', 'boolean', 'object', 'string', 'null', 'delete', 'undefined'
 * @param suppressExceptions If true, do not throw exceptions, just return value as string
 * Example: castValueToType('1', 'number'); // returns 1
 */
export const castValueToType = (value: string, type: TypeOfValidTypes, suppressExceptions = false): ValidTypes => {
	switch (type) {
		case 'number':
			if (isNaN(Number(value))) {
				if (suppressExceptions) return value;
				else throw new Error(`Value '${value}' is not a number`);
			} else return Number(value);
		case 'boolean':
			return value === 'true' || value === '1';
		case 'object':
			try {
				return JSON.parse(value);
			} catch (err) {
				if (suppressExceptions) return value;
				else throw new Error(`Value '${value}' is not a valid JSON object (${err})`);
			}
		case 'string':
		case undefined:
			return value;
		case 'null':
			return null;
		default:
			return undefined;
	}
};
