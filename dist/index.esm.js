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
        var name;
        var value;
        var type;
        var create;
        if (info && typeof info === 'object') {
            name = info.name;
            value = info.value;
            type = info.type;
            create = info.create;
        }
        else {
            name = info;
            value = {};
        }
        if (!current[name] || typeof current[name] !== 'object') {
            var obj = value ? value :
                type ? new type() :
                    create ? create.call(current, current, name) :
                        {};
            current[name] = obj;
        }
        current = current[name];
    });
    return current;
}
function set(optionalTarget) {
    var others = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        others[_i - 1] = arguments[_i];
    }
    var _a = _parseArgs(others), hierarchies = _a.hierarchies, prop = _a.prop, value = _a.value;
    var target = optionalTarget || {};
    var current = _create(target, hierarchies);
    current[prop] = value;
    return target;
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
function put(target) {
    var others = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        others[_i - 1] = arguments[_i];
    }
    var _a = _parseArgs(others), hierarchies = _a.hierarchies, prop = _a.prop, value = _a.value;
    var current = _create(target, hierarchies);
    current[prop] = value;
    return value;
}
function setIfUndef(optionalTarget) {
    var others = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        others[_i - 1] = arguments[_i];
    }
    var _a = _parseArgs(others), hierarchies = _a.hierarchies, prop = _a.prop, value = _a.value;
    var target = optionalTarget || {};
    var current = _create(target, hierarchies);
    if (current[prop] === undefined) {
        current[prop] = value;
    }
    return target;
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
function putIfUndef(target) {
    var others = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        others[_i - 1] = arguments[_i];
    }
    var _a = _parseArgs(others), hierarchies = _a.hierarchies, prop = _a.prop, value = _a.value;
    var current = _create(target, hierarchies);
    if (current[prop] === undefined) {
        current[prop] = value;
    }
    return current[prop];
}

function get(target) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
    var hierarchies = Array.prototype.concat.apply([], rest);
    var current = target;
    if (current !== undefined && current !== null) {
        hierarchies.every(function (info) {
            var name;
            var got;
            if (typeof info === 'object') {
                name = info.name ? info.name :
                    info.getName ? info.getName.call(current, current) : 'undefined';
                got = info.got;
            }
            else if (typeof info === 'function') {
                name = info.call(current, current);
            }
            else {
                name = info;
            }
            var parent = current;
            current = current[name];
            if (got) {
                got.call(parent, parent, name, current);
            }
            return current;
        });
    }
    return current;
}

function _parseArgs$1(others) {
    var callback = others[others.length - 1];
    var hierarchies = Array.prototype.concat.apply([], others.slice(0, -1)); // exclude `callback`
    return { hierarchies: hierarchies, callback: callback };
}
function traverse(target) {
    var others = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        others[_i - 1] = arguments[_i];
    }
    var args = _parseArgs$1(others);
    var hierarchies = args.hierarchies;
    var callback = args.callback;
    var current = target;
    if (current !== undefined && current !== null) {
        hierarchies.every(function (info) {
            var name = typeof info === 'function' ? info.call(current, current) : info;
            var parent = current;
            current = current[name];
            callback.call(parent, parent, name, current);
            return current;
        });
    }
}

export { set, assign, put, setIfUndef, assignIfUndef, putIfUndef, get, traverse };
