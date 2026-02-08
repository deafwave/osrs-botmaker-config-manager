export const parseBoolean = (value, fallback) => {
    const normalized = value.trim().toLowerCase();
    if (!normalized) {
        return fallback;
    }
    if (['true', '1', 'yes', 'y', 'on'].includes(normalized)) {
        return true;
    }
    if (['false', '0', 'no', 'n', 'off'].includes(normalized)) {
        return false;
    }
    return fallback;
};
