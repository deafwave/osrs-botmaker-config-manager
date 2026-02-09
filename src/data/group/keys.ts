import type { ConfigWriteOptions } from '../shared/types.js'
import { writeConfig } from '../shared/write-config.js'

export const unsetGroupValue = (groupName: string, key: string, options?: ConfigWriteOptions): void => {
	writeConfig(() => {
		configManager.unsetConfiguration(groupName, key)
	}, options)
}

export const getGroupKeys = (prefix: string): string[] => configManager.getConfigurationKeys(prefix) as string[]

export const syncConfig = (): void => {
	configManager.sendConfig()
}
