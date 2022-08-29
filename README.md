# Quick Start

## `set`
Set value to object's hierarchy properties:
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

Create object at the same time:
```javascript
import { set } from 'object-hierarchy-access';
const obj = set({}, 'a', 'b', 'c', 100);
console.log(obj.a.b.c); // 100
```

## `setIfUndef`
Only set value if last hierarchy property not exists or its value is `undefined`:
```javascript
import { setIfUndef } from 'object-hierarchy-access';
const obj = {};
setIfUndef(obj, 'a', 'b', 'collection', []);
obj.a.b.collection.push(100);
console.log(obj.a.b.collection); // [100]

setIfUndef(obj, 'a', 'b', 'collection', []);
obj.a.b.collection.push(200);
console.log(obj.a.b.collection); // [100, 200]
```

It is also possible to create the object at the same time:
```javascript
import { setIfUndef } from 'object-hierarchy-access';
const obj = setIfUndef({}, 'a', 'b', 'c', 100);
console.log(obj.a.b.c); // 100
```

## Customize object creating
Property can ba a descriptor object rather than a string for non-last property item. The descriptor shape is `{name, value|type|create}`.

- `name` is the property name
- `value` should be an object assign to parent object's `name`
- `type` is a constructor function that creates object assign to parent object's `name`
- `create(parent, name)` is a function that returns a customized object assign to `parent` object's `name`

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

## `assign` and `assignIfUndef`
Just like `set` and `setIfUndef`, but returns the second last hierarchy object which contains the last hierarchy property.
Cannot create object at the same time since the whole object is not returned.
```javascript
import { assign } from 'object-hierarchy-access';
const obj = {};
const result = assign(obj, 'a', 'b', 'c', 100);
console.log(obj.a.b.c); // 100
console.log(result); // {c: 100}
```

## `put` and `putIfUndef`
Just like `set` and `setIfUndef`, but returns the last hierarchy value.
Cannot create object at the same time since the whole object is not returned.
```javascript
import { putIfUndef } from 'object-hierarchy-access';
const obj = {};
const collection = putIfUndef(obj, 'a', 'b', 'collection', []);
collection.push(100);

const anotherCollection = putIfUndef(obj, 'a', 'b', 'collection', []);
anotherCollection.push(200);
console.log(anotherCollection); // [100, 200];
console.log(collection === anotherCollection); // true
```

## `get`
Get value from object's hierarchy properties.

### String property
Specifying properties by string:
```javascript
import { get } from 'object-hierarchy-access';
const obj = {a: {b: {c: 100}}};
get(obj, 'a', 'b'); // returns {c: 100}
get(obj, 'a', 'b', 'c'); // returns 100
get(obj, ['a', 'b', 'c']); // returns 100
```

### Function property
Property can be a function that returns property name. The parameter is parent object.
```javascript
const obj = {a: {value: 1, b1: {c: 100}, b2: {c: 200}}};
get(obj, 'a', parent => parent.value === 1 ? 'b1' : 'b2', 'c'); // returns 100
```

### Object property
Property can be a descriptor object, which its shape is `{name|getName, got?}`.

- `name` is a string property name
- `getName(parent)` is a function to get property name
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

## `traverse`
Go through each hierarchy with a callback:
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
