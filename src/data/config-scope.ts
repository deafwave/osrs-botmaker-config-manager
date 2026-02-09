import { setGroupValue } from './group/aliases.js'
import { getGroupBoolean } from './group/booleans.js'
import { getGroupJson } from './group/json.js'
import { getGroupKeys, unsetGroupValue } from './group/keys.js'
import { getGroupNumberArray } from './group/number-arrays.js'
import { getGroupFloat, getGroupInt, getGroupNumber } from './group/numbers.js'
import { getGroupStringArray } from './group/string-arrays.js'
import { getGroupString } from './group/strings.js'
import { getProfileBoolean, getProfileBooleanForProfileKey } from './profile/booleans.js'
import { setProfileValue, unsetProfileValue } from './profile/config.js'
import { getProfileJson } from './profile/json.js'
import { getProfileConfigKeys, getProfileKey } from './profile/keys.js'
import { getProfileNumberArray } from './profile/number-arrays.js'
import { getProfileFloat, getProfileInt, getProfileIntForProfileKey, getProfileNumber } from './profile/numbers.js'
import { getProfileStringArray } from './profile/string-arrays.js'
import { getProfileString, getProfileStringForProfileKey } from './profile/strings.js'
import type { ConfigWriteOptions } from './shared/types.js'
import { parseFloatNumber, parseNumber } from './shared/parse-number.js'
import { buildProfileGroupName } from './shared/profile-group.js'
import { splitCsv } from './shared/split-csv.js'
import { isNumberArray, parseStoredData } from './shared/storage.js'
import { parseStringArrayValue } from './shared/string-array-codec.js'

export type ConfigScopeMode = 'group' | 'profile'

export type ConfigScopeOptions = {
	group: string
	scope?: ConfigScopeMode
	profileKey?: string
	syncDefault?: boolean
}

export type LogConfigValuesOptions = {
	action: string
	group: string
	getAllValues: (keyPrefix?: string) => Record<string, string>
	keyPrefix?: string
}

export type ConfigScope = {
	getKeys: (keyPrefix?: string) => string[]
	getAllValues: (keyPrefix?: string) => Record<string, string>
	logAllValues: (action: string, keyPrefix?: string) => Record<string, string>
	getString: (key: string, fallback?: string) => string
	set: (key: string, value: unknown, options?: ConfigWriteOptions) => void
	getNumber: (key: string, fallback?: number) => number
	getInt: (key: string, fallback?: number) => number
	getFloat: (key: string, fallback?: number) => number
	getBoolean: (key: string, fallback?: boolean) => boolean
	getStringArray: (key: string, fallback?: string[]) => string[]
	getNumberArray: (key: string, fallback?: number[]) => number[]
	getJson: <T>(key: string, fallback: T) => T
	unset: (key: string, options?: ConfigWriteOptions) => void
}

type ConfigKeysLike = { size?: () => number; get?: (index: number) => unknown; length?: number; [index: number]: unknown }

const withSyncDefault = (syncDefault: boolean | undefined, options?: ConfigWriteOptions): ConfigWriteOptions | undefined => {
	if (options?.sync !== undefined) {
		return options
	}

	if (syncDefault === undefined) {
		return options
	}

	return { ...options, sync: syncDefault }
}

const parseNumberArrayFromString = (value: string, fallback: number[]): number[] => {
	const parsed = parseStoredData(value)
	if (parsed.ok && isNumberArray(parsed.value)) {
		return parsed.value
	}

	if (!value.trim()) {
		return fallback
	}

	const numbers = splitCsv(value)
		.map(parseNumber)
		.filter((number_): number_ is number => number_ !== null)

	return numbers.length > 0 ? numbers : fallback
}

const parseJsonFromString = <T>(value: string, fallback: T): T => {
	if (!value.trim()) {
		return fallback
	}

	const parsed = parseStoredData(value)
	if (!parsed.ok) {
		return fallback
	}

	return parsed.value as T
}

const toKeyArray = (keys: unknown): string[] => {
	const list = keys as ConfigKeysLike
	let size = 0
	if (typeof list?.size === 'function') {
		size = Number(list.size())
	} else if (typeof list?.length === 'number') {
		size = list.length
	}
	const values: string[] = []

	let index = 0
	while (index < size) {
		const valueAtIndex = typeof list.get === 'function' ? list.get(index) : list[index]
		values.push(String(valueAtIndex))
		index += 1
	}

	return values
}

const normalizeKey = (fullKey: string, prefix: string): string => (fullKey.indexOf(prefix) === 0 ? fullKey.slice(prefix.length) : fullKey)

export const logConfigValues = ({ action, group, getAllValues, keyPrefix = '' }: LogConfigValuesOptions): Record<string, string> => {
	try {
		const valuesByKey = getAllValues(keyPrefix)
		bot.printLogMessage(`${action} ${group} all values: ${JSON.stringify(valuesByKey)}`)
		return valuesByKey
	} catch (error) {
		bot.printLogMessage(`${action} ${group} all values failed: ${String(error)}`)
		return {}
	}
}

