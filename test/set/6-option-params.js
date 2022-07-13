const assert = require('assert').strict;
const {set} = require('../../');

const obj1 = set({}, 'a', {name: 'b', type: Array}, '0', 100);
assert.deepEqual(obj1, {a: {b: [100]}});

const obj2 = set(undefined, ['a', {name: 'b', create: () => [1, 2, 3]}, '3'], 200);
assert.deepEqual(obj2, {a: {b: [1, 2, 3, 200]}});
