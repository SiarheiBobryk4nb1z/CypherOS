const {expect} = require('chai');
const {set} = require('../../');

const sA = Symbol('symbol-a');
const sB = Symbol('symbol-b');
const sC = Symbol('symbol-c');
const obj = set({}, sA, sB, sC, 100);
expect(obj[sA][sB][sC]).equal(100);
