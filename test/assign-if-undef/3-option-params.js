const assert = require('assert').strict;
const {assignIfUndef} = require('../../');

const obj = {};
const result1 = assignIfUndef(obj, 'a', {name: 'b', type: Array}, '0', 100);
assert.deepEqual(obj, {a: {b: [100]}});
assert.deepEqual(result1, [100]);

const result2 = assignIfUndef(obj, 'a', 'b', '0', 101);
assert.deepEqual(obj, {a: {b: [100]}});
assert.deepEqual(result2, [100]);

const result3 = assignIfUndef(obj, 'a', 'b', '1', 200);
assert.deepEqual(obj, {a: {b: [100, 200]}});
assert.deepEqual(result3, [100, 200]);
