function _parseArgs(others) {
    var callback = others[others.length - 1];
    var hierarchies = Array.prototype.concat.apply([], others.slice(0, -1)); // exclude `callback`
    return { hierarchies: hierarchies, callback: callback };
}
function traverse(target) {
    var others = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        others[_i - 1] = arguments[_i];
    }
    var args = _parseArgs(others);
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
function traverseReverse(target) {
    var others = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        others[_i - 1] = arguments[_i];
    }
    var args = _parseArgs(others);
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
            callback.call(item.parent, item.parent, item.name, item.current);
        }
    }
}
export { traverse, traverseReverse };
