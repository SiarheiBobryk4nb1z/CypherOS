const assert = require('assert').strict;
const {assign} = require('../../');

const obj1 = {};
const result1a = assign(obj1, 'a', 'b', 'c', 100);
assert.deepEqual(obj1, {a: {b: {c: 100}}});
assert.deepEqual(result1a, {c: 100});

const result1b = assign(obj1, 'a', 'b', 'c', 'd', 101);
assert.deepEqual(obj1, {a: {b: {c: {d: 101}}}});
assert.deepEqual(result1b, {d: 101});
