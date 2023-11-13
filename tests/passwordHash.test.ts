import { compressHash, decompressHash, generatePasswordHash, verifyPasswordHash } from '../src';

test('passwords_match', async () => {
	const hash = await generatePasswordHash('password');
	expect(await verifyPasswordHash(hash, 'password')).toBe(true);
});

test('passwords_wrong', async () => {
	const hash = await generatePasswordHash('password1');
	expect(await verifyPasswordHash(hash, 'password2')).toBe(false);
});

test('passwords_match_base64', async () => {
	const hash = await generatePasswordHash('password', { encoding: 'base64' });
	expect(await verifyPasswordHash(hash, 'password')).toBe(true);
});

test('passwords_wrong_base64', async () => {
	const hash = await generatePasswordHash('password1', { encoding: 'base64' });
	expect(await verifyPasswordHash(hash, 'password2')).toBe(false);
});

test('passwords_match-iterations', async () => {
	const hash = await generatePasswordHash('password', { iterations: 1000 });
	expect(await verifyPasswordHash(hash, 'password')).toBe(true);
});

test('passwords_wrong-iterations', async () => {
	const hash = await generatePasswordHash('password1', { iterations: 1000 });
	expect(await verifyPasswordHash(hash, 'password2')).toBe(false);
});

test('passwords_match-passwordLength', async () => {
	const hash = await generatePasswordHash('password', { passwordLength: 64 });
	expect(await verifyPasswordHash(hash, 'password')).toBe(true);
});

test('compress_password', async () => {
	const hash = await generatePasswordHash('password', { passwordLength: 64 });
	const compressed = compressHash(hash);
	expect(decompressHash(compressed)).toStrictEqual(hash);
});

test('compress_decompress_verify_password', async () => {
	const hash = await generatePasswordHash('password', { passwordLength: 64 });
	const compressed = compressHash(hash);
	expect(await verifyPasswordHash(decompressHash(compressed), 'password')).toStrictEqual(true);
});

test('compress_decompress_verify_password-base64', async () => {
	const hash = await generatePasswordHash('password', { passwordLength: 64, encoding: 'base64' });
	const compressed = compressHash(hash, 'base64');
	expect(await verifyPasswordHash(decompressHash(compressed, 'base64'), 'password')).toStrictEqual(true);
});
