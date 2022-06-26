declare function hierarchyGet(target: any, ...hierarchyProps: Array<string | number | symbol>): any;
declare function hierarchySet(target: any, ...others: any[]): any;
declare function hierarchySetIfNotExists(target: any, ...others: any[]): any;
export { hierarchyGet, hierarchySet, hierarchySetIfNotExists };
