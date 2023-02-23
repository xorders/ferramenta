import { UUID } from './types/UUID';

type UUIDVersion = 1 | 2 | 3 | 4 | 5;

const isInteger = (num: number) => (num | 0) === num;

/**
 * Generate a UUID
 * @param [version=4] UUID version
 * @returns UUID string
 */
export const uuid = (version: UUIDVersion = 4): UUID<any> => {
	if (!isInteger(version) || version < 1 || version > 5) throw new Error('Invalid UUID version');

	return `xxxxxxxx-xxxx-${version}xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, (c) => {
		const r = (Math.random() * 16) | 0;
		const v = c === 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
};

/**
 * Check if a string is a valid UUID
 * @param uuid UUID string
 * @param version UUID version (0 for any)
 */
export const isValidUUID = (uuid: string, version: UUIDVersion | 0 = 0): boolean => {
	if (!isInteger(version) || version < 0 || version > 5) throw new Error('Invalid UUID version');

	const uuidRegexTesters = [
		new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-[12345][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i),
		new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-[1][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i),
		new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-[2][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i),
		new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-[3][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i),
		new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i),
		new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-[5][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i),
	];

	return uuidRegexTesters[version].test(uuid);
};
