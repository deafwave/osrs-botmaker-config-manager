import { splitCsv } from './split-csv.js'

const isStringArray = (value: unknown): value is string[] =>
	Array.isArray(value) && value.every((entry): entry is string => typeof entry === 'string')

export const parseStringArrayValue = (rawValue: string): string[] => {
	const trimmed = rawValue.trim()
	if (!trimmed) {
		return []
	}

	try {
		const parsed = JSON.parse(trimmed) as unknown
		if (isStringArray(parsed)) {
			return parsed
		}
	} catch {
		// Fall back to legacy CSV storage.
	}

	return splitCsv(rawValue)
}

export const serializeStringArrayValue = (values: string[]): string => JSON.stringify(values)
