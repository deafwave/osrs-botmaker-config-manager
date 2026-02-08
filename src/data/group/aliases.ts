import type { ConfigWriteOptions } from '../shared/types.js'
import { parseNumber } from '../shared/parse-number.js'
import { splitCsv } from '../shared/split-csv.js'
import { setConfigNumberArray } from './number-arrays.js'
import { getConfigString, setConfigString } from './strings.js'

export type ConfigAliasValue = number[] | string

const parseAliasValue = (rawValue: string): ConfigAliasValue => {
	// TODO: If this number-like string behavior causes problems, store/read arrays as JSON instead.
	if (!rawValue.trim()) {
		return []
	}

	const entries = splitCsv(rawValue)
	const parsedNumbers = entries.map(parseNumber)

	if (parsedNumbers.length > 0 && parsedNumbers.every((value): value is number => value !== null)) {
		return parsedNumbers
	}

	return rawValue
}

export const getConfig = (groupName: string, key: string): ConfigAliasValue => parseAliasValue(getConfigString(groupName, key, ''))

export const setConfig = (groupName: string, key: string, value: number[] | string, options?: ConfigWriteOptions): void => {
	if (Array.isArray(value)) {
		setConfigNumberArray(groupName, key, value, options)
	} else {
		setConfigString(groupName, key, value.toString(), options)
	}
}
