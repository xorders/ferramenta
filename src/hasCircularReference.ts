/**
 * Determines if an object has circular references.
 * @param object Object to check
 * @return boolean
 */
export const hasCircularReference = (object: object | undefined): boolean => {
	const seenObjects = new WeakMap();

	/** Detect cycle helper function */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const detectCycle = (o: any) => {
		if (typeof o === 'object' && o !== null) {
			if (seenObjects.has(o)) return true;

			seenObjects.set(o, undefined);

			for (const key in o) if (detectCycle(o[key])) return true;
		} else if (Array.isArray(o)) {
			for (const i in o) if (detectCycle(o[i])) return true;
		}

		return false;
	};

	return detectCycle(object);
};
