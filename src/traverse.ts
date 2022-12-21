import {PropName, HierarchyCallbackReturns, GetPropParam} from './type';
import {getNonEmptyPropName} from './utility/common';
import {normalizeDescriptor, getValue} from './utility/get';

function _parseArgs(others: any[]) {
	const callback: HierarchyCallbackReturns<any> = others[others.length - 1];
	const hierarchies: GetPropParam[] = Array.prototype.concat.apply([], others.slice(0, -1));  // exclude `callback`
	return {hierarchies, callback};
}

function traverse(target: any, ...others: any[]) {
	const {hierarchies, callback} = _parseArgs(others);
	let current = target;
	if (current !== undefined && current !== null) {
		hierarchies.every(info => {
			const descriptor = normalizeDescriptor(info);
			const name = getNonEmptyPropName(current, descriptor);
			const next = getValue(current, name, descriptor);

			const parent = current;
			current = next;
			const result = callback.call(parent, parent, name, current);
			return result !== false;
		});
	}
}

function traverseReverse(target: any, ...others: any[]) {
	const {hierarchies, callback} = _parseArgs(others);
	let current = target;
	if (current !== undefined && current !== null) {
		const params: Array<{
			parent: object,
			name: PropName,
			current: object
		}> = [];
		hierarchies.every(info => {
			const descriptor = normalizeDescriptor(info);
			const name = getNonEmptyPropName(current, descriptor);
			const next = getValue(current, name, descriptor);

			const parent = current;
			current = next;
			params.push({parent, name, current});
			return current;
		});
		for (let i = params.length - 1; i >= 0; i--) {
			const item = params[i];
			const result = callback.call(item.parent, item.parent, item.name, item.current);
			if (result === false) {
				break;
			}
		}
	}
}

export {
	traverse,
	traverseReverse
};
