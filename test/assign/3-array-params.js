const assert = require('assert').strict;
const {assign} = require('../../');

const obj1 = {};
const result1 = assign(obj1, ['a', 'b', 'c'], 100);
assert.deepEqual(obj1, {a: {b: {c: 100}}});
assert.deepEqual(result1, {c: 100});

const obj2 = {};
const result2 = assign(obj2, ['a', 'b', 'c'], ['d', 'e', 'f'], 200);
assert.deepEqual(obj2, {a: {b: {c: {d: {e: {f: 200}}}}}});
assert.deepEqual(result2, {f: 200});
