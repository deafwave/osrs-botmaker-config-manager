import { getConfigBoolean, getConfigFloat, getConfigInt, getConfigJson, getConfigKeys, getConfigNumber, getConfigNumberArray, getConfigString, getConfigStringArray, setConfigBoolean, setConfigJson, setConfigNumber, setConfigNumberArray, setConfigString, setConfigStringArray, unsetConfig, } from './group/index.js';
import { getProfileBoolean, getProfileBooleanForProfileKey, getProfileConfigKeys, getProfileFloat, getProfileInt, getProfileIntForProfileKey, getProfileJson, getProfileKey, getProfileNumber, getProfileNumberArray, getProfileString, getProfileStringArray, getProfileStringForProfileKey, setProfileBoolean, setProfileBooleanForProfileKey, setProfileJson, setProfileNumber, setProfileNumberArray, setProfileNumberForProfileKey, setProfileString, setProfileStringArray, setProfileStringForProfileKey, unsetProfileConfig, } from './profile/index.js';
import { buildProfileGroupName, parseFloatNumber, parseNumber, parseStringArrayValue, splitCsv } from './shared/index.js';
const withSyncDefault = (syncDefault, options) => {
    if (options?.sync !== undefined) {
        return options;
    }
    if (syncDefault === undefined) {
        return options;
    }
    return { ...options, sync: syncDefault };
};
const parseNumberArrayFromString = (value, fallback) => {
    if (!value.trim()) {
        return fallback;
    }
    const numbers = splitCsv(value)
        .map(parseNumber)
        .filter((number_) => number_ !== null);
    return numbers.length > 0 ? numbers : fallback;
};
const parseJsonFromString = (value, fallback) => {
    if (!value.trim()) {
        return fallback;
    }
    try {
        return JSON.parse(value);
    }
    catch {
        return fallback;
    }
};
const toKeyArray = (keys) => {
    const list = keys;
    let size = 0;
    if (typeof list?.size === 'function') {
        size = Number(list.size());
    }
    else if (typeof list?.length === 'number') {
        size = list.length;
    }
    const values = [];
    let index = 0;
    while (index < size) {
        const valueAtIndex = typeof list.get === 'function' ? list.get(index) : list[index];
        values.push(String(valueAtIndex));
        index += 1;
    }
    return values;
};
const normalizeKey = (fullKey, prefix) => (fullKey.indexOf(prefix) === 0 ? fullKey.slice(prefix.length) : fullKey);
export const logConfigValues = ({ action, group, getAllValues, keyPrefix = '' }) => {
    try {
        const valuesByKey = getAllValues(keyPrefix);
        bot.printLogMessage(`${action} ${group} all values: ${JSON.stringify(valuesByKey)}`);
        return valuesByKey;
    }
    catch (error) {
        bot.printLogMessage(`${action} ${group} all values failed: ${String(error)}`);
        return {};
    }
};
export const createConfigScope = (options) => {
    const { group, profileKey, syncDefault } = options;
    const scope = options.scope ?? 'profile';
    const groupKeyPrefix = `${group}.`;
    const profileGroupName = profileKey ? buildProfileGroupName(group, profileKey) : null;
    const profileGroupKeyPrefix = profileGroupName ? `${profileGroupName}.` : null;
    const usesActiveProfile = () => Boolean(profileKey) && profileKey === getProfileKey();
    const getString = (key, fallback = '') => {
        if (scope === 'group') {
            return getConfigString(group, key, fallback);
        }
        if (profileKey) {
            return getProfileStringForProfileKey(group, profileKey, key, fallback);
        }
        return getProfileString(group, key, fallback);
    };
    const getKeys = (keyPrefix = '') => {
        let fullKeys;
        let prefixToTrim = groupKeyPrefix;
        if (scope === 'group') {
            fullKeys = toKeyArray(getConfigKeys(groupKeyPrefix));
        }
        else if (profileGroupName && profileGroupKeyPrefix) {
            if (usesActiveProfile()) {
                fullKeys = toKeyArray(getProfileConfigKeys(group, keyPrefix));
            }
            else {
                fullKeys = toKeyArray(getConfigKeys(profileGroupKeyPrefix));
                prefixToTrim = profileGroupKeyPrefix;
            }
        }
        else {
            fullKeys = toKeyArray(getProfileConfigKeys(group, keyPrefix));
        }
        const normalized = fullKeys.map((fullKey) => normalizeKey(fullKey, prefixToTrim)).filter((key) => key.length > 0);
        if (!keyPrefix) {
            return normalized;
        }
        return normalized.filter((key) => key.startsWith(keyPrefix));
    };
    const getAllValues = (keyPrefix = '') => {
        const valuesByKey = {};
        getKeys(keyPrefix).forEach((key) => {
            valuesByKey[key] = getString(key, '');
        });
        return valuesByKey;
    };
    const logAllValues = (action, keyPrefix = '') => logConfigValues({ action, group, getAllValues, keyPrefix });
    const setString = (key, value, writeOptions) => {
        const resolvedOptions = withSyncDefault(syncDefault, writeOptions);
        if (scope === 'group') {
            setConfigString(group, key, value, resolvedOptions);
            return;
        }
        if (profileKey) {
            setProfileStringForProfileKey(group, profileKey, key, value, resolvedOptions);
            return;
        }
        setProfileString(group, key, value, resolvedOptions);
    };
    const getNumber = (key, fallback = 0) => {
        if (scope === 'group') {
            return getConfigNumber(group, key, fallback);
        }
        if (profileKey) {
            const parsed = parseNumber(getString(key, ''));
            return parsed === null ? fallback : parsed;
        }
        return getProfileNumber(group, key, fallback);
    };
    const setNumber = (key, value, writeOptions) => {
        const resolvedOptions = withSyncDefault(syncDefault, writeOptions);
        if (scope === 'group') {
            setConfigNumber(group, key, value, resolvedOptions);
            return;
        }
        if (profileKey) {
            setProfileNumberForProfileKey(group, profileKey, key, value, resolvedOptions);
            return;
        }
        setProfileNumber(group, key, value, resolvedOptions);
    };
    const getInt = (key, fallback = 0) => {
        if (scope === 'group') {
            return getConfigInt(group, key, fallback);
        }
        if (profileKey) {
            return getProfileIntForProfileKey(group, profileKey, key, fallback);
        }
        return getProfileInt(group, key, fallback);
    };
    const setInt = (key, value, writeOptions) => {
        setNumber(key, value, writeOptions);
    };
    const getFloat = (key, fallback = 0) => {
        if (scope === 'group') {
            return getConfigFloat(group, key, fallback);
        }
        if (profileKey) {
            const parsed = parseFloatNumber(getString(key, ''));
            return parsed === null ? fallback : parsed;
        }
        return getProfileFloat(group, key, fallback);
    };
    const getBoolean = (key, fallback = false) => {
        if (scope === 'group') {
            return getConfigBoolean(group, key, fallback);
        }
        if (profileKey) {
            return getProfileBooleanForProfileKey(group, profileKey, key, fallback);
        }
        return getProfileBoolean(group, key, fallback);
    };
    const setBoolean = (key, value, writeOptions) => {
        const resolvedOptions = withSyncDefault(syncDefault, writeOptions);
        if (scope === 'group') {
            setConfigBoolean(group, key, value, resolvedOptions);
            return;
        }
        if (profileKey) {
            setProfileBooleanForProfileKey(group, profileKey, key, value, resolvedOptions);
            return;
        }
        setProfileBoolean(group, key, value, resolvedOptions);
    };
    const getStringArray = (key, fallback = []) => {
        if (scope === 'group') {
            return getConfigStringArray(group, key, fallback);
        }
        if (profileKey) {
            const rawValue = getString(key, '');
            if (!rawValue.trim()) {
                return fallback;
            }
            const entries = parseStringArrayValue(rawValue);
            return entries.length > 0 ? entries : fallback;
        }
        return getProfileStringArray(group, key, fallback);
    };
    const setStringArray = (key, values, writeOptions) => {
        const resolvedOptions = withSyncDefault(syncDefault, writeOptions);
        if (scope === 'group') {
            setConfigStringArray(group, key, values, resolvedOptions);
            return;
        }
        if (profileKey) {
            setString(key, JSON.stringify(values), resolvedOptions);
            return;
        }
        setProfileStringArray(group, key, values, resolvedOptions);
    };
    const getNumberArray = (key, fallback = []) => {
        if (scope === 'group') {
            return getConfigNumberArray(group, key, fallback);
        }
        if (profileKey) {
            return parseNumberArrayFromString(getString(key, ''), fallback);
        }
        return getProfileNumberArray(group, key, fallback);
    };
    const setNumberArray = (key, values, writeOptions) => {
        const resolvedOptions = withSyncDefault(syncDefault, writeOptions);
        if (scope === 'group') {
            setConfigNumberArray(group, key, values, resolvedOptions);
            return;
        }
        if (profileKey) {
            setString(key, values.join(','), resolvedOptions);
            return;
        }
        setProfileNumberArray(group, key, values, resolvedOptions);
    };
    const getJson = (key, fallback) => {
        if (scope === 'group') {
            return getConfigJson(group, key, fallback);
        }
        if (profileKey) {
            return parseJsonFromString(getString(key, ''), fallback);
        }
        return getProfileJson(group, key, fallback);
    };
    const setJson = (key, value, writeOptions) => {
        const resolvedOptions = withSyncDefault(syncDefault, writeOptions);
        if (scope === 'group') {
            setConfigJson(group, key, value, resolvedOptions);
            return;
        }
        if (profileKey) {
            setString(key, JSON.stringify(value), resolvedOptions);
            return;
        }
        setProfileJson(group, key, value, resolvedOptions);
    };
    const unset = (key, writeOptions) => {
        const resolvedOptions = withSyncDefault(syncDefault, writeOptions);
        if (scope === 'group') {
            unsetConfig(group, key, resolvedOptions);
            return;
        }
        if (profileKey) {
            if (usesActiveProfile()) {
                unsetProfileConfig(group, key, resolvedOptions);
                return;
            }
            unsetConfig(buildProfileGroupName(group, profileKey), key, resolvedOptions);
            return;
        }
        unsetProfileConfig(group, key, resolvedOptions);
    };
    return {
        getKeys,
        getAllValues,
        logAllValues,
        getString,
        setString,
        getNumber,
        setNumber,
        getInt,
        setInt,
        getFloat,
        getBoolean,
        setBoolean,
        getStringArray,
        setStringArray,
        getNumberArray,
        setNumberArray,
        getJson,
        setJson,
        unset,
    };
};
