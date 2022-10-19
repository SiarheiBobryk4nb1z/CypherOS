import { PropName, GetNamesCallback, ISelectPropsDescriptor } from './type';
declare type SelectHierarchyProp = PropName | PropName[] | GetNamesCallback | ISelectPropsDescriptor;
declare function select(target: any, ...hierarchyProps: SelectHierarchyProp[]): object | undefined;
export { select };
