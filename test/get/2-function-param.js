const assert = require('assert').strict;
const {get} = require('../../');

const obj = {a: {b: {c: 100}}};

const result1 = get(obj, 'a', parent => {
	assert.equal(parent, obj.a);
	return parent.b.c;
});
assert.equal(result1, 100);
