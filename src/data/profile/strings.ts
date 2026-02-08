import { getConfigString, setConfigString } from '../group/index.js'
import type { ConfigWriteOptions } from '../shared/index.js'
import { buildProfileGroupName, normalizeConfigValue, setRSProfileConfigurationValue, writeConfig } from '../shared/index.js'
import { getProfileKey } from './keys.js'

export const getProfileString = (groupName: string, key: string, fallback = ''): string => {
	const rawValue = normalizeConfigValue(configManager.getRSProfileConfiguration(groupName, key))
	if (rawValue === null || rawValue === undefined) {
		return fallback
	}
	return rawValue
}

export const setProfileString = (groupName: string, key: string, value: string, options?: ConfigWriteOptions): void => {
	writeConfig(() => {
		setRSProfileConfigurationValue(groupName, key, value)
	}, options)
}

export const getProfileStringForProfileKey = (
	groupName: string,
	profileKey: string,
	key: string,
	fallback = '',
): string => {
	if (profileKey === getProfileKey()) {
		return getProfileString(groupName, key, fallback)
	}
	return getConfigString(buildProfileGroupName(groupName, profileKey), key, fallback)
}

export const setProfileStringForProfileKey = (
	groupName: string,
	profileKey: string,
	key: string,
	value: string,
	options?: ConfigWriteOptions,
): void => {
	if (profileKey === getProfileKey()) {
		setProfileString(groupName, key, value, options)
		return
	}
	setConfigString(buildProfileGroupName(groupName, profileKey), key, value, options)
}
