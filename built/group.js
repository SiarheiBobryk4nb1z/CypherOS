import { isArray, cloneContainer, getOwnEnumerablePropKeys } from './utility/common';
function distribute(target, callback, rootContainer) {
    const targetIsArray = isArray(target);
    const keys = getOwnEnumerablePropKeys(target);
    keys.forEach(key => {
        const child = target[key];
        const groupName = callback.call(target, target, key, child);
        if (!rootContainer[groupName]) {
            rootContainer[groupName] = cloneContainer(target);
        }
        if (targetIsArray) {
            rootContainer[groupName].push(child);
        }
        else {
            rootContainer[groupName][key] = child;
        }
    });
    return rootContainer;
}
function group(target, callback) {
    return distribute(target, callback, {});
}
export { group };
