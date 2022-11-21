const assert = require('assert').strict;
const {group} = require('../../');

const buildingX = Symbol('x');

const rooms = {
	building1: {
		floor0: [{roomNo: '1-001'}, {roomNo: '1-002'}, {roomNo: '1-003'}],
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
		floor3: [{roomNo: '3-301'}, {roomNo: '3-302'}, {roomNo: '3-303'}],
		floor4: [{roomNo: '3-401'}, {roomNo: '3-402'}, {roomNo: '3-403'}]
	},
	building4: {},
	[buildingX]: {
		floor1: [{roomNo: 'x-101'}, {roomNo: 'x-102'}, {roomNo: 'x-103'}],
		floor2: [{roomNo: 'x-201'}, {roomNo: 'x-202'}, {roomNo: 'x-203'}],
		floor3: [{roomNo: 'x-301'}, {roomNo: 'x-302'}, {roomNo: 'x-303'}]
	}
};

const groupByHasFloor0 = group(rooms, (parent, name, current) => {
	if (current.floor0) {
		return 'hasFloor0';
	} else {
		return 'hasNoFloor0';
	}
});
assert.deepEqual(groupByHasFloor0, {
	hasFloor0: {
		building1: {
			floor0: [{roomNo: '1-001'}, {roomNo: '1-002'}, {roomNo: '1-003'}],
			floor1: [{roomNo: '1-101'}, {roomNo: '1-102'}, {roomNo: '1-103'}],
			floor2: [{roomNo: '1-201'}, {roomNo: '1-202'}, {roomNo: '1-203'}],
			floor3: [{roomNo: '1-301'}, {roomNo: '1-302'}, {roomNo: '1-303'}]
		}
	},
	hasNoFloor0: {
		building2: {
			floor1: [{roomNo: '2-101'}, {roomNo: '2-102'}, {roomNo: '2-103'}],
			floor2: [{roomNo: '2-201'}, {roomNo: '2-202'}, {roomNo: '2-203'}],
			floor3: [{roomNo: '2-301'}, {roomNo: '2-302'}, {roomNo: '2-303'}]
		},
		building3: {
			floor1: [{roomNo: '3-101'}, {roomNo: '3-102'}, {roomNo: '3-103'}],
			floor2: [{roomNo: '3-201'}, {roomNo: '3-202'}, {roomNo: '3-203'}],
			floor3: [{roomNo: '3-301'}, {roomNo: '3-302'}, {roomNo: '3-303'}],
			floor4: [{roomNo: '3-401'}, {roomNo: '3-402'}, {roomNo: '3-403'}]
		},
		building4: {},
		[buildingX]: {
			floor1: [{roomNo: 'x-101'}, {roomNo: 'x-102'}, {roomNo: 'x-103'}],
			floor2: [{roomNo: 'x-201'}, {roomNo: 'x-202'}, {roomNo: 'x-203'}],
			floor3: [{roomNo: 'x-301'}, {roomNo: 'x-302'}, {roomNo: 'x-303'}]
		}
	}
});

const groupByHasFloor0ByOddEven = group(
	rooms,
	(parent, name, current) => current.floor0 ? 'hasFloor0' : 'hasNoFloor0',
	(parent, name, current) =>
		Object.keys(current).length % 2 ? 'oddFloors' : 'evenFloors'
);
assert.deepEqual(groupByHasFloor0ByOddEven, {
	hasFloor0: {
		evenFloors: {
			building1: {
				floor0: [{roomNo: '1-001'}, {roomNo: '1-002'}, {roomNo: '1-003'}],
				floor1: [{roomNo: '1-101'}, {roomNo: '1-102'}, {roomNo: '1-103'}],
				floor2: [{roomNo: '1-201'}, {roomNo: '1-202'}, {roomNo: '1-203'}],
				floor3: [{roomNo: '1-301'}, {roomNo: '1-302'}, {roomNo: '1-303'}]
			}
		}
	},
	hasNoFloor0: {
		evenFloors: {
			building3: {
				floor1: [{roomNo: '3-101'}, {roomNo: '3-102'}, {roomNo: '3-103'}],
				floor2: [{roomNo: '3-201'}, {roomNo: '3-202'}, {roomNo: '3-203'}],
				floor3: [{roomNo: '3-301'}, {roomNo: '3-302'}, {roomNo: '3-303'}],
				floor4: [{roomNo: '3-401'}, {roomNo: '3-402'}, {roomNo: '3-403'}]
			},
			building4: {},
		},
		oddFloors: {
			building2: {
				floor1: [{roomNo: '2-101'}, {roomNo: '2-102'}, {roomNo: '2-103'}],
				floor2: [{roomNo: '2-201'}, {roomNo: '2-202'}, {roomNo: '2-203'}],
				floor3: [{roomNo: '2-301'}, {roomNo: '2-302'}, {roomNo: '2-303'}]
			},
			[buildingX]: {
				floor1: [{roomNo: 'x-101'}, {roomNo: 'x-102'}, {roomNo: 'x-103'}],
				floor2: [{roomNo: 'x-201'}, {roomNo: 'x-202'}, {roomNo: 'x-203'}],
				floor3: [{roomNo: 'x-301'}, {roomNo: 'x-302'}, {roomNo: 'x-303'}]
			}
		}
	}
});

const groupByHasFloor0ByArray = group(
	rooms,
	(parent, name, current) => current.floor0 ? 'hasFloor0' : 'hasNoFloor0',
	{
		type: Array,
		by: (parent, name, current) => Object.keys(current).length % 2
	}
);
assert.deepEqual(groupByHasFloor0ByArray, {
	hasFloor0: [
		{
			building1: {
				floor0: [{roomNo: '1-001'}, {roomNo: '1-002'}, {roomNo: '1-003'}],
				floor1: [{roomNo: '1-101'}, {roomNo: '1-102'}, {roomNo: '1-103'}],
				floor2: [{roomNo: '1-201'}, {roomNo: '1-202'}, {roomNo: '1-203'}],
				floor3: [{roomNo: '1-301'}, {roomNo: '1-302'}, {roomNo: '1-303'}]
			}
		}
	],
	hasNoFloor0: [
		{
			building3: {
				floor1: [{roomNo: '3-101'}, {roomNo: '3-102'}, {roomNo: '3-103'}],
				floor2: [{roomNo: '3-201'}, {roomNo: '3-202'}, {roomNo: '3-203'}],
				floor3: [{roomNo: '3-301'}, {roomNo: '3-302'}, {roomNo: '3-303'}],
				floor4: [{roomNo: '3-401'}, {roomNo: '3-402'}, {roomNo: '3-403'}]
			},
			building4: {},
		},
		{
			building2: {
				floor1: [{roomNo: '2-101'}, {roomNo: '2-102'}, {roomNo: '2-103'}],
				floor2: [{roomNo: '2-201'}, {roomNo: '2-202'}, {roomNo: '2-203'}],
				floor3: [{roomNo: '2-301'}, {roomNo: '2-302'}, {roomNo: '2-303'}]
			},
			[buildingX]: {
				floor1: [{roomNo: 'x-101'}, {roomNo: 'x-102'}, {roomNo: 'x-103'}],
				floor2: [{roomNo: 'x-201'}, {roomNo: 'x-202'}, {roomNo: 'x-203'}],
				floor3: [{roomNo: 'x-301'}, {roomNo: 'x-302'}, {roomNo: 'x-303'}]
			}
		}
	]
});

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
