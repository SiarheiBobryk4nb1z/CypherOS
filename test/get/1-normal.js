const assert = require('assert').strict;
const {get} = require('../../');

const obj1 = {a: {b: {c: 100}}};
assert.deepEqual(get(obj1), {a: {b: {c: 100}}});
assert.deepEqual(get(obj1, 'a'), {b: {c: 100}});
assert.deepEqual(get(obj1, 'a', 'b'), {c: 100});

assert.equal(get(obj1, 'a', 'b', 'c'), 100);
assert.equal(get(obj1, ['a'], 'b', 'c'), 100);
assert.equal(get(obj1, ['a'], ['b', 'c']), 100);

assert.equal(get(obj1, 'a', 'b', 'c', 'd'), undefined);
assert.equal(get(obj1, 'a', 'b', 'c', 'd', 'e'), undefined);

const obj2 = {a: {[Symbol.iterator]: {c: 200, c1: [201]}}};
assert.equal(get(obj2, 'a', Symbol.iterator, 'c'), 200);
assert.equal(get(obj2, 'a', Symbol.iterator, 'c1', 0), 201);
