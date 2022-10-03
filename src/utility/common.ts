import {PropName, INameDescriptor} from '../type';

function getPropName(current: object, descriptor: INameDescriptor): PropName {
	const {name, getName} = descriptor;
	return name || (getName && getName.call(current, current)) || 'undefined';
}

export {
	getPropName
};
