import { parseBoolean } from '../shared/index.js';
import { getConfigString, setConfigString } from './strings.js';
export const getConfigBoolean = (groupName, key, fallback = false) => {
    const rawValue = getConfigString(groupName, key, '');
    return parseBoolean(rawValue, fallback);
};
export const setConfigBoolean = (groupName, key, value, options) => {
    setConfigString(groupName, key, value ? 'true' : 'false', options);
};
