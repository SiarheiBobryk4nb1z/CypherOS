const {expect} = require('chai');
const {set} = require('../../');

const obj1 = set(null, 'a', 'b', 'c', 100);
expect(obj1).eql({a: {b: {c: 100}}});

const obj2 = set(undefined, 'a', 'b', 'c', 200);
expect(obj2).eql({a: {b: {c: 200}}});
