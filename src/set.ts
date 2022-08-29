import {PropName} from './type';

function _parseArgs(others: any[]) {
	const value = others[others.length - 1];
	const rest = Array.prototype.concat.apply([], others.slice(0, -1));  // exclude `value`
	const hierarchies = rest.slice(0, -1);
	const prop = rest[rest.length - 1];
	return {hierarchies, prop, value};
}

function _create(
	target: any,
	hierarchies: Array<PropName |
		{
			name: string,
			value?: object,
			type?: new () => object,
			create?: (this: object, parent: object, name: PropName) => object
		}>
) {
	let current = target;
	hierarchies.forEach(info => {
		let name;
		let value;
		let type;
		let create;

		if (info && typeof info === 'object') {
			name = info.name;
			value = info.value;
			type = info.type;
			create = info.create;
		} else {
			name = info;
			value = {};
		}

		if (!current[name] || typeof current[name] !== 'object') {
			const obj = value ? value :
				type ? new type() :
					create ? create.call(current, current, name) :
						{};
			current[name] = obj;
		}
		current = current[name];
	});

	return current;
}

function set(optionalTarget: any, ...others: any[]) {
	const {hierarchies, prop, value} = _parseArgs(others);

	const target = optionalTarget || {};
	const current = _create(target, hierarchies);
	current[prop] = value;
	return target;
}

function assign(target: any, ...others: any[]) {
	const {hierarchies, prop, value} = _parseArgs(others);

	const current = _create(target, hierarchies);
	current[prop] = value;
	return current;
}

function put(target: any, ...others: any[]) {
	const {hierarchies, prop, value} = _parseArgs(others);

	const current = _create(target, hierarchies);
	current[prop] = value;
	return value;
}

function setIfUndef(optionalTarget: any, ...others: any[]) {
	const {hierarchies, prop, value} = _parseArgs(others);

	const target = optionalTarget || {};
	const current = _create(target, hierarchies);
	if (current[prop] === undefined) {
		current[prop] = value;
	}
	return target;
}

function assignIfUndef(target: any, ...others: any[]) {
	const {hierarchies, prop, value} = _parseArgs(others);

	const current = _create(target, hierarchies);
	if (current[prop] === undefined) {
		current[prop] = value;
	}
	return current;
}

function putIfUndef(target: any, ...others: any[]) {
	const {hierarchies, prop, value} = _parseArgs(others);

	const current = _create(target, hierarchies);
	if (current[prop] === undefined) {
		current[prop] = value;
	}
	return current[prop];
}

export {
	set,
	assign,
	put,
	setIfUndef,
	assignIfUndef,
	putIfUndef
};
