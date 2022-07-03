const {expect} = require('chai');
const {setIfUndef} = require('../../');

const obj1 = setIfUndef(null, 'a', 'b', 'c', 100);
expect(obj1).eql({a: {b: {c: 100}}});

const obj2 = setIfUndef(undefined, 'a', 'b', 'c', 200);
expect(obj2).eql({a: {b: {c: 200}}});
