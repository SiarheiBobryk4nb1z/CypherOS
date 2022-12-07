# Importing methods
For ES module environment, use `import` to import methods:
```javascript
import { get, set } from 'object-hierarchy-access';
```

For commonjs environment, use `requre` to import methods:
```javascript
const { get, set } = require('object-hierarchy-access')
```

For AMD module environment, define module `object-hierarchy-access` from file `dist/index`.

For global mode, methods are under global variable `ObjectHierarchyAccess`.

# Assigning
## Setting a value
All methods for setting a value below have same parameters definition:
```javascript
setValue(targetObject, ...hierarchyProperties, lastProperty, value);
setValue(targetObject, [...hierarchyProperties, lastProperty], value);
```

### `set`
Set value to object's hierarchy properties, returns the object:
```javascript
import { set } from 'object-hierarchy-access';
const obj = {};
set(obj, 'a', 'b', 'c', 100);
console.log(obj.a.b.c); // 100
```

Properties could be in arrays:
```javascript
import { set } from 'object-hierarchy-access';

const obj = {};
set(obj, ['a', 'b', 'c'], 100);
console.log(obj.a.b.c); // 100

set(obj, ['d', 'e', 'f'], ['g', 'h', 'i'], 200);
console.log(obj.d.e.f.g.h.i); // 200
```

Create root object at the same time:
```javascript
import { set } from 'object-hierarchy-access';
const obj = set({}, 'a', 'b', 'c', 100);
console.log(obj.a.b.c); // 100
```

### `setIfUndef`
Only set value if last hierarchy property not exists or its value is `undefined`:
```javascript
import { setIfUndef } from 'object-hierarchy-access';
const obj = {};
setIfUndef(obj, 'a', 'b', 'collection', []);
obj.a.b.collection.push(100);
console.log(obj.a.b.collection); // [100]

setIfUndef(obj, 'a', 'b', 'collection', []); // will not override previous array
obj.a.b.collection.push(200);
console.log(obj.a.b.collection); // [100, 200]
```

It is also possible to create the object at the same time:
```javascript
import { setIfUndef } from 'object-hierarchy-access';
const obj = setIfUndef({}, 'a', 'b', 'c', 100);
console.log(obj.a.b.c); // 100
```

### Customize hierarchy object creating
Property can ba a descriptor object rather than a primitive value for non-last property item. The descriptor shape is `{name|getName, value|type|create, override?, created?, skipped?, got?}`.

- `name` is a primitive property name
- `getName(parent)` is a callback function to get property name
- `value` should be an object assign to parent object's `name`
- `type` is a constructor function(or class) with no parameter that can be used to create object, assign to parent object's `name`
- `create(parent, name)` is a callback function that returns a customized object assign to `parent` object's `name`
- `override` determines if always create new hierarchy object even property already exists
- `created(parent, name, current)` is a callback function when new hierarchy object has been created
- `skipped(parent, name, current)` is a callback function when hierarchy object already exists and skipped
- `got(parent, name, current)` is a callback function when current hierarchy object got no matter it is created or skipped.

Property can also be a function, it just act as `getName` callback in object descriptor.

If no *name* related option specified, property name will be `undefined`.

If no *value* related option specified, value will be `{}`.

```javascript
const obj = set({}, 'a', {name: 'b', value: []}, '0', 100);
console.log(obj); // {a: {b: [100]}}

const obj2 = set({}, 'a', {name: 'b', value: {}}, 'c', 100);
console.log(obj2); // {a: {b: {c: 100}}
```
```javascript
const obj = set({}, 'a', {name: 'b', type: Array}, '0', 100);
console.log(obj); // {a: {b: [100]}}
```
```javascript
const obj = set({}, 'a', {name: 'b', create: () => [1, 2, 3]}, '3', 200);
console.log(obj); //  {a: {b: [1, 2, 3, 200]}}
```
```javascript
const obj = set({}, 'a', 'b', 'c', 100);
setIfUndef(obj, 'a', 'b', 'c', 200);
console.log(obj.a.b.c); // 100

setIfUndef(obj, 'a', {name: 'b', override: true}, 'c', 300);
console.log(obj.a.b.c); // 300
```

