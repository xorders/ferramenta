import { matchWildcard } from '../src';

test('match_one_wildcard', () => {
	const rule = 'foo*';
	const str = 'foo123';
	expect(matchWildcard(str, rule)).toBe(true);
});

test('match_one_wildcard_inside', () => {
	const rule = 'foo*bar';
	const str = 'foo123bar';
	expect(matchWildcard(str, rule)).toBe(true);
});

test('match_one_wildcard_empty', () => {
	const rule = 'foo*';
	const str = 'foo';
	expect(matchWildcard(str, rule)).toBe(true);
});

test('no-match_one_wildcard', () => {
	const rule = 'foo*';
	const str = 'bar123';
	expect(matchWildcard(str, rule)).toBe(false);
});

test('match_two_wildcards', () => {
	const rule = '*foo*';
	const str = '123foo123';
	expect(matchWildcard(str, rule)).toBe(true);
});

test('match_two_wildcards-empty', () => {
	const rule = '*foo*';
	const str = 'foo';
	expect(matchWildcard(str, rule)).toBe(true);
});

test('no-match_two_wildcards', () => {
	const rule = '*foo*';
	const str = '123bar123';
	expect(matchWildcard(str, rule)).toBe(false);
});
