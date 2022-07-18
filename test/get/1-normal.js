const assert = require('assert').strict;
const {get} = require('../../');

const obj = {a: {b: {c: 100}}};
assert.deepEqual(get(obj), {a: {b: {c: 100}}});
assert.deepEqual(get(obj, 'a'), {b: {c: 100}});
assert.deepEqual(get(obj, 'a', 'b'), {c: 100});
assert.equal(get(obj, 'a', 'b', 'c', 'd'), undefined);
assert.equal(get(obj, 'a', 'b', 'c', 'd', 'e'), undefined);
