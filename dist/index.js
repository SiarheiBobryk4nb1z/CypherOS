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
    function hierarchyCreate(target) {
        var hierarchyProps = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            hierarchyProps[_i - 1] = arguments[_i];
        }
        var current = target || {};
        hierarchyProps.forEach(function (hProp) {
            if (!current[hProp] || typeof current[hProp] !== 'object') {
                current[hProp] = {};
            }
            current = current[hProp];
        });
        return current;
    }
    function hierarchySet() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var target = args[0];
        var hierarchyProps = args.slice(1, args.length - 2);
        var prop = args[args.length - 2];
        var value = args[args.length - 1];
        hierarchyCreate.apply(void 0, [target].concat(hierarchyProps))[prop] = value;
        return target;
    }

    exports.hierarchyGet = hierarchyGet;
    exports.hierarchySet = hierarchySet;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
