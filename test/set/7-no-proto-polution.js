const assert = require('assert').strict;
const {set} = require('../../');

const obj1 = {};
const obj2 = {};
set(obj1, '__proto__', 'admin', true);
assert.notEqual(obj1.__proto__, Object.prototype);
assert.equal(obj1.__proto__.admin, true);
assert.strictEqual(obj2.admin, undefined);
