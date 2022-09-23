import {PropName, IPropDescriptor, HierarchyCallback} from './type';

interface ICreatePropDescriptor extends IPropDescriptor {
	override?: boolean;
	created?: HierarchyCallback;
	skipped?: HierarchyCallback;
	got?: HierarchyCallback;
}

function _parseArgs(others: any[]) {
	const value = others[others.length - 1];
	const rest = Array.prototype.concat.apply([], others.slice(0, -1));  // exclude `value`
	const hierarchies = rest.slice(0, -1);
	const prop = rest[rest.length - 1];
	return {hierarchies, prop, value};
}

function _create(
	target: any,
	hierarchies: Array<PropName | ICreatePropDescriptor>
) {
	let current = target;
	hierarchies.forEach(info => {
		let name;
		let value;
		let type;
		let override;
		let create;
		let created;
		let skipped;
		let got;

		if (info && typeof info === 'object') {
			name = info.name;
			value = info.value;
			type = info.type;
			override = info.override;
			create = info.create;
			created = info.created;
			skipped = info.skipped;
			got = info.got;
		} else {
			name = info;
			value = {};
		}

		if (override || !current[name] || typeof current[name] !== 'object') {
			const obj = value ? value :
				type ? new type() :
					create ? create.call(current, current, name) :
						{};
			current[name] = obj;

			if (created) {
				created.call(current, current, name, obj);
			}
		} else {
			if (skipped) {
				skipped.call(current, current, name, current[name]);
			}
		}

		const parent = current;
		current = current[name];
		if (got) {
			got.call(parent, parent, name, current);
		}
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
