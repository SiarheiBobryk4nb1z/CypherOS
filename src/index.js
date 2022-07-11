function _parseArgs(others) {
    var value = others[others.length - 1];
    var rest = Array.prototype.concat.apply([], others.slice(0, -1)); // exclude `value`
    var hierarchyProps = rest.slice(0, -1);
    var prop = rest[rest.length - 1];
    return { hierarchyProps: hierarchyProps, prop: prop, value: value };
}
function get(target) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
    var props = Array.prototype.concat.apply([], rest);
    var current = target;
    if (current !== undefined && current !== null) {
        props.every(function (prop) {
            current = current[prop];
            return current;
        });
    }
    return current;
}
function create(target, hierarchyProps) {
    var current = target;
    hierarchyProps.forEach(function (hProp) {
        if (!current[hProp] || typeof current[hProp] !== 'object') {
            current[hProp] = {};
        }
        current = current[hProp];
    });
    return current;
}
function assign(target) {
    var others = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        others[_i - 1] = arguments[_i];
    }
    var _a = _parseArgs(others), hierarchyProps = _a.hierarchyProps, prop = _a.prop, value = _a.value;
    var current = create(target, hierarchyProps);
    current[prop] = value;
    return current;
}
function set(target) {
    var others = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        others[_i - 1] = arguments[_i];
    }
    var root = target || {};
    assign.apply(void 0, [root].concat(others));
    return root;
}
function assignIfUndef(target) {
    var others = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        others[_i - 1] = arguments[_i];
    }
    var _a = _parseArgs(others), hierarchyProps = _a.hierarchyProps, prop = _a.prop, value = _a.value;
    var current = create(target, hierarchyProps);
    if (current[prop] === undefined) {
        current[prop] = value;
    }
    return current;
}
function setIfUndef(target) {
    var others = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        others[_i - 1] = arguments[_i];
    }
    var root = target || {};
    assignIfUndef.apply(void 0, [root].concat(others));
    return root;
}
export { get, set, assign, setIfUndef, assignIfUndef };
