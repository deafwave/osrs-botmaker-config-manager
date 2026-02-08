import { getConfigBoolean, setConfigBoolean } from './group/booleans.js'
import { getConfigJson, setConfigJson } from './group/json.js'
import { getConfigKeys, unsetConfig } from './group/keys.js'
import { getConfigNumberArray, setConfigNumberArray } from './group/number-arrays.js'
import { getConfigFloat, getConfigInt, getConfigNumber, setConfigNumber } from './group/numbers.js'
import { getConfigStringArray, setConfigStringArray } from './group/string-arrays.js'
import { getConfigString, setConfigString } from './group/strings.js'
import { getProfileBoolean, getProfileBooleanForProfileKey, setProfileBoolean, setProfileBooleanForProfileKey } from './profile/booleans.js'
import { getProfileJson, setProfileJson } from './profile/json.js'
import { getProfileConfigKeys, getProfileKey } from './profile/keys.js'
import { getProfileNumberArray, setProfileNumberArray } from './profile/number-arrays.js'
import { getProfileFloat, getProfileInt, getProfileIntForProfileKey, getProfileNumber, setProfileNumber, setProfileNumberForProfileKey } from './profile/numbers.js'
import { getProfileStringArray, setProfileStringArray } from './profile/string-arrays.js'
import { getProfileString, getProfileStringForProfileKey, setProfileString, setProfileStringForProfileKey } from './profile/strings.js'
import { unsetProfileConfig } from './profile/config.js'
import type { ConfigWriteOptions } from './shared/types.js'
import { parseFloatNumber, parseNumber } from './shared/parse-number.js'
import { buildProfileGroupName } from './shared/profile-group.js'
import { splitCsv } from './shared/split-csv.js'
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
	setString: (key: string, value: string, options?: ConfigWriteOptions) => void
	getNumber: (key: string, fallback?: number) => number
	setNumber: (key: string, value: number, options?: ConfigWriteOptions) => void
	getInt: (key: string, fallback?: number) => number
	setInt: (key: string, value: number, options?: ConfigWriteOptions) => void
	getFloat: (key: string, fallback?: number) => number
	getBoolean: (key: string, fallback?: boolean) => boolean
	setBoolean: (key: string, value: boolean, options?: ConfigWriteOptions) => void
	getStringArray: (key: string, fallback?: string[]) => string[]
	setStringArray: (key: string, values: string[], options?: ConfigWriteOptions) => void
	getNumberArray: (key: string, fallback?: number[]) => number[]
	setNumberArray: (key: string, values: number[], options?: ConfigWriteOptions) => void
	getJson: <T>(key: string, fallback: T) => T
	setJson: <T>(key: string, value: T, options?: ConfigWriteOptions) => void
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

	try {
		return JSON.parse(value) as T
	} catch {
		return fallback
	}
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
			return getConfigString(group, key, fallback)
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
			fullKeys = toKeyArray(getConfigKeys(groupKeyPrefix))
		} else if (profileGroupName && profileGroupKeyPrefix) {
			if (usesActiveProfile()) {
				fullKeys = toKeyArray(getProfileConfigKeys(group, keyPrefix))
			} else {
				fullKeys = toKeyArray(getConfigKeys(profileGroupKeyPrefix))
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

	const setString = (key: string, value: string, writeOptions?: ConfigWriteOptions): void => {
		const resolvedOptions = withSyncDefault(syncDefault, writeOptions)

		if (scope === 'group') {
			setConfigString(group, key, value, resolvedOptions)
			return
		}

		if (profileKey) {
			setProfileStringForProfileKey(group, profileKey, key, value, resolvedOptions)
			return
		}

		setProfileString(group, key, value, resolvedOptions)
	}

	const getNumber = (key: string, fallback = 0): number => {
		if (scope === 'group') {
			return getConfigNumber(group, key, fallback)
		}

		if (profileKey) {
			const parsed = parseNumber(getString(key, ''))
			return parsed === null ? fallback : parsed
		}

		return getProfileNumber(group, key, fallback)
	}

	const setNumber = (key: string, value: number, writeOptions?: ConfigWriteOptions): void => {
		const resolvedOptions = withSyncDefault(syncDefault, writeOptions)

		if (scope === 'group') {
			setConfigNumber(group, key, value, resolvedOptions)
			return
		}

		if (profileKey) {
			setProfileNumberForProfileKey(group, profileKey, key, value, resolvedOptions)
			return
		}

		setProfileNumber(group, key, value, resolvedOptions)
	}

	const getInt = (key: string, fallback = 0): number => {
		if (scope === 'group') {
			return getConfigInt(group, key, fallback)
		}

		if (profileKey) {
			return getProfileIntForProfileKey(group, profileKey, key, fallback)
		}

		return getProfileInt(group, key, fallback)
	}

	const setInt = (key: string, value: number, writeOptions?: ConfigWriteOptions): void => {
		setNumber(key, value, writeOptions)
	}

	const getFloat = (key: string, fallback = 0): number => {
		if (scope === 'group') {
			return getConfigFloat(group, key, fallback)
		}

		if (profileKey) {
			const parsed = parseFloatNumber(getString(key, ''))
			return parsed === null ? fallback : parsed
		}

		return getProfileFloat(group, key, fallback)
	}

	const getBoolean = (key: string, fallback = false): boolean => {
		if (scope === 'group') {
			return getConfigBoolean(group, key, fallback)
		}

		if (profileKey) {
			return getProfileBooleanForProfileKey(group, profileKey, key, fallback)
		}

		return getProfileBoolean(group, key, fallback)
	}

	const setBoolean = (key: string, value: boolean, writeOptions?: ConfigWriteOptions): void => {
		const resolvedOptions = withSyncDefault(syncDefault, writeOptions)

		if (scope === 'group') {
			setConfigBoolean(group, key, value, resolvedOptions)
			return
		}

		if (profileKey) {
			setProfileBooleanForProfileKey(group, profileKey, key, value, resolvedOptions)
			return
		}

		setProfileBoolean(group, key, value, resolvedOptions)
	}

	const getStringArray = (key: string, fallback: string[] = []): string[] => {
		if (scope === 'group') {
			return getConfigStringArray(group, key, fallback)
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

	const setStringArray = (key: string, values: string[], writeOptions?: ConfigWriteOptions): void => {
		const resolvedOptions = withSyncDefault(syncDefault, writeOptions)

		if (scope === 'group') {
			setConfigStringArray(group, key, values, resolvedOptions)
			return
		}

		if (profileKey) {
			setString(key, JSON.stringify(values), resolvedOptions)
			return
		}

		setProfileStringArray(group, key, values, resolvedOptions)
	}

	const getNumberArray = (key: string, fallback: number[] = []): number[] => {
		if (scope === 'group') {
			return getConfigNumberArray(group, key, fallback)
		}

		if (profileKey) {
			return parseNumberArrayFromString(getString(key, ''), fallback)
		}

		return getProfileNumberArray(group, key, fallback)
	}

	const setNumberArray = (key: string, values: number[], writeOptions?: ConfigWriteOptions): void => {
		const resolvedOptions = withSyncDefault(syncDefault, writeOptions)

		if (scope === 'group') {
			setConfigNumberArray(group, key, values, resolvedOptions)
			return
		}

		if (profileKey) {
			setString(key, values.join(','), resolvedOptions)
			return
		}

		setProfileNumberArray(group, key, values, resolvedOptions)
	}

	const getJson = <T>(key: string, fallback: T): T => {
		if (scope === 'group') {
			return getConfigJson(group, key, fallback)
		}

		if (profileKey) {
			return parseJsonFromString(getString(key, ''), fallback)
		}

		return getProfileJson(group, key, fallback)
	}

	const setJson = <T>(key: string, value: T, writeOptions?: ConfigWriteOptions): void => {
		const resolvedOptions = withSyncDefault(syncDefault, writeOptions)

		if (scope === 'group') {
			setConfigJson(group, key, value, resolvedOptions)
			return
		}

		if (profileKey) {
			setString(key, JSON.stringify(value), resolvedOptions)
			return
		}

		setProfileJson(group, key, value, resolvedOptions)
	}

	const unset = (key: string, writeOptions?: ConfigWriteOptions): void => {
		const resolvedOptions = withSyncDefault(syncDefault, writeOptions)

		if (scope === 'group') {
			unsetConfig(group, key, resolvedOptions)
			return
		}

		if (profileKey) {
			if (usesActiveProfile()) {
				unsetProfileConfig(group, key, resolvedOptions)
				return
			}
			unsetConfig(buildProfileGroupName(group, profileKey), key, resolvedOptions)
			return
		}

		unsetProfileConfig(group, key, resolvedOptions)
	}

	return {
		getKeys,
		getAllValues,
		logAllValues,
		getString,
		setString,
		getNumber,
		setNumber,
		getInt,
		setInt,
		getFloat,
		getBoolean,
		setBoolean,
		getStringArray,
		setStringArray,
		getNumberArray,
		setNumberArray,
		getJson,
		setJson,
		unset,
	}
}
