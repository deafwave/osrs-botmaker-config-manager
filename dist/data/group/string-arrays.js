import { parseStringArrayValue, serializeStringArrayValue } from '../shared/index.js';
import { getConfigString, setConfigString } from './strings.js';
export const getConfigStringArray = (groupName, key, fallback = []) => {
    const rawValue = getConfigString(groupName, key, '');
    if (!rawValue.trim()) {
        return fallback;
    }
    const entries = parseStringArrayValue(rawValue);
    return entries.length > 0 ? entries : fallback;
};
export const setConfigStringArray = (groupName, key, values, options) => {
    setConfigString(groupName, key, serializeStringArrayValue(values), options);
};
