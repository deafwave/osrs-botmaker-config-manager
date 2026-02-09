import type { ConfigWriteOptions } from '../shared/types.js'
import { isNumberArray, parseStoredData, toStoredJson } from '../shared/storage.js'
import { writeConfig } from '../shared/write-config.js'
import { getProfileString, setProfileString } from './strings.js'

export const unsetProfileValue = (groupName: string, key: string, options?: ConfigWriteOptions): void => {
	writeConfig(() => {
		configManager.unsetRSProfileConfiguration(groupName, key)
	}, options)
}

export type ProfileConfigAliasValue = number[] | string

const parseAliasValue = (rawValue: string): ProfileConfigAliasValue => {
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

export const getProfileValue = (groupName: string, key: string): ProfileConfigAliasValue =>
	parseAliasValue(getProfileString(groupName, key, ''))

export const setProfileValue = (groupName: string, key: string, value: unknown, options?: ConfigWriteOptions): void =>
	setProfileString(groupName, key, toStoredJson(value), options)
