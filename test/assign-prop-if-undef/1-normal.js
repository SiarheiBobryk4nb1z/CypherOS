const assert = require('assert').strict;
const {assignPropIfUndef} = require('../../');

const obj1 = {};
const result1 = assignPropIfUndef(obj1, 'a', 'b', 'c');
assert.deepEqual(obj1, {a: {b: {c: {}}}});
assert.deepEqual(result1, {c: {}});
assert.equal(result1, obj1.a.b);

const result1a = assignPropIfUndef(obj1, 'a', 'b', {name: 'c', type: Array});
assert.deepEqual(obj1, {a: {b: {c: {}}}});
assert.deepEqual(result1a, {c: {}});
assert.equal(result1a, obj1.a.b);
