const assert = require('assert').strict;
const {assignProp} = require('../../');

const obj1 = {};
const result1 = assignProp(obj1, 'a', 'b', 'c');
assert.deepEqual(obj1, {a: {b: {c: {}}}});
assert.deepEqual(result1, {c: {}});
assert.equal(result1, obj1.a.b);

const obj2 = {};
const result2 = assignProp(obj2, 'a', 'b', {name: 'c', value: []});
assert.deepEqual(obj2, {a: {b: {c: []}}});
assert.deepEqual(result2, {c: []});
assert.equal(result2, obj2.a.b);

const obj3 = {};
const result3 = assignProp(obj3, 'a', 'b', {name: 'c', type: Array});
assert.deepEqual(obj3, {a: {b: {c: []}}});
assert.deepEqual(result3, {c: []});
assert.equal(result3, obj3.a.b);

const obj4 = {};
const result4 = assignProp(obj4, 'a', 'b', {name: 'c', create: () => []});
assert.deepEqual(obj4, {a: {b: {c: []}}});
assert.deepEqual(result4, {c: []});
assert.equal(result4, obj4.a.b);
