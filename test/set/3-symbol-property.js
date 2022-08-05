const assert = require('assert').strict;
const {set} = require('../../');

const sA = Symbol('symbol-a');
const sB = Symbol('symbol-b');
const sC = Symbol('symbol-c');
const obj = set({}, sA, sB, sC, 100);
set(obj, String(sA), String(sB), String(sC), 200);
assert.equal(obj[sA][sB][sC], 100);
assert.equal(obj[String(sA)][String(sB)][String(sC)], 200);
