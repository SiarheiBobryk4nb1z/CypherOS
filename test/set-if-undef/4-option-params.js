const assert = require('assert').strict;
const {setIfUndef} = require('../../');

const obj1 = {};
setIfUndef(obj1, 'a', {name: 'b', type: Array}, '0', 100);
assert.deepEqual(obj1, {a: {b: [100]}});

setIfUndef(obj1, 'a', 'b', '0', 101);
assert.deepEqual(obj1, {a: {b: [100]}});

setIfUndef(obj1, 'a', 'b', '1', 102);
assert.deepEqual(obj1, {a: {b: [100, 102]}});

const obj2 = setIfUndef({}, 'a', 'b', 'c1', 200);
setIfUndef(obj2, 'a', {name: 'b', override: "true"}, 'c2', 201);
assert.deepEqual(obj2, {a: {b: {c2: 201}}});
