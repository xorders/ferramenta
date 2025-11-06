/**
 * Tests that undefined argument are parsed correctly.
 */
import { promiseWithTimeout } from '../src';
import { DEFAULT_TIMEOUT_ERROR_TEXT } from '../src/promiseWithTimeout';

test('Instant promise: resolve', async () => {
	const instantPromise = new Promise((resolve) => resolve(true));
	const timeoutPromise = await promiseWithTimeout(instantPromise, 1000);

	expect(timeoutPromise).toEqual(true);
});

test('Delayed promise: resolve', async () => {
	const delayedPromise = new Promise((resolve) => setTimeout(() => resolve(true), 100));
	const timeoutPromise = await promiseWithTimeout(delayedPromise, 1000);

	expect(timeoutPromise).toEqual(true);
});

test('Delayed promise: rejects', async () => {
	const delayedPromise = new Promise((resolve) =>
		setTimeout(() => {
			console.log('resolving promise');
			resolve(true);
		}, 10000),
	);

	await expect(promiseWithTimeout(delayedPromise, 1000)).rejects.toEqual(new Error(DEFAULT_TIMEOUT_ERROR_TEXT));
});
