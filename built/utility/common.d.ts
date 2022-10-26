import { PropName, INameDescriptor, INamesDescriptor } from '../type';
declare function getOwnEnumerablePropKeys(target: object): (string | symbol)[];
declare function cloneContainer(from: object): object;
declare function getPropName(current: object, descriptor: INameDescriptor): PropName;
declare function getPropNames(current: object, descriptor: INamesDescriptor): PropName[];
export { getOwnEnumerablePropKeys, cloneContainer, getPropName, getPropNames };
