const assert = require('assert').strict;
const {select} = require('../../');

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

const allFloor1Rooms = select(
	rooms,
	['building1', 'building2', 'building3', 'building4'],
	() => 'floor1'
);
assert.deepEqual(allFloor1Rooms, {
	building1: {
		floor1: [{roomNo: '1-101'}, {roomNo: '1-102'}, {roomNo: '1-103'}]
	},
	building2: {
		floor1: [{roomNo: '2-101'}, {roomNo: '2-102'}, {roomNo: '2-103'}]
	},
	building3: {
		floor1: [{roomNo: '3-101'}, {roomNo: '3-102'}, {roomNo: '3-103'}]
	},
	building4: {}
});

const all01Rooms = select(rooms, undefined, {names: undefined}, 0);
assert.deepEqual(all01Rooms, {
	building1: {
		floor1: [{roomNo: '1-101'}],
		floor2: [{roomNo: '1-201'}],
		floor3: [{roomNo: '1-301'}]
	},
	building2: {
		floor1: [{roomNo: '2-101'}],
		floor2: [{roomNo: '2-201'}],
		floor3: [{roomNo: '2-301'}]
	},
	building3: {
		floor1: [{roomNo: '3-101'}],
		floor2: [{roomNo: '3-201'}],
		floor3: [{roomNo: '3-301'}]
	},
	building4: {},
	[buildingX]: {
		floor1: [{roomNo: 'x-101'}],
		floor2: [{roomNo: 'x-201'}],
		floor3: [{roomNo: 'x-301'}]
	}
});

const arrRooms = [
	{
		buildingNo: 1,
		floors: [
			{
				floorNo: 1,
				rooms: [{roomNo: '1-101'}, {roomNo: '1-102'}, {roomNo: '1-103'}]
			},
			{
				floorNo: 2,
				rooms: [{roomNo: '1-201'}, {roomNo: '1-202'}, {roomNo: '1-203'}]
			},
			{
				floorNo: 3,
				rooms: [{roomNo: '1-301'}, {roomNo: '1-302'}, {roomNo: '1-303'}]
			}
		]
	},
	{
		buildingNo: 2,
		floors: [
			{
				floorNo: 1,
				rooms: [{roomNo: '2-101'}, {roomNo: '2-102'}, {roomNo: '2-103'}]
			},
			{
				floorNo: 2,
				rooms: [{roomNo: '2-201'}, {roomNo: '2-202'}, {roomNo: '2-203'}]
			},
			{
				floorNo: 3,
				rooms: [{roomNo: '2-301'}, {roomNo: '2-302'}, {roomNo: '2-303'}]
			}
		]
	},
	{
		buildingNo: 3,
		floors: [
			{
				floorNo: 1,
				rooms: [{roomNo: '3-101'}, {roomNo: '3-102'}, {roomNo: '3-103'}]
			},
			{
				floorNo: 2,
				rooms: [{roomNo: '3-201'}, {roomNo: '3-202'}, {roomNo: '3-203'}]
			},
			{
				floorNo: 3,
				rooms: [{roomNo: '3-301'}, {roomNo: '3-302'}, {roomNo: '3-303'}]
			}
		]
	}
];

const arrAllFloor1Rooms = select(
	arrRooms,
	{getNames: () => undefined},
	['buildingNo', 'floors'],
	0,
	'rooms'
);
assert.deepEqual(arrAllFloor1Rooms, [
	{
		buildingNo: 1,
		floors: [
			{
				rooms: [{roomNo: '1-101'}, {roomNo: '1-102'}, {roomNo: '1-103'}]
			},
		]
	},
	{
		buildingNo: 2,
		floors: [
			{
				rooms: [{roomNo: '2-101'}, {roomNo: '2-102'}, {roomNo: '2-103'}]
			},
		]
	},
	{
		buildingNo: 3,
		floors: [
			{
				rooms: [{roomNo: '3-101'}, {roomNo: '3-102'}, {roomNo: '3-103'}]
			},
		]
	}
]);

const arrAll01Rooms = select(
	arrRooms,
	{getNames: () => undefined},
	'floors',
	undefined,
	{
		names: 'rooms',
		mapName: (parent, name, current) => name === 'rooms' ? 'room' : name,
		mapValue: (parent, name, current) => current[0],
		mapped: (parent, name, current) => {
			assert.equal(name, 'room');
			assert.ok(current.roomNo);
		}
	}
);
assert.deepEqual(arrAll01Rooms, [
	{
		floors: [
			{
				room: {roomNo: '1-101'}
			},
			{
				room: {roomNo: '1-201'}
			},
			{
				room: {roomNo: '1-301'}
			}
		]
	},
	{
		floors: [
			{
				room: {roomNo: '2-101'}
			},
			{
				room: {roomNo: '2-201'}
			},
			{
				room: {roomNo: '2-301'}
			}
		]
	},
	{
		floors: [
			{
				room: {roomNo: '3-101'}
			},
			{
				room: {roomNo: '3-201'}
			},
			{
				room: {roomNo: '3-301'}
			}
		]
	}
]);
