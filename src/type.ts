// common
type PropName = string | number | symbol;

type LastHierarchyCallback = (this: object, parent: object, name: PropName) => object;
type HierarchyCallback = (this: object, parent: object, name: PropName, current: object) => void;
type GetNameCallback = ((this: object, parent: object) => PropName);

interface INameDescriptor {
	readonly name?: PropName;
	readonly getName?: GetNameCallback;
}

interface IGotDescriptor {
	readonly got?: HierarchyCallback;
}

// get
interface IGetPropDescriptor extends INameDescriptor, IGotDescriptor {
}

type GetPropParam = PropName | GetNameCallback | IGetPropDescriptor;

// setup
interface ISetupPropDescriptor extends INameDescriptor, IGotDescriptor {
	readonly value?: object;
	readonly type?: new () => object;
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

interface ISelectPropsDescriptor extends INamesDescriptor, IGotDescriptor {
}

type SelectPropParam = PropName | PropName[] | GetNamesCallback | ISelectPropsDescriptor;

// group
type GroupCallback = (this: object, parent: object, name: PropName, current: object) => PropName;

interface IGroupDescriptor {
	readonly type?: new () => object;
	readonly by?: GroupCallback;
}

type GroupParam = GroupCallback | IGroupDescriptor;

export {
	PropName,

	LastHierarchyCallback,
	HierarchyCallback,
	GetNameCallback,
	IGotDescriptor,

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
