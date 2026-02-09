import { splitCsv } from './split-csv.js'
import { isStringArray, parseStoredData, toStoredJson } from './storage.js'

export const parseStringArrayValue = (rawValue: string): string[] => {
	const trimmed = rawValue.trim()
	if (!trimmed) {
		return []
	}

	const parsed = parseStoredData(trimmed)
	if (parsed.ok && isStringArray(parsed.value)) {
		return parsed.value
	}

	return splitCsv(rawValue)
}

export const serializeStringArrayValue = (values: string[]): string => toStoredJson(values)
