import { getConfigString, setConfigString } from '../group/index.js';
import { buildProfileGroupName, normalizeConfigValue, setRSProfileConfigurationValue, writeConfig } from '../shared/index.js';
import { getProfileKey } from './keys.js';
export const getProfileString = (groupName, key, fallback = '') => {
    const rawValue = normalizeConfigValue(configManager.getRSProfileConfiguration(groupName, key));
    if (rawValue === null || rawValue === undefined) {
        return fallback;
    }
    return rawValue;
};
export const setProfileString = (groupName, key, value, options) => {
    writeConfig(() => {
        setRSProfileConfigurationValue(groupName, key, value);
    }, options);
};
export const getProfileStringForProfileKey = (groupName, profileKey, key, fallback = '') => {
    if (profileKey === getProfileKey()) {
        return getProfileString(groupName, key, fallback);
    }
    return getConfigString(buildProfileGroupName(groupName, profileKey), key, fallback);
};
export const setProfileStringForProfileKey = (groupName, profileKey, key, value, options) => {
    if (profileKey === getProfileKey()) {
        setProfileString(groupName, key, value, options);
        return;
    }
    setConfigString(buildProfileGroupName(groupName, profileKey), key, value, options);
};
