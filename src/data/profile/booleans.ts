import type { ConfigWriteOptions } from '../shared/types.js'
import { createBooleanAccessors, parseStoredBoolean } from '../shared/accessors.js'
import { getProfileString, getProfileStringForProfileKey, setProfileString, setProfileStringForProfileKey } from './strings.js'

const booleanAccessors = createBooleanAccessors(getProfileString, setProfileString)

export const getProfileBoolean = booleanAccessors.getBoolean
export const setProfileBoolean = booleanAccessors.setBoolean

export const getProfileBooleanForProfileKey = (
	groupName: string,
	profileKey: string,
	key: string,
	fallback = false,
): boolean => {
	return parseStoredBoolean(getProfileStringForProfileKey(groupName, profileKey, key, ''), fallback)
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
