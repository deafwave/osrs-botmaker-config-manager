import type { ConfigWriteOptions } from '../shared/index.js'
import { createNumberAccessors, parseIntNumber } from '../shared/index.js'
import { getProfileString, getProfileStringForProfileKey, setProfileString, setProfileStringForProfileKey } from './strings.js'

export const {
	getNumber: getProfileNumber,
	getInt: getProfileInt,
	getFloat: getProfileFloat,
	setNumber: setProfileNumber,
} = createNumberAccessors(getProfileString, setProfileString)

export const getProfileIntForProfileKey = (
	groupName: string,
	profileKey: string,
	key: string,
	fallback = 0,
): number => {
	const parsed = parseIntNumber(getProfileStringForProfileKey(groupName, profileKey, key, ''))
	return parsed === null ? fallback : parsed
}

export const setProfileNumberForProfileKey = (
	groupName: string,
	profileKey: string,
	key: string,
	value: number,
	options?: ConfigWriteOptions,
): void => {
	setProfileStringForProfileKey(groupName, profileKey, key, String(value), options)
}
