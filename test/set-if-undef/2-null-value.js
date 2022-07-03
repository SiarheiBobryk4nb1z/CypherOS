const {expect} = require('chai');
const {setIfUndef} = require('../../');

const obj1 = {};
setIfUndef(obj1, 'a', 'b', 'c', null);
expect(obj1).eql({a: {b: {c: null}}});
setIfUndef(obj1, 'a', 'b', 'c', 100);
expect(obj1).eql({a: {b: {c: null}}});

const obj2 = setIfUndef('', 'a', 'b', 'c', undefined);
expect(obj2).eql({a: {b: {c: undefined}}});
setIfUndef(obj2, 'a', 'b', 'c', 200);
expect(obj2).eql({a: {b: {c: 200}}});
