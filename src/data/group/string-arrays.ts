import type { ConfigWriteOptions } from '../shared/index.js'
import { parseStringArrayValue, serializeStringArrayValue } from '../shared/index.js'
import { getConfigString, setConfigString } from './strings.js'

export const getConfigStringArray = (groupName: string, key: string, fallback: string[] = []): string[] => {
	const rawValue = getConfigString(groupName, key, '')
	if (!rawValue.trim()) {
		return fallback
	}
	const entries = parseStringArrayValue(rawValue)
	return entries.length > 0 ? entries : fallback
}

export const setConfigStringArray = (groupName: string, key: string, values: string[], options?: ConfigWriteOptions): void => {
	setConfigString(groupName, key, serializeStringArrayValue(values), options)
}
