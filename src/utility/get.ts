import {PropName, GetPropParam, IGetPropDescriptor, IGotDescriptor} from '../type';

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

function getValue(current: any, name: PropName, descriptor: IGotDescriptor) {
	const next = current[name];

	const {got} = descriptor;
	if (got) {
		got.call(current, current, name, next);
	}

	return next;
}

export {
	normalizeDescriptor,
	getValue
};
