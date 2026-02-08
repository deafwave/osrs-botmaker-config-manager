import type { ConfigWriteOptions } from '../shared/types.js'
import { parseNumber } from '../shared/parse-number.js'
import { splitCsv } from '../shared/split-csv.js'
import { writeConfig } from '../shared/write-config.js'
import { setProfileNumberArray } from './number-arrays.js'
import { getProfileString, setProfileString } from './strings.js'

export const unsetProfileConfig = (groupName: string, key: string, options?: ConfigWriteOptions): void => {
	writeConfig(() => {
		configManager.unsetRSProfileConfiguration(groupName, key)
	}, options)
}

export type ProfileConfigAliasValue = number[] | string

const parseAliasValue = (rawValue: string): ProfileConfigAliasValue => {
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

export const getProfileConfig = (groupName: string, key: string): ProfileConfigAliasValue =>
	parseAliasValue(getProfileString(groupName, key, ''))

export const setProfileConfig = (groupName: string, key: string, value: number[] | string, options?: ConfigWriteOptions): void => {
	if (Array.isArray(value)) {
		setProfileNumberArray(groupName, key, value, options)
	} else {
		setProfileString(groupName, key, value.toString(), options)
	}
}
