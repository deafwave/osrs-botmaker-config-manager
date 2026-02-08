import type { ConfigWriteOptions } from '../shared/types.js'
import { normalizeConfigValue } from '../shared/normalize-config-value.js'
import { writeConfig } from '../shared/write-config.js'

export const getConfigString = (groupName: string, key: string, fallback = ''): string => {
	const rawValue = normalizeConfigValue(configManager.getConfiguration(groupName, key))
	if (rawValue === null || rawValue === undefined) {
		return fallback
	}
	return rawValue
}

export const setConfigString = (groupName: string, key: string, value: string, options?: ConfigWriteOptions): void => {
	writeConfig(() => {
		configManager.setConfiguration(groupName, key, value)
	}, options)
}
