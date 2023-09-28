import { toPascalCase } from '../src';
import { PascalCaseOptions } from '../src/toPascalCase';

type TestCases = Array<[string, string, PascalCaseOptions?]>;

const testCases: TestCases = [
	['a', 'A'],
	['a b c', 'ABC'],
	['  a b c  ', 'ABC'],
	['foo_bar-baz', 'FooBarBaz'],
	['foo.bar.baz', 'FooBarBaz'],
	['foo/bar/baz', 'FooBarBaz'],
	['foo[bar)baz', 'FooBarBaz'],
	['#foo+bar*baz', 'FooBarBaz'],
	['$foo~bar`baz', 'FooBarBaz'],
	['_foo_bar-baz-', 'FooBarBaz'],
	['foo 2 bar 5 baz', 'Foo2Bar5Baz'],
	['foo2bar5baz', 'Foo2bar5baz'],
	['I like NASA', 'ILikeNasa'],
	['I like NASA', 'ILikeNASA', { keepAbbreviations: true }],
	['NASA was founded on 1958', 'NasaWasFoundedOn1958'],
	['NASA was founded on 1958, indeed', 'NASAWasFoundedOn1958Indeed', { keepAbbreviations: true }],
];

testCases.forEach(([input, expected, options]) => {
	test(`toPascalCase("${input}", ${JSON.stringify(options ?? {})}) === "${expected}"`, () => {
		expect(toPascalCase(input, options)).toBe(expected);
	});
});
