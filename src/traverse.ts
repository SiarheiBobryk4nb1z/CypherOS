import {PropName} from './type';

type TraverseHierarchy = PropName | ((this: object, parent: object) => PropName);
type TraverseCallback = (this: object, parent: object, name: PropName, current: object) => void;

function _parseArgs(others: any[]) {
	const callback = others[others.length - 1];
	const hierarchies = Array.prototype.concat.apply([], others.slice(0, -1));  // exclude `callback`
	return {hierarchies, callback};
}

function traverse(target: any, ...others: any[]) {
	const args = _parseArgs(others);
	const hierarchies: TraverseHierarchy[] = args.hierarchies;
	const callback: TraverseCallback = args.callback;
	let current = target;
	if (current !== undefined && current !== null) {
		hierarchies.every(info => {
			const name = typeof info === 'function' ? info.call(current, current) : info;
			const parent = current;
			current = current[name];
			callback.call(parent, parent, name, current);
			return current;
		});
	}
}

function traverseReverse(target: any, ...others: any[]) {
	const args = _parseArgs(others);
	const hierarchies: TraverseHierarchy[] = args.hierarchies;
	const callback: TraverseCallback = args.callback;
	let current = target;
	if (current !== undefined && current !== null) {
		const params: Array<{
			parent: object,
			name: PropName,
			current: object
		}> = [];
		hierarchies.every(info => {
			const name = typeof info === 'function' ? info.call(current, current) : info;
			const parent = current;
			current = current[name];
			params.push({parent, name, current});
			return current;
		});
		for (let i = params.length - 1; i >= 0; i--) {
			const item = params[i];
			callback.call(item.parent, item.parent, item.name, item.current);
		}
	}
}

export {
	traverse,
	traverseReverse
};
