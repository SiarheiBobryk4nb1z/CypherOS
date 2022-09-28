type PropName = string | number | symbol;

type LastHierarchyCallback = (this: object, parent: object, name: PropName) => object;
type HierarchyCallback = (this: object, parent: object, name: PropName, current: object) => void;
type GetNameCallback = ((this: object, parent: object) => PropName);

interface INameDescriptor {
	name?: PropName;
	getName?: GetNameCallback;
}

interface IGotPropDescriptor extends INameDescriptor {
	got?: HierarchyCallback;
}

interface ISetupPropDescriptor extends IGotPropDescriptor {
	value?: object;
	type?: new () => object;
	create?: LastHierarchyCallback;
	override?: boolean;
	created?: HierarchyCallback;
	skipped?: HierarchyCallback;
}

export {
	PropName,
	LastHierarchyCallback,
	HierarchyCallback,
	GetNameCallback,
	INameDescriptor,
	IGotPropDescriptor,
	ISetupPropDescriptor
};
