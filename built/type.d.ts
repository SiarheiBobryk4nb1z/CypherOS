declare type PropName = string | number | symbol;
declare type LastHierarchyCallback = (this: object, parent: object, name: PropName) => object;
declare type HierarchyCallback = (this: object, parent: object, name: PropName, current: object) => void;
declare type GetNameCallback = ((this: object, parent: object) => PropName);
declare type GetNamesCallback = ((this: object, parent: object) => PropName[]);
interface INameDescriptor {
    readonly name?: PropName;
    readonly getName?: GetNameCallback;
}
interface INamesDescriptor {
    readonly names?: PropName | PropName[];
    readonly getNames?: GetNamesCallback;
}
interface IGotDescriptor {
    readonly got?: HierarchyCallback;
}
interface ISetupPropDescriptor extends INameDescriptor, IGotDescriptor {
    readonly value?: object;
    readonly type?: new () => object;
    readonly create?: LastHierarchyCallback;
    readonly override?: boolean;
    readonly created?: HierarchyCallback;
    readonly skipped?: HierarchyCallback;
}
interface IGetPropDescriptor extends INameDescriptor, IGotDescriptor {
}
interface ISelectPropsDescriptor extends INamesDescriptor, IGotDescriptor {
}
declare type GetPropParam = PropName | GetNameCallback | IGetPropDescriptor;
declare type SetupPropParam = PropName | GetNameCallback | ISetupPropDescriptor;
declare type SelectPropParam = PropName | PropName[] | GetNamesCallback | ISelectPropsDescriptor;
export { PropName, LastHierarchyCallback, HierarchyCallback, GetNameCallback, GetNamesCallback, INameDescriptor, INamesDescriptor, IGotDescriptor, ISetupPropDescriptor, IGetPropDescriptor, ISelectPropsDescriptor, GetPropParam, SetupPropParam, SelectPropParam };
