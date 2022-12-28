import { getOwnEnumerablePropKeys } from './utility/common';
function map2array(obj, keyName, valueName) {
    if (!obj) {
        return;
    }
    const result = [];
    getOwnEnumerablePropKeys(obj).forEach(key => {
        const value = obj[key];
        const keyProp = typeof keyName === 'function' ? keyName.call(obj, obj, key, value) : keyName;
        const valueProp = typeof valueName === 'function' ? valueName.call(obj, obj, key, value) : valueName;
        result.push({
            [keyProp]: key,
            [valueProp]: value
        });
    });
    return result;
}
export { map2array };
