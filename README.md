# Ferramenta Library

[![Release & Publish](https://github.com/xorders/ferramenta/actions/workflows/publish.yml/badge.svg)](https://github.com/xorde-labs/ferramenta/actions/workflows/publish.yml)
[![Tests](https://github.com/xorders/ferramenta/actions/workflows/tests.yml/badge.svg)](https://github.com/xorde-labs/ferramenta/actions/workflows/tests.yml)
[![Typescript](https://img.shields.io/npm/dependency-version/ferramenta/dev/typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/npm/l/ferramenta)](https://opensource.org/license/mit/)
[![Version](https://img.shields.io/npm/v/ferramenta)](https://npmjs.com/ferramenta)

Zero dependencies Node.js/Typescript library of utility functions, and their CLI wrappers.

Contains functions for:
- JSON parsing
- UUID generation
- Extracting method name within a class
- Matching wildcard strings
- Generating and validating Luhn numbers
- Checking for circular references in objects
- CRC16 calculation
- Detecting runtime environment
- Matching arrays
- Casting values to specific types

# Installation

NPM Registry link: https://www.npmjs.com/package/ferramenta

NPM:

```shell
npm i ferramenta
```

Yarn:

```shell
yarn add ferramenta
```

# Functions Reference

Functions reference is available at reference website: [ferramenta.xorde.io](https://ferramenta.xorde.io).

# Command Line Reference

## CLI Wrappers

### get-json-value

This script will parse json file and return value of the property defined by path separated by '.'

Usage: get-json-value <filename> <path>

Arguments:
- filename: any JSON file, example: `package.json`
- path: a property key path within JSON file, example: `parent.child.value`

Examples:

```shell
# package.json contains: {"version":"1.0.0"}
% get-json-value package.json version
> 1.0.0

# package.json contains: {"scripts":{"build":"npm run build-script"}}
% get-json-value package.json scripts.build
> npm run build-script
```

### set-json-value

This script will parse json file and return value of the property defined by path separated by '.'

Usage: set-json-value.js <filename> <path> <value> [options[,options]]

Arguments:
- filename: any JSON file, example: `package.json`
- path: a property key path within JSON file, example: `parent.child.value`
- options:
  - tabs: format output JSON with tabs, otherwise output will be a string JSON without formatting
  - no-except: if conversion fails, do not exit with error, just use string value
  - number: convert value to number (by default, if fails exit with error)
  - object: convert value to object (by default, if fails exit with error)
  - boolean: convert value to boolean, only 'true' or '1' converts to true
  - delete: removes value and its key, provided value argument is ignored and can be anything
  - null: sets null as value, provided value argument is ignored and can be anything

Example:

```shell
% set-json-value.js package.json version 1.2.3 tabs
> Complete

% set-json-value.js package.json scripts.test 'jest --no-cache' tabs
> Complete
```

# Contributing

## Documentation

Documentation is generated automatically using [TypeDoc](https://typedoc.org/).

This approach is used to avoid maintaining documentation in two places: in code and in README.md.

To build documentation locally, run:

```shell
npm run docs:build
```

### Patching documentation

Due to current limitation of Cloudflare where our documentation is hosted, we cannot use `functions` directory to store 
HTML files related to functions reference (see https://github.com/cloudflare/wrangler2/issues/2240). Instead, we use `funcs` directory. To do that we patch TypeDoc output HTML 
files replacing all references to `functions` with `funcs`.

To patch documentation, run:

```shell
npm run docs:patch
```

As soon as this issue is resolved, we will remove this patching step.