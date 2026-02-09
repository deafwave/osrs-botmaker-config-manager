import { createConfigScope } from './config-scope.js'

export type RsProfileStorage = {
	group: string
	sync?: boolean
	/** optional profile key override to read/write a specific profile. */
	profileKey?: string
	/** Use group-level (non-profile) config storage instead of profile-scoped. */
	scope?: 'profile' | 'group'
}

const hasProfileStorage = (storage?: RsProfileStorage): storage is RsProfileStorage => typeof storage?.group === 'string' && storage.group.trim().length > 0

const getScope = (storage: RsProfileStorage) =>
	createConfigScope({
		group: storage.group,
		scope: storage.scope,
		profileKey: storage.profileKey,
		syncDefault: storage.sync,
	})

export const getStoredString = (storage: RsProfileStorage | undefined, key: string, fallback: string): string => {
	if (hasProfileStorage(storage)) {
		return getScope(storage).getString(key, fallback)
	}

	return bot.bmCache.getString(key, fallback)
}

export const setStoredString = (storage: RsProfileStorage | undefined, key: string, value: string): void => {
	if (hasProfileStorage(storage)) {
		getScope(storage).set(key, value)
		return
	}

	bot.bmCache.saveString(key, value)
}

export const getStoredInt = (storage: RsProfileStorage | undefined, key: string, fallback: number): number => {
	if (hasProfileStorage(storage)) {
		return getScope(storage).getInt(key, fallback)
	}

	return bot.bmCache.getInt(key, fallback)
}

export const setStoredInt = (storage: RsProfileStorage | undefined, key: string, value: number): void => {
	if (hasProfileStorage(storage)) {
		getScope(storage).set(key, value)
		return
	}

	bot.bmCache.saveInt(key, value)
}

export const getStoredBoolean = (storage: RsProfileStorage | undefined, key: string, fallback: boolean): boolean => {
	if (hasProfileStorage(storage)) {
		return getScope(storage).getBoolean(key, fallback)
	}

	return bot.bmCache.getBoolean(key, fallback)
}

export const setStoredBoolean = (storage: RsProfileStorage | undefined, key: string, value: boolean): void => {
	if (hasProfileStorage(storage)) {
		getScope(storage).set(key, value)
		return
	}

	bot.bmCache.saveBoolean(key, value)
}
