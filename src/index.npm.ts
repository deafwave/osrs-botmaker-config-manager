import { createConfigScope, logConfigValues } from './data/config-scope.js'
import { sendConfig } from './data/group/keys.js'
import { group, profile } from './index.js'

export type { ConfigScope, ConfigScopeMode, ConfigScopeOptions, LogConfigValuesOptions } from './data/config-scope.js'
export type { ConfigWriteOptions } from './data/shared/types.js'

export const config = {
	group,
	profile,
	createConfigScope,
	logConfigValues,
	sendConfig,
}

export { group, profile } from './index.js'
export { createConfigScope, logConfigValues } from './data/config-scope.js'
export { sendConfig } from './data/group/keys.js'
