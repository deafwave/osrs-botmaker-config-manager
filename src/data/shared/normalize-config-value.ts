export const normalizeConfigValue = (value: unknown): string | null => {
	if (value === null || value === undefined) {
		return null
	}
	return typeof value === 'string' ? value : String(value)
}
