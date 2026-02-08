import { normalizeConfigValue, writeConfig } from '../shared/index.js';
export const getConfigString = (groupName, key, fallback = '') => {
    const rawValue = normalizeConfigValue(configManager.getConfiguration(groupName, key));
    if (rawValue === null || rawValue === undefined) {
        return fallback;
    }
    return rawValue;
};
export const setConfigString = (groupName, key, value, options) => {
    writeConfig(() => {
        configManager.setConfiguration(groupName, key, value);
    }, options);
};
