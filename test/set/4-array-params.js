const assert = require('assert').strict;
const {set} = require('../../');

const obj1 = {};
set(obj1, ['a', 'b', 'c'], 100);
assert.deepEqual(obj1,{a: {b: {c: 100}}});

const obj2 = {};
set(obj2, ['a', 'b', 'c'], ['d', 'e', 'f'], 200);
assert.deepEqual(obj2,{a: {b: {c: {d: {e: {f: 200}}}}}});

const obj3 = set({}, ['a', 'b', 'c'], 300);
assert.deepEqual(obj3,{a: {b: {c: 300}}});
