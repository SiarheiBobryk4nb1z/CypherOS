const assert = require('assert').strict;
const {array2map} = require('../../');

const source1 = [
	{
		productId: 'p1',
		price: 100
	},
	{
		productId: 'p2',
		price: 200
	}
];

const result1 = array2map(source1, 'productId', 'price');
assert.deepEqual(result1, {
	p1: 100,
	p2: 200
});


const source2 = [
	{
		product: {id: 'p1'},
		price: {value: 100}
	},
	{
		product: {id: 'p2'},
		price: {value: 200}
	}
];

const result2 = array2map(source2, ['product', 'id'], ['price', 'value']);
assert.deepEqual(result2, {
	p1: 100,
	p2: 200
});
