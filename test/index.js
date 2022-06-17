const {expect} = require('chai');

const {hierarchyGet, hierarchySet, hierarchySetIfNotExists} = require('../');

//set
const objSet1 = {};
hierarchySet(objSet1, 'a', 'b', 'c', 100);
expect(objSet1).eql({a: {b: {c: 100}}});
hierarchySet(objSet1, 'a', 'b', 'c', 'd', 101);
expect(objSet1).eql({a: {b: {c: {d: 101}}}});

const objSet2 = hierarchySet({}, 'a', 'b', 'c', 200);
expect(objSet2).eql({a: {b: {c: 200}}});

const objSet3 = hierarchySet(null, 'a', 'b', 'c', 300);
expect(objSet3).eql({a: {b: {c: 300}}});

const objSet4 = hierarchySet(undefined, 'a', 'b', 'c', 400);
expect(objSet4).eql({a: {b: {c: 400}}});

//set if not exists
const objSoftSet1 = {};
hierarchySetIfNotExists(objSoftSet1, 'a', 'b', 'c', 100);
expect(objSoftSet1).eql({a: {b: {c: 100}}});
hierarchySetIfNotExists(objSoftSet1, 'a', 'b', 'c1', 101);
expect(objSoftSet1).eql({a: {b: {c: 100, c1: 101}}});
hierarchySetIfNotExists(objSoftSet1, 'a', 'b', 'c1', 111);
expect(objSoftSet1).eql({a: {b: {c: 100, c1: 101}}});

const objSoftSet2 = hierarchySetIfNotExists(null, 'a', 'b', 'c', 200);
expect(objSoftSet2).eql({a: {b: {c: 200}}});

//get
const objGet1 = {a: {b: {c: 100}}};
expect(hierarchyGet(objGet1)).eql({a: {b: {c: 100}}});
expect(hierarchyGet(objGet1.a)).eql({b: {c: 100}});
expect(hierarchyGet(objGet1.a.b)).eql({c: 100});
expect(hierarchyGet(objGet1.a.b.c)).equal(100);
