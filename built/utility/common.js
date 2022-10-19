function getPropName(current, descriptor) {
    var name = descriptor.name, getName = descriptor.getName;
    if (name !== undefined) {
        return name;
    }
    return getName && getName.call(current, current) || 'undefined';
}
function getOwnEnumerablePropKeys(target) {
    var keys = Object.keys(target);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(target)
            .filter(function (symbol) {
            var descriptor = Object.getOwnPropertyDescriptor(target, symbol);
            return descriptor && descriptor.enumerable;
        });
        if (symbols.length) {
            keys.push.apply(keys, symbols);
        }
    }
    return keys;
}
function getPropNames(current, descriptor) {
    var names = descriptor.names, getNames = descriptor.getNames;
    if (names !== undefined) {
        return Array.isArray(names) ? names : [names];
    }
    if (getNames) {
        var gotNames = getNames.call(current, current);
        if (gotNames !== undefined) {
            return Array.isArray(gotNames) ? gotNames : [gotNames];
        }
    }
    return getOwnEnumerablePropKeys(current);
}
export { getPropName, getPropNames };
