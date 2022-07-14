function _parseArgs(others) {
    var value = others[others.length - 1];
    var rest = Array.prototype.concat.apply([], others.slice(0, -1)); // exclude `value`
    var hierarchies = rest.slice(0, -1);
    var prop = rest[rest.length - 1];
    return { hierarchies: hierarchies, prop: prop, value: value };
}
function _create(target, hierarchies) {
    var current = target;
    hierarchies.forEach(function (info) {
        var name, type, create;
        if (info && typeof info === 'object') {
            name = info.name;
            type = info.type;
            create = info.create;
        }
        else {
            name = info;
            type = Object;
        }
        if (!current[name] || typeof current[name] !== 'object') {
            var obj = type ? new type() : create ? create() : {};
            current[name] = obj;
        }
        current = current[name];
    });
    return current;
}
function assign(target) {
    var others = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        others[_i - 1] = arguments[_i];
    }
    var _a = _parseArgs(others), hierarchies = _a.hierarchies, prop = _a.prop, value = _a.value;
    var current = _create(target, hierarchies);
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
    var _a = _parseArgs(others), hierarchies = _a.hierarchies, prop = _a.prop, value = _a.value;
    var current = _create(target, hierarchies);
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
export { set, assign, setIfUndef, assignIfUndef, get };
