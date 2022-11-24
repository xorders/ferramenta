/**
 * Options for the `KeyValue` function.
 */
interface IKeyValueOptions {
	/** Maximum number of keys to return per level */
	maxKeys?: number;
	/** Maximum depth of levels to return, default is 10 */
	maxDepth?: number;
	/** Replacement to return if object is nullified (empty) */
	emptyValue?: string;
	/** Separator to use between key/value pairs, default is ', ' */
	separator?: string;
}

const DEFAULT_DEPTH = 10;

/**
 * Recursively dumps `obj` Object as comma-separated string of key=value pairs
 * Example: v({a:2,b:{c:3}}) = 'a=2, b=(c=3)
 * @param obj {any} Object to dump
 * @param ignoreProps {string[]=} (Optional) Properties to ignore, array of strings
 * @param options {IKeyValueOptions=} (Optional) Options for the function
 */
export const keyValue = <T>(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	obj: T & Record<string, any>,
	ignoreProps?: ((keyof T)[] & string[]) | [],
	options?: IKeyValueOptions,
): string =>
	(options?.maxDepth ?? DEFAULT_DEPTH) > 0
		? Object.keys(obj ?? {})
				.filter((f) => !(ignoreProps || []).includes(f))
				.map((keyName: string, keyIndex: number) => {
					if ((options?.maxKeys && keyIndex < options.maxKeys) || !options?.maxKeys)
						return typeof obj[keyName] === 'object'
							? keyName +
									`=(${keyValue(obj[keyName], ignoreProps, {
										...options,
										maxDepth: (options?.maxDepth ?? DEFAULT_DEPTH) - 1,
									})})`
							: keyName + '=' + obj[keyName];
					else if ((options?.maxKeys && keyIndex === options.maxKeys) || !options?.maxKeys)
						return `...more[${Object.keys(obj).length - options.maxKeys}]`;
				})
				.filter((f) => f !== null)
				.join(options?.separator ?? ', ') ||
		  (options?.emptyValue ?? '')
		: 'MAX_RECURSIVE_LEVELS_REACHED';
