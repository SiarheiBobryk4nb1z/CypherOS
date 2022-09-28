import { PropName, GetNameCallback, ISetupPropDescriptor } from './type';
declare function setupIfUndef(target: any, hierarchies: Array<PropName | GetNameCallback | ISetupPropDescriptor>): any;
declare function setup(target: any, hierarchies: Array<PropName | ISetupPropDescriptor>): {
    current: any;
    last: any;
};
export { setupIfUndef, setup };
