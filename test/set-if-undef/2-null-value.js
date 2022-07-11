const assert = require('assert').strict;
const {setIfUndef} = require('../../');

const obj1 = {};
setIfUndef(obj1, 'a', 'b', 'c', null);
assert.deepEqual(obj1, {a: {b: {c: null}}});
setIfUndef(obj1, 'a', 'b', 'c', 100);
assert.deepEqual(obj1, {a: {b: {c: null}}});

const obj2 = setIfUndef('', 'a', 'b', 'c', undefined);
assert.deepEqual(obj2, {a: {b: {c: undefined}}});
setIfUndef(obj2, 'a', 'b', 'c', 200);
assert.deepEqual(obj2, {a: {b: {c: 200}}});
