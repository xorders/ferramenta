import { detectEnvironment } from '../src/detectEnvironment';

describe('detectEnvironment', () => {
	it('node', () => {
		expect(detectEnvironment()).toBe('node');
	});
});
