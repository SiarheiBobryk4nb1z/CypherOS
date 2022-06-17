# Quick Start

## Set
Assign value to object's hierarchy properties:
```javascript
import { hierarchySet } from 'object-hierarchy-access';
let obj = {};
hierarchySet(obj, 'a', 'b', 'c', 100);
console.log(obj.a.b.c); // 100
```

## SetIfNotExists
```javascript
import { hierarchySetIfNotExists } from 'object-hierarchy-access';
let obj = {};
hierarchySetIfNotExists(obj, 'a', 'b', 'c', 100);
console.log(obj.a.b.c); // 100

hierarchySetIfNotExists(obj, 'a', 'b', 'c', 999);
console.log(obj.a.b.c); // 100
```

## Get
Get value to object's hierarchy properties:
```javascript
import { hierarchyGet } from 'object-hierarchy-access';
let obj = {a: {b: {c: 100}}};
hierarchyGet(obj, 'a', 'b');    // returns {c: 100}
hierarchyGet(obj, 'a', 'b', 'c');    // returns 100
```
