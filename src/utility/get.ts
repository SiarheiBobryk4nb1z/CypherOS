import {IGetPropDescriptor, GetPropParam} from '../type';

function normalizeDescriptor(info: GetPropParam): IGetPropDescriptor {
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
