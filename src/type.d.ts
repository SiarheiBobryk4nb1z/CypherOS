type PropName = string | number | symbol;

type LastHierarchyCallback = (this: object, parent: object, name: PropName) => object;
type HierarchyCallback = (this: object, parent: object, name: PropName, current: object) => void;
type GetNameCallback = ((this: object, parent: object) => PropName);

interface INameDescriptor {
	name?: PropName;
	getName?: GetNameCallback;
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

export {
	PropName,
	LastHierarchyCallback,
	HierarchyCallback,
	GetNameCallback,
	INameDescriptor,
	IGotDescriptor,
	ISetupPropDescriptor,
	IGetPropDescriptor
};
