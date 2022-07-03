const {expect} = require('chai');
const {get} = require('../../');

const obj = {a: {b: {c: 100}}};
expect(get(obj)).eql({a: {b: {c: 100}}});
expect(get(obj, 'a')).eql({b: {c: 100}});
expect(get(obj, 'a', 'b')).eql({c: 100});
expect(get(obj, ['a', 'b', 'c'])).equal(100);
