export const csvParse = (text: string, delimiter: string = ','): string[][] => {
	return text.split('\n').map((line) => line.split(delimiter));
};
