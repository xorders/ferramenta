import { luhnCheckDigit, luhnValid } from '../src/luhn';

test('Check 123456789', () => {
	const r = luhnValid('123456789');
	expect(r).toBe(false);
});

test('Check 12345674', () => {
	const r = luhnValid('12345674');
	expect(r).toBe(true);
});

test('Check 8532', () => {
	const r = luhnValid('8532');
	expect(r).toBe(true);
});

test('Calculate 12345678', () => {
	const r = luhnCheckDigit('12345678');
	expect(r).toBe(2);
});

test('Calculate 123456789', () => {
	const r = luhnCheckDigit('123456789');
	expect(r).toBe(7);
});
