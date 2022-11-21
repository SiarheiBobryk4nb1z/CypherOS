import {GroupParam, IGroupDescriptor, PropName} from './type';
import {isArray, cloneContainer, getOwnEnumerablePropKeys} from './utility/common';
import {normalizeDescriptor} from './utility/group';

function _createContainer(type?: new () => object) {
	if (type) {
		return new type();
	} else {
		return {};
	}
}

function group(target: any, ...params: GroupParam[]) {
	if (!params.length) {
		return target;
	}
	const descriptors = params.map(normalizeDescriptor).filter(d => d.by);
	if (!descriptors) {
		return target;
	}

	const lastIndex = descriptors.length - 1;
	const keys = getOwnEnumerablePropKeys(target);
	const rootContainer = _createContainer(descriptors[0].type);

	keys.forEach(key => {
		const child = target[key];
		let prevContainer: any = rootContainer;
		let prevName: PropName;

		descriptors.forEach((descriptor, index) => {
			const {type, by} = descriptor;
			if (index > 0) {
				if (!prevContainer[prevName]) {
					prevContainer[prevName] = _createContainer(type);
				}
				prevContainer = prevContainer[prevName];
			}

			const groupName = by!.call(target, target, key, child);

			if (index !== lastIndex) {
				prevName = groupName;
			} else {
				if (!prevContainer[groupName]) {
					prevContainer[groupName] = cloneContainer(target);
				}
				const currentContainer = prevContainer[groupName];
				if (isArray(currentContainer)) {
					currentContainer.push(child);
				} else {
					currentContainer[key] = child;
				}
			}
		});
	});

	return rootContainer;
}

export {
	group
};
