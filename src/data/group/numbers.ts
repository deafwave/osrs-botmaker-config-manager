import { createNumberAccessors } from '../shared/accessors.js'
import { getConfigString, setConfigString } from './strings.js'

export const {
	getNumber: getConfigNumber,
	getInt: getConfigInt,
	getFloat: getConfigFloat,
	setNumber: setConfigNumber,
} = createNumberAccessors(getConfigString, setConfigString)
