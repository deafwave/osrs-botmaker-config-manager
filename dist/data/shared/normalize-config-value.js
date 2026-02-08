export const normalizeConfigValue = (value) => {
    if (value === null || value === undefined) {
        return null;
    }
    return typeof value === 'string' ? value : String(value);
};
