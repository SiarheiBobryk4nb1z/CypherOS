(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.ObjectHierarchyAccess = {}));
}(this, function (exports) { 'use strict';

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

	function isArray(source) {
	    return Array.isArray(source) || source instanceof Array;
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
	function cloneContainer(from) {
	    if (isArray(from)) {
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
	    var name = descriptor.name, getName = descriptor.getName;
	    if (name !== undefined) {
	        return name;
	    }
	    return getName && getName.call(current, current) || 'undefined';
	}
	function getPropNames(current, descriptor) {
	    var names = descriptor.names, getNames = descriptor.getNames;
	    if (names !== undefined) {
	        return isArray(names) ? names : [names];
	    }
	    if (getNames) {
	        var gotNames = getNames.call(current, current);
	        if (gotNames !== undefined) {
	            return isArray(gotNames) ? gotNames : [gotNames];
	        }
	    }
	    return getOwnEnumerablePropKeys(current);
	}

	function generate(target, hierarchies, forceOverride) {
	    var current = target;
	    hierarchies.forEach(function (info) {
	        var descriptor = normalizeDescriptor(info);
	        var value = descriptor.value, type = descriptor.type, create = descriptor.create, override = descriptor.override, created = descriptor.created, skipped = descriptor.skipped, got = descriptor.got;
	        var name = getPropName(current, descriptor);
	        if (forceOverride || override || !current[name] || typeof current[name] !== 'object') {
	            var obj = value ? value :
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
	        var parent = current;
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
	    var current = generate(target, hierarchies.slice(0, -1));
	    var last = generate(current, hierarchies.slice(-1), true);
	    return { current: current, last: last };
	}

	function _parseArgs(others) {
	    var value = others[others.length - 1];
	    var rest = Array.prototype.concat.apply([], others.slice(0, -1)); // exclude `value`
	    var hierarchies = rest.slice(0, -1);
	    var prop = rest[rest.length - 1];
	    return { hierarchies: hierarchies, prop: prop, value: value };
	}
	function set(optionalTarget) {
	    var others = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        others[_i - 1] = arguments[_i];
	    }
	    var _a = _parseArgs(others), hierarchies = _a.hierarchies, prop = _a.prop, value = _a.value;
	    var target = optionalTarget || {};
	    var current = setupIfUndef(target, hierarchies);
	    current[prop] = value;
	    return target;
	}
	function assign(target) {
	    var others = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        others[_i - 1] = arguments[_i];
	    }
	    var _a = _parseArgs(others), hierarchies = _a.hierarchies, prop = _a.prop, value = _a.value;
	    var current = setupIfUndef(target, hierarchies);
	    current[prop] = value;
	    return current;
	}
	function put(target) {
	    var others = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        others[_i - 1] = arguments[_i];
	    }
	    var _a = _parseArgs(others), hierarchies = _a.hierarchies, prop = _a.prop, value = _a.value;
	    var current = setupIfUndef(target, hierarchies);
	    current[prop] = value;
	    return value;
	}
	function setIfUndef(optionalTarget) {
	    var others = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        others[_i - 1] = arguments[_i];
	    }
	    var _a = _parseArgs(others), hierarchies = _a.hierarchies, prop = _a.prop, value = _a.value;
	    var target = optionalTarget || {};
	    var current = setupIfUndef(target, hierarchies);
	    if (current[prop] === undefined) {
	        current[prop] = value;
	    }
	    return target;
	}
	function assignIfUndef(target) {
	    var others = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        others[_i - 1] = arguments[_i];
	    }
	    var _a = _parseArgs(others), hierarchies = _a.hierarchies, prop = _a.prop, value = _a.value;
	    var current = setupIfUndef(target, hierarchies);
	    if (current[prop] === undefined) {
	        current[prop] = value;
	    }
	    return current;
	}
	function putIfUndef(target) {
	    var others = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        others[_i - 1] = arguments[_i];
	    }
	    var _a = _parseArgs(others), hierarchies = _a.hierarchies, prop = _a.prop, value = _a.value;
	    var current = setupIfUndef(target, hierarchies);
	    if (current[prop] === undefined) {
	        current[prop] = value;
	    }
	    return current[prop];
	}

	function _parseHierarchies(hierarchies) {
	    var result = [];
	    result = Array.prototype.concat.apply(result, hierarchies);
	    return result;
	}
	function setProp(optionalTarget) {
	    var hierarchies = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        hierarchies[_i - 1] = arguments[_i];
	    }
	    var arrHierarchies = _parseHierarchies(hierarchies);
	    var target = optionalTarget || {};
	    setup(target, arrHierarchies);
	    return target;
	}
	function assignProp(target) {
	    var hierarchies = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        hierarchies[_i - 1] = arguments[_i];
	    }
	    var arrHierarchies = _parseHierarchies(hierarchies);
	    var current = setup(target, arrHierarchies).current;
	    return current;
	}
	function putProp(target) {
	    var hierarchies = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        hierarchies[_i - 1] = arguments[_i];
	    }
	    var arrHierarchies = _parseHierarchies(hierarchies);
	    var last = setup(target, arrHierarchies).last;
	    return last;
	}
	function setPropIfUndef(optionalTarget) {
	    var hierarchies = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        hierarchies[_i - 1] = arguments[_i];
	    }
	    var arrHierarchies = _parseHierarchies(hierarchies);
	    var target = optionalTarget || {};
	    setupIfUndef(target, arrHierarchies);
	    return target;
	}
	function assignPropIfUndef(target) {
	    var hierarchies = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        hierarchies[_i - 1] = arguments[_i];
	    }
	    var arrHierarchies = _parseHierarchies(hierarchies);
	    var current = setupIfUndef(target, arrHierarchies.slice(0, -1));
	    setupIfUndef(current, arrHierarchies.slice(-1));
	    return current;
	}
	function putPropIfUndef(target) {
	    var hierarchies = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        hierarchies[_i - 1] = arguments[_i];
	    }
	    var arrHierarchies = _parseHierarchies(hierarchies);
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

	function get(target) {
	    var rest = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        rest[_i - 1] = arguments[_i];
	    }
	    var hierarchies = [];
	    hierarchies = Array.prototype.concat.apply(hierarchies, rest);
	    var current = target;
	    if (current !== undefined && current !== null) {
	        hierarchies.every(function (info) {
	            var descriptor = normalizeDescriptor$1(info);
	            var got = descriptor.got;
	            var name = getPropName(current, descriptor);
	            var parent = current;
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
	    var callback = others[others.length - 1];
	    var hierarchies = Array.prototype.concat.apply([], others.slice(0, -1)); // exclude `callback`
	    return { hierarchies: hierarchies, callback: callback };
	}
	function traverse(target) {
	    var others = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        others[_i - 1] = arguments[_i];
	    }
	    var args = _parseArgs$1(others);
	    var hierarchies = args.hierarchies;
	    var callback = args.callback;
	    var current = target;
	    if (current !== undefined && current !== null) {
	        hierarchies.every(function (info) {
	            var descriptor = normalizeDescriptor$1(info);
	            var got = descriptor.got;
	            var name = getPropName(current, descriptor);
	            var parent = current;
	            current = current[name];
	            if (got) {
	                got.call(parent, parent, name, current);
	            }
	            var result = callback.call(parent, parent, name, current);
	            return result !== false;
	        });
	    }
	}
	function traverseReverse(target) {
	    var others = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        others[_i - 1] = arguments[_i];
	    }
	    var args = _parseArgs$1(others);
	    var hierarchies = args.hierarchies;
	    var callback = args.callback;
	    var current = target;
	    if (current !== undefined && current !== null) {
	        var params_1 = [];
	        hierarchies.every(function (info) {
	            var descriptor = normalizeDescriptor$1(info);
	            var got = descriptor.got;
	            var name = getPropName(current, descriptor);
	            var parent = current;
	            current = current[name];
	            if (got) {
	                got.call(parent, parent, name, current);
	            }
	            params_1.push({ parent: parent, name: name, current: current });
	            return current;
	        });
	        for (var i = params_1.length - 1; i >= 0; i--) {
	            var item = params_1[i];
	            var result = callback.call(item.parent, item.parent, item.name, item.current);
	            if (result === false) {
	                break;
	            }
	        }
	    }
	}

	function normalizeDescriptor$2(info) {
	    if (isArray(info)) {
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
	    var descriptor = normalizeDescriptor$2(hierarchies[index]);
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
	                generate$1(next, result[name], hierarchies, index + 1);
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
	        generate$1(current, result, hierarchyProps, 0);
	    }
	    return result;
	}
	function find(current, result, hierarchies, index) {
	    var descriptor = normalizeDescriptor$2(hierarchies[index]);
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

	function distribute(target, callback, rootContainer) {
	    var targetIsArray = isArray(target);
	    var keys = getOwnEnumerablePropKeys(target);
	    keys.forEach(function (key) {
	        var child = target[key];
	        var groupName = callback.call(target, target, key, child);
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

	exports.set = set;
	exports.assign = assign;
	exports.put = put;
	exports.setIfUndef = setIfUndef;
	exports.assignIfUndef = assignIfUndef;
	exports.putIfUndef = putIfUndef;
	exports.setProp = setProp;
	exports.assignProp = assignProp;
	exports.putProp = putProp;
	exports.setPropIfUndef = setPropIfUndef;
	exports.assignPropIfUndef = assignPropIfUndef;
	exports.putPropIfUndef = putPropIfUndef;
	exports.get = get;
	exports.traverse = traverse;
	exports.traverseReverse = traverseReverse;
	exports.select = select;
	exports.pick = pick;
	exports.group = group;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
