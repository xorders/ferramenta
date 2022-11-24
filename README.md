# Ferramenta Library

[![Release & Publish](https://github.com/xorders/ferramenta/actions/workflows/publish.yml/badge.svg)](https://github.com/xorde-labs/ferramenta/actions/workflows/publish.yml)
[![Tests](https://github.com/xorders/ferramenta/actions/workflows/tests.yml/badge.svg)](https://github.com/xorde-labs/ferramenta/actions/workflows/tests.yml)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

NodeJS/Typescript library of utility functions, and their CLI wrappers.

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
