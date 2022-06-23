(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global['object-hierarchy-access'] = {})));
}(this, (function (exports) { 'use strict';

    function hierarchyGet(target) {
        var hierarchyProps = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            hierarchyProps[_i - 1] = arguments[_i];
        }
        var current = target;
        if (current !== undefined && current !== null) {
            hierarchyProps.every(function (hProp) {
                current = current[hProp];
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
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        var hierarchyProps = rest.slice(0, rest.length - 2);
        var prop = rest[rest.length - 2];
        var value = rest[rest.length - 1];
        var root = target || {};
        var current = hierarchyCreate(root, hierarchyProps);
        if (prop) {
            current[prop] = value;
        }
        return root;
    }
    function hierarchySetIfNotExists(target) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        var hierarchyProps = rest.slice(0, rest.length - 2);
        var prop = rest[rest.length - 2];
        var value = rest[rest.length - 1];
        var root = target || {};
        var current = hierarchyCreate(root, hierarchyProps);
        if (prop && current[prop] === undefined) {
            current[prop] = value;
        }
        return root;
    }

    exports.hierarchyGet = hierarchyGet;
    exports.hierarchySet = hierarchySet;
    exports.hierarchySetIfNotExists = hierarchySetIfNotExists;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
