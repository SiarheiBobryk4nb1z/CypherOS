type PropName = string | number | symbol;

type LastHierarchyCallback = (this: object, parent: object, name: PropName) => object;
type HierarchyCallback = (this: object, parent: object, name: PropName, current: object) => void;
type GetNameCallback = ((this: object, parent: object) => PropName);
type GetNamesCallback = ((this: object, parent: object) => PropName[]);

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

type GetPropParam = PropName | GetNameCallback | IGetPropDescriptor;

type SetupPropParam = PropName | GetNameCallback | ISetupPropDescriptor;

type SelectPropParam = PropName | PropName[] | GetNamesCallback | ISelectPropsDescriptor;

export {
	PropName,

	LastHierarchyCallback,
	HierarchyCallback,
	GetNameCallback,
	GetNamesCallback,

	INameDescriptor,
	INamesDescriptor,
	IGotDescriptor,

	ISetupPropDescriptor,
	IGetPropDescriptor,
	ISelectPropsDescriptor,

	GetPropParam,
	SetupPropParam,
	SelectPropParam
};
