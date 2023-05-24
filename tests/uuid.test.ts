import { isValidUUID, uuid } from '../src';

describe('isValidUUID', () => {
	test('valid v1', () => {
		expect(isValidUUID('2444f0b0-b38a-11ed-9552-07fd8fe745ac', 1)).toBe(true);
	});

	test('invalid v1', () => {
		expect(isValidUUID('2444f0b0-b38a-01ed-9552-07fd8fe745ac', 1)).toBe(false);
	});

	test('valid v2', () => {
		expect(isValidUUID('2444f0b0-b38a-21ed-9552-07fd8fe745ac', 2)).toBe(true);
	});

	test('invalid v2', () => {
		expect(isValidUUID('2444f0b0-b38a-01ed-9552-07fd8fe745ac', 2)).toBe(false);
	});
});

describe('uuid', () => {
	test('valid v1', () => {
		const result = uuid(1);
		expect(isValidUUID(result, 1)).toBe(true);
	});

	test('valid v2', () => {
		const result = uuid(2);
		expect(isValidUUID(result, 2)).toBe(true);
	});
});
