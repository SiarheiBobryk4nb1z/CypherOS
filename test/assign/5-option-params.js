const assert = require('assert').strict;
const {assign} = require('../../');

const obj1 = {};
const result1 = assign(obj1, 'a', {name: 'b', type: Array}, '0', 100);
assert.deepEqual(obj1, {a: {b: [100]}});
assert.deepEqual(result1, [100]);

const obj2 = {};
const result2 = assign(obj2, ['a', {name: 'b', create: () => [1, 2, 3]}, '3'], 200);
assert.deepEqual(obj2, {a: {b: [1, 2, 3, 200]}});
assert.deepEqual(result2, [1, 2, 3, 200]);
