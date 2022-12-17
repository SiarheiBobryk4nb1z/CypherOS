const assert = require('assert').strict;
const {group} = require('../../');

const arrRooms = [
	{
		buildingNo: 1,
		floors: [
			{
				floorNo: 0,
				rooms: [{roomNo: '1-001'}, {roomNo: '1-002'}, {roomNo: '1-003'}]
			},
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

const arrGroupByHasFloor0 = group(arrRooms, (parent, name, current) => {
	if (current.floors[0].floorNo === 0) {
		return 'hasFloor0';
	} else {
		return 'hasNoFloor0';
	}
});
assert.deepEqual(arrGroupByHasFloor0, {
	hasFloor0: [{
		buildingNo: 1,
		floors: [
			{
				floorNo: 0,
				rooms: [{roomNo: '1-001'}, {roomNo: '1-002'}, {roomNo: '1-003'}]
			},
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
	}],
	hasNoFloor0: [
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
	]
});
