const assert = require('assert').strict;
const {assignIfUndef} = require('../../');

const obj1 = {};
const result1a = assignIfUndef(obj1, 'a', 'b', 'c', null);
assert.deepEqual(obj1, {a: {b: {c: null}}});
assert.deepEqual(result1a, {c: null});
const result1b = assignIfUndef(obj1, 'a', 'b', 'c', 100);
assert.deepEqual(obj1, {a: {b: {c: null}}});
assert.deepEqual(result1b, {c: null});

const obj2 = {};
const result2a = assignIfUndef(obj2, 'a', 'b', 'c', undefined);
assert.deepEqual(obj2, {a: {b: {c: undefined}}});
assert.deepEqual(result2a, {c: undefined});
const result2b = assignIfUndef(obj2, 'a', 'b', 'c', 200);
assert.deepEqual(obj2, {a: {b: {c: 200}}});
assert.deepEqual(result2b, {c: 200});
