import { methodName } from '../src';

class cls {
	classMethod = (suffix?: string) => {
		return methodName(suffix);
	};
}

const arrowFunction = (suffix?: string) => {
	return methodName(suffix);
};

function normalFunction(suffix?: string) {
	return methodName(suffix);
}

/**
 *
 */
test('class_method', () => {
	const obj = new cls();
	expect(obj.classMethod()).toBe('cls.classMethod');
});

/**
 *
 */
test('class_method_suffix', () => {
	const obj = new cls();
	expect(obj.classMethod('-suffix')).toBe('cls.classMethod-suffix');
});

/**
 *
 */
test('normal_function', () => {
	expect(normalFunction()).toBe('normalFunction');
});

/**
 *
 */
test('normal_function_suffix', () => {
	expect(normalFunction('-suffix')).toBe('normalFunction-suffix');
});

/**
 *
 */
test('arrow_function', () => {
	expect(arrowFunction()).toBe('arrowFunction');
});

/**
 *
 */
test('arrow_function_suffix', () => {
	expect(arrowFunction('-suffix')).toBe('arrowFunction-suffix');
});
