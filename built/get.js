import { normalizeDescriptor } from './utility/get';
import { getPropName } from './utility/common';
function get(target, ...rest) {
    let hierarchies = [];
    hierarchies = Array.prototype.concat.apply(hierarchies, rest);
    let current = target;
    if (current !== undefined && current !== null) {
        hierarchies.every(info => {
            const descriptor = normalizeDescriptor(info);
            const { got } = descriptor;
            const name = getPropName(current, descriptor);
            const parent = current;
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
