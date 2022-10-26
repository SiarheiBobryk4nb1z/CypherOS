import {PropName, INameDescriptor, INamesDescriptor} from '../type';

function getOwnEnumerablePropKeys(target: object) {
	const keys: Array<string | symbol> = Object.keys(target);

	if (Object.getOwnPropertySymbols) {
		const symbols =
			Object.getOwnPropertySymbols(target)
				.filter(symbol => {
					const descriptor = Object.getOwnPropertyDescriptor(target, symbol);
					return descriptor && descriptor.enumerable;
				});

		if (symbols.length) {
			keys.push(...symbols);
		}
	}

	return keys;
}

function cloneContainer(from: object): object {
	if (Array.isArray(from) || from instanceof Array) {
		return [];
	} else if (typeof from === 'object') {
		return {};
	} else {
		return from;
	}
}

function getPropName(current: object, descriptor: INameDescriptor): PropName {
	const {name, getName} = descriptor;
	if (name !== undefined) {
		return name;
	}

	return getName && getName.call(current, current) || 'undefined';
}

function getPropNames(current: object, descriptor: INamesDescriptor): PropName[] {
	const {names, getNames} = descriptor;

	if (names !== undefined) {
		return Array.isArray(names) ? names : [names];
	}

	if (getNames) {
		const gotNames = getNames.call(current, current);
		if (gotNames !== undefined) {
			return Array.isArray(gotNames) ? gotNames : [gotNames];
		}
	}

	return getOwnEnumerablePropKeys(current);
}

export {
	getOwnEnumerablePropKeys,
	cloneContainer,

	getPropName,
	getPropNames
};
