function _parseArgs(others: any[]) {
	const value = others[others.length - 1];
	const rest = Array.prototype.concat.apply([], others.slice(0, -1));  // exclude `value`
	const hierarchies = rest.slice(0, -1);
	const prop = rest[rest.length - 1];
	return {hierarchies, prop, value};
}

function _create(
	target: any,
	hierarchies: Array<string |
		number |
		symbol |
		{
			name: string,
			value?: object,
			type?: new () => object,
			create?: (this: object, parent: object, name: string | number | symbol) => object
		}>
) {
	let current = target;
	hierarchies.forEach(info => {
		let name, value, type, create;
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

function assign(target: any, ...others: any[]) {
	const {hierarchies, prop, value} = _parseArgs(others);

	const current = _create(target, hierarchies);
	current[prop] = value;
	return current;
}

function set(target: any, ...others: any[]) {
	const root = target || {};
	assign(root, ...others);
	return root;
}

function assignIfUndef(target: any, ...others: any[]) {
	const {hierarchies, prop, value} = _parseArgs(others);

	const current = _create(target, hierarchies);
	if (current[prop] === undefined) {
		current[prop] = value;
	}
	return current;
}

function setIfUndef(target: any, ...others: any[]) {
	const root = target || {};
	assignIfUndef(root, ...others);
	return root;
}

function get(target: any, ...rest: any[]) {
	const hierarchies: Array<string |
		number |
		symbol |
		((this: object, current: object) => string | number | symbol)> = Array.prototype.concat.apply([], rest);
	let current = target;

	if (current !== undefined && current !== null) {
		hierarchies.every(info => {
			let property;
			if (typeof info === 'function') {
				property = info.call(current, current);
			} else {
				property = info;
			}
			current = current[property];
			return current;
		});
	}

	return current;
}

export {
	set,
	assign,
	setIfUndef,
	assignIfUndef,
	get
};
