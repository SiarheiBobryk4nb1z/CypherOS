import { PropName } from './type';
declare type GroupCallback = (this: object, parent: object, name: PropName, current: object) => PropName;
declare function group(target: any, callback: GroupCallback): any;
declare function assort(target: any, callback: GroupCallback): any;
export { group, assort };
