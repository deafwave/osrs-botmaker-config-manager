import { getConfigKeys } from '../group/keys.js'
import { RS_PROFILE_GROUP_SEGMENT, buildProfileGroupName, extractProfileKeyFromConfigKey } from '../shared/profile-group.js'

export const getProfileKey = (): string => configManager.getRSProfileKey()

export const getProfileGroupName = (groupName: string, profileKey: string): string => buildProfileGroupName(groupName, profileKey)

export const getProfileKeysForGroup = (groupName: string): string[] => {
	const prefix = `${groupName}${RS_PROFILE_GROUP_SEGMENT}`
	const keys = getConfigKeys(prefix)
	const profileKeys = new Set<string>()
	keys.forEach((fullKey) => {
		const profileKey = extractProfileKeyFromConfigKey(fullKey, prefix)
		if (profileKey) {
			profileKeys.add(profileKey)
		}
	})
	return Array.from(profileKeys)
}

export const logProfileConfigSummary = (groupName: string): void => {
	const prefix = `${groupName}${RS_PROFILE_GROUP_SEGMENT}`
	const keys = getConfigKeys(prefix)
	if (keys.length === 0) {
		bot.printLogMessage(`No profile-scoped config keys found for group '${groupName}'.`)
		return
	}

	const counts = new Map<string, number>()
	keys.forEach((fullKey) => {
		const profileKey = extractProfileKeyFromConfigKey(fullKey, prefix)
		if (!profileKey) {
			return
		}
		counts.set(profileKey, (counts.get(profileKey) ?? 0) + 1)
	})

	const activeProfileKey = getProfileKey()
	bot.printLogMessage(
		`Profile-scoped config summary for group '${groupName}': ${counts.size} profile(s), ${keys.length} key(s). Active profile: ${activeProfileKey}`,
	)

	Array.from(counts.entries())
		.sort((a, b) => a[0].localeCompare(b[0]))
		.forEach(([profileKey, count]) => {
			const marker = profileKey === activeProfileKey ? ' (active)' : ''
			bot.printLogMessage(`Profile ${profileKey}${marker}: ${count} key(s)`)
		})
}

export const getProfileConfigKeys = (groupName: string, keyPrefix = ''): string[] =>
	(configManager.getRSProfileConfigurationKeys(groupName, getProfileKey(), keyPrefix) as string[])
