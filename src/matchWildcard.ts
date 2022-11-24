/**
 * Transform a wildcard string into a regular expression string.
 * @param wildcard Wildcard string
 * @return Regular expression string
 */
export const wildcardToRegexString = (wildcard: string): string => {
	//eslint-disable-next-line no-useless-escape
	const escapeRegex = (str: string) => str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
	return '^' + wildcard.split('*').map(escapeRegex).join('.*') + '$';
};

/**
 * Matches a string against a wildcard pattern.
 * @param str String to match
 * @param pattern Wildcard pattern
 * @return True if the string matches the wildcard pattern
 * @example
 * matchRule('foo123', 'foo*') // true
 * matchRule('123foo123', '*foo*') // true
 */
export const matchWildcard = (str: string, pattern: string): boolean =>
	new RegExp(wildcardToRegexString(pattern)).test(str);
