export type RSProfileConfigValue = object | string | boolean

type SetRSProfileConfigurationCompat = (groupName: string, key: string, value: RSProfileConfigValue) => void

/**
 * Upstream typing only accepts `object`, but runtime supports scalar values as well.
 */
export const setRSProfileConfigurationValue = (groupName: string, key: string, value: RSProfileConfigValue): void => {
	const typedConfigManager = configManager as unknown as { setRSProfileConfiguration: SetRSProfileConfigurationCompat }
	typedConfigManager.setRSProfileConfiguration(groupName, key, value)
}
