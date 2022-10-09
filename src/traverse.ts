import {GetNameCallback, IGotPropDescriptor, PropName} from './type';
import {getPropName} from './utility/common';
import {normalizeDescriptor} from './utility/get';

type TraverseCallback = (this: object, parent: object, name: PropName, current: object) => any;

function _parseArgs(others: any[]) {
	const callback = others[others.length - 1];
	const hierarchies = Array.prototype.concat.apply([], others.slice(0, -1));  // exclude `callback`
	return {hierarchies, callback};
}

function traverse(target: any, ...others: any[]) {
	const args = _parseArgs(others);
	const hierarchies: Array<PropName | GetNameCallback | IGotPropDescriptor> = args.hierarchies;
	const callback: TraverseCallback = args.callback;
	let current = target;
	if (current !== undefined && current !== null) {
		hierarchies.every(info => {
			const descriptor = normalizeDescriptor(info);
			const {got} = descriptor;
			const name = getPropName(current, descriptor);

			const parent = current;
			current = current[name];
			if (got) {
				got.call(parent, parent, name, current);
			}
			const result = callback.call(parent, parent, name, current);
			return result !== false;
		});
	}
}

function traverseReverse(target: any, ...others: any[]) {
	const args = _parseArgs(others);
	const hierarchies: Array<PropName | GetNameCallback | IGotPropDescriptor> = args.hierarchies;
	const callback: TraverseCallback = args.callback;
	let current = target;
	if (current !== undefined && current !== null) {
		const params: Array<{
			parent: object,
			name: PropName,
			current: object
		}> = [];
		hierarchies.every(info => {
			const descriptor = normalizeDescriptor(info);
			const {got} = descriptor;
			const name = getPropName(current, descriptor);

			const parent = current;
			current = current[name];
			if (got) {
				got.call(parent, parent, name, current);
			}
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
