#!/usr/bin/env node

/**
 * This script will parse json file and return value of the property defined by path separated by '.'
 */

import * as fs from 'fs';
import { castValueToType, isValidType } from '../castValueToType';
import { setValueByPath } from '../jsonValueByPath';

const args = process.argv.slice(2);

if (args.length === 0) {
	// eslint-disable-next-line no-console
	console.log(`
Usage: set-json-value.js <filename> <property-path> <property-value> [options[,options]]
  filename: any JSON file, example: package.json
  path: path within JSON, example: parent.child.value
  value: any value, can be string, number or object, example:
    string - example: 'test'
    number - example: 1 or '1' or 1.2345 or '1.2345'
    object - example: '{"a":1,"b":"2"}'
  options, example: tabs,number
    tabs - format output JSON with tabs, otherwise output will be a string JSON without formatting
    no-except - if conversion fails, do not exit with error, just use string value
    number - convert value to number (by default, if fails exit with error)
    object - convert value to object (by default, if fails exit with error)
    boolean - convert value to boolean, only 'true' or '1' converts to true
    delete - removes value and its key, provided value argument is ignored and can be anything
    null - sets null as value, provided value argument is ignored and can be anything

Example: set-json-value.js package.json version 1.2.3 tabs`);
	process.exit(1);
}

const jsonFilename = args[0];
const jsonPaths = args[1].split('.');
const jsonValue = args[2];
const jsonOpts = args[3]?.split(',') || [];

const jsonObj = JSON.parse(fs.readFileSync(jsonFilename).toString());

try {
	const json = setValueByPath(
		jsonObj,
		jsonPaths,
		castValueToType(
			jsonValue,
			jsonOpts.find((f) => isValidType(f)),
			jsonOpts.includes('no-except'),
		),
	);

	try {
		fs.writeFileSync(jsonFilename, JSON.stringify(json, null, jsonOpts.includes('tabs') ? '\t' : ''));
	} catch (e) {
		// eslint-disable-next-line no-console
		console.error(`Error writing file ${jsonFilename}: ${e}`);
		process.exit(3);
	}

	// eslint-disable-next-line no-console
	console.log('Complete');
} catch (e) {
	// eslint-disable-next-line no-console
	console.error(`'Error setting value: ${jsonValue}'`, e);
	process.exit(2);
}
