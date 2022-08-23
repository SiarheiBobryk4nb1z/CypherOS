import {PropName} from './type';

function _parseArgs(others: any[]) {
	const callback = others[others.length - 1];
	const hierarchies = Array.prototype.concat.apply([], others.slice(0, -1));  // exclude `callback`
	return {hierarchies, callback};
}

function traverse(target: any, ...others: any[]) {
	const args = _parseArgs(others);
	const hierarchies: Array<PropName |
		((this: object, parent: object) => PropName)> = args.hierarchies;
	const callback: ((this: object, parent: object, name: PropName, current: object) => void) = args.callback;
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

export {
	traverse
};
