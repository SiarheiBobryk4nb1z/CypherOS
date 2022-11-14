import {GroupCallback} from './type';
import {cloneContainer, getOwnEnumerablePropKeys} from './utility/common';

function distribute(target: any, callback: GroupCallback, rootContainer: any) {
	const targetIsArray = Array.isArray(target) || target instanceof Array;
	const keys = getOwnEnumerablePropKeys(target);
	keys.forEach(key => {
		const child = target[key];
		const groupName = callback.call(target, target, key, child);
		if (!rootContainer[groupName]) {
			rootContainer[groupName] = cloneContainer(target);
		}

		if (targetIsArray) {
			rootContainer[groupName].push(child);
		} else {
			rootContainer[groupName][key] = child;
		}
	});

	return rootContainer;
}

function group(target: any, callback: GroupCallback) {
	return distribute(target, callback, {});
}

export {
	group
};
