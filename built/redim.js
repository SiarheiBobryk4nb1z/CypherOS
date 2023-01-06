import { isArray, isObject, getOwnEnumerablePropKeys } from "./utility/common";
import { exist } from './exist';
import { setProp } from './set-prop';
function _getDimTypes(input, maxDim = 16) {
    const types = [];
    if (isObject(input)) {
        let type = isArray(input) ? Array : Object;
        let dimItems = [input];
        for (let iDim = 0; iDim <= maxDim; iDim++) {
            let nextType = Array;
            let nextDimItems = [];
            dimItems.forEach(dimItem => {
                getOwnEnumerablePropKeys(dimItem).forEach(key => {
                    const nextDimItem = dimItem[key];
                    if (isObject(nextDimItem)) {
                        if (!isArray(nextDimItem)) {
                            nextType = Object;
                        }
                        nextDimItems.push(nextDimItem);
                    }
                });
            });
            types.push(type);
            if (!nextDimItems.length) {
                break;
            }
            type = nextType;
            dimItems = nextDimItems;
        }
    }
    return types;
}
function redim(data, ...newDimsOrder) {
    if (!data) {
        return data;
    }
    // newDims: new order of old dims
    const newDims = Array.prototype.concat.apply([], newDimsOrder);
    if (!newDims.length) {
        return data;
    }
    const oldDimMin = Math.min(...newDims);
    if (oldDimMin < 0) {
        return;
    }
    const oldDimMax = Math.max(...newDims);
    const newDimMax = newDims.length - 1;
    const dimTypes = _getDimTypes(data, oldDimMax);
    if (!dimTypes.length || oldDimMax >= dimTypes.length) {
        return;
    }
    const result = new dimTypes[newDims[0]];
    const _walk = function _walk(path, current, currentDim) {
        if (currentDim <= oldDimMax) {
            getOwnEnumerablePropKeys(current).forEach(key => {
                const nextDim = currentDim + 1;
                if (exist(current, key)) {
                    _walk(path.concat(key), current[key], nextDim);
                }
            });
        }
        else {
            const newHierarchyDescriptors = newDims.map(((oldDim, newDim) => {
                return newDim < newDimMax ? {
                    name: path[oldDim],
                    type: dimTypes[newDims[newDim + 1]],
                } : {
                    name: path[oldDim],
                    value: current
                };
            }));
            setProp(result, newHierarchyDescriptors);
        }
    };
    _walk([], data, 0);
    return result;
}
export { redim };
