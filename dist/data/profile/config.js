import { parseNumber, splitCsv, writeConfig } from '../shared/index.js';
import { setProfileNumberArray } from './number-arrays.js';
import { getProfileString, setProfileString } from './strings.js';
export const unsetProfileConfig = (groupName, key, options) => {
    writeConfig(() => {
        configManager.unsetRSProfileConfiguration(groupName, key);
    }, options);
};
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
export const getProfileConfig = (groupName, key) => parseAliasValue(getProfileString(groupName, key, ''));
export const setProfileConfig = (groupName, key, value, options) => {
    if (Array.isArray(value)) {
        setProfileNumberArray(groupName, key, value, options);
    }
    else {
        setProfileString(groupName, key, value.toString(), options);
    }
};