### `assign` and `assignIfUndef`
Just like `set` and `setIfUndef`, but returns the second last hierarchy object which contains the last hierarchy property.
Cannot create root object at the same time since the whole object is not returned.
```javascript
import { assign } from 'object-hierarchy-access';
const obj = {};
const result = assign(obj, 'a', 'b', 'c', 100);
console.log(obj.a.b.c); // 100
console.log(result); // {c: 100}
console.log(result === obj.a.b); // true
```

### `put` and `putIfUndef`
Just like `set` and `setIfUndef`, but returns the last hierarchy value.
Cannot create root object at the same time since the whole object is not returned.
```javascript
import { putIfUndef } from 'object-hierarchy-access';
const obj = {};
const collection = putIfUndef(obj, 'a', 'b', 'collection', []);
collection.push(100);

const anotherCollection = putIfUndef(obj, 'a', 'b', 'collection', []);
anotherCollection.push(200);
console.log(anotherCollection); // [100, 200];
console.log(collection === anotherCollection); // true
console.log(collection === obj.a.b.collection); // true
```

## Creating hierarchy properties only
All methods for creating hierarchy properties structure below have same parameters definition:
```javascript
createHierarchyProperty(targetObject, ...hierarchyProperties);
createHierarchyProperty(targetObject, [hierarchyProperties]);
```

### `setProp`
Use primitive value as property name or property descriptor object to create hierarchy property.
Can create root object at the same time. Returns the object.
```javascript
import { setProp } from 'object-hierarchy-access';
const obj1 = {};
setProp(obj1, 'a', 'b', 'c');
console.log(obj1); // {a:{b:{c:{}}}}

const obj2 = setProp({}, 'a', 'b', {name:'c', type:Array});
console.log(obj2); // {a:{b:{c:[]}}}
```

### `setPropIfUndef`
Only create last hierarchy property if not exists or its value is `undefined`.
```javascript
import { setPropIfUndef } from 'object-hierarchy-access';
const obj = {};
setPropIfUndef(obj, 'a', 'b', {name:'c', value:[100]});
console.log(obj); // {a:{b:{c:[100]}}}

setPropIfUndef(obj, 'a', 'b', {name:'c', value:{}}); // will not override previous array
console.log(obj); // {a:{b:{c:[100]}}}
```

### `assignProp` and `assignPropIfUndef`
Just like `setProp` and `setPropIfUndef`, but returns the second last hierarchy.
Cannot create root object at the same time.
```javascript
import { assignProp } from 'object-hierarchy-access';
const obj = {};
const result = assignProp(obj, 'a', 'b', 'c');
console.log(obj); // {a:{b:{c:{}}}}
console.log(result); // {c:{}}
```

### `putProp` and `putPropIfUndef`
Just like `setProp` and `setPropIfUndef`, but returns the last hierarchy.
Cannot create root object at the same time.
```javascript
import { putProp } from 'object-hierarchy-access';
const obj = {};
const result = putProp(obj, 'a', 'b', 'c');
console.log(obj); // {a:{b:{c:{}}}}
console.log(result); // {}
console.log(result === obj.a.b.c); // true
```

## Setting value VS Creating hierarchy property
Sometimes *setting value methods* and *creating hierarchy property methods* can be replaced with each other.
The following two blocks of codes have the same effect:
````javascript
import { set } from 'object-hierarchy-access';
set({}, 'a', 'b', 'c', []);
````
```javascript
import { setProp } from 'object-hierarchy-access';
setProp({}, 'a', 'b', {name:'c', value:[]});
```
The first example is shorter, while the second one is useful if you want to combine property name with its value as a descriptor.

For `-IfUndef` methods, if last hierarchy property value is very expensive for creating, use creating hierarchy methods with descriptor's property `type` or `create`,
could avoid creating unnecessary values except the first time.
```javascript
import { setIfUndef } from 'object-hierarchy-access';
const obj = {};
setIfUndef(obj, 'a', 'b', 'c', []);
setIfUndef(obj, 'a', 'b', 'c', []);  // the array instance is created and then abandoned
```
```javascript
import { setPropIfUndef } from 'object-hierarchy-access';
const obj = {};
setPropIfUndef(obj, 'a', 'b', {name:'c', type:Array});  // the array instance is created
setPropIfUndef(obj, 'a', 'b', {name:'c', type:Array});  // will not create array instance
setPropIfUndef(obj, 'a', 'b', {name:'c', create: ()=>[]});  // will not create array instance
```

