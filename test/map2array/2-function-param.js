const assert = require('assert').strict;
const {map2array} = require('../../');

const source = {
	p1: 100,
	p2: 200
};

const result = map2array(source, () => 'productId', () => 'price');
assert.deepEqual(result, [
	{
		productId: 'p1',
		price: 100
	},
	{
		productId: 'p2',
		price: 200
	}
]);
