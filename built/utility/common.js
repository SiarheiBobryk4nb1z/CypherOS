function getPropName(current, descriptor) {
    var name = descriptor.name, getName = descriptor.getName;
    if (typeof name !== 'undefined') {
        return name;
    }
    return getName && getName.call(current, current) || 'undefined';
}
export { getPropName };
