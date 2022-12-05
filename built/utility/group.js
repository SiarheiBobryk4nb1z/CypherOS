function normalizeDescriptor(info) {
    if (typeof info === 'object' && info !== null) {
        return info;
    }
    else if (typeof info === 'function') {
        return {
            by: info
        };
    }
    else {
        return {};
    }
}
export { normalizeDescriptor };
