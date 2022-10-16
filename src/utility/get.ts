import {GetNameCallback, IGetPropDescriptor, PropName} from '../type';

function normalizeDescriptor(info: PropName | GetNameCallback | IGetPropDescriptor): IGetPropDescriptor {
	if (typeof info === 'object') {
		return info;
	} else if (typeof info === 'function') {
		return {
			getName: info
		};
	} else {
		return {
			name: info
		};
	}
}

export {
	normalizeDescriptor
};
