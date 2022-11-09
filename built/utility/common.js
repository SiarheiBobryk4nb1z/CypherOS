function getOwnEnumerablePropKeys(target) {
    const keys = Object.keys(target);
    if (Object.getOwnPropertySymbols) {
        const symbols = Object.getOwnPropertySymbols(target)
            .filter(symbol => {
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
    if (Array.isArray(from) || from instanceof Array) {
        return [];
    }
    else if (typeof from === 'object') {
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
    return getName && getName.call(current, current) || 'undefined';
}
function getPropNames(current, descriptor) {
    const { names, getNames } = descriptor;
    if (names !== undefined) {
        return Array.isArray(names) ? names : [names];
    }
    if (getNames) {
        const gotNames = getNames.call(current, current);
        if (gotNames !== undefined) {
            return Array.isArray(gotNames) ? gotNames : [gotNames];
        }
    }
    return getOwnEnumerablePropKeys(current);
}
export { getOwnEnumerablePropKeys, cloneContainer, getPropName, getPropNames };
