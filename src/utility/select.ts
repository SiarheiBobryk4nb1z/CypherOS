import {isArray} from './common';
import {PropName, GetNamesCallback, IGotDescriptor, IMapDescriptor, ISelectPropsDescriptor} from '../type';

function normalizeDescriptor(
	info: PropName | PropName[] | GetNamesCallback | ISelectPropsDescriptor
): ISelectPropsDescriptor {
	if (isArray(info)) {
		return {
			names: info
		};
	} else if (typeof info === 'object') {
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

function getMapped(current: any, name: PropName, descriptor: IGotDescriptor & IMapDescriptor) {
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
	getMapped
};
