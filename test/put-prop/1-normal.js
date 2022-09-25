const assert = require('assert').strict;
const {putProp} = require('../../');

const obj1 = {};
const result1 = putProp(obj1, 'a', 'b', 'c');
assert.deepEqual(obj1, {a: {b: {c: {}}}});
assert.deepEqual(result1, {});
assert.equal(result1, obj1.a.b.c);

const obj2 = {};
const result2 = putProp(obj2, 'a', 'b', {name: 'c', value: []});
assert.deepEqual(obj2, {a: {b: {c: []}}});
assert.deepEqual(result2, []);
assert.equal(result2, obj2.a.b.c);

const obj3 = {};
const result3 = putProp(obj3, 'a', 'b', {name: 'c', type: Array});
assert.deepEqual(obj3, {a: {b: {c: []}}});
assert.deepEqual(result3, []);
assert.equal(result3, obj3.a.b.c);

const obj4 = {};
const result4 = putProp(obj4, 'a', 'b', {name: 'c', create: () => []});
assert.deepEqual(obj4, {a: {b: {c: []}}});
assert.deepEqual(result4, []);
assert.equal(result4, obj4.a.b.c);
