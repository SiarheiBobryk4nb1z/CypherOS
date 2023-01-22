import type {PropName, INameDescriptor, INamesDescriptor} from '../type';

function isArray(source: any): source is any[] {
	return Array.isArray(source) || source instanceof Array;
}

function isObject(source: any): source is object {
	return typeof source === 'object' && source !== null
}

function getOwnEnumerablePropKeys(target: object): PropName[] {
	const keys: PropName[] = Object.keys(target);

	if (Object.getOwnPropertySymbols) {
		const symbols = Object.getOwnPropertySymbols(target).filter(symbol => {
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
	if (isArray(from)) {
		return [];
	} else if (isObject(from)) {
		return {};
	} else {
		return from;
	}
}

function getPropName(current: object, descriptor: INameDescriptor): PropName | undefined {
	const {name, getName} = descriptor;
	if (name !== undefined) {
		return name;
	}

	if (getName) {
		return getName.call(current, current);
	}
}

function getNonEmptyPropName(current: object, descriptor: INameDescriptor): PropName {
	const name = getPropName(current, descriptor);
	return name !== undefined ? name : 'undefined';
}

function getPropNames(current: object, descriptor: INamesDescriptor): PropName[] {
	const {names, getNames} = descriptor;

	if (names !== undefined) {
		return isArray(names) ? names : [names];
	}

	if (getNames) {
		const gotNames = getNames.call(current, current);
		if (gotNames !== undefined) {
			return isArray(gotNames) ? gotNames : [gotNames];
		}
	}

	return getOwnEnumerablePropKeys(current);
}

export {
	isArray,
	isObject,
	getOwnEnumerablePropKeys,
	cloneContainer,

	getPropName,
	getNonEmptyPropName,
	getPropNames
};
