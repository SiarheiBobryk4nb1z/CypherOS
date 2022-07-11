const assert = require('assert').strict;
const {assign} = require('../../');

const obj1 = {};
const result1 = assign(obj1, 'a', 'b', 'collection', []);
assert.deepEqual(obj1, {a: {b: {collection: []}}});
assert.deepEqual(result1, {collection: []});

const obj2 = {};
const result2 = assign(obj2, ['a', 'b', 'collection'], []);
assert.deepEqual(obj2, {a: {b: {collection: []}}});
assert.deepEqual(result2, {collection: []});

const obj3 = {};
const result3 = assign(obj3, 'a', []);
assert.deepEqual(result3, {a: []});
const result3a = assign(obj3, 'a', 0, 300);
assert.deepEqual(result3a, [300]);
const result3b = assign(obj3, 'a', 1, 301);
assert.deepEqual(result3b, [300, 301]);
assert.ok(result3a === result3b);
assert.deepEqual(obj3, {a: [300, 301]});
