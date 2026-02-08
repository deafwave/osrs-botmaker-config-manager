import type { ConfigWriteOptions } from '../shared/index.js'
import { parseNumber, splitCsv } from '../shared/index.js'
import { getProfileString, setProfileString } from './strings.js'

export const getProfileNumberArray = (groupName: string, key: string, fallback: number[] = []): number[] => {
	const rawValue = getProfileString(groupName, key, '')
	if (!rawValue.trim()) {
		return fallback
	}
	const numbers = splitCsv(rawValue)
		.map(parseNumber)
		.filter((number_): number_ is number => number_ !== null)
	return numbers.length > 0 ? numbers : fallback
}

export const setProfileNumberArray = (groupName: string, key: string, values: number[], options?: ConfigWriteOptions): void => {
	setProfileString(groupName, key, values.join(','), options)
}
