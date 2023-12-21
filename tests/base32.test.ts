import { base32decode, base32encode } from '../src';

const base32strings = [
	['', ''],
	['f', 'MY======'],
	['fo', 'MZXQ===='],
	['foo', 'MZXW6==='],
	['foob', 'MZXW6YQ='],
	['fooba', 'MZXW6YTB'],
	['foobar', 'MZXW6YTBOI======'],
	['12345', 'GEZDGNBV'],
	['1234567890', 'GEZDGNBVGY3TQOJQ'],
	['     ', 'EAQCAIBA'],
];

describe('base32encode', () => {
	test.each(base32strings)('encode "%s" => "%s"', (input, output) => {
		expect(base32encode(Buffer.from(input))).toBe(output);
	});

	test.each(base32strings)('decode "%s" <= "%s"', (input, output) => {
		expect(base32decode(output).toString()).toBe(input);
	});
});
