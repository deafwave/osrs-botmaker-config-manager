import { createStringArrayAccessors } from '../shared/accessors.js'
import { getGroupString, setGroupString } from './strings.js'

const stringArrayAccessors = createStringArrayAccessors(getGroupString, setGroupString)

export const getGroupStringArray = stringArrayAccessors.getStringArray
export const setGroupStringArray = stringArrayAccessors.setStringArray
