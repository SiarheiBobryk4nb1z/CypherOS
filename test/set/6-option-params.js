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

const obj5 = {a: {}};
set(obj5,
	{
		name: 'a',
		created: (parent, name, current) => {
			assert.fail()
		},
		skipped: (parent, name, current) => {
			assert.deepEqual(parent, obj5);
			assert.equal(name, 'a');
			assert.deepEqual(current, {});
		},
		got: (parent, name, current) => {
			assert.equal(parent, obj5);
			assert.equal(name, 'a');
			assert.equal(current, obj5.a);
		}
	},
	{
		name: 'b',
		created: (parent, name, current) => {
			assert.deepEqual(parent, obj5.a);
			assert.equal(name, 'b');
			assert.deepEqual(current, {});
		},
		skipped: (parent, name, current) => {
			assert.fail();
		},
		got: (parent, name, current) => {
			assert.deepEqual(parent, obj5.a);
			assert.equal(name, 'b');
			assert.equal(current, obj5.a.b);
		}
	},
	{
		name: 'c',
		created: (parent, name, current) => {
			assert.deepEqual(parent, obj5.a.b);
			assert.equal(name, 'c');
			assert.deepEqual(current, {});
		},
		skipped: (parent, name, current) => {
			assert.fail();
		},
		got: (parent, name, current) => {
			assert.deepEqual(parent, obj5.a.b);
			assert.equal(name, 'c');
			assert.equal(current, obj5.a.b.c);
		}
	},
	500
);

const obj6 = set({}, 'a', 'b', 'c1', 600);
set(obj6, 'a', {name: 'b', override: "true"}, 'c2', 601);
assert.deepEqual(obj6, {a: {b: {c2: 601}}});
