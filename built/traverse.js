import { normalizeDescriptor, getNameValue } from './utility/get';
function _parseArgs(others) {
    const callback = others[others.length - 1];
    const hierarchies = Array.prototype.concat.apply([], others.slice(0, -1)); // exclude `callback`
    return { hierarchies, callback };
}
function traverse(target, ...others) {
    const { hierarchies, callback } = _parseArgs(others);
    let current = target;
    if (current !== undefined && current !== null) {
        hierarchies.every(info => {
            const descriptor = normalizeDescriptor(info);
            const { name, value } = getNameValue(current, descriptor);
            const parent = current;
            current = value;
            const result = callback.call(parent, parent, name, current);
            return result !== false;
        });
    }
}
function traverseReverse(target, ...others) {
    const { hierarchies, callback } = _parseArgs(others);
    let current = target;
    if (current !== undefined && current !== null) {
        const params = [];
        hierarchies.every(info => {
            const descriptor = normalizeDescriptor(info);
            const { name, value } = getNameValue(current, descriptor);
            const parent = current;
            current = value;
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
