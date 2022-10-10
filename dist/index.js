(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.ObjectHierarchyAccess = {}));
}(this, function (exports) { 'use strict';

	function normalizeDescriptor(info) {
	    if (info && typeof info === 'object') {
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

	function getPropName(current, descriptor) {
	    var name = descriptor.name, getName = descriptor.getName;
	    if (name !== undefined) {
	        return name;
	    }
	    return getName && getName.call(current, current) || 'undefined';
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
	    return Array.prototype.concat.apply([], hierarchies);
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
	    var hierarchies = Array.prototype.concat.apply([], rest);
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

	Object.defineProperty(exports, '__esModule', { value: true });

}));
