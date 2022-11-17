import {isArray} from './common';
import {GetNamesCallback, ISelectPropsDescriptor, PropName} from '../type';

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

export {
	normalizeDescriptor
};
