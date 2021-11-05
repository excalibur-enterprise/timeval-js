# @excalibur-enterprise/timeval-js

![GitHub issues](https://img.shields.io/github/issues/excalibur-enterprise/timeval-js)

# Isomorphic timeout / interval wrappers for both Node JS & Browser

This simple `setTimeout` wrapper is written in TypeScript and works both for browser and Node.

## Table of Contents
* [Installation](#installation)
* [Documentation](#documentation)
	* [Instantiation](#instantiation)
	* [clear](#clear)
	* [refresh](#refresh)
	* [unref](#unref)

## Installation

```bash
npm i @excalibur-enterprise/timeval-js
```

## Documentation

### Instantiation

Timeout class instantiation is made by constructor with params.

Prototype:
```ts
constructor( private callback: () => void, private ms: number );
```

Params:
* `callback`: Callback invoked once timeout expire
* `ms`: Time of expiry in milliseconds

Example:
```ts
import { Timeout } from '@excalibur-enterprise/timeval-js';

const timeout = new Timeout( () =>
{
	console.log( 'Timeout expired!' );
}, 5000 );
```

### clear

Clears timeout.

Prototype:
```ts
public clear(): void
```

Example:
```ts
import { Timeout } from '@excalibur-enterprise/timeval-js';

const timeout = new Timeout( () =>
{
	// This never gets called
	console.log( 'Timeout expired!' );
}, 5000 );

new Timeout( () =>
{
	// Clears first timeout before it expires
	timeout.clear();
}, 3000 );
```

### refresh

Refreshes timeout as it is newly created with same expiry time.

Prototype:

```ts
public refresh(): void
```

Example:

```ts
import { Timeout } from '@excalibur-enterprise/timeval-js';

const timeout = new Timeout( () =>
{
	console.log( 'Timeout expired!' );
}, 5000 );

// Refreshes previous timeout object after 3 seconds, so it gets expired after 8 seconds
new Timeout( () =>
{
	timeout.refresh();
}, 3000 );
```

### unref

When called, the active Timeout object will not require the Node.js event loop to remain active.

> Has effect only when run under Node

Prototype:

```ts
public unref(): void
```

Example:

```ts
import { Timeout } from '@excalibur-enterprise/timeval-js';

const timeout = new Timeout( () =>
{
	console.log( 'Timeout expired!' );
}, 5000 );

// Do not require the Node.js event loop to remain active
timeout.unref();
```
