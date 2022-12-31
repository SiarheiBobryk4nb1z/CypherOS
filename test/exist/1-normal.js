const assert = require('assert').strict;
const {exist} = require('../../');

assert.equal(exist(undefined), false);
assert.equal(exist(null, 'a', 'b', 'c'), false);
assert.equal(exist(undefined, ['a', 'b'], 'c'), false);
assert.equal(exist(0), true);

const obj1 = {};
assert.equal(exist(obj1), true);
assert.equal(exist(obj1, 'a'), false);

const obj2 = {a: {b: {c: 0, c1: undefined, c2: null, [Symbol.iterator]: 1}}};
assert.equal(exist(obj2, 'a', 'b', 'c'), true);
assert.equal(exist(obj2, 'a', 'b', 'c1'), true);
assert.equal(exist(obj2, 'a', 'b', 'c2'), true);
assert.equal(exist(obj2, 'a', 'b', Symbol.iterator), true);
assert.equal(exist(obj2, 'a', 'b', String(Symbol.iterator)), false);
assert.equal(exist(obj2, 'a', 'b', Symbol.hasInstance), false);
