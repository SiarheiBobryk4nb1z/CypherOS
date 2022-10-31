import { cloneContainer, getOwnEnumerablePropKeys } from './utility/common';
function distribute(target, callback, rootContainer) {
    var targetIsArray = Array.isArray(target) || target instanceof Array;
    var keys = getOwnEnumerablePropKeys(target);
    keys.forEach(function (key) {
        var child = target[key];
        var groupName = callback.call(target, target, key, child);
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
function assort(target, callback) {
    return distribute(target, callback, []);
}
export { group, assort };
