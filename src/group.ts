import {PropName} from './type';
import {cloneContainer, getOwnEnumerablePropKeys} from './utility/common';

type GroupCallback = (this: object, parent: object, name: PropName, current: object) => PropName;

function group(target: any, callback: GroupCallback) {
	const targetIsArray = Array.isArray(target) || target instanceof Array;
	const result: any = {};
	const keys = getOwnEnumerablePropKeys(target);
	keys.forEach(key => {
		const child = target[key];
		const groupName = callback.call(target, target, key, child);
		if (!result[groupName]) {
			result[groupName] = cloneContainer(target);
		}

		if (targetIsArray) {
			result[groupName].push(child);
		} else {
			result[groupName][key] = child;
		}
	});

	return result;
}

export {
	group
};
