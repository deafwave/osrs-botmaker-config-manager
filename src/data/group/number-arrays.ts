import { createNumberArrayAccessors } from '../shared/accessors.js'
import { getGroupString, setGroupString } from './strings.js'

const numberArrayAccessors = createNumberArrayAccessors(getGroupString, setGroupString)

export const getGroupNumberArray = numberArrayAccessors.getNumberArray
export const setGroupNumberArray = numberArrayAccessors.setNumberArray
