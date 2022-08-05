const assert = require('assert').strict;
const {set} = require('../../');

const obj1 = set({}, 'a', {name: 'b', value: {}}, {name: 'c', value: []}, 0, 100);
assert.deepEqual(obj1, {a: {b: {c: [100]}}});

const obj2 = set({}, 'a', {name: 'b', type: Array}, '0', 200);
assert.deepEqual(obj2, {a: {b: [200]}});

let name;
const obj3 = set(undefined, ['a', {
	name: 'b',
	create: (current, _name) => {
		name = _name;
		current.b1 = 301;
		return [1, 2, 3];
	}
}, '3'], 300);
assert.deepEqual(obj3, {a: {b: [1, 2, 3, 300], b1: 301}});
assert.equal(name, 'b');

const obj4 = set(null, 'a', {name: 'b'}, 'c', 400);
assert.deepEqual(obj4, {a: {b: {c: 400}}});
