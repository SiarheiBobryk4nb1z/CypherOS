type PropName = string | number | symbol;

type LastHierarchyCallback = (this: object, parent: object, name: PropName) => object;
type HierarchyCallback = (this: object, parent: object, name: PropName, current: object) => void;

interface IValueDescriptor {
	value?: object;
	type?: new () => object;
	create?: LastHierarchyCallback;
}

interface IPropDescriptor extends IValueDescriptor {
	name: string;
}

export {
	PropName,
	IValueDescriptor,
	IPropDescriptor,
	LastHierarchyCallback,
	HierarchyCallback
};
