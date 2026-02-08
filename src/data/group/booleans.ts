import type { ConfigWriteOptions } from '../shared/types.js'
import { parseBoolean } from '../shared/parse-boolean.js'
import { getConfigString, setConfigString } from './strings.js'

export const getConfigBoolean = (groupName: string, key: string, fallback = false): boolean => {
	const rawValue = getConfigString(groupName, key, '')
	return parseBoolean(rawValue, fallback)
}

export const setConfigBoolean = (groupName: string, key: string, value: boolean, options?: ConfigWriteOptions): void => {
	setConfigString(groupName, key, value ? 'true' : 'false', options)
}
