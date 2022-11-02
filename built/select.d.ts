import { SelectPropParam } from './type';
declare function select(target: any, ...hierarchyProps: SelectPropParam[]): object | undefined;
declare function pick(target: any, ...hierarchyProps: SelectPropParam[]): any[];
export { select, pick };
