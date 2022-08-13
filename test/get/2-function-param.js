const assert = require('assert').strict;
const {get} = require('../../');

const obj = {a: {value: 1, b1: {c: 100}, b2: {c: 200}}};
assert.equal(get(obj, 'a', curr => curr.value === 1 ? 'b1' : 'b2', 'c'), 100);
assert.equal(get(obj, () => 'a', curr => curr.value === 1 ? 'b2' : 'b1', 'c'), 200);
