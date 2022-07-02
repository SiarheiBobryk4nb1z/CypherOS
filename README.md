# Quick Start

## Set
Assign value to object's hierarchy properties:
```javascript
import { hierarchySet } from 'object-hierarchy-access';
let obj = {};
hierarchySet(obj, 'a', 'b', 'c', 100);
console.log(obj.a.b.c); // 100
```

Attributes could be in arrays:
```javascript
import { hierarchySet } from 'object-hierarchy-access';
let obj = {};
hierarchySet(obj, ['a', 'b', 'c'], 100);
console.log(obj.a.b.c); // 100
hierarchySet(obj, ['d', 'e', 'f'], ['g', 'h', 'i'], 200);
console.log(obj.d.e.f.g.h.i); // 200
```

Create object at the same time:
```javascript
import { hierarchySet } from 'object-hierarchy-access';
let obj = hierarchySet({}, 'a', 'b', 'c', 100);
console.log(obj.a.b.c); // 100
```

## SetIfNotExists
Only assign value if target property not exists or its value is `undefined`:
```javascript
import { hierarchySetIfNotExists } from 'object-hierarchy-access';
let obj = {};
hierarchySetIfNotExists(obj, 'a', 'b', 'collection', []);
obj.a.b.collection.push(100);
console.log(obj.a.b.collection); // [100]

hierarchySetIfNotExists(obj, 'a', 'b', 'collection', []);
obj.a.b.collection.push(200);
console.log(obj.a.b.collection); // [100, 200]
```

It is also possible to create the object at the same time:
```javascript
import { hierarchySetIfNotExists } from 'object-hierarchy-access';
let obj = hierarchySetIfNotExists({}, 'a', 'b', 'c', 100);
console.log(obj.a.b.c); // 100
```

## Get
Get value from object's hierarchy properties:
```javascript
import { hierarchyGet } from 'object-hierarchy-access';
let obj = {a: {b: {c: 100}}};
hierarchyGet(obj, 'a', 'b');    // returns {c: 100}
hierarchyGet(obj, 'a', 'b', 'c');    // returns 100
hierarchyGet(obj, ['a', 'b', 'c']);    // returns 100
```
