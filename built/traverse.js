import { getPropName } from './utility/common';
import { normalizeDescriptor } from './utility/get';
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
            var descriptor = normalizeDescriptor(info);
            var got = descriptor.got;
            var name = getPropName(current, descriptor);
            var parent = current;
            current = current[name];
            if (got) {
                got.call(parent, parent, name, current);
            }
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
    var args = _parseArgs(others);
    var hierarchies = args.hierarchies;
    var callback = args.callback;
    var current = target;
    if (current !== undefined && current !== null) {
        var params_1 = [];
        hierarchies.every(function (info) {
            var descriptor = normalizeDescriptor(info);
            var got = descriptor.got;
            var name = getPropName(current, descriptor);
            var parent = current;
            current = current[name];
            if (got) {
                got.call(parent, parent, name, current);
            }
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
export { traverse, traverseReverse };
