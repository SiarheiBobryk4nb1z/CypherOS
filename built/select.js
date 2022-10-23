import { normalizeDescriptor } from 'utility/select';
import { getPropNames } from 'utility/common';
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
function generate(current, result, hierarchies, index) {
    var descriptor = normalizeDescriptor(hierarchies[index]);
    var got = descriptor.got;
    var names = getPropNames(current, descriptor);
    var lastIndex = hierarchies.length - 1;
    names.forEach(function (name) {
        if (name in current) {
            var next = current[name];
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
                generate(next, result[name], hierarchies, index + 1);
            }
        }
    });
}
function select(target) {
    var hierarchyProps = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        hierarchyProps[_i - 1] = arguments[_i];
    }
    var result;
    var current = target;
    if (current !== undefined && current !== null) {
        result = cloneContainer(current);
        generate(current, result, hierarchyProps, 0);
    }
    return result;
}
function find(current, result, hierarchies, index) {
    var descriptor = normalizeDescriptor(hierarchies[index]);
    var got = descriptor.got;
    var names = getPropNames(current, descriptor);
    var lastIndex = hierarchies.length - 1;
    names.forEach(function (name) {
        if (name in current) {
            var next = current[name];
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
function pick(target) {
    var hierarchyProps = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        hierarchyProps[_i - 1] = arguments[_i];
    }
    var result = [];
    var current = target;
    if (current !== undefined && current !== null) {
        find(current, result, hierarchyProps, 0);
    }
    return result;
}
export { select, pick };
