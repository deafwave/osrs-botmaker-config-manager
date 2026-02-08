import { createNumberAccessors, parseIntNumber } from '../shared/index.js';
import { getProfileString, getProfileStringForProfileKey, setProfileString, setProfileStringForProfileKey } from './strings.js';
export const { getNumber: getProfileNumber, getInt: getProfileInt, getFloat: getProfileFloat, setNumber: setProfileNumber, } = createNumberAccessors(getProfileString, setProfileString);
export const getProfileIntForProfileKey = (groupName, profileKey, key, fallback = 0) => {
    const parsed = parseIntNumber(getProfileStringForProfileKey(groupName, profileKey, key, ''));
    return parsed === null ? fallback : parsed;
};
export const setProfileNumberForProfileKey = (groupName, profileKey, key, value, options) => {
    setProfileStringForProfileKey(groupName, profileKey, key, String(value), options);
};
