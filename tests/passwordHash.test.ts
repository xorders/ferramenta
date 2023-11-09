import { generatePasswordHash, verifyPasswordHash } from '../src';

test('passwords_match', async () => {
	const hash = await generatePasswordHash('password');
	expect(await verifyPasswordHash(hash, 'password')).toBe(true);
});

test('passwords_wrong', async () => {
	const hash = await generatePasswordHash('password1');
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
