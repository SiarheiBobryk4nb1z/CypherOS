const assert = require('assert').strict;
const {assignIfUndef} = require('../../');

const obj1 = {};
const result1a = assignIfUndef(obj1, 'a', 'b', 'c', 100);
assert.deepEqual(obj1, {a: {b: {c: 100}}});
assert.deepEqual(result1a, {c: 100});

const result1b = assignIfUndef(obj1, 'a', 'b', 'c1', 101);
assert.deepEqual(obj1, {a: {b: {c: 100, c1: 101}}});
assert.deepEqual(result1b, {c: 100, c1: 101});
assert.ok(result1a === result1b);

const result1c = assignIfUndef(obj1, 'a', 'b', 'c1', 111);
assert.deepEqual(obj1, {a: {b: {c: 100, c1: 101}}});
assert.deepEqual(result1c, {c: 100, c1: 101});
