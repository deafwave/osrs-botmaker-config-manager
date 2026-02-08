import { parseNumber, splitCsv } from '../shared/index.js';
import { setConfigNumberArray } from './number-arrays.js';
import { getConfigString, setConfigString } from './strings.js';
const parseAliasValue = (rawValue) => {
    // TODO: If this number-like string behavior causes problems, store/read arrays as JSON instead.
    if (!rawValue.trim()) {
        return [];
    }
    const entries = splitCsv(rawValue);
    const parsedNumbers = entries.map(parseNumber);
    if (parsedNumbers.length > 0 && parsedNumbers.every((value) => value !== null)) {
        return parsedNumbers;
    }
    return rawValue;
};
export const getConfig = (groupName, key) => parseAliasValue(getConfigString(groupName, key, ''));
export const setConfig = (groupName, key, value, options) => {
    if (Array.isArray(value)) {
        setConfigNumberArray(groupName, key, value, options);
    }
    else {
        setConfigString(groupName, key, value.toString(), options);
    }
};
