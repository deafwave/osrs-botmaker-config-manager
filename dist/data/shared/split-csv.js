export const splitCsv = (value) => value
    .split(',')
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0);
