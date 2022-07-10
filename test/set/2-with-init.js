const assert = require('assert').strict;
const {set} = require('../../');

const obj1 = set(null, 'a', 'b', 'c', 100);
assert.deepEqual(obj1,{a: {b: {c: 100}}});

const obj2 = set(undefined, 'a', 'b', 'c', 200);
assert.deepEqual(obj2,{a: {b: {c: 200}}});
