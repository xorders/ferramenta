import { packBuffers, unpackBuffers } from '../src';

test('pack buffer', () => {
	const bufferA = Buffer.from('Hello');
	const bufferB = Buffer.from('World');
	expect(packBuffers([bufferA, bufferB]).toString('hex')).toBe('010548656c6c6f05576f726c64');
});

test('unpack buffer', () => {
	const buffer = Buffer.from('010548656c6c6f05576f726c64', 'hex');
	const [bufferA, bufferB] = unpackBuffers(buffer);
	expect(bufferA.toString()).toBe('Hello');
	expect(bufferB.toString()).toBe('World');
});

test('pack and unpack buffer', () => {
	const bufferA = Buffer.from('Hello');
	const bufferB = Buffer.from('World');
	const buffer = packBuffers([bufferA, bufferB]);
	const [bufferC, bufferD] = unpackBuffers(buffer);
	expect(bufferC.toString()).toBe('Hello');
	expect(bufferD.toString()).toBe('World');
});

test('pack and unpack data > 255 length', () => {
	const bufferA = Buffer.alloc(256, 'a');
	const bufferB = Buffer.alloc(256, 'b');
	const buffer = packBuffers([bufferA, bufferB]);
	const [bufferC, bufferD] = unpackBuffers(buffer);
	expect(bufferC.toString()).toBe(bufferA.toString());
	expect(bufferD.toString()).toBe(bufferB.toString());
});

test('pack and unpack data > 100000 length', () => {
	const bufferA = Buffer.alloc(100000, 'a');
	const bufferB = Buffer.alloc(100000, 'b');
	const buffer = packBuffers([bufferA, bufferB]);
	const [bufferC, bufferD] = unpackBuffers(buffer);
	expect(bufferC.toString()).toBe(bufferA.toString());
	expect(bufferD.toString()).toBe(bufferB.toString());
});
