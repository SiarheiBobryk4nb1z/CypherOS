const assert = require('assert').strict;
const {traverse} = require('../../');

const result1 = [];
const obj1 = {a: {b: {c: 100}}};
traverse(obj1, 'a', 'b', 'c', (parent, name, current) => {
	result1.push({parent, name, current});
});
assert.deepEqual(result1, [
	{parent: {a: {b: {c: 100}}}, name: 'a', current: {b: {c: 100}}},
	{parent: {b: {c: 100}}, name: 'b', current: {c: 100}},
	{parent: {c: 100}, name: 'c', current: 100}
]);


const result2 = [];
const obj2 = {a: {b: {c: 200}}};
traverse(obj2, ['a', 'b'], 'c', (parent, name, current) => {
	result2.push({parent, name, current});
});
assert.deepEqual(result2, [
	{parent: {a: {b: {c: 200}}}, name: 'a', current: {b: {c: 200}}},
	{parent: {b: {c: 200}}, name: 'b', current: {c: 200}},
	{parent: {c: 200}, name: 'c', current: 200}
]);
