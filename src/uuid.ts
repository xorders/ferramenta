import { UUID } from './types/UUID';
import { randomBytes } from 'crypto';

type UUIDVersion = 1 | 2 | 3 | 4 | 5;

const isInteger = (num: number) => (num | 0) === num;

/**
 * Generate a random UUID of the specified version. Defaults to v4.
 * @param [version=4] UUID version, currently only v4 is fully compliant, other versions are using the same algorithm as v4
 * @returns UUID string
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const uuid = (version: UUIDVersion = 4): UUID<any> => {
	if (!isInteger(version) || version < 1 || version > 5) throw new Error('Invalid UUID version');

	// TODO: add support for UUID v1, v2, v3, v5

	// noinspection SpellCheckingInspection
	return `xxxxxxxx-xxxx-${version}xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, (c) => {
		const r = randomBytes(1)[0] % 16 | 0;
		const v = c === 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
};

/**
 * Check if a string is a valid UUID, optionally of a specific version.
 * @param uuid UUID string
 * @param [version=0] UUID version (`0` is special case for any version)
 */
export const isValidUUID = (uuid: string, version: UUIDVersion | 0 = 0): boolean => {
	if (!isInteger(version) || version < 0 || version > 5) throw new Error('Invalid UUID version');

	// Collection of regexes for UUID versions
	const uuidRegexTesters = [
		new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-[12345][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i),
		new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-1[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i),
		new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-2[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i),
		new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i),
		new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i),
		new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i),
	];

	// Test the string against the regex for the specified version (0 is special case for any version)
	return uuidRegexTesters[version].test(uuid);
};
