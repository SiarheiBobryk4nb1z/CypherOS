import {ISetupPropDescriptor, SetupPropParam} from '../type';

function normalizeDescriptor(info: SetupPropParam): ISetupPropDescriptor {
	if (typeof info === 'object' && info !== null) {
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
