import { castValueToType } from '../src';

test('castvaluetotype:number', () => {
	expect(castValueToType('2', 'number')).toBe(2);
});

test('castvaluetotype:number-invalid', () => {
	expect(() => castValueToType('2-1', 'number')).toThrow();
});

test('castvaluetotype:number-invalid-no-except', () => {
	expect(castValueToType('2-1', 'number', true)).toBe('2-1');
});

test('castvaluetotype:boolean-as-string', () => {
	expect(castValueToType('true', 'boolean')).toBe(true);
});

test('castvaluetotype:boolean-as-digit', () => {
	expect(castValueToType('1', 'boolean')).toBe(true);
});

test('castvaluetotype:null', () => {
	expect(castValueToType('1', 'null')).toBe(null);
});

test('castvaluetotype:undefined', () => {
	expect(castValueToType('1', 'delete')).toBe(undefined);
});

test('castvaluetotype:string', () => {
	expect(castValueToType('1', undefined)).toBe('1');
});

test('castvaluetotype:object', () => {
	expect(castValueToType('{"a": 1}', 'object')).toStrictEqual({ a: 1 });
});

test('castvaluetotype:object-invalid', () => {
	expect(() => castValueToType('{1: a}', 'object')).toThrow();
});

test('castvaluetotype:object-invalid-no-except', () => {
	expect(castValueToType('{1: a}', 'object', true)).toBe('{1: a}');
});
