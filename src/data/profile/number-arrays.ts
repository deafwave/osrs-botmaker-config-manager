import { createNumberArrayAccessors } from '../shared/accessors.js'
import { getProfileString, setProfileString } from './strings.js'

const numberArrayAccessors = createNumberArrayAccessors(getProfileString, setProfileString)

export const getProfileNumberArray = numberArrayAccessors.getNumberArray
export const setProfileNumberArray = numberArrayAccessors.setNumberArray
