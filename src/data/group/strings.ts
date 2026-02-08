import type { ConfigWriteOptions } from '../shared/index.js'
import { normalizeConfigValue, writeConfig } from '../shared/index.js'

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
