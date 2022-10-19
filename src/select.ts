import {PropName, GetNamesCallback, ISelectPropsDescriptor} from './type';
import {normalizeDescriptor} from 'utility/select';
import {getPropNames} from 'utility/common';

type SelectHierarchyProp = PropName | PropName[] | GetNamesCallback | ISelectPropsDescriptor;

function cloneContainer(from: object): object {
	if (Array.isArray(from) || from instanceof Array) {
		return [];
	} else if (typeof from === 'object') {
		return {};
	} else {
		return from;
	}
}

function generate(current: any, result: any, hierarchies: SelectHierarchyProp[], index: number) {
	const descriptor = normalizeDescriptor(hierarchies[index]);
	const {got} = descriptor;
	const names = getPropNames(current, descriptor);

	const lastIndex = hierarchies.length - 1;
	names.forEach(name => {
		if (name in current) {
			const next = current[name];

			if (index < lastIndex) {
				result[name] = cloneContainer(next);
			} else {
				result[name] = next;
			}

			if (got) {
				got.call(current, current, name, next);
			}

			if (index < lastIndex && result !== undefined && typeof next === 'object') {
				generate(next, result[name], hierarchies, index + 1);
			}
		}
	});
}

function select(
	target: any,
	...hierarchyProps: SelectHierarchyProp[]
) {
	const current = target;
	let result;
	if (current !== undefined && current !== null) {
		result = cloneContainer(current);
		generate(current, result, hierarchyProps, 0);
	}

	return result;
}

export {
	select
};
