import { setup, setupIfUndef } from './setup';
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
export { setProp, assignProp, putProp, setPropIfUndef, assignPropIfUndef, putPropIfUndef };
