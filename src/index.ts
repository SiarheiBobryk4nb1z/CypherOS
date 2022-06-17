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

function hierarchyCreate(target: any, ...hierarchyProps: Array<string | number | symbol>) {
	let current = target;
	hierarchyProps.forEach(hProp => {
		if (!current[hProp] || typeof current[hProp] !== 'object') {
			current[hProp] = {};
		}
		current = current[hProp];
	});

	return current;
}

function hierarchySet(target: any, ...rest: any[]) {
	const hierarchyProps = rest.slice(0, rest.length - 2);
	const prop = rest[rest.length - 2];
	const value = rest[rest.length - 1];

	const root = target || {};
	const current = hierarchyCreate(root, ...hierarchyProps);
	if (prop) {
		current[prop] = value;
	}
	return root;
}

function hierarchySetIfNotExists(target: any, ...rest: any[]) {
	const hierarchyProps = rest.slice(0, rest.length - 2);
	const prop = rest[rest.length - 2];
	const value = rest[rest.length - 1];

	const root = target || {};
	const current = hierarchyCreate(root, ...hierarchyProps);
	if (prop && current[prop] === null || current[prop] === undefined) {
		current[prop] = value;
	}
	return root;
}

export {
	hierarchyGet,
	hierarchySet,
	hierarchySetIfNotExists
};
