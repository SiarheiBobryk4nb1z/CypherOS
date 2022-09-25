import {setup, setupIfUndef} from './setup';

function _parseHierarchies(hierarchies: any[]) {
	return Array.prototype.concat.apply([], hierarchies);
}

function setProp(optionalTarget: any, ...hierarchies: any[]) {
	const arrHierarchies = _parseHierarchies(hierarchies);
	const target = optionalTarget || {};
	setup(target, arrHierarchies);
	return target;
}

function assignProp(target: any, ...hierarchies: any[]) {
	const arrHierarchies = _parseHierarchies(hierarchies);
	const {current} = setup(target, arrHierarchies);
	return current;
}

function putProp(target: any, ...hierarchies: any[]) {
	const arrHierarchies = _parseHierarchies(hierarchies);
	const {last} = setup(target, arrHierarchies);
	return last;
}

function setPropIfUndef(optionalTarget: any, ...hierarchies: any[]) {
	const arrHierarchies = _parseHierarchies(hierarchies);
	const target = optionalTarget || {};
	setupIfUndef(target, arrHierarchies);
	return target;
}

function assignPropIfUndef(target: any, ...hierarchies: any[]) {
	const arrHierarchies = _parseHierarchies(hierarchies);
	const current = setupIfUndef(target, arrHierarchies.slice(0, -1));
	setupIfUndef(current, arrHierarchies.slice(-1));
	return current;
}

function putPropIfUndef(target: any, ...hierarchies: any[]) {
	const arrHierarchies = _parseHierarchies(hierarchies);
	return setupIfUndef(target, arrHierarchies);
}

export {
	setProp,
	assignProp,
	putProp,
	setPropIfUndef,
	assignPropIfUndef,
	putPropIfUndef
};
