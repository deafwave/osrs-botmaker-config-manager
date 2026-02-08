import { parseFloatNumber, parseIntNumber, parseNumber } from './parse-number.js'
import type { ConfigWriteOptions } from './types.js'

type GetStringAccessor = (groupName: string, key: string, fallback?: string) => string
type SetStringAccessor = (groupName: string, key: string, value: string, options?: ConfigWriteOptions) => void

export type NumberAccessors = {
	getNumber: (groupName: string, key: string, fallback?: number) => number
	getInt: (groupName: string, key: string, fallback?: number) => number
	getFloat: (groupName: string, key: string, fallback?: number) => number
	setNumber: (groupName: string, key: string, value: number, options?: ConfigWriteOptions) => void
}

export type JsonAccessors = {
	getJson: <T>(groupName: string, key: string, fallback: T) => T
	setJson: <T>(groupName: string, key: string, value: T, options?: ConfigWriteOptions) => void
}

const parseOrFallback = (value: string, fallback: number, parser: (input: string) => number | null): number => {
	const parsed = parser(value)
	return parsed === null ? fallback : parsed
}

export const createNumberAccessors = (getString: GetStringAccessor, setString: SetStringAccessor): NumberAccessors => ({
	getNumber: (groupName: string, key: string, fallback = 0): number =>
		parseOrFallback(getString(groupName, key, ''), fallback, parseNumber),
	getInt: (groupName: string, key: string, fallback = 0): number =>
		parseOrFallback(getString(groupName, key, ''), fallback, parseIntNumber),
	getFloat: (groupName: string, key: string, fallback = 0): number =>
		parseOrFallback(getString(groupName, key, ''), fallback, parseFloatNumber),
	setNumber: (groupName: string, key: string, value: number, options?: ConfigWriteOptions): void => {
		setString(groupName, key, String(value), options)
	},
})

export const createJsonAccessors = (getString: GetStringAccessor, setString: SetStringAccessor): JsonAccessors => ({
	getJson: <T>(groupName: string, key: string, fallback: T): T => {
		const rawValue = getString(groupName, key, '')
		if (!rawValue.trim()) {
			return fallback
		}

		try {
			return JSON.parse(rawValue) as T
		} catch {
			return fallback
		}
	},
	setJson: <T>(groupName: string, key: string, value: T, options?: ConfigWriteOptions): void => {
		setString(groupName, key, JSON.stringify(value), options)
	},
})
