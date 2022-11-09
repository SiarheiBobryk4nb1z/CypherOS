import { setupIfUndef } from './setup';
function _parseArgs(others) {
    const value = others[others.length - 1];
    const rest = Array.prototype.concat.apply([], others.slice(0, -1)); // exclude `value`
    const hierarchies = rest.slice(0, -1);
    const prop = rest[rest.length - 1];
    return { hierarchies, prop, value };
}
function set(optionalTarget, ...others) {
    const { hierarchies, prop, value } = _parseArgs(others);
    const target = optionalTarget || {};
    const current = setupIfUndef(target, hierarchies);
    current[prop] = value;
    return target;
}
function assign(target, ...others) {
    const { hierarchies, prop, value } = _parseArgs(others);
    const current = setupIfUndef(target, hierarchies);
    current[prop] = value;
    return current;
}
function put(target, ...others) {
    const { hierarchies, prop, value } = _parseArgs(others);
    const current = setupIfUndef(target, hierarchies);
    current[prop] = value;
    return value;
}
function setIfUndef(optionalTarget, ...others) {
    const { hierarchies, prop, value } = _parseArgs(others);
    const target = optionalTarget || {};
    const current = setupIfUndef(target, hierarchies);
    if (current[prop] === undefined) {
        current[prop] = value;
    }
    return target;
}
function assignIfUndef(target, ...others) {
    const { hierarchies, prop, value } = _parseArgs(others);
    const current = setupIfUndef(target, hierarchies);
    if (current[prop] === undefined) {
        current[prop] = value;
    }
    return current;
}
function putIfUndef(target, ...others) {
    const { hierarchies, prop, value } = _parseArgs(others);
    const current = setupIfUndef(target, hierarchies);
    if (current[prop] === undefined) {
        current[prop] = value;
    }
    return current[prop];
}
export { set, assign, put, setIfUndef, assignIfUndef, putIfUndef };
