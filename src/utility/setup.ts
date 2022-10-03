import {GetNameCallback, ISetupPropDescriptor, PropName} from '../type';

function normalizeDescriptor(info: PropName | GetNameCallback | ISetupPropDescriptor): ISetupPropDescriptor {
	if (info && typeof info === 'object') {
		return info;
	} else if (typeof info === 'function') {
		return {
			getName: info,
			value: {}
		};
	} else {
		return {
			name: info,
			value: {}
		};
	}
}

export {
	normalizeDescriptor
};
