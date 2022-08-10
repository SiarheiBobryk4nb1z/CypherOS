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
	get
};
