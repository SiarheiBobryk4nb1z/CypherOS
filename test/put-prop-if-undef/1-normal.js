const assert = require('assert').strict;
const {putPropIfUndef} = require('../../');

const obj1 = {};
const result1 = putPropIfUndef(obj1, 'a', 'b', 'c');
assert.deepEqual(obj1, {a: {b: {c: {}}}});
assert.deepEqual(result1, {});
assert.equal(result1, obj1.a.b.c);

const result1a = putPropIfUndef(obj1, 'a', 'b', {name: 'c', type: Array});
assert.deepEqual(obj1, {a: {b: {c: {}}}});
assert.deepEqual(result1a, {});
assert.equal(result1a, obj1.a.b.c);
