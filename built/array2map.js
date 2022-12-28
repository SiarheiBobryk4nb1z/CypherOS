import { isArray } from './utility/common';
import { get } from './get';
function array2map(arr, key, value) {
    if (!isArray(arr)) {
        return;
    }
    const result = {};
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        const keyProp = get(item, key);
        const valueProp = get(item, value);
        result[keyProp] = valueProp;
    }
    return result;
}
export { array2map };
