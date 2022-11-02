import { normalizeDescriptor } from 'utility/get';
import { getPropName } from 'utility/common';
function get(target) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
    var hierarchies = [];
    hierarchies = Array.prototype.concat.apply(hierarchies, rest);
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
            return current;
        });
    }
    return current;
}
export { get };
