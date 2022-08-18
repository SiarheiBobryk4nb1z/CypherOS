const assert = require('assert').strict;
const {get} = require('../../');

const obj = {a: {b: {c: 100}}};
assert.equal(get(obj, 'a', {name: 'b'}, {getName: () => 'c'}), 100);

get(obj,
	{
		name: 'a',
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
