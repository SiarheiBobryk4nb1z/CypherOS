import {PropName, GroupParam, IGroupDescriptor} from './type';
import {isArray, cloneContainer, getOwnEnumerablePropKeys} from './utility/common';
import {normalizeDescriptor} from './utility/group';

function _createContainer(descriptor: IGroupDescriptor, target: object) {
	const {type, create} = descriptor;

	if (type) {
		return new type();
	} else if (create) {
		return create.call(target, target);
	} else {
		return {};
	}
}

function group(target: any, ...params: Array<GroupParam | GroupParam[]>) {
	if (!params.length) {
		return target;
	}
	const descriptors = Array.prototype.concat.apply([], params).map(normalizeDescriptor).filter(d => d.by);
	if (!descriptors.length) {
		return target;
	}

	const lastIndex = descriptors.length - 1;
	const keys = getOwnEnumerablePropKeys(target);
	let rootContainer: any;

	keys.forEach(key => {
		const child = target[key];
		let prevContainer: any;
		let prevName: PropName;

		descriptors.forEach((descriptor, index) => {
			const {by} = descriptor;
			if (index === 0) {
				if (!rootContainer) {
					rootContainer = _createContainer(descriptor, target);
				}
				prevContainer = rootContainer;
			} else {
				if (!prevContainer[prevName]) {
					prevContainer[prevName] = _createContainer(descriptor, target);
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
