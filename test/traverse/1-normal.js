const assert = require('assert').strict;
const {traverse} = require('../../');

const result1 = [];
const obj1 = {a: {b: {c: 100}}};
traverse(obj1, 'a', 'b', 'c', (parent, name, current) => {
	result1.push({name, value: current});
});
assert.deepEqual(result1, [
	{name: 'a', value: {b: {c: 100}}},
	{name: 'b', value: {c: 100}},
	{name: 'c', value: 100}
]);


const result2 = [];
const obj2 = {a: {b: {c: 200}}};
traverse(obj2, ['a', 'b'], 'c', (parent, name, current) => {
	result2.push({name, value: current});
});
assert.deepEqual(result2, [
	{name: 'a', value: {b: {c: 200}}},
	{name: 'b', value: {c: 200}},
	{name: 'c', value: 200}
]);
