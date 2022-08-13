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
            var onGotValue;
            if (typeof info === 'object') {
                name = info.name ? info.name :
                    info.getName ? info.getName.call(current, current) : 'undefined';
                onGotValue = info.onGotValue;
            }
            else if (typeof info === 'function') {
                name = info.call(current, current);
            }
            else {
                name = info;
            }
            var parent = current;
            current = current[name];
            if (onGotValue) {
                onGotValue.call(parent, parent, name, current);
            }
            return current;
        });
    }
    return current;
}
export { get };
