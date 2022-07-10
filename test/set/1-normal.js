const assert = require('assert').strict;
const {set} = require('../../');

const obj1 = {};
set(obj1, 'a', 'b', 'c', 100);
assert.deepEqual(obj1,{a: {b: {c: 100}}});
set(obj1, 'a', 'b', 'c', 'd', 101);
assert.deepEqual(obj1,{a: {b: {c: {d: 101}}}});

const obj2 = set({}, 'a', 'b', 'c', 200);
assert.deepEqual(obj2,{a: {b: {c: 200}}});
