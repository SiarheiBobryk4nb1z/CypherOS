function normalizeDescriptor(info) {
    if (typeof info === 'object') {
        return info;
    }
    else if (typeof info === 'function') {
        return {
            getName: info
        };
    }
    else {
        return {
            name: info
        };
    }
}
export { normalizeDescriptor };
