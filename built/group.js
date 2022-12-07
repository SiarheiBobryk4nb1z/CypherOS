import { isArray, cloneContainer, getOwnEnumerablePropKeys } from './utility/common';
import { normalizeDescriptor } from './utility/group';
function _createContainer(descriptor, target) {
    const { type, create } = descriptor;
    if (type) {
        return new type();
    }
    else if (create) {
        return create.call(target, target);
    }
    else {
        return {};
    }
}
function group(target, ...params) {
    if (!params.length) {
        return target;
    }
    const descriptors = params.map(normalizeDescriptor).filter(d => d.by);
    if (!descriptors) {
        return target;
    }
    const lastIndex = descriptors.length - 1;
    const keys = getOwnEnumerablePropKeys(target);
    let rootContainer;
    keys.forEach(key => {
        const child = target[key];
        let prevContainer;
        let prevName;
        descriptors.forEach((descriptor, index) => {
            const { by } = descriptor;
            if (index === 0) {
                if (!rootContainer) {
                    rootContainer = _createContainer(descriptor, target);
                }
                prevContainer = rootContainer;
            }
            else {
                if (!prevContainer[prevName]) {
                    prevContainer[prevName] = _createContainer(descriptor, target);
                }
                prevContainer = prevContainer[prevName];
            }
            const groupName = by.call(target, target, key, child);
            if (index !== lastIndex) {
                prevName = groupName;
            }
            else {
                if (!prevContainer[groupName]) {
                    prevContainer[groupName] = cloneContainer(target);
                }
                const currentContainer = prevContainer[groupName];
                if (isArray(currentContainer)) {
                    currentContainer.push(child);
                }
                else {
                    currentContainer[key] = child;
                }
            }
        });
    });
    return rootContainer;
}
export { group };
