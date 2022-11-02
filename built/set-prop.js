import { setup, setupIfUndef } from './setup';
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
export { setProp, assignProp, putProp, setPropIfUndef, assignPropIfUndef, putPropIfUndef };
