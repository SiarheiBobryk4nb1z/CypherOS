import type {GroupParam, IGroupDescriptor} from '../type';

function normalizeDescriptor(info: GroupParam): IGroupDescriptor {
	if (typeof info === 'object' && info !== null) {
		return info;
	} else if (typeof info === 'function') {
		return {
			by: info
		};
	} else {
		return {};
	}
}

export {
	normalizeDescriptor
};
