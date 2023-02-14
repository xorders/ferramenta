import { Environment } from './types/Environment';

/**
 * Detects the environment: node, browser or react-native.
 * @returns {Environment} The environment.
 */
export const detectEnvironment = (): Environment => {
	if (typeof window !== 'undefined') {
		if (navigator?.product && navigator.product === 'ReactNative') {
			return 'react-native';
		}
		return 'browser';
	}
	return 'node';
};
