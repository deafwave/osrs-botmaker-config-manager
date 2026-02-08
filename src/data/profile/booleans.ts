import type { ConfigWriteOptions } from '../shared/index.js'
import { parseBoolean } from '../shared/index.js'
import { getProfileString, getProfileStringForProfileKey, setProfileString, setProfileStringForProfileKey } from './strings.js'

export const getProfileBoolean = (groupName: string, key: string, fallback = false): boolean => {
	const rawValue = getProfileString(groupName, key, '')
	return parseBoolean(rawValue, fallback)
}

export const setProfileBoolean = (groupName: string, key: string, value: boolean, options?: ConfigWriteOptions): void => {
	setProfileString(groupName, key, value ? 'true' : 'false', options)
}

export const getProfileBooleanForProfileKey = (
	groupName: string,
	profileKey: string,
	key: string,
	fallback = false,
): boolean => {
	const rawValue = getProfileStringForProfileKey(groupName, profileKey, key, '')
	return parseBoolean(rawValue, fallback)
}

export const setProfileBooleanForProfileKey = (
	groupName: string,
	profileKey: string,
	key: string,
	value: boolean,
	options?: ConfigWriteOptions,
): void => {
	setProfileStringForProfileKey(groupName, profileKey, key, value ? 'true' : 'false', options)
}
