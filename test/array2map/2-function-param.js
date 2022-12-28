const assert = require('assert').strict;
const {array2map} = require('../../');

const source = [
	{
		productId: 'p1',
		price: 100
	},
	{
		productId: 'p2',
		price: 200
	}
];

const result = array2map(source, parent => parent.productId, parent => parent.price);
assert.deepEqual(result, {
	p1: 100,
	p2: 200
});
