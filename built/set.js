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
        var override;
        var create;
        var created;
        var skipped;
        var got;
        if (info && typeof info === 'object') {
            name = info.name;
            value = info.value;
            type = info.type;
            override = info.override;
            create = info.create;
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
export { set, assign, put, setIfUndef, assignIfUndef, putIfUndef };
