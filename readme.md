[![npm version](https://img.shields.io/npm/v/chonker.svg?logo=npm)](https://www.npmjs.com/package/chonker)
[![build status](https://github.com/csimi/chonker/workflows/build/badge.svg)](https://github.com/csimi/chonker/actions)
[![codecov](https://codecov.io/gh/csimi/chonker/branch/master/graph/badge.svg)](https://codecov.io/gh/csimi/chonker)

# About

Chonks your chunks into complete strings with a configurable separator character.

# Usage

Install using npm:

```
$ npm install chonker
```

## EventChonker

```
const { deepStrictEqual } = require('assert');
const { EventChonker } = require('chonker');

const data = [];
const chonker = new EventChonker('\0');
chonker.on('data', data.push.bind(data));

chonker.write('fo');
chonker.write('o\0bar\0');

deepStrictEqual(data, [
	'foo',
	'bar',
]);
```

## StreamChonker

```
const { deepStrictEqual } = require('assert');
const { PassThrough } = require('stream');
const { StreamChonker } = require('chonker');

const data = [];
const chonker = new StreamChonker('|');

const source = new PassThrough();
source.pipe(chonker);
chonker.on('data', data.push.bind(data));

source.write('fo');
source.write('o|bar|');

deepStrictEqual(data, [
	Buffer.from('foo'),
	Buffer.from('bar'),
]);
```
