import {PropName, HierarchyCallbackReturns} from './type';
import {getOwnEnumerablePropKeys} from './utility/common';

function map2array(
	obj: any,
	keyName: PropName | HierarchyCallbackReturns<PropName>,
	valueName: PropName | HierarchyCallbackReturns<PropName>
) {
	if (!obj) {
		return;
	}

	const result: any[] = [];

	getOwnEnumerablePropKeys(obj).forEach(key => {
		const value = obj[key];

		const keyProp = typeof keyName === 'function' ? keyName.call(obj, obj, key, value) : keyName;
		const valueProp = typeof valueName === 'function' ? valueName.call(obj, obj, key, value) : valueName;

		result.push({
			[keyProp]: key,
			[valueProp]: value
		});
	});

	return result;
}

export {
	map2array
};
