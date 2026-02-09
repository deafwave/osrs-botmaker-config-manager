import { createStringArrayAccessors } from '../shared/accessors.js'
import { getProfileString, setProfileString } from './strings.js'

const stringArrayAccessors = createStringArrayAccessors(getProfileString, setProfileString)

export const getProfileStringArray = stringArrayAccessors.getStringArray
export const setProfileStringArray = stringArrayAccessors.setStringArray
