import { toLocalhost } from '../src';

const testCases = [
	['https://u:pA$$_w0-r~d@127.0.0.1:80/test?q#h', 'https://u:pA$$_w0-r~d@localhost:80/test?q#h'],
	['https://u:p@127.0.0.1:80/test?q#h', 'https://u:p@localhost:80/test?q#h'],
	['https://127.0.0.1:80/test?q#h', 'https://localhost:80/test?q#h'],
	['https://127.0.0.1:80/test?q', 'https://localhost:80/test?q'],
	['https://127.0.0.1:80/test', 'https://localhost:80/test'],
	['https://127.0.0.1:80', 'https://localhost:80'],
	['https://127.0.0.1', 'https://localhost'],
	['https://127.0.0.2:81', 'https://localhost:81'],
	['https://127.0.1.2:82', 'https://localhost:82'],
	['https://127.1.2.3:83', 'https://localhost:83'],
	['https://::1:84', 'https://localhost:84'],
	['https://[::1]:85', 'https://localhost:85'],
];

testCases.forEach(([input, expected]) => {
	test(`Check ${input}`, () => {
		const r = toLocalhost(input);
		expect(r).toBe(expected);
	});
});
