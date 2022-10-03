import {GetNameCallback, IGotPropDescriptor, PropName} from '../type';

function normalizeDescriptor(info: PropName | GetNameCallback | IGotPropDescriptor): IGotPropDescriptor {
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
