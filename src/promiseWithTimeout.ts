export const DEFAULT_TIMEOUT_ERROR_TEXT = 'Promise timed out';

/**
 * Promise with timeout
 * @param promise
 * @param ms
 * @param timeoutError
 * @returns A promise that resolves when the input promise resolves or rejects when the input promise rejects or times out.
 * @example
 * const promise = promiseWithTimeout(new Promise((resolve) => resolve('test')), 1000);
 */
export const promiseWithTimeout = <T>(
	promise: Promise<T>,
	ms: number,
	timeoutError = new Error(DEFAULT_TIMEOUT_ERROR_TEXT),
): Promise<T> => {
	// create a promise that rejects in milliseconds
	const timeout = new Promise<never>((_, reject) => {
		setTimeout(() => {
			Object.assign(promise, new Promise(() => {}));
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			promise = null;
			reject(timeoutError);
		}, ms);
	});

	return Promise.race<T>([promise, timeout]);
};
