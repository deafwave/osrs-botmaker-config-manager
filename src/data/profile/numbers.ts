import type { ConfigWriteOptions } from '../shared/types.js'
import { createNumberAccessors, parseStoredNumberWith } from '../shared/accessors.js'
import { parseIntNumber } from '../shared/parse-number.js'
import { toStoredJson } from '../shared/storage.js'
import { getProfileString, getProfileStringForProfileKey, setProfileString, setProfileStringForProfileKey } from './strings.js'

const numberAccessors = createNumberAccessors(getProfileString, setProfileString)

export const getProfileNumber = numberAccessors.getNumber
export const getProfileInt = numberAccessors.getInt
export const getProfileFloat = numberAccessors.getFloat
export const setProfileNumber = numberAccessors.setNumber

export const getProfileIntForProfileKey = (
	groupName: string,
	profileKey: string,
	key: string,
	fallback = 0,
): number => {
	return parseStoredNumberWith(getProfileStringForProfileKey(groupName, profileKey, key, ''), fallback, parseIntNumber)
}

export const setProfileNumberForProfileKey = (
	groupName: string,
	profileKey: string,
	key: string,
	value: number,
	options?: ConfigWriteOptions,
): void => {
	setProfileStringForProfileKey(groupName, profileKey, key, toStoredJson(value), options)
}
