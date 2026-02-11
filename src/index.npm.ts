import { createConfigScope, logConfigValues } from './data/config-scope.js'
import { sendConfig } from './data/group/keys.js'
import { group, profile } from './index.js'

export const config = {
	group,
	profile,
	createConfigScope,
	logConfigValues,
	sendConfig,
}
