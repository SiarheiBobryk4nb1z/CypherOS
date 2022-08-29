const assert = require('assert').strict;
const {put} = require('../../');

const obj1 = {};
const result1a = put(obj1, 'a', 'b', 'c', 100);
assert.deepEqual(obj1, {a: {b: {c: 100}}});
assert.deepEqual(result1a, 100);

const result1b = put(obj1, 'a', 'b', 'c', 'd', 101);
assert.deepEqual(obj1, {a: {b: {c: {d: 101}}}});
assert.deepEqual(result1b, 101);
