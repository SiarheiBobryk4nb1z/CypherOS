import {setup, setupIfUndef} from './setup';
import type {GetPropParam} from './type';

function _normalizeHierarchies(hierarchies: Array<GetPropParam | GetPropParam[]>): GetPropParam[] {
	const result: GetPropParam[] = Array.prototype.concat.apply([], hierarchies);
	return result;
}

function setProp(optionalTarget: any, ...hierarchies: Array<GetPropParam | GetPropParam[]>) {
	const arrHierarchies = _normalizeHierarchies(hierarchies);
	const target = optionalTarget || {};
	setup(target, arrHierarchies);
	return target;
}

function assignProp(target: any, ...hierarchies: Array<GetPropParam | GetPropParam[]>) {
	const arrHierarchies = _normalizeHierarchies(hierarchies);
	const {current} = setup(target, arrHierarchies);
	return current;
}

function putProp(target: any, ...hierarchies: Array<GetPropParam | GetPropParam[]>) {
	const arrHierarchies = _normalizeHierarchies(hierarchies);
	const {last} = setup(target, arrHierarchies);
	return last;
}

function setPropIfUndef(optionalTarget: any, ...hierarchies: Array<GetPropParam | GetPropParam[]>) {
	const arrHierarchies = _normalizeHierarchies(hierarchies);
	const target = optionalTarget || {};
	setupIfUndef(target, arrHierarchies);
	return target;
}

function assignPropIfUndef(target: any, ...hierarchies: Array<GetPropParam | GetPropParam[]>) {
	const arrHierarchies = _normalizeHierarchies(hierarchies);
	const current = setupIfUndef(target, arrHierarchies.slice(0, -1));
	setupIfUndef(current, arrHierarchies.slice(-1));
	return current;
}

function putPropIfUndef(target: any, ...hierarchies: Array<GetPropParam | GetPropParam[]>) {
	const arrHierarchies = _normalizeHierarchies(hierarchies);
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
