import { splitCsv } from './split-csv.js';
const isStringArray = (value) => Array.isArray(value) && value.every((entry) => typeof entry === 'string');
export const parseStringArrayValue = (rawValue) => {
    const trimmed = rawValue.trim();
    if (!trimmed) {
        return [];
    }
    try {
        const parsed = JSON.parse(trimmed);
        if (isStringArray(parsed)) {
            return parsed;
        }
    }
    catch {
        // Fall back to legacy CSV storage.
    }
    return splitCsv(rawValue);
};
export const serializeStringArrayValue = (values) => JSON.stringify(values);
