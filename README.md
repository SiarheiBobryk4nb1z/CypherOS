# Quick Start

## Set
Assign value to object's hierarchy properties:
```javascript
import { set } from 'object-hierarchy-access';
let obj = {};
set(obj, 'a', 'b', 'c', 100);
console.log(obj.a.b.c); // 100
```

Attributes could be in arrays:
```javascript
import { set } from 'object-hierarchy-access';
let obj = {};
set(obj, ['a', 'b', 'c'], 100);
console.log(obj.a.b.c); // 100
set(obj, ['d', 'e', 'f'], ['g', 'h', 'i'], 200);
console.log(obj.d.e.f.g.h.i); // 200
```

Create object at the same time:
```javascript
import { set } from 'object-hierarchy-access';
let obj = set({}, 'a', 'b', 'c', 100);
console.log(obj.a.b.c); // 100
```

## setIfUndef
Only assign value if target property not exists or its value is `undefined`:
```javascript
import { setIfUndef } from 'object-hierarchy-access';
let obj = {};
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
let obj = setIfUndef({}, 'a', 'b', 'c', 100);
console.log(obj.a.b.c); // 100
```

## Get
Get value from object's hierarchy properties:
```javascript
import { get } from 'object-hierarchy-access';
let obj = {a: {b: {c: 100}}};
get(obj, 'a', 'b');    // returns {c: 100}
get(obj, 'a', 'b', 'c');    // returns 100
get(obj, ['a', 'b', 'c']);    // returns 100
```
