const {expect} = require('chai');
const {set} = require('../../');

const obj1 = set({}, 'a', 'b', 'collection', []);
expect(obj1).eql({a: {b: {collection: []}}});

const obj2 = set({}, ['a', 'b', 'collection'], []);
expect(obj2).eql({a: {b: {collection: []}}});

const obj3 = set({}, 'a', []);
set(obj3, 'a', 0, 300);
set(obj3, 'a', 1, 301);
expect(obj3).eql({a: [300, 301]});
