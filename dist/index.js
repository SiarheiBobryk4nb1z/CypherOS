(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global['object-hierarchy-access'] = {})));
}(this, (function (exports) { 'use strict';

    function _parseArgs(others) {
        var value = others[others.length - 1];
        var rest = Array.prototype.concat.apply([], others.slice(0, -1)); //exclude `value`
        var hierarchyProps = rest.slice(0, -1);
        var prop = rest[rest.length - 1];
        return { hierarchyProps: hierarchyProps, prop: prop, value: value };
    }
    function hierarchyGet(target) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        var props = Array.prototype.concat.apply([], rest);
        var current = target;
        if (current !== undefined && current !== null) {
            props.every(function (prop) {
                current = current[prop];
                return current;
            });
        }
        return current;
    }
    function hierarchyCreate(target, hierarchyProps) {
        var current = target;
        hierarchyProps.forEach(function (hProp) {
            if (!current[hProp] || typeof current[hProp] !== 'object') {
                current[hProp] = {};
            }
            current = current[hProp];
        });
        return current;
    }
    function hierarchySet(target) {
        var others = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            others[_i - 1] = arguments[_i];
        }
        var _a = _parseArgs(others), hierarchyProps = _a.hierarchyProps, prop = _a.prop, value = _a.value;
        var root = target || {};
        var current = hierarchyCreate(root, hierarchyProps);
        current[prop] = value;
        return root;
    }
    function hierarchySetIfNotExists(target) {
        var others = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            others[_i - 1] = arguments[_i];
        }
        var _a = _parseArgs(others), hierarchyProps = _a.hierarchyProps, prop = _a.prop, value = _a.value;
        var root = target || {};
        var current = hierarchyCreate(root, hierarchyProps);
        if (current[prop] === undefined) {
            current[prop] = value;
        }
        return root;
    }

    exports.hierarchyGet = hierarchyGet;
    exports.hierarchySet = hierarchySet;
    exports.hierarchySetIfNotExists = hierarchySetIfNotExists;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
