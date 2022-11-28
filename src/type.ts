// common
type PropName = string | number | symbol;

type LastHierarchyCallback = (this: object, parent: object, name: PropName) => object;
type HierarchyCallback = (this: object, parent: object, name: PropName, current: object) => void;
type HierarchyCallbackReturns<T> = (this: object, parent: object, name: PropName, current: object) => T;
type GetNameCallback = ((this: object, parent: object) => PropName);

interface INameDescriptor {
	readonly name?: PropName;
	readonly getName?: GetNameCallback;
}

interface ITypeDescriptor {
	readonly type?: new () => object;
}

interface IGotDescriptor {
	readonly got?: HierarchyCallback;
}

interface IMapDescriptor {
	readonly mapName?: HierarchyCallbackReturns<PropName>;
	readonly mapValue?: HierarchyCallbackReturns<object>;
	readonly mapped?: HierarchyCallback;
}

// get
interface IGetPropDescriptor extends INameDescriptor, IGotDescriptor {
}

type GetPropParam = PropName | GetNameCallback | IGetPropDescriptor;

// setup
interface ISetupPropDescriptor extends INameDescriptor, ITypeDescriptor, IGotDescriptor {
	readonly value?: object;
	readonly create?: LastHierarchyCallback;
	readonly override?: boolean;
	readonly created?: HierarchyCallback;
	readonly skipped?: HierarchyCallback;
}

type SetupPropParam = PropName | GetNameCallback | ISetupPropDescriptor;

// select
type GetNamesCallback = ((this: object, parent: object) => PropName[]);

interface INamesDescriptor {
	readonly names?: PropName | PropName[];
	readonly getNames?: GetNamesCallback;
}

interface ISelectPropsDescriptor extends INamesDescriptor, IGotDescriptor, IMapDescriptor {
}

type SelectPropParam = PropName | PropName[] | GetNamesCallback | ISelectPropsDescriptor;

// group
type GroupCallback = (this: object, parent: object, name: PropName, current: object) => PropName;

interface IGroupDescriptor extends ITypeDescriptor {
	readonly by?: GroupCallback;
}

type GroupParam = GroupCallback | IGroupDescriptor;

export {
	PropName,

	LastHierarchyCallback,
	HierarchyCallback,
	HierarchyCallbackReturns,
	GetNameCallback,
	IGotDescriptor,
	IMapDescriptor,

	INameDescriptor,

	IGetPropDescriptor,
	GetPropParam,

	ISetupPropDescriptor,
	SetupPropParam,

	GetNamesCallback,
	INamesDescriptor,
	ISelectPropsDescriptor,
	SelectPropParam,

	GroupCallback,
	IGroupDescriptor,
	GroupParam
};
