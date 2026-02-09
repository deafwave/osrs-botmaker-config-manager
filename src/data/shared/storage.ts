const INVALID_VALUE_ERROR = 'Config value must be JSON-serializable.'
const ESCAPED_COLON_REGEX = /\\:/g
const TRAILING_COMMA_REGEX = /,\s*([\]}])/g

export type ParseOutcome = { ok: true; value: unknown } | { ok: false }

const safeParseJson = (value: string): ParseOutcome => {
	try {
		return {
			ok: true,
			value: JSON.parse(value) as unknown,
		}
	} catch {
		return {
			ok: false,
		}
	}
}

// eslint-disable-next-line unicorn/prefer-string-replace-all -- NEEDED DO NOT CHANGE
const stripTrailingCommas = (value: string): string => value.replace(TRAILING_COMMA_REGEX, '$1')

// eslint-disable-next-line unicorn/prefer-string-replace-all -- NEEDED DO NOT CHANGE
const unescapeColons = (value: string): string => value.replace(ESCAPED_COLON_REGEX, ':')

const buildCandidates = (rawValue: string): string[] => {
	const candidates = [rawValue, unescapeColons(rawValue), stripTrailingCommas(rawValue), stripTrailingCommas(unescapeColons(rawValue))]

	return Array.from(new Set(candidates))
}

export const toStoredJson = (value: unknown): string => {
	if (value === undefined || typeof value === 'function' || typeof value === 'symbol' || typeof value === 'bigint') {
		throw new TypeError(INVALID_VALUE_ERROR)
	}

	try {
		const serialized = JSON.stringify(value)
		if (serialized === undefined) {
			throw new TypeError(INVALID_VALUE_ERROR)
		}
		return serialized
	} catch {
		throw new TypeError(INVALID_VALUE_ERROR)
	}
}

export const parseStoredData = (rawValue: string): ParseOutcome => {
	const trimmedValue = rawValue.trim()
	if (!trimmedValue) {
		return {
			ok: false,
		}
	}

	for (const candidate of buildCandidates(trimmedValue)) {
		const parsed = safeParseJson(candidate)
		if (parsed.ok) {
			return parsed
		}
	}

	return {
		ok: false,
	}
}

export const isStringArray = (value: unknown): value is string[] => Array.isArray(value) && value.every((entry): entry is string => typeof entry === 'string')

export const isNumberArray = (value: unknown): value is number[] =>
	Array.isArray(value) && value.every((entry): entry is number => typeof entry === 'number' && Number.isFinite(entry))
