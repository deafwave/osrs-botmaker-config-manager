import { getGroupString, setGroupString } from '../group/strings.js'
import type { ConfigWriteOptions } from '../shared/types.js'
import { normalizeConfigValue } from '../shared/normalize-config-value.js'
import { parseStoredData } from '../shared/storage.js'
import { buildProfileGroupName } from '../shared/profile-group.js'
import { setRSProfileConfigurationValue } from '../shared/set-rs-profile-configuration.js'
import { writeConfig } from '../shared/write-config.js'
import { getProfileKey } from './keys.js'

export const getProfileRawValue = (groupName: string, key: string): string | null => {
	const rawValue = normalizeConfigValue(configManager.getRSProfileConfiguration(groupName, key))
	if (rawValue === null || rawValue === undefined) {
		return null
	}
	return rawValue
}

export const getProfileString = (groupName: string, key: string, fallback = ''): string => {
	const rawValue = getProfileRawValue(groupName, key)
	if (rawValue === null) {
		return fallback
	}

	const parsed = parseStoredData(rawValue)
	if (parsed.ok && typeof parsed.value === 'string') {
		return parsed.value
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
	return getGroupString(buildProfileGroupName(groupName, profileKey), key, fallback)
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
	setGroupString(buildProfileGroupName(groupName, profileKey), key, value, options)
}
