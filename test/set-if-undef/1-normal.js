const {expect} = require('chai');
const {setIfUndef} = require('../../');

const obj1 = {};
setIfUndef(obj1, 'a', 'b', 'c', 100);
expect(obj1).eql({a: {b: {c: 100}}});

setIfUndef(obj1, 'a', 'b', 'c1', 101);
expect(obj1).eql({a: {b: {c: 100, c1: 101}}});

setIfUndef(obj1, 'a', 'b', 'c1', 111);
expect(obj1).eql({a: {b: {c: 100, c1: 101}}});
