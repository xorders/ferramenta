import { ScriptProcessArgs } from './types/ProcessArgs';

/**
 * Parses process arguments into a typed object.
 * @param args Process arguments (ie `process.argv`).
 * @returns A typed object.
 * @example
 * const scriptName = parseProcessArgs(process.argv).name;
 * const scriptArguments = parseProcessArgs(process.argv).args;
 * const scriptExecutable = parseProcessArgs(process.argv).exec;
 */
export const parseScriptProcessArgs = (args?: string[]): ScriptProcessArgs => {
	const [exec, name, ...rest] = args || [];
	return { exec, name, args: rest };
};

/**
 * Returns current process arguments as a typed object.
 * @returns A typed object.
 * @example
 * const scriptName = processArgs.name;
 * const scriptArguments = processArgs.args;
 * const scriptExecutable = processArgs.exec;
 */
export const processArgs = parseScriptProcessArgs(process.argv);
