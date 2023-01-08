function isArray(source) {
    return Array.isArray(source) || source instanceof Array;
}
function isObject(source) {
    return typeof source === 'object' && source !== null;
}
function getOwnEnumerablePropKeys(target) {
    const keys = Object.keys(target);
    if (Object.getOwnPropertySymbols) {
        const symbols = Object.getOwnPropertySymbols(target).filter(symbol => {
            const descriptor = Object.getOwnPropertyDescriptor(target, symbol);
            return descriptor && descriptor.enumerable;
        });
        if (symbols.length) {
            keys.push(...symbols);
        }
    }
    return keys;
}
function cloneContainer(from) {
    if (isArray(from)) {
        return [];
    }
    else if (isObject(from)) {
        return {};
    }
    else {
        return from;
    }
}
function getPropName(current, descriptor) {
    const { name, getName } = descriptor;
    if (name !== undefined) {
        return name;
    }
    if (getName) {
        return getName.call(current, current);
    }
}
function getNonEmptyPropName(current, descriptor) {
    const name = getPropName(current, descriptor);
    return name !== undefined ? name : 'undefined';
}
function getPropNames(current, descriptor) {
    const { names, getNames } = descriptor;
    if (names !== undefined) {
        return isArray(names) ? names : [names];
    }
    if (getNames) {
        const gotNames = getNames.call(current, current);
        if (gotNames !== undefined) {
            return isArray(gotNames) ? gotNames : [gotNames];
        }
    }
    return getOwnEnumerablePropKeys(current);
}
export { isArray, isObject, getOwnEnumerablePropKeys, cloneContainer, getPropName, getNonEmptyPropName, getPropNames };
