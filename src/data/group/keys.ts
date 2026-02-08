import type { ConfigWriteOptions } from '../shared/index.js'
import { writeConfig } from '../shared/index.js'

export const unsetConfig = (groupName: string, key: string, options?: ConfigWriteOptions): void => {
	writeConfig(() => {
		configManager.unsetConfiguration(groupName, key)
	}, options)
}

export const getConfigKeys = (prefix: string): string[] => configManager.getConfigurationKeys(prefix) as string[]

export const sendConfig = (): void => {
	configManager.sendConfig()
}
