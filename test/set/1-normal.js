const {expect} = require('chai');
const {set} = require('../../');

const obj1 = {};
set(obj1, 'a', 'b', 'c', 100);
expect(obj1).eql({a: {b: {c: 100}}});
set(obj1, 'a', 'b', 'c', 'd', 101);
expect(obj1).eql({a: {b: {c: {d: 101}}}});

const obj2 = set({}, 'a', 'b', 'c', 200);
expect(obj2).eql({a: {b: {c: 200}}});