export const createConfigScope = (options: ConfigScopeOptions): ConfigScope => {
	const { group, profileKey, syncDefault } = options
	const scope = options.scope ?? 'profile'
	const groupKeyPrefix = `${group}.`
	const profileGroupName = profileKey ? buildProfileGroupName(group, profileKey) : null
	const profileGroupKeyPrefix = profileGroupName ? `${profileGroupName}.` : null
	const usesActiveProfile = (): boolean => Boolean(profileKey) && profileKey === getProfileKey()

	const getString = (key: string, fallback = ''): string => {
		if (scope === 'group') {
			return getGroupString(group, key, fallback)
		}

		if (profileKey) {
			return getProfileStringForProfileKey(group, profileKey, key, fallback)
		}

		return getProfileString(group, key, fallback)
	}

	const getKeys = (keyPrefix = ''): string[] => {
		let fullKeys: string[]
		let prefixToTrim = groupKeyPrefix

		if (scope === 'group') {
			fullKeys = toKeyArray(getGroupKeys(groupKeyPrefix))
		} else if (profileGroupName && profileGroupKeyPrefix) {
			if (usesActiveProfile()) {
				fullKeys = toKeyArray(getProfileConfigKeys(group, keyPrefix))
			} else {
				fullKeys = toKeyArray(getGroupKeys(profileGroupKeyPrefix))
				prefixToTrim = profileGroupKeyPrefix
			}
		} else {
			fullKeys = toKeyArray(getProfileConfigKeys(group, keyPrefix))
		}

		const normalized = fullKeys.map((fullKey) => normalizeKey(fullKey, prefixToTrim)).filter((key) => key.length > 0)

		if (!keyPrefix) {
			return normalized
		}

		return normalized.filter((key) => key.startsWith(keyPrefix))
	}

	const getAllValues = (keyPrefix = ''): Record<string, string> => {
		const valuesByKey: Record<string, string> = {}
		getKeys(keyPrefix).forEach((key) => {
			valuesByKey[key] = getString(key, '')
		})
		return valuesByKey
	}

	const logAllValues = (action: string, keyPrefix = ''): Record<string, string> => logConfigValues({ action, group, getAllValues, keyPrefix })

	const set = (key: string, value: unknown, writeOptions?: ConfigWriteOptions): void => {
		const resolvedOptions = withSyncDefault(syncDefault, writeOptions)

		if (scope === 'group') {
			setGroupValue(group, key, value, resolvedOptions)
			return
		}

		if (profileKey) {
			if (usesActiveProfile()) {
				setProfileValue(group, key, value, resolvedOptions)
				return
			}

			setGroupValue(buildProfileGroupName(group, profileKey), key, value, resolvedOptions)
			return
		}

		setProfileValue(group, key, value, resolvedOptions)
	}

	const getNumber = (key: string, fallback = 0): number => {
		if (scope === 'group') {
			return getGroupNumber(group, key, fallback)
		}

		if (profileKey) {
			const parsed = parseNumber(getString(key, ''))
			return parsed === null ? fallback : parsed
		}

		return getProfileNumber(group, key, fallback)
	}

	const getInt = (key: string, fallback = 0): number => {
		if (scope === 'group') {
			return getGroupInt(group, key, fallback)
		}

		if (profileKey) {
			return getProfileIntForProfileKey(group, profileKey, key, fallback)
		}

		return getProfileInt(group, key, fallback)
	}

	const getFloat = (key: string, fallback = 0): number => {
		if (scope === 'group') {
			return getGroupFloat(group, key, fallback)
		}

		if (profileKey) {
			const parsed = parseFloatNumber(getString(key, ''))
			return parsed === null ? fallback : parsed
		}

		return getProfileFloat(group, key, fallback)
	}

	const getBoolean = (key: string, fallback = false): boolean => {
		if (scope === 'group') {
			return getGroupBoolean(group, key, fallback)
		}

		if (profileKey) {
			return getProfileBooleanForProfileKey(group, profileKey, key, fallback)
		}

		return getProfileBoolean(group, key, fallback)
	}

	const getStringArray = (key: string, fallback: string[] = []): string[] => {
		if (scope === 'group') {
			return getGroupStringArray(group, key, fallback)
		}

		if (profileKey) {
			const rawValue = getString(key, '')
			if (!rawValue.trim()) {
				return fallback
			}
			const entries = parseStringArrayValue(rawValue)
			return entries.length > 0 ? entries : fallback
		}

		return getProfileStringArray(group, key, fallback)
	}

	const getNumberArray = (key: string, fallback: number[] = []): number[] => {
		if (scope === 'group') {
			return getGroupNumberArray(group, key, fallback)
		}

		if (profileKey) {
			return parseNumberArrayFromString(getString(key, ''), fallback)
		}

		return getProfileNumberArray(group, key, fallback)
	}

	const getJson = <T>(key: string, fallback: T): T => {
		if (scope === 'group') {
			return getGroupJson(group, key, fallback)
		}

		if (profileKey) {
			return parseJsonFromString(getString(key, ''), fallback)
		}

		return getProfileJson(group, key, fallback)
	}

	const unset = (key: string, writeOptions?: ConfigWriteOptions): void => {
		const resolvedOptions = withSyncDefault(syncDefault, writeOptions)

		if (scope === 'group') {
			unsetGroupValue(group, key, resolvedOptions)
			return
		}

		if (profileKey) {
			if (usesActiveProfile()) {
				unsetProfileValue(group, key, resolvedOptions)
				return
			}
			unsetGroupValue(buildProfileGroupName(group, profileKey), key, resolvedOptions)
			return
		}

		unsetProfileValue(group, key, resolvedOptions)
	}

	return {
		getKeys,
		getAllValues,
		logAllValues,
		getString,
		set,
		getNumber,
		getInt,
		getFloat,
		getBoolean,
		getStringArray,
		getNumberArray,
		getJson,
		unset,
	}
}
