/**
 * Returns the name of the current method (where call to this function was originated)
 * @param suffix Optional suffix to add to method name
 * @return methodName Name of the method
 */
export const methodName = (suffix = ''): string => {
	const err = new Error();
	// We will get the text of the error stack, then get the 3rd line and extract method name from that line:
	const line = (err.stack?.split('\n')[2] ?? '').trim() ?? '';
	const name = line.length > 0 ? line.substring(3, line.substring(4).indexOf(' ') + 4) : '';
	return name + suffix;
};
