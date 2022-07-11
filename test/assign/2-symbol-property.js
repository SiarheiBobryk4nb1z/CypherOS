const assert = require('assert').strict;
const {assign} = require('../../');

const sA = Symbol('symbol-a');
const sB = Symbol('symbol-b');
const sC = Symbol('symbol-c');
const obj = {};
const result = assign(obj, sA, sB, sC, 100);
assert.equal(obj[sA][sB][sC], 100);
assert.equal(result[sC], 100);
