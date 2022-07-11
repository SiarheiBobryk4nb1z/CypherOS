function _parseArgs(others: any[]) {
	const value = others[others.length - 1];
	const rest = Array.prototype.concat.apply([], others.slice(0, -1));  // exclude `value`
	const hierarchyProps = rest.slice(0, -1);
	const prop = rest[rest.length - 1];
	return {hierarchyProps, prop, value};
}

function get(target: any, ...rest: any[]) {
	const props: Array<string | number | symbol> = Array.prototype.concat.apply([], rest);
	let current = target;

	if (current !== undefined && current !== null) {
		props.every(prop => {
			current = current[prop];
			return current;
		});
	}

	return current;
}

function create(target: any, hierarchyProps: Array<string | number | symbol>) {
	let current = target;
	hierarchyProps.forEach(hProp => {
		if (!current[hProp] || typeof current[hProp] !== 'object') {
			current[hProp] = {};
		}
		current = current[hProp];
	});

	return current;
}

function assign(target: any, ...others: any[]) {
	const {hierarchyProps, prop, value} = _parseArgs(others);

	const current = create(target, hierarchyProps);
	current[prop] = value;
	return current;
}

function set(target: any, ...others: any[]) {
	const root = target || {};
	assign(root, ...others);
	return root;
}

function assignIfUndef(target: any, ...others: any[]) {
	const {hierarchyProps, prop, value} = _parseArgs(others);

	const current = create(target, hierarchyProps);
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

export {
	get,
	set,
	assign,
	setIfUndef,
	assignIfUndef
};
