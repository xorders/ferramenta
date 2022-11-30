#!/usr/bin/env node

/**
 * This script will parse json file and return value of the property defined by path separated by '.'
 */

import * as fs from 'fs';
import * as path from 'path';
import { getValueByPath } from '../jsonValueByPath';
import { processArgs } from '../parseScriptProcessArgs';

const args = processArgs.args;
const self = path.parse(processArgs.name).name;

if (args.length === 0) {
	// eslint-disable-next-line no-console
	console.log(`
Usage: ${self} <filename> <property-path>

Example: ${self} package.json version`);
	process.exit(1);
}

const jsonFilename = args[0];
const jsonPaths = args[1].split('.');

const json = JSON.parse(fs.readFileSync(jsonFilename).toString());
const value = getValueByPath(json, jsonPaths);

// eslint-disable-next-line no-console
value && console.log(typeof value !== 'object' ? value : JSON.stringify(value));
