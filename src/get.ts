import {GetPropParam} from './type';
import {normalizeDescriptor, getNameValue} from './utility/get';

function get(target: any, ...rest: Array<GetPropParam | GetPropParam[]>) {
	let hierarchies: GetPropParam[] = [];
	hierarchies = Array.prototype.concat.apply(hierarchies, rest);
	let current = target;
	if (current !== undefined && current !== null) {
		hierarchies.every(info => {
			const descriptor = normalizeDescriptor(info);
			const {value} = getNameValue(current, descriptor);

			current = value;
			return current;
		});
	}

	return current;
}

export {
	get
};
