import { getConfig, setConfig } from './data/group/aliases.js'
import { getConfigBoolean, setConfigBoolean } from './data/group/booleans.js'
import { getConfigJson, setConfigJson } from './data/group/json.js'
import { getConfigKeys, sendConfig, unsetConfig } from './data/group/keys.js'
import { getConfigNumberArray, setConfigNumberArray } from './data/group/number-arrays.js'
import { getConfigFloat, getConfigInt, getConfigNumber, setConfigNumber } from './data/group/numbers.js'
import { getConfigStringArray, setConfigStringArray } from './data/group/string-arrays.js'
import { getConfigString, setConfigString } from './data/group/strings.js'
import { logGroupConfigSummary } from './data/group/summary.js'
import {
	getProfileBoolean,
	getProfileBooleanForProfileKey,
	setProfileBoolean,
	setProfileBooleanForProfileKey,
} from './data/profile/booleans.js'
import { getProfileConfig, setProfileConfig, unsetProfileConfig } from './data/profile/config.js'
import { getProfileJson, setProfileJson } from './data/profile/json.js'
import {
	getProfileConfigKeys,
	getProfileGroupName,
	getProfileKey,
	getProfileKeysForGroup,
	logProfileConfigSummary,
} from './data/profile/keys.js'
import { getProfileNumberArray, setProfileNumberArray } from './data/profile/number-arrays.js'
import {
	getProfileFloat,
	getProfileInt,
	getProfileIntForProfileKey,
	getProfileNumber,
	setProfileNumber,
	setProfileNumberForProfileKey,
} from './data/profile/numbers.js'
import { getProfileStringArray, setProfileStringArray } from './data/profile/string-arrays.js'
import {
	getProfileString,
	getProfileStringForProfileKey,
	setProfileString,
	setProfileStringForProfileKey,
} from './data/profile/strings.js'

export const group = {
	get: getConfig,
	getBoolean: getConfigBoolean,
	getFloat: getConfigFloat,
	getInt: getConfigInt,
	getJson: getConfigJson,
	getKeys: getConfigKeys,
	getNumber: getConfigNumber,
	getNumberArray: getConfigNumberArray,
	getString: getConfigString,
	getStringArray: getConfigStringArray,
	logSummary: logGroupConfigSummary,
	send: sendConfig,
	set: setConfig,
	setBoolean: setConfigBoolean,
	setJson: setConfigJson,
	setNumber: setConfigNumber,
	setNumberArray: setConfigNumberArray,
	setString: setConfigString,
	setStringArray: setConfigStringArray,
	unset: unsetConfig,
}

export const profile = {
	get: getProfileConfig,
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
	set: setProfileConfig,
	setBoolean: setProfileBoolean,
	setBooleanForProfileKey: setProfileBooleanForProfileKey,
	setJson: setProfileJson,
	setNumber: setProfileNumber,
	setNumberArray: setProfileNumberArray,
	setNumberForProfileKey: setProfileNumberForProfileKey,
	setString: setProfileString,
	setStringArray: setProfileStringArray,
	setStringForProfileKey: setProfileStringForProfileKey,
	unset: unsetProfileConfig,
}

export { createConfigScope, logConfigValues } from './data/config-scope.js'
export type { ConfigScope, ConfigScopeMode, ConfigScopeOptions, LogConfigValuesOptions } from './data/config-scope.js'
export type { ConfigWriteOptions } from './data/shared/types.js'
