function setupIfUndef(target, hierarchies) {
    var current = target;
    hierarchies.forEach(function (info) {
        var name;
        var value;
        var type;
        var create;
        var override;
        var created;
        var skipped;
        var got;
        if (info && typeof info === 'object') {
            name = info.name;
            value = info.value;
            type = info.type;
            create = info.create;
            override = info.override;
            created = info.created;
            skipped = info.skipped;
            got = info.got;
        }
        else {
            name = info;
            value = {};
        }
        if (override || !current[name] || typeof current[name] !== 'object') {
            var obj = value ? value :
                type ? new type() :
                    create ? create.call(current, current, name) :
                        {};
            current[name] = obj;
            if (created) {
                created.call(current, current, name, obj);
            }
        }
        else {
            if (skipped) {
                skipped.call(current, current, name, current[name]);
            }
        }
        var parent = current;
        current = current[name];
        if (got) {
            got.call(parent, parent, name, current);
        }
    });
    return current;
}
function setup(target, hierarchies) {
    var current = setupIfUndef(target, hierarchies.slice(0, -1));
    var lastDescriptor = hierarchies[hierarchies.length - 1];
    var lastName = typeof lastDescriptor === 'object' ? lastDescriptor.name : lastDescriptor;
    current[lastName] = undefined;
    var last = setupIfUndef(current, [lastDescriptor]);
    return { current: current, last: last };
}

function _parseArgs(others) {
    var value = others[others.length - 1];
    var rest = Array.prototype.concat.apply([], others.slice(0, -1)); // exclude `value`
    var hierarchies = rest.slice(0, -1);
    var prop = rest[rest.length - 1];
    return { hierarchies: hierarchies, prop: prop, value: value };
}
function set(optionalTarget) {
    var others = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        others[_i - 1] = arguments[_i];
    }
    var _a = _parseArgs(others), hierarchies = _a.hierarchies, prop = _a.prop, value = _a.value;
    var target = optionalTarget || {};
    var current = setupIfUndef(target, hierarchies);
    current[prop] = value;
    return target;
}
function assign(target) {
    var others = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        others[_i - 1] = arguments[_i];
    }
    var _a = _parseArgs(others), hierarchies = _a.hierarchies, prop = _a.prop, value = _a.value;
    var current = setupIfUndef(target, hierarchies);
    current[prop] = value;
    return current;
}
function put(target) {
    var others = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        others[_i - 1] = arguments[_i];
    }
    var _a = _parseArgs(others), hierarchies = _a.hierarchies, prop = _a.prop, value = _a.value;
    var current = setupIfUndef(target, hierarchies);
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
    var current = setupIfUndef(target, hierarchies);
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
    var current = setupIfUndef(target, hierarchies);
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
    var current = setupIfUndef(target, hierarchies);
    if (current[prop] === undefined) {
        current[prop] = value;
    }
    return current[prop];
}

function _parseHierarchies(hierarchies) {
    return Array.prototype.concat.apply([], hierarchies);
}
function setProp(optionalTarget) {
    var hierarchies = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        hierarchies[_i - 1] = arguments[_i];
    }
    var arrHierarchies = _parseHierarchies(hierarchies);
    var target = optionalTarget || {};
    setup(target, arrHierarchies);
    return target;
}
function assignProp(target) {
    var hierarchies = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        hierarchies[_i - 1] = arguments[_i];
    }
    var arrHierarchies = _parseHierarchies(hierarchies);
    var current = setup(target, arrHierarchies).current;
    return current;
}
function putProp(target) {
    var hierarchies = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        hierarchies[_i - 1] = arguments[_i];
    }
    var arrHierarchies = _parseHierarchies(hierarchies);
    var last = setup(target, arrHierarchies).last;
    return last;
}
function setPropIfUndef(optionalTarget) {
    var hierarchies = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        hierarchies[_i - 1] = arguments[_i];
    }
    var arrHierarchies = _parseHierarchies(hierarchies);
    var target = optionalTarget || {};
    setupIfUndef(target, arrHierarchies);
    return target;
}
function assignPropIfUndef(target) {
    var hierarchies = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        hierarchies[_i - 1] = arguments[_i];
    }
    var arrHierarchies = _parseHierarchies(hierarchies);
    var current = setupIfUndef(target, arrHierarchies.slice(0, -1));
    setupIfUndef(current, arrHierarchies.slice(-1));
    return current;
}
function putPropIfUndef(target) {
    var hierarchies = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        hierarchies[_i - 1] = arguments[_i];
    }
    var arrHierarchies = _parseHierarchies(hierarchies);
    return setupIfUndef(target, arrHierarchies);
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
            var result = callback.call(parent, parent, name, current);
            return result !== false;
        });
    }
}
function traverseReverse(target) {
    var others = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        others[_i - 1] = arguments[_i];
    }
    var args = _parseArgs$1(others);
    var hierarchies = args.hierarchies;
    var callback = args.callback;
    var current = target;
    if (current !== undefined && current !== null) {
        var params_1 = [];
        hierarchies.every(function (info) {
            var name = typeof info === 'function' ? info.call(current, current) : info;
            var parent = current;
            current = current[name];
            params_1.push({ parent: parent, name: name, current: current });
            return current;
        });
        for (var i = params_1.length - 1; i >= 0; i--) {
            var item = params_1[i];
            var result = callback.call(item.parent, item.parent, item.name, item.current);
            if (result === false) {
                break;
            }
        }
    }
}

export { set, assign, put, setIfUndef, assignIfUndef, putIfUndef, setProp, assignProp, putProp, setPropIfUndef, assignPropIfUndef, putPropIfUndef, get, traverse, traverseReverse };
