export type ScriptProcessArgs = {
	/** Path to the Node.js executable. */
	exec: string;
	/** Path to the script name being executed. */
	name: string;
	/** Arguments passed to the script. */
	args: string[];
};
