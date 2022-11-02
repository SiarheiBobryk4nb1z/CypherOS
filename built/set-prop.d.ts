import { GetPropParam } from './type';
declare function setProp(optionalTarget: any, ...hierarchies: Array<GetPropParam | GetPropParam[]>): any;
declare function assignProp(target: any, ...hierarchies: Array<GetPropParam | GetPropParam[]>): any;
declare function putProp(target: any, ...hierarchies: Array<GetPropParam | GetPropParam[]>): any;
declare function setPropIfUndef(optionalTarget: any, ...hierarchies: Array<GetPropParam | GetPropParam[]>): any;
declare function assignPropIfUndef(target: any, ...hierarchies: Array<GetPropParam | GetPropParam[]>): any;
declare function putPropIfUndef(target: any, ...hierarchies: Array<GetPropParam | GetPropParam[]>): any;
export { setProp, assignProp, putProp, setPropIfUndef, assignPropIfUndef, putPropIfUndef };
