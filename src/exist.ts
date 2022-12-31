import {PropName} from './type';

function exist(target: any, ...rest: Array<PropName | PropName[]>) {
	if (target === undefined || target === null) {
		return false;
	}

	const hierarchies: PropName[] = Array.prototype.concat.apply([], rest);
	let current = target;
	for (let i = 0; i < hierarchies.length; i++) {
		const prop = hierarchies[i];
		if (!current || !(prop in current)) {
			return false;
		}
		current = current[prop];
	}

	return true;
}

export {
	exist
};
