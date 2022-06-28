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

const sA = Symbol('symbol-a');
const sB = Symbol('symbol-b');
const sC = Symbol('symbol-c');
const objSet5 = hierarchySet({}, sA, sB, sC, 500);
expect(objSet5[sA][sB][sC]).equal(500);

const objSet6 = {};
hierarchySet(objSet6, ['a', 'b', 'c'], 600);
expect(objSet6).eql({a: {b: {c: 600}}});

const objSet7 = {};
hierarchySet(objSet7, ['a', 'b', 'c'], ['d', 'e', 'f'], 700);
expect(objSet7).eql({a: {b: {c: {d: {e: {f: 700}}}}}});

const objSet8 = hierarchySet({}, ['a', 'b', 'c'], 800);
expect(objSet8).eql({a: {b: {c: 800}}});

const objSet9 = hierarchySet({}, 'a', 'b', 'collection', []);
expect(objSet9).eql({a: {b: {collection: []}}});

const objSet10 = hierarchySet({}, ['a', 'b', 'collection'], []);
expect(objSet10).eql({a: {b: {collection: []}}});

const objSet11 = hierarchySet({}, 'a', []);
hierarchySet(objSet11, 'a', 0, 1100);
hierarchySet(objSet11, 'a', 1, 1101);
expect(objSet11).eql({a: [1100, 1101]});

//set if not exists
const objSoftSet1 = {};
hierarchySetIfNotExists(objSoftSet1, 'a', 'b', 'c', 100);
expect(objSoftSet1).eql({a: {b: {c: 100}}});
hierarchySetIfNotExists(objSoftSet1, 'a', 'b', 'c1', 101);
expect(objSoftSet1).eql({a: {b: {c: 100, c1: 101}}});
hierarchySetIfNotExists(objSoftSet1, 'a', 'b', 'c1', 111);
expect(objSoftSet1).eql({a: {b: {c: 100, c1: 101}}});

hierarchySetIfNotExists(objSoftSet1, 'a', 'b', 'c2', null);
expect(objSoftSet1).eql({a: {b: {c: 100, c1: 101, c2: null}}});
hierarchySetIfNotExists(objSoftSet1, 'a', 'b', 'c2', 112);
expect(objSoftSet1).eql({a: {b: {c: 100, c1: 101, c2: null}}});

hierarchySetIfNotExists(objSoftSet1, 'a', 'b', 'c3', undefined);
expect(objSoftSet1).eql({a: {b: {c: 100, c1: 101, c2: null, c3: undefined}}});
hierarchySetIfNotExists(objSoftSet1, 'a', 'b', 'c3', 113);
expect(objSoftSet1).eql({a: {b: {c: 100, c1: 101, c2: null, c3: 113}}});

const objSoftSet2 = hierarchySetIfNotExists(null, 'a', 'b', 'c', 200);
expect(objSoftSet2).eql({a: {b: {c: 200}}});

const objSoftSet3 = hierarchySetIfNotExists(undefined, 'a', 'b', 'c', 300);
expect(objSoftSet3).eql({a: {b: {c: 300}}});

//get
const objGet1 = {a: {b: {c: 100}}};
expect(hierarchyGet(objGet1)).eql({a: {b: {c: 100}}});
expect(hierarchyGet(objGet1.a)).eql({b: {c: 100}});
expect(hierarchyGet(objGet1.a.b)).eql({c: 100});
expect(hierarchyGet(objGet1.a.b.c)).equal(100);
