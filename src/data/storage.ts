import { createConfigScope } from './config-scope.js'

export type RsProfileStorage = {
	group: string
	sync?: boolean
	/** optional profile key override to read/write a specific profile. */
	profileKey?: string
	/** Use group-level (non-profile) config storage instead of profile-scoped. */
	scope?: 'profile' | 'group'
}

const INVALID_STORAGE_GROUP_ERROR = "Invalid RsProfileStorage: 'group' must be a non-empty string when storage is provided."

const resolveStorage = (storage: RsProfileStorage | undefined): RsProfileStorage | undefined => {
	if (storage === undefined) {
		return undefined
	}

	if (typeof storage.group !== 'string' || storage.group.trim().length === 0) {
		throw new TypeError(INVALID_STORAGE_GROUP_ERROR)
	}

	return storage
}

const getScope = (storage: RsProfileStorage) =>
	createConfigScope({
		group: storage.group,
		scope: storage.scope,
		profileKey: storage.profileKey,
		syncDefault: storage.sync,
	})

export const getStoredString = (storage: RsProfileStorage | undefined, key: string, fallback: string): string => {
	const validStorage = resolveStorage(storage)
	if (validStorage) {
		return getScope(validStorage).getString(key, fallback)
	}

	return bot.bmCache.getString(key, fallback)
}

export const setStoredString = (storage: RsProfileStorage | undefined, key: string, value: string): void => {
	const validStorage = resolveStorage(storage)
	if (validStorage) {
		getScope(validStorage).set(key, value)
		return
	}

	bot.bmCache.saveString(key, value)
}

export const getStoredInt = (storage: RsProfileStorage | undefined, key: string, fallback: number): number => {
	const validStorage = resolveStorage(storage)
	if (validStorage) {
		return getScope(validStorage).getInt(key, fallback)
	}

	return bot.bmCache.getInt(key, fallback)
}

export const setStoredInt = (storage: RsProfileStorage | undefined, key: string, value: number): void => {
	const validStorage = resolveStorage(storage)
	if (validStorage) {
		getScope(validStorage).set(key, value)
		return
	}

	bot.bmCache.saveInt(key, value)
}

export const getStoredBoolean = (storage: RsProfileStorage | undefined, key: string, fallback: boolean): boolean => {
	const validStorage = resolveStorage(storage)
	if (validStorage) {
		return getScope(validStorage).getBoolean(key, fallback)
	}

	return bot.bmCache.getBoolean(key, fallback)
}

export const setStoredBoolean = (storage: RsProfileStorage | undefined, key: string, value: boolean): void => {
	const validStorage = resolveStorage(storage)
	if (validStorage) {
		getScope(validStorage).set(key, value)
		return
	}

	bot.bmCache.saveBoolean(key, value)
}
