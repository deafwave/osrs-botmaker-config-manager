import type { ConfigWriteOptions } from '../shared/types.js'
import { normalizeConfigValue } from '../shared/normalize-config-value.js'
import { parseStoredData } from '../shared/storage.js'
import { writeConfig } from '../shared/write-config.js'

export const getGroupRawValue = (groupName: string, key: string): string | null => {
	const rawValue = normalizeConfigValue(configManager.getConfiguration(groupName, key))
	if (rawValue === null || rawValue === undefined) {
		return null
	}
	return rawValue
}

export const getGroupString = (groupName: string, key: string, fallback = ''): string => {
	const rawValue = getGroupRawValue(groupName, key)
	if (rawValue === null) {
		return fallback
	}

	const parsed = parseStoredData(rawValue)
	if (parsed.ok && typeof parsed.value === 'string') {
		return parsed.value
	}

	return rawValue
}

export const setGroupString = (groupName: string, key: string, value: string, options?: ConfigWriteOptions): void => {
	writeConfig(() => {
		configManager.setConfiguration(groupName, key, value)
	}, options)
}