For setting value methods, hierarchy properties only created if not exists by default, unless `override` is specified.
Value will always be overridden unless using `-IfUndef` related methods.

For creating hierarchy property methods, non-last hierarchy properties only created if not exists by default, unless `override` is specified.
For last hierarchy property,
non `-IfUndef` methods overrides existing property and ignore `override`,
while `-IfUndef` methods will not unless `override` is `true`.
```javascript
const obj = {};
setPropIfUndef(obj,'a','b',{name:'c', value:[]}); // obj.a.b.c === []
setPropIfUndef(obj,'a','b',{name:'c', value:{}}); // obj.a.b.c not changed
setPropIfUndef(obj,'a','b',{name:'c', value:{}, override:true}); // obj.a.b.c === {} 
```

## Summary: names for assigning methods
Returns\Category|Setting Value|Creating Hierarchy Property
----------------|------------|------------------
Root Object|`set`, `setIfUndef`|`setProp`, `setPropIfUndef`
Second Last Hierarchy|`assign`, `assignIfUndef`|`assignProp`, `assignPropIfUndef`
Last Hierarchy|`put`, `putIfUndef`|`putProp`, `putPropIfUndef`

# Getting
### `get`
Get value from object's hierarchy properties.

Parameter definition:
```javascript
get(targetObject, ...hierarchyProperties);
get(targetObject, [hierarchyProperties]);
```
#### Primitive name property
Specifying properties by string, number or symbol:
```javascript
import { get } from 'object-hierarchy-access';
const obj = {a: {b: {c: 100}}};
get(obj, 'a', 'b'); // returns {c: 100}
get(obj, 'a', 'b', 'c'); // returns 100
get(obj, ['a', 'b', 'c']); // returns 100
```

#### Object property
Property can be a descriptor object, which its shape is `{name|getName, got?}`.

- `name` is a primitive property name
- `getName(parent)` is a callback function to get property name
- `got(parent, name, current)` is a callback when value has been got via `name` property from `parent`.

```javascript
import { get } from 'object-hierarchy-access';
const obj = {a: {b: {c: 100}}};
get(obj,
	{
		name: 'a',
		got: (parent, name, current) => {
			/*
			parent => {a: {b: {c: 100}}};
			name => 'a';
			current => {b: {c: 100}};
			*/
		}
	},
	{
		name: 'b',
		got: (parent, name, current) => {
			/*
			parent => {b: {c: 100}};
			name => 'b';
			current => {c: 100};
			*/
		}
	},
	{
		name: 'c',
		got: (parent, name, current) => {
			/*
			parent => {c: 100};
			name => 'c';
			current => 100;
			*/
		}
	}
);
```

#### Function property
Property can also be a function, it just act as `getName` callback in object descriptor.
```javascript
const obj = {a: {value: 1, b1: {c: 100}, b2: {c: 200}}};
get(obj, 'a', parent => parent.value === 1 ? 'b1' : 'b2', 'c'); // returns 100
```

### `traverse`
Go through each hierarchy with a callback `(parent, name, current) => false?`.
Valid hierarchy property format is same as `get`.
Returns `false` in callback to terminate hierarchy iteration.

Parameter definition:
```javascript
traverse(targetObject, ...hierarchyProperties, callback);
traverse(targetObject, [hierarchyProperties], callback);
```

```javascript
import { traverse } from 'object-hierarchy-access';
const node1 = {}, node2 = {}, node3 = {};
node1.next = node2;
node2.next = node3;
node3.next = null;
const linkedList = { next: node1 };

let nextId = 1;
traverse(linkedList, 'next', 'next', 'next', (parent, name, current) => { current.id = nextId++; });
console.log(node1.id, node2.id, node3.id); // 1, 2, 3
```

### `traverseReverse`
Just like `traverse`, but callback was invoked from last hierarchy to first hierarchy.
 Returns `false` in callback to terminate hierarchy iteration.
