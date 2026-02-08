import { parseBoolean } from '../shared/index.js';
import { getProfileString, getProfileStringForProfileKey, setProfileString, setProfileStringForProfileKey } from './strings.js';
export const getProfileBoolean = (groupName, key, fallback = false) => {
    const rawValue = getProfileString(groupName, key, '');
    return parseBoolean(rawValue, fallback);
};
export const setProfileBoolean = (groupName, key, value, options) => {
    setProfileString(groupName, key, value ? 'true' : 'false', options);
};
export const getProfileBooleanForProfileKey = (groupName, profileKey, key, fallback = false) => {
    const rawValue = getProfileStringForProfileKey(groupName, profileKey, key, '');
    return parseBoolean(rawValue, fallback);
};
export const setProfileBooleanForProfileKey = (groupName, profileKey, key, value, options) => {
    setProfileStringForProfileKey(groupName, profileKey, key, value ? 'true' : 'false', options);
};
