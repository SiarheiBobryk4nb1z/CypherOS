declare function hierarchyGet(target: any, ...hierarchyProps: (string | number | symbol)[]): any;
declare function hierarchySet(target: any, ...rest: any[]): any;
declare function hierarchySetIfNotExists(target: any, ...rest: any[]): any;
export { hierarchyGet, hierarchySet, hierarchySetIfNotExists };
