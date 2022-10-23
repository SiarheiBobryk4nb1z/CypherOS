const assert = require('assert').strict;
const {pick} = require('../../');

const buildingX = Symbol('x');

const rooms = {
	building1: {
		floor1: [{roomNo: '1-101'}, {roomNo: '1-102'}, {roomNo: '1-103'}],
		floor2: [{roomNo: '1-201'}, {roomNo: '1-202'}, {roomNo: '1-203'}],
		floor3: [{roomNo: '1-301'}, {roomNo: '1-302'}, {roomNo: '1-303'}]
	},
	building2: {
		floor1: [{roomNo: '2-101'}, {roomNo: '2-102'}, {roomNo: '2-103'}],
		floor2: [{roomNo: '2-201'}, {roomNo: '2-202'}, {roomNo: '2-203'}],
		floor3: [{roomNo: '2-301'}, {roomNo: '2-302'}, {roomNo: '2-303'}]
	},
	building3: {
		floor1: [{roomNo: '3-101'}, {roomNo: '3-102'}, {roomNo: '3-103'}],
		floor2: [{roomNo: '3-201'}, {roomNo: '3-202'}, {roomNo: '3-203'}],
		floor3: [{roomNo: '3-301'}, {roomNo: '3-302'}, {roomNo: '3-303'}]
	},
	building4: {},
	[buildingX]: {
		floor1: [{roomNo: 'x-101'}, {roomNo: 'x-102'}, {roomNo: 'x-103'}],
		floor2: [{roomNo: 'x-201'}, {roomNo: 'x-202'}, {roomNo: 'x-203'}],
		floor3: [{roomNo: 'x-301'}, {roomNo: 'x-302'}, {roomNo: 'x-303'}]
	}
};

const allFloor1Rooms = pick(rooms, ['building1', 'building2', 'building3', 'building4', buildingX], 'floor1', undefined);
assert.deepEqual(allFloor1Rooms, [
	{roomNo: '1-101'}, {roomNo: '1-102'}, {roomNo: '1-103'},
	{roomNo: '2-101'}, {roomNo: '2-102'}, {roomNo: '2-103'},
	{roomNo: '3-101'}, {roomNo: '3-102'}, {roomNo: '3-103'},
	{roomNo: 'x-101'}, {roomNo: 'x-102'}, {roomNo: 'x-103'}
]);
