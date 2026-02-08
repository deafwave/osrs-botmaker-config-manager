import { createNumberAccessors } from '../shared/index.js'
import { getConfigString, setConfigString } from './strings.js'

export const {
	getNumber: getConfigNumber,
	getInt: getConfigInt,
	getFloat: getConfigFloat,
	setNumber: setConfigNumber,
} = createNumberAccessors(getConfigString, setConfigString)
