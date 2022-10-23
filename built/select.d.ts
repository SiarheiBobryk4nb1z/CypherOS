import { PropName, GetNamesCallback, ISelectPropsDescriptor } from './type';
declare type SelectHierarchyProp = PropName | PropName[] | GetNamesCallback | ISelectPropsDescriptor;
declare function select(target: any, ...hierarchyProps: SelectHierarchyProp[]): object | undefined;
declare function pick(target: any, ...hierarchyProps: SelectHierarchyProp[]): any[];
export { select, pick };
