import type { ConfigWriteOptions } from '../shared/types.js'
import { parseNumber } from '../shared/parse-number.js'
import { splitCsv } from '../shared/split-csv.js'
import { getConfigString, setConfigString } from './strings.js'

export const getConfigNumberArray = (groupName: string, key: string, fallback: number[] = []): number[] => {
	const rawValue = getConfigString(groupName, key, '')
	if (!rawValue.trim()) {
		return fallback
	}
	const numbers = splitCsv(rawValue)
		.map(parseNumber)
		.filter((number_): number_ is number => number_ !== null)
	return numbers.length > 0 ? numbers : fallback
}

export const setConfigNumberArray = (groupName: string, key: string, values: number[], options?: ConfigWriteOptions): void => {
	setConfigString(groupName, key, values.join(','), options)
}
