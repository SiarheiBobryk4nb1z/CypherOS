function _parseArgs(target, others) {
    var value = others[others.length - 1];
    var rest = Array.prototype.concat.apply([], others.slice(0, -1)); //exclude `value`
    var hierarchyProps = rest.slice(0, -1);
    var prop = rest[rest.length - 1];
    return { hierarchyProps: hierarchyProps, prop: prop, value: value };
}
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
function hierarchyCreate(target, hierarchyProps) {
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
    var others = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        others[_i - 1] = arguments[_i];
    }
    var _a = _parseArgs(target, others), hierarchyProps = _a.hierarchyProps, prop = _a.prop, value = _a.value;
    var root = target || {};
    var current = hierarchyCreate(root, hierarchyProps);
    if (prop) {
        current[prop] = value;
    }
    return root;
}
function hierarchySetIfNotExists(target) {
    var others = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        others[_i - 1] = arguments[_i];
    }
    var _a = _parseArgs(target, others), hierarchyProps = _a.hierarchyProps, prop = _a.prop, value = _a.value;
    var root = target || {};
    var current = hierarchyCreate(root, hierarchyProps);
    if (prop && current[prop] === undefined) {
        current[prop] = value;
    }
    return root;
}
export { hierarchyGet, hierarchySet, hierarchySetIfNotExists };
