const {expect} = require('chai');

const {get, set, setIfUndef} = require('../');

//set
const objSet1 = {};
set(objSet1, 'a', 'b', 'c', 100);
expect(objSet1).eql({a: {b: {c: 100}}});
set(objSet1, 'a', 'b', 'c', 'd', 101);
expect(objSet1).eql({a: {b: {c: {d: 101}}}});

const objSet2 = set({}, 'a', 'b', 'c', 200);
expect(objSet2).eql({a: {b: {c: 200}}});

const objSet3 = set(null, 'a', 'b', 'c', 300);
expect(objSet3).eql({a: {b: {c: 300}}});

const objSet4 = set(undefined, 'a', 'b', 'c', 400);
expect(objSet4).eql({a: {b: {c: 400}}});

const sA = Symbol('symbol-a');
const sB = Symbol('symbol-b');
const sC = Symbol('symbol-c');
const objSet5 = set({}, sA, sB, sC, 500);
expect(objSet5[sA][sB][sC]).equal(500);

const objSet6 = {};
set(objSet6, ['a', 'b', 'c'], 600);
expect(objSet6).eql({a: {b: {c: 600}}});

const objSet7 = {};
set(objSet7, ['a', 'b', 'c'], ['d', 'e', 'f'], 700);
expect(objSet7).eql({a: {b: {c: {d: {e: {f: 700}}}}}});

const objSet8 = set({}, ['a', 'b', 'c'], 800);
expect(objSet8).eql({a: {b: {c: 800}}});

const objSet9 = set({}, 'a', 'b', 'collection', []);
expect(objSet9).eql({a: {b: {collection: []}}});

const objSet10 = set({}, ['a', 'b', 'collection'], []);
expect(objSet10).eql({a: {b: {collection: []}}});

const objSet11 = set({}, 'a', []);
set(objSet11, 'a', 0, 1100);
set(objSet11, 'a', 1, 1101);
expect(objSet11).eql({a: [1100, 1101]});

//set if not exists
const objSoftSet1 = {};
setIfUndef(objSoftSet1, 'a', 'b', 'c', 100);
expect(objSoftSet1).eql({a: {b: {c: 100}}});
setIfUndef(objSoftSet1, 'a', 'b', 'c1', 101);
expect(objSoftSet1).eql({a: {b: {c: 100, c1: 101}}});
setIfUndef(objSoftSet1, 'a', 'b', 'c1', 111);
expect(objSoftSet1).eql({a: {b: {c: 100, c1: 101}}});

setIfUndef(objSoftSet1, 'a', 'b', 'c2', null);
expect(objSoftSet1).eql({a: {b: {c: 100, c1: 101, c2: null}}});
setIfUndef(objSoftSet1, 'a', 'b', 'c2', 112);
expect(objSoftSet1).eql({a: {b: {c: 100, c1: 101, c2: null}}});

setIfUndef(objSoftSet1, 'a', 'b', 'c3', undefined);
expect(objSoftSet1).eql({a: {b: {c: 100, c1: 101, c2: null, c3: undefined}}});
setIfUndef(objSoftSet1, 'a', 'b', 'c3', 113);
expect(objSoftSet1).eql({a: {b: {c: 100, c1: 101, c2: null, c3: 113}}});

const objSoftSet2 = setIfUndef(null, 'a', 'b', 'c', 200);
expect(objSoftSet2).eql({a: {b: {c: 200}}});

const objSoftSet3 = setIfUndef(undefined, 'a', 'b', 'c', 300);
expect(objSoftSet3).eql({a: {b: {c: 300}}});

//get
const objGet1 = {a: {b: {c: 100}}};
expect(get(objGet1)).eql({a: {b: {c: 100}}});
expect(get(objGet1, 'a')).eql({b: {c: 100}});
expect(get(objGet1, 'a', 'b')).eql({c: 100});
expect(get(objGet1, ['a', 'b', 'c'])).equal(100);
