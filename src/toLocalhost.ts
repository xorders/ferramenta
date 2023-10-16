/**
 * Replaces local IP with localhost
 * @param str String to replace
 * @example
 * toLocalhost('https://127.0.0.1:80/test?q#h');
 * // returns 'https://localhost:80/test?q#h'
 * @returns String with replaced IP
 * */
export const toLocalhost = (str: string) => {
	// Playground: https://regex101.com/r/vIE8X1/1
	// URI Scheme Syntax: https://datatracker.ietf.org/doc/html/rfc1738#section-3.1
	// Acceptable characters in a URI scheme: https://www.rfc-editor.org/rfc/rfc3986#section-2
	const re = /:\/\/(.*:.*@)?(\[?::1]?|127\.[012]?[0-9]{0,2}\.[012]?[0-9]{0,2}\.[012]?[0-9]{0,2})/gi;

	// Replace only second group (that was matched to IP):
	return str.replace(re, '://$1localhost');
};
