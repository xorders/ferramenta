export type PascalCaseOptions = {
	/** If true, abbreviations will be kept as-is. */
	keepAbbreviations: boolean;
};

/**
 * Converts a string to PascalCase.
 * @param str String to convert.
 * @param options Conversion options.
 * @returns The converted string.
 */
export const toPascalCase = (str: string, options?: PascalCaseOptions): string => {
	const { keepAbbreviations = false } = options ?? {};

	// return str
	// 	.replace(/[^A-Za-z]+/g, ' ')
	// 	.replace(/[^\w\s]/g, '')
	// 	.replace(/\s+(.)(\w+)/g, ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`)
	// 	.replace(/\s/g, '')
	// 	.replace(keepAbbreviations ? /([A-Z])\w/ : /\w/, (s) => s.toUpperCase());

	return (
		str
			// .split(/[^A-Za-z0-9]+/g)
			.split(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~\s]/g)
			.map((s) => {
				return keepAbbreviations && s.toUpperCase() === s ? s : s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
			})
			.join('')
	);
};
