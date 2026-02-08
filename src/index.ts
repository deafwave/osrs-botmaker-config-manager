import * as groupApi from './data/group/index.js'
import * as profileApi from './data/profile/index.js'

export const group = {
	getString: groupApi.getConfigString,
	setString: groupApi.setConfigString,
	getNumber: groupApi.getConfigNumber,
	getInt: groupApi.getConfigInt,
	getFloat: groupApi.getConfigFloat,
	setNumber: groupApi.setConfigNumber,
	getBoolean: groupApi.getConfigBoolean,
	setBoolean: groupApi.setConfigBoolean,
	getStringArray: groupApi.getConfigStringArray,
	setStringArray: groupApi.setConfigStringArray,
	getNumberArray: groupApi.getConfigNumberArray,
	setNumberArray: groupApi.setConfigNumberArray,
	getJson: groupApi.getConfigJson,
	setJson: groupApi.setConfigJson,
	getKeys: groupApi.getConfigKeys,
	unset: groupApi.unsetConfig,
	send: groupApi.sendConfig,
	get: groupApi.getConfig,
	set: groupApi.setConfig,
	logSummary: groupApi.logGroupConfigSummary,
}

export const profile = {
	getKey: profileApi.getProfileKey,
	getGroupName: profileApi.getProfileGroupName,
	getKeysForGroup: profileApi.getProfileKeysForGroup,
	getConfigKeys: profileApi.getProfileConfigKeys,
	getString: profileApi.getProfileString,
	setString: profileApi.setProfileString,
	getStringForProfileKey: profileApi.getProfileStringForProfileKey,
	setStringForProfileKey: profileApi.setProfileStringForProfileKey,
	getNumber: profileApi.getProfileNumber,
	getInt: profileApi.getProfileInt,
	getFloat: profileApi.getProfileFloat,
	setNumber: profileApi.setProfileNumber,
	getIntForProfileKey: profileApi.getProfileIntForProfileKey,
	setNumberForProfileKey: profileApi.setProfileNumberForProfileKey,
	getBoolean: profileApi.getProfileBoolean,
	setBoolean: profileApi.setProfileBoolean,
	getBooleanForProfileKey: profileApi.getProfileBooleanForProfileKey,
	setBooleanForProfileKey: profileApi.setProfileBooleanForProfileKey,
	getStringArray: profileApi.getProfileStringArray,
	setStringArray: profileApi.setProfileStringArray,
	getNumberArray: profileApi.getProfileNumberArray,
	setNumberArray: profileApi.setProfileNumberArray,
	getJson: profileApi.getProfileJson,
	setJson: profileApi.setProfileJson,
	unset: profileApi.unsetProfileConfig,
	get: profileApi.getProfileConfig,
	set: profileApi.setProfileConfig,
	logSummary: profileApi.logProfileConfigSummary,
}

export { createConfigScope, logConfigValues } from './data/config-scope.js'
export type { ConfigScope, ConfigScopeMode, ConfigScopeOptions, LogConfigValuesOptions } from './data/config-scope.js'
export type { ConfigWriteOptions } from './data/shared/index.js'
