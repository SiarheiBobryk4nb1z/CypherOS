function get(target) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
    var hierarchies = Array.prototype.concat.apply([], rest);
    var current = target;
    if (current !== undefined && current !== null) {
        hierarchies.every(function (info) {
            var property;
            if (typeof info === 'function') {
                property = info.call(current, current);
            }
            else {
                property = info;
            }
            current = current[property];
            return current;
        });
    }
    return current;
}
export { get };
