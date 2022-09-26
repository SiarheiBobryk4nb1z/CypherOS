const assert = require('assert').strict;
const {setPropIfUndef} = require('../../');

const obj1 = {};
const result1 = setPropIfUndef(obj1, 'a', 'b', 'c');
assert.deepEqual(obj1, {a: {b: {c: {}}}});
assert.deepEqual(result1, obj1);
assert.equal(result1, obj1);

const result1a = setPropIfUndef(obj1, 'a', 'b', {name: 'c', type: Array});
assert.deepEqual(obj1, {a: {b: {c: {}}}});
assert.deepEqual(result1a, obj1);
assert.equal(result1a, obj1);

const obj2 = setPropIfUndef({}, 'a', 'b', 'c');
assert.deepEqual(obj2, {a: {b: {c: {}}}});
setPropIfUndef(obj2, 'a', 'b', {name: 'c', value: []});
assert.deepEqual(obj2, {a: {b: {c: {}}}});
setPropIfUndef(obj2, 'a', 'b', {name: 'c', value: [], override: false});
assert.deepEqual(obj2, {a: {b: {c: {}}}});
setPropIfUndef(obj2, 'a', 'b', {name: 'c', value: [], override: true});
assert.deepEqual(obj2, {a: {b: {c: []}}});
