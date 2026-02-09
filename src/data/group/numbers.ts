import { createNumberAccessors } from '../shared/accessors.js'
import { getGroupString, setGroupString } from './strings.js'

const numberAccessors = createNumberAccessors(getGroupString, setGroupString)

export const getGroupNumber = numberAccessors.getNumber
export const getGroupInt = numberAccessors.getInt
export const getGroupFloat = numberAccessors.getFloat
export const setGroupNumber = numberAccessors.setNumber
