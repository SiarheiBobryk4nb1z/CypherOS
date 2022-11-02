declare type PropName = string | number | symbol;
declare type LastHierarchyCallback = (this: object, parent: object, name: PropName) => object;
declare type HierarchyCallback = (this: object, parent: object, name: PropName, current: object) => void;
declare type GetNameCallback = ((this: object, parent: object) => PropName);
declare type GetNamesCallback = ((this: object, parent: object) => PropName[]);
interface INameDescriptor {
    name?: PropName;
    getName?: GetNameCallback;
}
interface INamesDescriptor {
    names?: PropName | PropName[];
    getNames?: GetNamesCallback;
}
interface IGotDescriptor {
    got?: HierarchyCallback;
}
interface ISetupPropDescriptor extends INameDescriptor, IGotDescriptor {
    value?: object;
    type?: new () => object;
    create?: LastHierarchyCallback;
    override?: boolean;
    created?: HierarchyCallback;
    skipped?: HierarchyCallback;
}
interface IGetPropDescriptor extends INameDescriptor, IGotDescriptor {
}
interface ISelectPropsDescriptor extends INamesDescriptor, IGotDescriptor {
}
declare type GetPropParam = PropName | GetNameCallback | IGetPropDescriptor;
declare type SetupPropParam = PropName | GetNameCallback | ISetupPropDescriptor;
declare type SelectPropParam = PropName | PropName[] | GetNamesCallback | ISelectPropsDescriptor;
export { PropName, LastHierarchyCallback, HierarchyCallback, GetNameCallback, GetNamesCallback, INameDescriptor, INamesDescriptor, IGotDescriptor, ISetupPropDescriptor, IGetPropDescriptor, ISelectPropsDescriptor, GetPropParam, SetupPropParam, SelectPropParam };
