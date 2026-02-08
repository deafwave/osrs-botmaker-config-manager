import { parseNumber, splitCsv } from '../shared/index.js';
import { getConfigString, setConfigString } from './strings.js';
export const getConfigNumberArray = (groupName, key, fallback = []) => {
    const rawValue = getConfigString(groupName, key, '');
    if (!rawValue.trim()) {
        return fallback;
    }
    const numbers = splitCsv(rawValue)
        .map(parseNumber)
        .filter((number_) => number_ !== null);
    return numbers.length > 0 ? numbers : fallback;
};
export const setConfigNumberArray = (groupName, key, values, options) => {
    setConfigString(groupName, key, values.join(','), options);
};
