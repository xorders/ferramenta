import { getValueByPath, setValueByPath } from '../src';

const obj = { a: { b: { c: 1 } } };

test('getvaluebypath:normal', () => {
	expect(getValueByPath(obj, 'a.b.c'.split('.'))).toBe(1);
});

test('getvaluebypath:value-as-object', () => {
	expect(getValueByPath(obj, 'a.b'.split('.'))).toStrictEqual({ c: 1 });
});

test('getvaluebypath:wrong-path', () => {
	expect(getValueByPath(obj, 'a.c'.split('.'))).toStrictEqual(undefined);
});

test('setvaluebypath:normal', () => {
	const expected = { a: { b: { c: 2 } } };
	expect(setValueByPath(obj, 'a.b.c'.split('.'), 2)).toStrictEqual(expected);
});

test('setvaluebypath:value-as-object', () => {
	const expected = { a: { b: { c: { d: 1 } } } };
	expect(setValueByPath(obj, 'a.b.c'.split('.'), { d: 1 })).toStrictEqual(expected);
});

test('setvaluebypath:empty-object', () => {
	const expected = { a: { b: { c: { d: 1 } } } };
	expect(setValueByPath({}, 'a.b.c'.split('.'), { d: 1 })).toStrictEqual(expected);
});
