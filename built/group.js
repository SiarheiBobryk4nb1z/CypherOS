import { cloneContainer, getOwnEnumerablePropKeys } from './utility/common';
function group(target, callback) {
    var targetIsArray = Array.isArray(target) || target instanceof Array;
    var result = {};
    var keys = getOwnEnumerablePropKeys(target);
    keys.forEach(function (key) {
        var child = target[key];
        var groupName = callback.call(target, target, key, child);
        if (!result[groupName]) {
            result[groupName] = cloneContainer(target);
        }
        if (targetIsArray) {
            result[groupName].push(child);
        }
        else {
            result[groupName][key] = child;
        }
    });
    return result;
}
export { group };
