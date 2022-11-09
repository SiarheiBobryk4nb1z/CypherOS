import { getPropName } from './utility/common';
import { normalizeDescriptor } from './utility/get';
function _parseArgs(others) {
    const callback = others[others.length - 1];
    const hierarchies = Array.prototype.concat.apply([], others.slice(0, -1)); // exclude `callback`
    return { hierarchies, callback };
}
function traverse(target, ...others) {
    const args = _parseArgs(others);
    const hierarchies = args.hierarchies;
    const callback = args.callback;
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
            const result = callback.call(parent, parent, name, current);
            return result !== false;
        });
    }
}
function traverseReverse(target, ...others) {
    const args = _parseArgs(others);
    const hierarchies = args.hierarchies;
    const callback = args.callback;
    let current = target;
    if (current !== undefined && current !== null) {
        const params = [];
        hierarchies.every(info => {
            const descriptor = normalizeDescriptor(info);
            const { got } = descriptor;
            const name = getPropName(current, descriptor);
            const parent = current;
            current = current[name];
            if (got) {
                got.call(parent, parent, name, current);
            }
            params.push({ parent, name, current });
            return current;
        });
        for (let i = params.length - 1; i >= 0; i--) {
            const item = params[i];
            const result = callback.call(item.parent, item.parent, item.name, item.current);
            if (result === false) {
                break;
            }
        }
    }
}
export { traverse, traverseReverse };
