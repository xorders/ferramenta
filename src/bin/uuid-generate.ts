#!/usr/bin/env node

/**
 * This script will generate a UUID v4
 */

import * as path from 'path';
import { processArgs } from '../parseScriptProcessArgs';
import { uuid } from '../uuid';

const args = processArgs.args;
const self = path.parse(processArgs.name).name;

if (args.length === 0) {
	// eslint-disable-next-line no-console
	console.log(`
Usage: ${self} <uuid-version>

Example: ${self} 4`);
	process.exit(1);
}

if (Number.isNaN(Number(args[0])) || Number(args[0]) < 1 || Number(args[0]) > 5) {
	// eslint-disable-next-line no-console
	console.log(`
Bad UUID version: ${args[0]}
`);
	process.exit(1);
}

const input = Number(args[0]);

const version = input as 1 | 2 | 3 | 4 | 5;

const value = uuid(version);

// eslint-disable-next-line no-console
value && console.log(typeof value !== 'object' ? value : JSON.stringify(value));
