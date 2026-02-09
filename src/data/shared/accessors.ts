import { parseBoolean } from './parse-boolean.js'
import { parseFloatNumber, parseIntNumber, parseNumber } from './parse-number.js'
import { splitCsv } from './split-csv.js'
import { isNumberArray, parseStoredData, toStoredJson } from './storage.js'
import { parseStringArrayValue, serializeStringArrayValue } from './string-array.js'
import type { ConfigWriteOptions } from './types.js'

export type GetStringAccessor = (groupName: string, key: string, fallback?: string) => string
export type SetStringAccessor = (groupName: string, key: string, value: string, options?: ConfigWriteOptions) => void
export type GetRawAccessor = (groupName: string, key: string) => string | null

export type NumberAccessors = {
	getNumber: (groupName: string, key: string, fallback?: number) => number
	getInt: (groupName: string, key: string, fallback?: number) => number
	getFloat: (groupName: string, key: string, fallback?: number) => number
	setNumber: (groupName: string, key: string, value: number, options?: ConfigWriteOptions) => void
}

export type BooleanAccessors = {
	getBoolean: (groupName: string, key: string, fallback?: boolean) => boolean
	setBoolean: (groupName: string, key: string, value: boolean, options?: ConfigWriteOptions) => void
}

export type NumberArrayAccessors = {
	getNumberArray: (groupName: string, key: string, fallback?: number[]) => number[]
	setNumberArray: (groupName: string, key: string, values: number[], options?: ConfigWriteOptions) => void
}

export type StringArrayAccessors = {
	getStringArray: (groupName: string, key: string, fallback?: string[]) => string[]
	setStringArray: (groupName: string, key: string, values: string[], options?: ConfigWriteOptions) => void
}

export type JsonAccessors = {
	getJson: <T>(groupName: string, key: string, fallback: T) => T
	setJson: <T>(groupName: string, key: string, value: T, options?: ConfigWriteOptions) => void
}

export const parseStoredNumberWith = (rawValue: string, fallback: number, parser: (value: string) => number | null): number => {
	const parsed = parseStoredData(rawValue)
	if (parsed.ok && typeof parsed.value === 'number' && Number.isFinite(parsed.value)) {
		const parsedNumber = parser(String(parsed.value))
		return parsedNumber === null ? fallback : parsedNumber
	}

	if (parsed.ok && typeof parsed.value === 'string') {
		const parsedStringValue = parser(parsed.value)
		if (parsedStringValue !== null) {
			return parsedStringValue
		}
	}

	const parsedRawValue = parser(rawValue)
	return parsedRawValue === null ? fallback : parsedRawValue
}

export const parseStoredBoolean = (rawValue: string, fallback: boolean): boolean => {
	const parsed = parseStoredData(rawValue)
	if (parsed.ok && typeof parsed.value === 'boolean') {
		return parsed.value
	}
	if (parsed.ok && typeof parsed.value === 'string') {
		return parseBoolean(parsed.value, fallback)
	}
	return parseBoolean(rawValue, fallback)
}

export const parseStoredNumberArray = (rawValue: string, fallback: number[]): number[] => {
	if (!rawValue.trim()) {
		return fallback
	}

	const parsed = parseStoredData(rawValue)
	if (parsed.ok && isNumberArray(parsed.value)) {
		return parsed.value
	}

	const numbers = splitCsv(rawValue)
		.map(parseNumber)
		.filter((number_): number_ is number => number_ !== null)

	return numbers.length > 0 ? numbers : fallback
}

export const parseStoredJson = <T>(rawValue: string, fallback: T): T => {
	if (!rawValue.trim()) {
		return fallback
	}

	const parsed = parseStoredData(rawValue)
	return parsed.ok ? (parsed.value as T) : fallback
}

export const createNumberAccessors = (getString: GetStringAccessor, setString: SetStringAccessor): NumberAccessors => ({
	getNumber: (groupName: string, key: string, fallback = 0): number => parseStoredNumberWith(getString(groupName, key, ''), fallback, parseNumber),
	getInt: (groupName: string, key: string, fallback = 0): number => parseStoredNumberWith(getString(groupName, key, ''), fallback, parseIntNumber),
	getFloat: (groupName: string, key: string, fallback = 0): number => parseStoredNumberWith(getString(groupName, key, ''), fallback, parseFloatNumber),
	setNumber: (groupName: string, key: string, value: number, options?: ConfigWriteOptions): void => {
		setString(groupName, key, toStoredJson(value), options)
	},
})

export const createBooleanAccessors = (getString: GetStringAccessor, setString: SetStringAccessor): BooleanAccessors => ({
	getBoolean: (groupName: string, key: string, fallback = false): boolean => parseStoredBoolean(getString(groupName, key, ''), fallback),
	setBoolean: (groupName: string, key: string, value: boolean, options?: ConfigWriteOptions): void => {
		setString(groupName, key, value ? 'true' : 'false', options)
	},
})

export const createNumberArrayAccessors = (getString: GetStringAccessor, setString: SetStringAccessor): NumberArrayAccessors => ({
	getNumberArray: (groupName: string, key: string, fallback: number[] = []): number[] => parseStoredNumberArray(getString(groupName, key, ''), fallback),
	setNumberArray: (groupName: string, key: string, values: number[], options?: ConfigWriteOptions): void => {
		setString(groupName, key, toStoredJson(values), options)
	},
})

export const createStringArrayAccessors = (getString: GetStringAccessor, setString: SetStringAccessor): StringArrayAccessors => ({
	getStringArray: (groupName: string, key: string, fallback: string[] = []): string[] => {
		const rawValue = getString(groupName, key, '')
		if (!rawValue.trim()) {
			return fallback
		}

		const entries = parseStringArrayValue(rawValue)
		return entries.length > 0 ? entries : fallback
	},
	setStringArray: (groupName: string, key: string, values: string[], options?: ConfigWriteOptions): void => {
		setString(groupName, key, serializeStringArrayValue(values), options)
	},
})

export const createJsonAccessors = (getRawValue: GetRawAccessor, setString: SetStringAccessor): JsonAccessors => ({
	getJson: <T>(groupName: string, key: string, fallback: T): T => {
		const rawValue = getRawValue(groupName, key)
		if (rawValue === null) {
			return fallback
		}

		return parseStoredJson(rawValue, fallback)
	},
	setJson: <T>(groupName: string, key: string, value: T, options?: ConfigWriteOptions): void => {
		setString(groupName, key, toStoredJson(value), options)
	},
})
