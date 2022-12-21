import { getNonEmptyPropName } from './utility/common';
import { normalizeDescriptor, getValue } from './utility/get';
function get(target, ...rest) {
    let hierarchies = [];
    hierarchies = Array.prototype.concat.apply(hierarchies, rest);
    let current = target;
    if (current !== undefined && current !== null) {
        hierarchies.every(info => {
            const descriptor = normalizeDescriptor(info);
            const name = getNonEmptyPropName(current, descriptor);
            const next = getValue(current, name, descriptor);
            current = next;
            return current;
        });
    }
    return current;
}
export { get };
