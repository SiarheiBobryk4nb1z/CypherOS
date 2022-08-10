(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global['object-hierarchy-access'] = {}));
}(this, function (exports) { 'use strict';

    function _parseArgs(others) {
        var value = others[others.length - 1];
        var rest = Array.prototype.concat.apply([], others.slice(0, -1)); // exclude `value`
        var hierarchies = rest.slice(0, -1);
        var prop = rest[rest.length - 1];
        return { hierarchies: hierarchies, prop: prop, value: value };
    }
    function _create(target, hierarchies) {
        var current = target;
        hierarchies.forEach(function (info) {
            var name;
            var value;
            var type;
            var create;
            if (info && typeof info === 'object') {
                name = info.name;
                value = info.value;
                type = info.type;
                create = info.create;
            }
            else {
                name = info;
                value = {};
            }
            if (!current[name] || typeof current[name] !== 'object') {
                var obj = value ? value :
                    type ? new type() :
                        create ? create.call(current, current, name) :
                            {};
                current[name] = obj;
            }
            current = current[name];
        });
        return current;
    }
    function assign(target) {
        var others = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            others[_i - 1] = arguments[_i];
        }
        var _a = _parseArgs(others), hierarchies = _a.hierarchies, prop = _a.prop, value = _a.value;
        var current = _create(target, hierarchies);
        current[prop] = value;
        return current;
    }
    function set(target) {
        var others = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            others[_i - 1] = arguments[_i];
        }
        var root = target || {};
        assign.apply(void 0, [root].concat(others));
        return root;
    }
    function assignIfUndef(target) {
        var others = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            others[_i - 1] = arguments[_i];
        }
        var _a = _parseArgs(others), hierarchies = _a.hierarchies, prop = _a.prop, value = _a.value;
        var current = _create(target, hierarchies);
        if (current[prop] === undefined) {
            current[prop] = value;
        }
        return current;
    }
    function setIfUndef(target) {
        var others = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            others[_i - 1] = arguments[_i];
        }
        var root = target || {};
        assignIfUndef.apply(void 0, [root].concat(others));
        return root;
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
                var property;
                if (typeof info === 'function') {
                    property = info.call(current, current);
                }
                else {
                    property = info;
                }
                current = current[property];
                return current;
            });
        }
        return current;
    }

    exports.set = set;
    exports.assign = assign;
    exports.setIfUndef = setIfUndef;
    exports.assignIfUndef = assignIfUndef;
    exports.get = get;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
