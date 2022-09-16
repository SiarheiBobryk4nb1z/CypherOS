const assert = require('assert').strict;
const {traverseReverse} = require('../../');

const task = {
	done: false,
	subTasks: [
		{
			done: false,
			subTasks: [
				{done: false},  // will be done
				{done: true}
			]
		}
	]
};

task.subTasks[0].subTasks[0].done = true;
traverseReverse(task, 'subTasks', 0, 'subTasks', (parent, name, current) => {
	if (Array.isArray(current)) {
		parent.done = current.every(task => task.done);
	}
});
assert.deepEqual(task, {
	done: true,
	subTasks: [
		{
			done: true,
			subTasks: [
				{done: true},
				{done: true}
			]
		}
	]
});


const result2 = [];
const obj2 = {x: {y: {z: 300}}};
traverseReverse(obj2, 'x', 'y', 'z', (parent, name) => {
	result2.push(name);
	if (name === 'y') {
		return false;
	}
});
assert.deepEqual(result2, ['z', 'y']);
