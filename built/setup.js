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
export { setupIfUndef, setup };