```javascript
import { traverseReverse } from 'object-hierarchy-access';
const task = {
	done: false,
	subTasks: [
		{
			done: false,
			subTasks: [
				{done: false},  // will be done
				{done: true}
			]
		}
	]
};

task.subTasks[0].subTasks[0].done = true;
traverseReverse(task, 'subTasks', 0, 'subTasks', (parent, name, current) => {
	if (Array.isArray(current)) {
		parent.done = current.every(task => task.done);
	}
});
console.log(task.done); // true
console.log(task.subTasks[0].done); // true
```

### `select`
Choose hierarchy properties from object, and got a new object only contains chosen properties.

Parameter definition:
```javascript
select(targetObject, ...selectedHierarchyProperties);
```
Each selected hierarchy property parameter can be an array of properties, a single primitive property,
a descriptor object `{names|getNames, got?, mapName?, mapValue?, mapped?}` or a callback function as descriptor object's `getNames`.
- `names` is an array of primitive properties, or a single primitive property
- `getNames(current)` is a callback function to get property names, should returns array of properties or a single property.
- `got(parent, name, current)` is a callback function when current hierarchy property value is got.
- `mapName(parent, name, current)` is a callback function if you want to rename hierarchy property, make sure mapped names are not conflict under same hierarchy.
- `mapValue(parent, name, current)` is a callback function if you want to transform property value into another shape. Deeper hierarchy selection will based on mapped value.
- `mapped(parent, mappedName, mappedCurrent)` is a callback function when mapping is done.

To select all properties of an object, specify `undefined` as names, no matter this object is an array or regular object.
```javascript
import { select } from 'object-hierarchy-access';
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
	building4: {}
};

const allFloor1Rooms = select(rooms, ['building1', 'building2', 'building3', 'building4'], 'floor1');
/*
{
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
}
*/
```

### `pick`
Similar to `select`, but only picks last hierarchy values into the same array and return.
Hierarchy selection option `mapName` is useless in this case.
```javascript
import { pick } from 'object-hierarchy-access';
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
	building4: {}
};
const allFloor1Rooms = pick(rooms, ['building1', 'building2', 'building3', 'building4'], 'floor1', undefined);
/*
[
	{roomNo: '1-101'}, {roomNo: '1-102'}, {roomNo: '1-103'},
	{roomNo: '2-101'}, {roomNo: '2-102'}, {roomNo: '2-103'},
	{roomNo: '3-101'}, {roomNo: '3-102'}, {roomNo: '3-103'},
	{roomNo: 'x-101'}, {roomNo: 'x-102'}, {roomNo: 'x-103'}
]
*/
```

### `group`
Divide first hierarchy properties into different hierarchical groups.

If original object is an Array, the grouped data are also arrays. 

Parameter definition:
```javascript
group(targetObject, ...groupParams);
```
`groupParams` can be an descriptor object which its shape is `{type?|create?, by}`, or a callback function as descriptor object's `by`.
- `type` is the group container object type, defaults to `Object`
- `create(parent)` is a callback function to create group container object
- `by(parent, name, current)` is a callback for iterating each property on first hierarchy, should returns a group name

`parent` is `targetObject`. `name` is a property name of first hierarchy. `current` is `parent[name]`.

Specify multiple `groupParams` will create multiple group hierarchies.
```javascript
import { group } from 'object-hierarchy-access';
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
	building4: {}
};

const groupByHasFloor0 = group(rooms, (parent, name, current) => {
	if (current.floor0) {
		return 'hasFloor0';
	} else {
		return 'hasNoFloor0';
	}
});
/*
{
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
		building4: {}
	}
}
*/

const groupByHasFloor0ByOddEven = group(
	rooms,
	(parent, name, current) => current.floor0 ? 'hasFloor0' : 'hasNoFloor0',
	(parent, name, current) => Object.keys(current).length % 2 ? 'oddFloors' : 'evenFloors'
);
/*
{
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
			}
		}
	}
}
*/

const groupByHasFloor0ByArray = group(
	rooms,
	(parent, name, current) => current.floor0 ? 'hasFloor0' : 'hasNoFloor0',
	{
		type: Array,
		by: (parent, name, current) => Object.keys(current).length % 2
	}
);
/*
{
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
			}
		}
	]
}
*/
```
