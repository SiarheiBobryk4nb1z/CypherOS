function hierarchyGet(target) {
    var hierarchyProps = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        hierarchyProps[_i - 1] = arguments[_i];
    }
    var current = target;
    if (current !== undefined && current !== null) {
        hierarchyProps.every(function (hProp) {
            current = current[hProp];
            return current;
        });
    }
    return current;
}
function hierarchyCreate(target) {
    var hierarchyProps = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        hierarchyProps[_i - 1] = arguments[_i];
    }
    var current = target;
    hierarchyProps.forEach(function (hProp) {
        if (!current[hProp] || typeof current[hProp] !== 'object') {
            current[hProp] = {};
        }
        current = current[hProp];
    });
    return current;
}
function hierarchySet(target) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
    var hierarchyProps = rest.slice(0, rest.length - 2);
    var prop = rest[rest.length - 2];
    var value = rest[rest.length - 1];
    var root = target || {};
    var current = hierarchyCreate.apply(void 0, [root].concat(hierarchyProps));
    if (prop) {
        current[prop] = value;
    }
    return root;
}
function hierarchySetIfNotExists(target) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
    var hierarchyProps = rest.slice(0, rest.length - 2);
    var prop = rest[rest.length - 2];
    var value = rest[rest.length - 1];
    var root = target || {};
    var current = hierarchyCreate.apply(void 0, [root].concat(hierarchyProps));
    if (prop && current[prop] === null || current[prop] === undefined) {
        current[prop] = value;
    }
    return root;
}
export { hierarchyGet, hierarchySet, hierarchySetIfNotExists };
