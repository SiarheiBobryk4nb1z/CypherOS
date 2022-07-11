const assert = require('assert').strict;
const {set} = require('../../');

const obj1 = set({}, 'a', 'b', 'collection', []);
assert.deepEqual(obj1, {a: {b: {collection: []}}});

const obj2 = set({}, ['a', 'b', 'collection'], []);
assert.deepEqual(obj2, {a: {b: {collection: []}}});

const obj3 = set({}, 'a', []);
set(obj3, 'a', 0, 300);
set(obj3, 'a', 1, 301);
assert.deepEqual(obj3, {a: [300, 301]});
