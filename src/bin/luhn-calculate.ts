#!/usr/bin/env node

/**
 * This script will calculate Luhn check digit for the numerical input
 */

import * as path from 'path';
import { processArgs } from '../parseScriptProcessArgs';
import { luhnCheckDigit } from '../luhn';

const args = processArgs.args;
const self = path.parse(processArgs.name).name;

if (args.length === 0) {
	// eslint-disable-next-line no-console
	console.log(`
Usage: ${self} <numerical-value>

Example: ${self} 1234567890`);
	process.exit(1);
}

const input = args[0];

const value = luhnCheckDigit(input);

// eslint-disable-next-line no-console
value && console.log(typeof value !== 'object' ? value : JSON.stringify(value));
