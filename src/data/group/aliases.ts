import type { ConfigWriteOptions } from '../shared/types.js'
import { isNumberArray, parseStoredData, toStoredJson } from '../shared/storage.js'
import { getGroupString, setGroupString } from './strings.js'

export type ConfigAliasValue = number[] | string

const parseAliasValue = (rawValue: string): ConfigAliasValue => {
	if (!rawValue.trim()) {
		return []
	}

	const parsed = parseStoredData(rawValue)
	if (parsed.ok && typeof parsed.value === 'string') {
		return parsed.value
	}

	if (parsed.ok && isNumberArray(parsed.value)) {
		return parsed.value
	}

	return rawValue
}

export const getGroupValue = (groupName: string, key: string): ConfigAliasValue =>
	parseAliasValue(getGroupString(groupName, key, ''))

export const setGroupValue = (groupName: string, key: string, value: unknown, options?: ConfigWriteOptions): void =>
	setGroupString(groupName, key, toStoredJson(value), options)
