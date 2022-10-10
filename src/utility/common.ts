import {PropName, INameDescriptor} from '../type';

function getPropName(current: object, descriptor: INameDescriptor): PropName {
	const {name, getName} = descriptor;
	if (name !== undefined) {
		return name;
	}

	return getName && getName.call(current, current) || 'undefined';
}

export {
	getPropName
};
