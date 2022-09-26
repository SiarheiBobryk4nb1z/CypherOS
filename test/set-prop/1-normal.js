const assert = require('assert').strict;
const {setProp} = require('../../');

const obj1 = setProp({}, ['a', 'b', 'c']);
assert.deepEqual(obj1, {a: {b: {c: {}}}});

const obj2 = {};
const result1 = setProp(obj2, 'a', 'b', 'c');
assert.deepEqual(obj2, {a: {b: {c: {}}}});
assert.deepEqual(result1, obj2);
assert.equal(result1, obj2);

const obj3 = {};
const result2 = setProp(obj3, 'a', 'b', {name: 'c', value: []});
assert.deepEqual(obj3, {a: {b: {c: []}}});
assert.deepEqual(result2, obj3);
assert.equal(result2, obj3);

const obj4 = {};
const result3 = setProp(obj4, 'a', 'b', {name: 'c', type: Array});
assert.deepEqual(obj4, {a: {b: {c: []}}});
assert.deepEqual(result3, obj4);
assert.equal(result3, obj4);

const obj5 = {};
const result4 = setProp(obj5, 'a', 'b', {name: 'c', create: () => []});
assert.deepEqual(obj5, {a: {b: {c: []}}});
assert.deepEqual(result4, obj5);
assert.equal(result4, obj5);

const obj6 = setProp({}, [{name: 'a'}, {name: 'b'}, {name: 'c', value: [600]}]);
assert.deepEqual(obj6, {a: {b: {c: [600]}}});

const obj7 = setProp({}, 'a', 'b', 'c');
assert.deepEqual(obj7, {a: {b: {c: {}}}});
setProp(obj7, 'a', 'b', {name: 'c', value: []});
assert.deepEqual(obj7, {a: {b: {c: []}}});
setProp(obj7, 'a', 'b', {name: 'c', value: [700], override: false});
assert.deepEqual(obj7, {a: {b: {c: [700]}}});
setProp(obj7, 'a', 'b', {name: 'c', value: [701], override: true});
assert.deepEqual(obj7, {a: {b: {c: [701]}}});
