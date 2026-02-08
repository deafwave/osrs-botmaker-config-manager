export const RS_PROFILE_GROUP_SEGMENT = '.rsprofile.'

export const buildProfileGroupName = (groupName: string, profileKey: string): string =>
	`${groupName}${RS_PROFILE_GROUP_SEGMENT}${profileKey}`

export const extractProfileKeyFromConfigKey = (fullKey: string, prefix: string): string | null => {
	if (!fullKey.startsWith(prefix)) {
		return null
	}
	const remainder = fullKey.slice(prefix.length)
	if (!remainder) {
		return null
	}
	const profileKey = remainder.split('.')[0]?.trim()
	return profileKey || null
}
