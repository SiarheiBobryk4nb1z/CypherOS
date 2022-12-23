const assert = require('assert').strict;
const {get} = require('../../');

const obj = {a: {b: {c: 100}}};
const result1 = get(obj, 'a', {name: 'b'}, {getName: () => 'c'});
assert.equal(result1, 100);

const result2 = get(obj,
	{
		getName: () => 'a',
		got: (parent, name, current) => {
			assert.deepEqual(parent, {a: {b: {c: 100}}});
			assert.equal(name, 'a');
			assert.deepEqual(current, {b: {c: 100}});
		}
	},
	{
		name: 'b',
		got: (parent, name, current) => {
			assert.deepEqual(parent, {b: {c: 100}});
			assert.equal(name, 'b');
			assert.deepEqual(current, {c: 100});
		}
	},
	{
		name: 'c',
		got: (parent, name, current) => {
			assert.deepEqual(parent, {c: 100});
			assert.equal(name, 'c');
			assert.equal(current, 100);
		}
	}
);
assert.equal(result2, 100);

const result3 = get(obj, {
	getValue: parent => parent.a,
	got: (parent, name, current) => {
		assert.equal(parent, obj);
		assert.equal(name, 'undefined');
		assert.equal(current, obj.a);
	}
}, parent => {
	assert.equal(parent, obj.a);
	return parent.b.c;
});
assert.equal(result3, 100);
