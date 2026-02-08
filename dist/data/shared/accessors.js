import { parseFloatNumber, parseIntNumber, parseNumber } from './parse-number.js';
const parseOrFallback = (value, fallback, parser) => {
    const parsed = parser(value);
    return parsed === null ? fallback : parsed;
};
export const createNumberAccessors = (getString, setString) => ({
    getNumber: (groupName, key, fallback = 0) => parseOrFallback(getString(groupName, key, ''), fallback, parseNumber),
    getInt: (groupName, key, fallback = 0) => parseOrFallback(getString(groupName, key, ''), fallback, parseIntNumber),
    getFloat: (groupName, key, fallback = 0) => parseOrFallback(getString(groupName, key, ''), fallback, parseFloatNumber),
    setNumber: (groupName, key, value, options) => {
        setString(groupName, key, String(value), options);
    },
});
export const createJsonAccessors = (getString, setString) => ({
    getJson: (groupName, key, fallback) => {
        const rawValue = getString(groupName, key, '');
        if (!rawValue.trim()) {
            return fallback;
        }
        try {
            return JSON.parse(rawValue);
        }
        catch {
            return fallback;
        }
    },
    setJson: (groupName, key, value, options) => {
        setString(groupName, key, JSON.stringify(value), options);
    },
});
