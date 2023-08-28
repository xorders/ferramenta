/**
 * Calculates the Luhn check digit for the input.
 * @param input Input string
 * @returns Luhn check digit
 */
export const luhnCheckDigit = (input: string): number => {
	const digits = input
		.replace(/\D/g, '')
		.split('')
		.reverse()
		.map((digit) => parseInt(digit, 10));
	const sum = digits.reduce((acc, digit, index) => {
		if (index % 2 === 0) {
			const doubled = digit * 2;
			return acc + (doubled > 9 ? doubled - 9 : doubled);
		} else {
			return acc + digit;
		}
	}, 0);
	return (sum * 9) % 10;
};

/**
 * Returns true if the input passes the Luhn algorithm.
 * @param input Input string
 * @returns `true` if the input passes the Luhn algorithm
 */
export const luhnValid = (input: string): boolean => {
	const checkDigit = luhnCheckDigit(input.slice(0, -1)).toString();
	return checkDigit === input.slice(-1);
};
