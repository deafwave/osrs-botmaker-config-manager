import { getGroupValue, setGroupValue } from './data/group/aliases.js'
import { getGroupBoolean } from './data/group/booleans.js'
import { getGroupJson } from './data/group/json.js'
import { getGroupKeys, syncConfig, unsetGroupValue } from './data/group/keys.js'
import { getGroupNumberArray } from './data/group/number-arrays.js'
import { getGroupFloat, getGroupInt, getGroupNumber } from './data/group/numbers.js'
import { getGroupStringArray } from './data/group/string-arrays.js'
import { getGroupString } from './data/group/strings.js'
import { logGroupConfigSummary } from './data/group/summary.js'
import { getProfileBoolean, getProfileBooleanForProfileKey } from './data/profile/booleans.js'
import { getProfileValue, setProfileValue, unsetProfileValue } from './data/profile/config.js'
import { getProfileJson } from './data/profile/json.js'
import { getProfileConfigKeys, getProfileGroupName, getProfileKey, getProfileKeysForGroup, logProfileConfigSummary } from './data/profile/keys.js'
import { getProfileNumberArray } from './data/profile/number-arrays.js'
import { getProfileFloat, getProfileInt, getProfileIntForProfileKey, getProfileNumber } from './data/profile/numbers.js'
import { getProfileStringArray } from './data/profile/string-arrays.js'
import { getProfileString, getProfileStringForProfileKey } from './data/profile/strings.js'

export const group = {
	get: getGroupValue,
	getBoolean: getGroupBoolean,
	getFloat: getGroupFloat,
	getInt: getGroupInt,
	getJson: getGroupJson,
	getKeys: getGroupKeys,
	getNumber: getGroupNumber,
	getNumberArray: getGroupNumberArray,
	getString: getGroupString,
	getStringArray: getGroupStringArray,
	logSummary: logGroupConfigSummary,
	send: syncConfig,
	set: setGroupValue,
	unset: unsetGroupValue,
}

export const profile = {
	get: getProfileValue,
	getBoolean: getProfileBoolean,
	getBooleanForProfileKey: getProfileBooleanForProfileKey,
	getConfigKeys: getProfileConfigKeys,
	getFloat: getProfileFloat,
	getGroupName: getProfileGroupName,
	getInt: getProfileInt,
	getIntForProfileKey: getProfileIntForProfileKey,
	getJson: getProfileJson,
	getKey: getProfileKey,
	getKeysForGroup: getProfileKeysForGroup,
	getNumber: getProfileNumber,
	getNumberArray: getProfileNumberArray,
	getString: getProfileString,
	getStringArray: getProfileStringArray,
	getStringForProfileKey: getProfileStringForProfileKey,
	logSummary: logProfileConfigSummary,
	set: setProfileValue,
	unset: unsetProfileValue,
}

export { createConfigScope, logConfigValues } from './data/config-scope.js'
export type { ConfigScope, ConfigScopeMode, ConfigScopeOptions, LogConfigValuesOptions } from './data/config-scope.js'
export type { ConfigWriteOptions } from './data/shared/types.js'
export { getStoredBoolean, getStoredInt, getStoredString, setStoredBoolean, setStoredInt, setStoredString } from './data/storage.js'
export type { RsProfileStorage } from './data/storage.js'
