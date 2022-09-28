import {PropName, GetNameCallback, IGotPropDescriptor} from './type';

function get(target: any, ...rest: any[]) {
	const hierarchies: Array<PropName | GetNameCallback | IGotPropDescriptor> = Array.prototype.concat.apply([], rest);
	let current = target;
	if (current !== undefined && current !== null) {
		hierarchies.every(info => {
			let name;
			let got;
			if (typeof info === 'object') {
				name = info.name ? info.name :
					info.getName ? info.getName.call(current, current) : 'undefined';
				got = info.got;
			} else if (typeof info === 'function') {
				name = info.call(current, current);
			} else {
				name = info;
			}

			const parent = current;
			current = current[name];
			if (got) {
				got.call(parent, parent, name, current);
			}
			return current;
		});
	}

	return current;
}

export {
	get
};
