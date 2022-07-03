const {expect} = require('chai');
const {set} = require('../../');

const obj1 = {};
set(obj1, ['a', 'b', 'c'], 100);
expect(obj1).eql({a: {b: {c: 100}}});

const obj2 = {};
set(obj2, ['a', 'b', 'c'], ['d', 'e', 'f'], 200);
expect(obj2).eql({a: {b: {c: {d: {e: {f: 200}}}}}});

const obj3 = set({}, ['a', 'b', 'c'], 300);
expect(obj3).eql({a: {b: {c: 300}}});
