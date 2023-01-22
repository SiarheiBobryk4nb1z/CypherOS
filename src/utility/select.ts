import {isArray} from './common';
import type {PropName, SelectPropParam, IGotDescriptor, IMapDescriptor, ISelectPropsDescriptor} from '../type';

function normalizeDescriptor(info: SelectPropParam): ISelectPropsDescriptor {
	if (isArray(info)) {
		return {
			names: info
		};
	} else if (typeof info === 'object' && info !== null) {
		return info;
	} else if (typeof info === 'function') {
		return {
			getNames: info
		};
	} else {
		return {
			names: info
		};
	}
}

function getMappedNameValue(current: any, name: PropName, descriptor: IGotDescriptor & IMapDescriptor) {
	const {got, mapName, mapValue, mapped} = descriptor;

	const next = current[name];

	if (got) {
		got.call(current, current, name, next);
	}

	const mappedName = mapName ? mapName.call(current, current, name, next) : name;
	const mappedValue = mapValue ? mapValue.call(current, current, name, next) : next;

	if (mapped) {
		mapped.call(current, current, mappedName, mappedValue);
	}

	return {mappedName, mappedValue};
}

export {
	normalizeDescriptor,
	getMappedNameValue
};
