function normalizeDescriptor(current, info) {
    if (info && typeof info === 'object') {
        return info;
    }
    else if (typeof info === 'function') {
        var name_1 = info.call(current, current);
        return {
            name: name_1,
            value: {}
        };
    }
    else {
        return {
            name: info,
            value: {}
        };
    }
}
function getPropName(current, descriptor) {
    var name = descriptor.name, getName = descriptor.getName;
    return name || (getName && getName.call(current, current)) || 'undefined';
}
function setupIfUndef(target, hierarchies) {
    var current = target;
    hierarchies.forEach(function (info) {
        var descriptor = normalizeDescriptor(current, info);
        var value = descriptor.value, type = descriptor.type, create = descriptor.create, override = descriptor.override, created = descriptor.created, skipped = descriptor.skipped, got = descriptor.got;
        var name = getPropName(current, descriptor);
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
    var lastDescriptor = normalizeDescriptor(current, hierarchies[hierarchies.length - 1]);
    var lastName = getPropName(current, lastDescriptor);
    current[lastName] = undefined;
    lastDescriptor.name = lastName;
    var last = setupIfUndef(current, [lastDescriptor]);
    return { current: current, last: last };
}
export { setupIfUndef, setup };
