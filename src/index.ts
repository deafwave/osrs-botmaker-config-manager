import { getConfig, setConfig } from './data/group/aliases.js'
import { getConfigBoolean, setConfigBoolean } from './data/group/booleans.js'
import { getConfigJson, setConfigJson } from './data/group/json.js'
import { getConfigKeys, sendConfig, unsetConfig } from './data/group/keys.js'
import { getConfigNumberArray, setConfigNumberArray } from './data/group/number-arrays.js'
import { getConfigFloat, getConfigInt, getConfigNumber, setConfigNumber } from './data/group/numbers.js'
import { getConfigStringArray, setConfigStringArray } from './data/group/string-arrays.js'
import { getConfigString, setConfigString } from './data/group/strings.js'
import { logGroupConfigSummary } from './data/group/summary.js'
import { getProfileBoolean, getProfileBooleanForProfileKey, setProfileBoolean, setProfileBooleanForProfileKey } from './data/profile/booleans.js'
import { getProfileConfig, setProfileConfig, unsetProfileConfig } from './data/profile/config.js'
import { getProfileJson, setProfileJson } from './data/profile/json.js'
import { getProfileConfigKeys, getProfileGroupName, getProfileKey, getProfileKeysForGroup, logProfileConfigSummary } from './data/profile/keys.js'
import { getProfileNumberArray, setProfileNumberArray } from './data/profile/number-arrays.js'
import { getProfileFloat, getProfileInt, getProfileIntForProfileKey, getProfileNumber, setProfileNumber, setProfileNumberForProfileKey } from './data/profile/numbers.js'
import { getProfileStringArray, setProfileStringArray } from './data/profile/string-arrays.js'
import { getProfileString, getProfileStringForProfileKey, setProfileString, setProfileStringForProfileKey } from './data/profile/strings.js'

export const group = {
	getString: getConfigString,
	setString: setConfigString,
	getNumber: getConfigNumber,
	getInt: getConfigInt,
	getFloat: getConfigFloat,
	setNumber: setConfigNumber,
	getBoolean: getConfigBoolean,
	setBoolean: setConfigBoolean,
	getStringArray: getConfigStringArray,
	setStringArray: setConfigStringArray,
	getNumberArray: getConfigNumberArray,
	setNumberArray: setConfigNumberArray,
	getJson: getConfigJson,
	setJson: setConfigJson,
	getKeys: getConfigKeys,
	unset: unsetConfig,
	send: sendConfig,
	get: getConfig,
	set: setConfig,
	logSummary: logGroupConfigSummary,
}

export const profile = {
	getKey: getProfileKey,
	getGroupName: getProfileGroupName,
	getKeysForGroup: getProfileKeysForGroup,
	getConfigKeys: getProfileConfigKeys,
	getString: getProfileString,
	setString: setProfileString,
	getStringForProfileKey: getProfileStringForProfileKey,
	setStringForProfileKey: setProfileStringForProfileKey,
	getNumber: getProfileNumber,
	getInt: getProfileInt,
	getFloat: getProfileFloat,
	setNumber: setProfileNumber,
	getIntForProfileKey: getProfileIntForProfileKey,
	setNumberForProfileKey: setProfileNumberForProfileKey,
	getBoolean: getProfileBoolean,
	setBoolean: setProfileBoolean,
	getBooleanForProfileKey: getProfileBooleanForProfileKey,
	setBooleanForProfileKey: setProfileBooleanForProfileKey,
	getStringArray: getProfileStringArray,
	setStringArray: setProfileStringArray,
	getNumberArray: getProfileNumberArray,
	setNumberArray: setProfileNumberArray,
	getJson: getProfileJson,
	setJson: setProfileJson,
	unset: unsetProfileConfig,
	get: getProfileConfig,
	set: setProfileConfig,
	logSummary: logProfileConfigSummary,
}

export { createConfigScope, logConfigValues } from './data/config-scope.js'
export type { ConfigScope, ConfigScopeMode, ConfigScopeOptions, LogConfigValuesOptions } from './data/config-scope.js'
export type { ConfigWriteOptions } from './data/shared/types.js'
