# Quick Start

## `set`
Set value to object's hierarchy properties:
```javascript
import { set } from 'object-hierarchy-access';
const obj = {};
set(obj, 'a', 'b', 'c', 100);
console.log(obj.a.b.c); // 100
```

Attributes could be in arrays:
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
Only set value if target property not exists or its value is `undefined`:
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
Property can ba a descriptor object rather than a string for non-last property item. The descriptor shape is `{name, type|create}`.

- `name` is the property name
- `type` is a constructor function that creates object assign to parent object's `name`
- `create` is a function that returns a customized object assign to parent object's `name`

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

## `get`
Get value from object's hierarchy properties:
```javascript
import { get } from 'object-hierarchy-access';
const obj = {a: {b: {c: 100}}};
get(obj, 'a', 'b');    // returns {c: 100}
get(obj, 'a', 'b', 'c');    // returns 100
get(obj, ['a', 'b', 'c']);    // returns 100
```
