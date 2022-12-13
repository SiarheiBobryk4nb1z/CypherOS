import {SelectPropParam} from './type';
import {getPropNames} from './utility/common';
import {normalizeDescriptor, getMappedNameValue} from './utility/select';

function find(current: any, result: any[], hierarchies: SelectPropParam[], index: number) {
	const descriptor = normalizeDescriptor(hierarchies[index]);
	const names = getPropNames(current, descriptor);

	const lastIndex = hierarchies.length - 1;
	names.forEach(name => {
		if (name in current) {
			const {mappedValue} = getMappedNameValue(current, name, descriptor);

			if (index < lastIndex) {
				find(mappedValue, result, hierarchies, index + 1);
			} else {
				result.push(mappedValue);
			}
		}
	});
}

function pick(target: any, ...hierarchyProps: SelectPropParam[]) {
	const result: any[] = [];
	const current = target;
	if (current !== undefined && current !== null) {
		find(current, result, hierarchyProps, 0);
	}

	return result;
}

export {
	pick
};
