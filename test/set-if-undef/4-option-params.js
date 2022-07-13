const assert = require('assert').strict;
const {setIfUndef} = require('../../');

const obj = {};
setIfUndef(obj, 'a', {name: 'b', type: Array}, '0', 100);
assert.deepEqual(obj, {a: {b: [100]}});

setIfUndef(obj, 'a', 'b', '0', 101);
assert.deepEqual(obj, {a: {b: [100]}});

setIfUndef(obj, 'a', 'b', '1', 200);
assert.deepEqual(obj, {a: {b: [100, 200]}});
