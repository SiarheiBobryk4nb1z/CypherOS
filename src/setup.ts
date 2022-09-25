import {PropName, ISetupPropDescriptor} from './type';

function setupIfUndef(target: any, hierarchies: Array<PropName | ISetupPropDescriptor>) {
	let current = target;
	hierarchies.forEach(info => {
		let name;
		let value;
		let type;
		let create;
		let override;
		let created;
		let skipped;
		let got;

		if (info && typeof info === 'object') {
			name = info.name;
			value = info.value;
			type = info.type;
			create = info.create;
			override = info.override;
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

function setup(target: any, hierarchies: Array<PropName | ISetupPropDescriptor>) {
	const current = setupIfUndef(target, hierarchies.slice(0, -1));
	const lastDescriptor = hierarchies[hierarchies.length - 1];

	const lastName = typeof lastDescriptor === 'object' ? lastDescriptor.name : lastDescriptor;
	current[lastName] = undefined;

	const last = setupIfUndef(current, [lastDescriptor]);

	return {current, last};
}

export {setupIfUndef, setup};
