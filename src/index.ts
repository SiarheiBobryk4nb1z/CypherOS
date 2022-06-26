function _parseArgs(target: any, others: any[]) {
	const value = others[others.length - 1];
	const rest = Array.prototype.concat.apply([], others.slice(0, -1));  //exclude `value`
	const hierarchyProps = rest.slice(0, -1);
	const prop = rest[rest.length - 1];
	return {hierarchyProps, prop, value};
}

function hierarchyGet(target: any, ...hierarchyProps: Array<string | number | symbol>) {
	let current = target;

	if (current !== undefined && current !== null) {
		hierarchyProps.every(hProp => {
			current = current[hProp];
			return current;
		});
	}

	return current;
}

function hierarchyCreate(target: any, hierarchyProps: Array<string | number | symbol>) {
	let current = target;
	hierarchyProps.forEach(hProp => {
		if (!current[hProp] || typeof current[hProp] !== 'object') {
			current[hProp] = {};
		}
		current = current[hProp];
	});

	return current;
}

function hierarchySet(target: any, ...others: any[]) {
	const {hierarchyProps, prop, value}=_parseArgs(target,others);

	const root = target || {};
	const current = hierarchyCreate(root, hierarchyProps);
	if (prop) {
		current[prop] = value;
	}
	return root;
}

function hierarchySetIfNotExists(target: any, ...others: any[]) {
	const {hierarchyProps, prop, value}=_parseArgs(target,others);

	const root = target || {};
	const current = hierarchyCreate(root, hierarchyProps);
	if (prop && current[prop] === undefined) {
		current[prop] = value;
	}
	return root;
}

export {
	hierarchyGet,
	hierarchySet,
	hierarchySetIfNotExists
};
