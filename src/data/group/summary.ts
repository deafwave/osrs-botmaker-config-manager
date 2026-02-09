import { RS_PROFILE_GROUP_SEGMENT } from '../shared/profile-group.js'
import { getGroupKeys } from './keys.js'

export const logGroupConfigSummary = (groupName: string): void => {
	const keys = getGroupKeys(`${groupName}.`)
	if (keys.length === 0) {
		log.printGameMessage(`No config keys found for group '${groupName}'.`)
		return
	}

	const profilePrefix = `${groupName}${RS_PROFILE_GROUP_SEGMENT}`
	const groupScoped: string[] = []
	let profileScopedCount = 0

	keys.forEach((key) => {
		if (key.startsWith(profilePrefix)) {
			profileScopedCount += 1
		} else {
			groupScoped.push(key)
		}
	})

	log.printGameMessage(
		`Config summary for group '${groupName}': ${keys.length} total key(s), ${groupScoped.length} group-level, ${profileScopedCount} profile-scoped.`,
	)

	if (groupScoped.length > 0) {
		const sortedKeys = groupScoped.slice().sort((a, b) => a.localeCompare(b))
		sortedKeys.forEach((key) => {
			log.printGameMessage(`Group-level key: ${key}`)
		})
	}

	if (profileScopedCount > 0) {
		log.printGameMessage(`Profile-scoped keys detected for '${groupName}'. Use profile.logSummary('${groupName}') for details.`)
	}
}
