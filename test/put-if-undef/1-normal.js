const assert = require('assert').strict;
const {putIfUndef} = require('../../');

const obj = {};
const collection = putIfUndef(obj, 'a', 'b', 'collection', []);
assert.deepEqual(obj, {a: {b: {collection: []}}});
collection.push(100);

const anotherCollection = putIfUndef(obj, 'a', 'b', 'collection', []);
anotherCollection.push(200);
assert.deepEqual(obj, {a: {b: {collection: [100, 200]}}});
assert.deepEqual(anotherCollection, [100, 200]);
assert.ok(collection === anotherCollection);
