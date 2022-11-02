import { SetupPropParam } from './type';
declare function setupIfUndef(target: any, hierarchies: SetupPropParam[]): any;
declare function setup(target: any, hierarchies: SetupPropParam[]): {
    current: any;
    last: any;
};
export { setupIfUndef, setup };
