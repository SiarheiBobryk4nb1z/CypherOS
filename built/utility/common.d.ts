import { PropName, INameDescriptor, INamesDescriptor } from '../type';
declare function getPropName(current: object, descriptor: INameDescriptor): PropName;
declare function getPropNames(current: object, descriptor: INamesDescriptor): PropName[];
export { getPropName, getPropNames };
