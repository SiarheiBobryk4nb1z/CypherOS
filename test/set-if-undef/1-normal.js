const assert = require('assert').strict;
const {setIfUndef} = require('../../');

const obj1 = {};
setIfUndef(obj1, 'a', 'b', 'c', 100);
assert.deepEqual(obj1,{a: {b: {c: 100}}});

setIfUndef(obj1, 'a', 'b', 'c1', 101);
assert.deepEqual(obj1,{a: {b: {c: 100, c1: 101}}});

setIfUndef(obj1, 'a', 'b', 'c1', 111);
assert.deepEqual(obj1,{a: {b: {c: 100, c1: 101}}});
