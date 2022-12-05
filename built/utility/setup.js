function normalizeDescriptor(info) {
    if (typeof info === 'object' && info !== null) {
        return info;
    }
    else if (typeof info === 'function') {
        return {
            getName: info,
            value: {}
        };
    }
    else {
        return {
            name: info,
            value: {}
        };
    }
}
export { normalizeDescriptor };
