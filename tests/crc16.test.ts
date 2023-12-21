import { crc16 } from '../src';

test('string 123456789', () => {
	const crc = crc16(Buffer.from('123456789'));
	expect(crc).toBe(19255);
});

test('string 987654321', () => {
	const crc = crc16(Buffer.from('987654321'));
	expect(crc).toBe(51667);
});
