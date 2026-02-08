import { parseStringArrayValue, serializeStringArrayValue } from '../shared/index.js';
import { getProfileString, setProfileString } from './strings.js';
export const getProfileStringArray = (groupName, key, fallback = []) => {
    const rawValue = getProfileString(groupName, key, '');
    if (!rawValue.trim()) {
        return fallback;
    }
    const entries = parseStringArrayValue(rawValue);
    return entries.length > 0 ? entries : fallback;
};
export const setProfileStringArray = (groupName, key, values, options) => {
    setProfileString(groupName, key, serializeStringArrayValue(values), options);
};
