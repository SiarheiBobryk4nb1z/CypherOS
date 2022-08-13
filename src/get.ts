function get(target: any, ...rest: any[]) {
	const hierarchies: Array<string |
		number |
		symbol |
		((this: object, parent: object) => string | number | symbol) |
		{
			name?: string | number | symbol,
			getName?: ((this: object, parent: object) => string | number | symbol),
			onGotValue?: ((this: object, parent: object, name: string | number | symbol, current: object) => any)
		}> = Array.prototype.concat.apply([], rest);
	let current = target;

	if (current !== undefined && current !== null) {
		hierarchies.every(info => {
			let name;
			let onGotValue;
			if (typeof info === 'object') {
				name = info.name ? info.name :
					info.getName ? info.getName.call(current, current) : 'undefined';
				onGotValue = info.onGotValue;
			} else if (typeof info === 'function') {
				name = info.call(current, current);
			} else {
				name = info;
			}

			const parent = current;
			current = current[name];
			if (onGotValue) {
				onGotValue.call(parent, parent, name, current)
			}
			return current;
		});
	}

	return current;
}

export {
	get
};
