import { parseNumber, splitCsv } from '../shared/index.js';
import { getProfileString, setProfileString } from './strings.js';
export const getProfileNumberArray = (groupName, key, fallback = []) => {
    const rawValue = getProfileString(groupName, key, '');
    if (!rawValue.trim()) {
        return fallback;
    }
    const numbers = splitCsv(rawValue)
        .map(parseNumber)
        .filter((number_) => number_ !== null);
    return numbers.length > 0 ? numbers : fallback;
};
export const setProfileNumberArray = (groupName, key, values, options) => {
    setProfileString(groupName, key, values.join(','), options);
};
