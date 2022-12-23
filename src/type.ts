// common
type PropName = string | number | symbol;

type ObjectCallback = ((this: object, parent: object) => PropName);
type LastHierarchyCallback = (this: object, parent: object, name: PropName) => object;
type HierarchyCallback = (this: object, parent: object, name: PropName, current: object) => void;
type HierarchyCallbackReturns<T> = (this: object, parent: object, name: PropName, current: object) => T;

interface INameDescriptor {
	readonly name?: PropName;
	readonly getName?: ObjectCallback;
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
	getValue?: (this: object, parent: object) => any;
}

type GetPropParam = PropName | ObjectCallback | IGetPropDescriptor;

// setup
interface ISetupPropDescriptor extends INameDescriptor, ITypeDescriptor, IGotDescriptor {
	readonly value?: object;
	readonly create?: LastHierarchyCallback;
	readonly override?: boolean;
	readonly created?: HierarchyCallback;
	readonly skipped?: HierarchyCallback;
}

type SetupPropParam = PropName | ObjectCallback | ISetupPropDescriptor;

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
	readonly create?: ObjectCallback;
}

type GroupParam = GroupCallback | IGroupDescriptor;

export {
	PropName,

	LastHierarchyCallback,
	HierarchyCallback,
	HierarchyCallbackReturns,
	ObjectCallback,
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
