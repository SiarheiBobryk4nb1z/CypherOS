import {SelectPropParam} from './type';
import {normalizeDescriptor} from './utility/select';
import {getPropNames, cloneContainer} from './utility/common';

function generate(current: any, result: any, hierarchies: SelectPropParam[], index: number) {
	const descriptor = normalizeDescriptor(hierarchies[index]);
	const {got} = descriptor;
	const names = getPropNames(current, descriptor);

	const lastIndex = hierarchies.length - 1;
	names.forEach(name => {
		if (name in current) {
			const next = current[name];

			if (got) {
				got.call(current, current, name, next);
			}

			if (index < lastIndex) {
				result[name] = cloneContainer(next);
			} else {
				result[name] = next;
			}

			if (index < lastIndex && result !== undefined && typeof next === 'object') {
				generate(next, result[name], hierarchies, index + 1);
			}
		}
	});
}

function select(target: any, ...hierarchyProps: SelectPropParam[]) {
	let result;
	const current = target;
	if (current !== undefined && current !== null) {
		result = cloneContainer(current);
		generate(current, result, hierarchyProps, 0);
	}

	return result;
}

function find(current: any, result: any[], hierarchies: SelectPropParam[], index: number) {
	const descriptor = normalizeDescriptor(hierarchies[index]);
	const {got} = descriptor;
	const names = getPropNames(current, descriptor);

	const lastIndex = hierarchies.length - 1;
	names.forEach(name => {
		if (name in current) {
			const next = current[name];

			if (got) {
				got.call(current, current, name, next);
			}

			if (index < lastIndex) {
				find(next, result, hierarchies, index + 1);
			} else {
				result.push(next);
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
	select,
	pick
};
