function getPropName(current, descriptor) {
    var name = descriptor.name, getName = descriptor.getName;
    return name || (getName && getName.call(current, current)) || 'undefined';
}
export { getPropName };
