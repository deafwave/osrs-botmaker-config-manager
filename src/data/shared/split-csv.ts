export const splitCsv = (value: string): string[] =>
	value
		.split(',')
		.map((entry) => entry.trim())
		.filter((entry) => entry.length > 0)
