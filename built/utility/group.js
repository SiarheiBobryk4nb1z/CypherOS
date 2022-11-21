function normalizeDescriptor(info) {
    if (typeof info === 'object') {
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
