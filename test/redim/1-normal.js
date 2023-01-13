const assert = require('assert').strict;
const {redim} = require('../../');

const obj1 = {
	red: {
		wooden: {house: 'red wooden house', ship: 'red wooden ship'},
		iron: {house: 'red iron house', ship: 'red iron ship'},
		stone: {house: 'red stone house', ship: 'red stone ship'}
	},
	green: {
		wooden: {house: 'green wooden house', ship: 'green wooden ship'},
		iron: {house: 'green iron house', ship: 'green iron ship'},
		stone: {house: 'green stone house', ship: 'green stone ship'}
	},
	blue: {
		wooden: {house: 'blue wooden house', ship: 'blue wooden ship'},
		iron: {house: 'blue iron house', ship: 'blue iron ship'},
		stone: {house: 'blue stone house', ship: 'blue stone ship'}
	}
};
const result1 = redim(obj1, 1, 2, 0);
assert.deepEqual(result1, {
	wooden: {
		house: {red: "red wooden house", green: "green wooden house", blue: "blue wooden house"},
		ship: {red: "red wooden ship", green: "green wooden ship", blue: "blue wooden ship"}
	},
	iron: {
		house: {red: "red iron house", green: "green iron house", blue: "blue iron house"},
		ship: {red: "red iron ship", green: "green iron ship", blue: "blue iron ship"}
	},
	stone: {
		house: {red: "red stone house", green: "green stone house", blue: "blue stone house"},
		ship: {red: "red stone ship", green: "green stone ship", blue: "blue stone ship"}
	}
});

const obj2 = [
	{a: 1, b: 2, c: 3},
	{a: 10, b: 20, c: 30},
	{a: 100, b: 200},
	{d: Symbol.iterator}
];
const result2 = redim(obj2, [1, 0]);
assert.deepEqual(result2, {
	a: [1, 10, 100],
	b: [2, 20, 200],
	c: [3, 30],
	d: [, , , Symbol.iterator]
});
