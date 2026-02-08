const NUMERIC_PATTERN = /^[+-]?(?:\d+\.?\d*|\.\d+)(?:[Ee][+-]?\d+)?$/;
const INTEGER_PATTERN = /^[+-]?\d+$/;
const parseFiniteNumber = (value) => {
    const trimmed = value.trim();
    if (!trimmed || !NUMERIC_PATTERN.test(trimmed)) {
        return null;
    }
    const parsed = Number(trimmed);
    return Number.isFinite(parsed) ? parsed : null;
};
export const parseNumber = (value) => parseFiniteNumber(value);
export const parseFloatNumber = (value) => parseFiniteNumber(value);
export const parseIntNumber = (value) => {
    const trimmed = value.trim();
    if (!trimmed || !INTEGER_PATTERN.test(trimmed)) {
        return null;
    }
    const parsed = Number.parseInt(trimmed, 10);
    return Number.isFinite(parsed) ? parsed : null;
};
