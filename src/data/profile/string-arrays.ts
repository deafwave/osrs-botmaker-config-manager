import type { ConfigWriteOptions } from '../shared/types.js'
import { parseStringArrayValue, serializeStringArrayValue } from '../shared/string-array-codec.js'
import { getProfileString, setProfileString } from './strings.js'

export const getProfileStringArray = (groupName: string, key: string, fallback: string[] = []): string[] => {
	const rawValue = getProfileString(groupName, key, '')
	if (!rawValue.trim()) {
		return fallback
	}
	const entries = parseStringArrayValue(rawValue)
	return entries.length > 0 ? entries : fallback
}

export const setProfileStringArray = (groupName: string, key: string, values: string[], options?: ConfigWriteOptions): void => {
	setProfileString(groupName, key, serializeStringArrayValue(values), options)
}
