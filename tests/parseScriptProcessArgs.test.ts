/**
 *
 */
import { parseScriptProcessArgs } from '../src';
const args = ['node', 'script.js', 'n=1', 'b=true', 'o=(s=2,n=3,b=false)'];

/**
 * Tests that normal arguments are parsed correctly.
 */
test('normal', () => {
	expect(parseScriptProcessArgs(args)).toEqual({
		args: ['n=1', 'b=true', 'o=(s=2,n=3,b=false)'],
		exec: 'node',
		name: 'script.js',
	});
});

/**
 * Tests that empty arguments are parsed correctly.
 */
test('empty', () => {
	expect(parseScriptProcessArgs([])).toEqual({
		args: [],
		exec: undefined,
		name: undefined,
	});
});

/**
 * Tests that undefined argument are parsed correctly.
 */
test('undefined', () => {
	expect(parseScriptProcessArgs(undefined)).toEqual({
		args: [],
		exec: undefined,
		name: undefined,
	});
});
