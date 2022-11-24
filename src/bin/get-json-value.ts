#!/usr/bin/env node

/**
 * This script will parse json file and return value of the property defined by path separated by '.'
 * Example: get-json-value package.json version
 */

import * as fs from 'fs';
import { getValueByPath } from '../jsonValueByPath';

const args = process.argv.slice(2);

if (args.length === 0) {
	// eslint-disable-next-line no-console
	console.log(`
Usage: get-json-value <filename> <property-path>

Example: get-json-value package.json version`);
	process.exit(1);
}

const jsonFilename = args[0];
const jsonPaths = args[1].split('.');

const json = JSON.parse(fs.readFileSync(jsonFilename).toString());
const value = getValueByPath(json, jsonPaths);

// eslint-disable-next-line no-console
value && console.log(typeof value !== 'object' ? value : JSON.stringify(value));
