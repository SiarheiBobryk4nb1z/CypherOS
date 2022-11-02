function normalizeDescriptor(info) {
    if (typeof info === 'object') {
        return info;
    }
    else if (typeof info === 'function') {
        return {
            getName: info,
            value: {}
        };
    }
    else {
        return {
            name: info,
            value: {}
        };
    }
}

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

function generate(target, hierarchies, forceOverride) {
    let current = target;
    hierarchies.forEach(info => {
        const descriptor = normalizeDescriptor(info);
        const { value, type, create, override, created, skipped, got } = descriptor;
        const name = getPropName(current, descriptor);
        if (forceOverride || override || !current[name] || typeof current[name] !== 'object') {
            const obj = value ? value :
                type ? new type() :
                    create ? create.call(current, current, name) :
                        {};
            current[name] = obj;
            if (created) {
                created.call(current, current, name, obj);
            }
        }
        else {
            if (skipped) {
                skipped.call(current, current, name, current[name]);
            }
        }
        const parent = current;
        current = current[name];
        if (got) {
            got.call(parent, parent, name, current);
        }
    });
    return current;
}
function setupIfUndef(target, hierarchies) {
    return generate(target, hierarchies);
}
function setup(target, hierarchies) {
    const current = generate(target, hierarchies.slice(0, -1));
    const last = generate(current, hierarchies.slice(-1), true);
    return { current, last };
}

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

function _parseHierarchies(hierarchies) {
    let result = [];
    result = Array.prototype.concat.apply(result, hierarchies);
    return result;
}
function setProp(optionalTarget, ...hierarchies) {
    const arrHierarchies = _parseHierarchies(hierarchies);
    const target = optionalTarget || {};
    setup(target, arrHierarchies);
    return target;
}
function assignProp(target, ...hierarchies) {
    const arrHierarchies = _parseHierarchies(hierarchies);
    const { current } = setup(target, arrHierarchies);
    return current;
}
function putProp(target, ...hierarchies) {
    const arrHierarchies = _parseHierarchies(hierarchies);
    const { last } = setup(target, arrHierarchies);
    return last;
}
function setPropIfUndef(optionalTarget, ...hierarchies) {
    const arrHierarchies = _parseHierarchies(hierarchies);
    const target = optionalTarget || {};
    setupIfUndef(target, arrHierarchies);
    return target;
}
function assignPropIfUndef(target, ...hierarchies) {
    const arrHierarchies = _parseHierarchies(hierarchies);
    const current = setupIfUndef(target, arrHierarchies.slice(0, -1));
    setupIfUndef(current, arrHierarchies.slice(-1));
    return current;
}
function putPropIfUndef(target, ...hierarchies) {
    const arrHierarchies = _parseHierarchies(hierarchies);
    return setupIfUndef(target, arrHierarchies);
}

function normalizeDescriptor$1(info) {
    if (typeof info === 'object') {
        return info;
    }
    else if (typeof info === 'function') {
        return {
            getName: info
        };
    }
    else {
        return {
            name: info
        };
    }
}

function get(target, ...rest) {
    let hierarchies = [];
    hierarchies = Array.prototype.concat.apply(hierarchies, rest);
    let current = target;
    if (current !== undefined && current !== null) {
        hierarchies.every(info => {
            const descriptor = normalizeDescriptor$1(info);
            const { got } = descriptor;
            const name = getPropName(current, descriptor);
            const parent = current;
            current = current[name];
            if (got) {
                got.call(parent, parent, name, current);
            }
            return current;
        });
    }
    return current;
}

function _parseArgs$1(others) {
    const callback = others[others.length - 1];
    const hierarchies = Array.prototype.concat.apply([], others.slice(0, -1)); // exclude `callback`
    return { hierarchies, callback };
}
function traverse(target, ...others) {
    const args = _parseArgs$1(others);
    const hierarchies = args.hierarchies;
    const callback = args.callback;
    let current = target;
    if (current !== undefined && current !== null) {
        hierarchies.every(info => {
            const descriptor = normalizeDescriptor$1(info);
            const { got } = descriptor;
            const name = getPropName(current, descriptor);
            const parent = current;
            current = current[name];
            if (got) {
                got.call(parent, parent, name, current);
            }
            const result = callback.call(parent, parent, name, current);
            return result !== false;
        });
    }
}
function traverseReverse(target, ...others) {
    const args = _parseArgs$1(others);
    const hierarchies = args.hierarchies;
    const callback = args.callback;
    let current = target;
    if (current !== undefined && current !== null) {
        const params = [];
        hierarchies.every(info => {
            const descriptor = normalizeDescriptor$1(info);
            const { got } = descriptor;
            const name = getPropName(current, descriptor);
            const parent = current;
            current = current[name];
            if (got) {
                got.call(parent, parent, name, current);
            }
            params.push({ parent, name, current });
            return current;
        });
        for (let i = params.length - 1; i >= 0; i--) {
            const item = params[i];
            const result = callback.call(item.parent, item.parent, item.name, item.current);
            if (result === false) {
                break;
            }
        }
    }
}

function normalizeDescriptor$2(info) {
    if (Array.isArray(info)) {
        return {
            names: info
        };
    }
    else if (typeof info === 'object') {
        return info;
    }
    else if (typeof info === 'function') {
        return {
            getNames: info
        };
    }
    else {
        return {
            names: info
        };
    }
}

function generate$1(current, result, hierarchies, index) {
    const descriptor = normalizeDescriptor$2(hierarchies[index]);
    const { got } = descriptor;
    const names = getPropNames(current, descriptor);
    const lastIndex = hierarchies.length - 1;
    names.forEach(name => {
        if (name in current) {
            const next = current[name];
            if (got) {
                got.call(current, current, name, next);
            }
            if (index < lastIndex) {
                result[name] = cloneContainer(next);
            }
            else {
                result[name] = next;
            }
            if (index < lastIndex && result !== undefined && typeof next === 'object') {
                generate$1(next, result[name], hierarchies, index + 1);
            }
        }
    });
}
function select(target, ...hierarchyProps) {
    let result;
    const current = target;
    if (current !== undefined && current !== null) {
        result = cloneContainer(current);
        generate$1(current, result, hierarchyProps, 0);
    }
    return result;
}
function find(current, result, hierarchies, index) {
    const descriptor = normalizeDescriptor$2(hierarchies[index]);
    const { got } = descriptor;
    const names = getPropNames(current, descriptor);
    const lastIndex = hierarchies.length - 1;
    names.forEach(name => {
        if (name in current) {
            const next = current[name];
            if (got) {
                got.call(current, current, name, next);
            }
            if (index < lastIndex) {
                find(next, result, hierarchies, index + 1);
            }
            else {
                result.push(next);
            }
        }
    });
}
function pick(target, ...hierarchyProps) {
    const result = [];
    const current = target;
    if (current !== undefined && current !== null) {
        find(current, result, hierarchyProps, 0);
    }
    return result;
}

function distribute(target, callback, rootContainer) {
    const targetIsArray = Array.isArray(target) || target instanceof Array;
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
function assort(target, callback) {
    return distribute(target, callback, []);
}

export { set, assign, put, setIfUndef, assignIfUndef, putIfUndef, setProp, assignProp, putProp, setPropIfUndef, assignPropIfUndef, putPropIfUndef, get, traverse, traverseReverse, select, pick, group, assort };
