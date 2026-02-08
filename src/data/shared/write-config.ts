import type { ConfigWriteOptions } from './types.js'

export const writeConfig = (writer: () => void, options?: ConfigWriteOptions): void => {
	writer()
	if (options?.sync) {
		configManager.sendConfig()
	}
}
