const assert = require('assert').strict;
const {set} = require('../../');

const obj1 = set({}, 'a', {name: 'b', type: Array}, '0', 100);
assert.deepEqual(obj1, {a: {b: [100]}});

let name;
const obj2 = set(undefined, ['a', {
	name: 'b',
	create: (current, _name) => {
		name = _name;
		current.b1 = 201;
		return [1, 2, 3];
	}
}, '3'], 200);
assert.deepEqual(obj2, {a: {b: [1, 2, 3, 200], b1: 201}});
assert.equal(name, 'b');

const obj3 = set(null, 'a', {name: 'b'}, 'c', 10);
assert.deepEqual(obj3, {a: {b: {c: 10}}});
